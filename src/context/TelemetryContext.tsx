import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  ElephantHerd, 
  SettlementGeofence, 
  WildlifeCorridor, 
  RailwayTrackSegment, 
  HighRiskZone, 
  SensorDevice, 
  ElephantEvent, 
  NotificationAlert, 
  PredictionVector, 
  DecisionSupportAction,
  RiskLevel
} from '../types';
import { 
  INITIAL_HERDS, 
  SETTLEMENTS, 
  WILDLIFE_CORRIDORS, 
  RAILWAY_TRACK, 
  HIGH_RISK_ZONES, 
  SENSOR_DEVICES, 
  INITIAL_EVENTS, 
  INITIAL_NOTIFICATIONS, 
  PREDICTION_DATA, 
  DECISION_SUPPORT_ACTIONS 
} from '../data/mockData';

// Helper to convert heading degrees to cardinal string
function degreesToCardinal(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(((deg % 360) / 22.5)) % 16;
  return directions[index];
}

// Calculate distance between two coordinates in km (Haversine)
function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}

interface TelemetryContextType {
  herds: ElephantHerd[];
  settlements: SettlementGeofence[];
  corridors: WildlifeCorridor[];
  railway: RailwayTrackSegment;
  highRiskZones: HighRiskZone[];
  sensors: SensorDevice[];
  events: ElephantEvent[];
  notifications: NotificationAlert[];
  predictions: PredictionVector[];
  decisionActions: DecisionSupportAction[];
  
  // UI & Active selection
  activeView: string;
  setActiveView: (view: string) => void;
  selectedHerdId: string | null;
  setSelectedHerdId: (id: string | null) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  
  // Simulation Controls
  isSimulating: boolean;
  setIsSimulating: (sim: boolean) => void;
  simulationSpeed: number; // 1, 5, 10
  setSimulationSpeed: (speed: number) => void;
  
  // Interactive Actions
  triggerSimulatedBreach: () => void;
  triggerAcousticSiren: (settlementId: string) => void;
  updateRailwaySpeedLimit: (newLimitKmH: number) => void;
  executeDecisionAction: (actionId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addEventLog: (event: Omit<ElephantEvent, 'id' | 'timestamp'>) => void;
}

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const TelemetryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [herds, setHerds] = useState<ElephantHerd[]>(INITIAL_HERDS);
  const [settlements, setSettlements] = useState<SettlementGeofence[]>(SETTLEMENTS);
  const [corridors] = useState<WildlifeCorridor[]>(WILDLIFE_CORRIDORS);
  const [railway, setRailway] = useState<RailwayTrackSegment>(RAILWAY_TRACK);
  const [highRiskZones] = useState<HighRiskZone[]>(HIGH_RISK_ZONES);
  const [sensors, setSensors] = useState<SensorDevice[]>(SENSOR_DEVICES);
  const [events, setEvents] = useState<ElephantEvent[]>(INITIAL_EVENTS);
  const [notifications, setNotifications] = useState<NotificationAlert[]>(INITIAL_NOTIFICATIONS);
  const [predictions] = useState<PredictionVector[]>(PREDICTION_DATA);
  const [decisionActions, setDecisionActions] = useState<DecisionSupportAction[]>(DECISION_SUPPORT_ACTIONS);
  
  const [activeView, setActiveView] = useState<string>('operations');
  const [selectedHerdId, setSelectedHerdId] = useState<string | null>('herd-02');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);

  // Real-time Telemetry Simulator Loop
  useEffect(() => {
    if (!isSimulating) return;

    const intervalMs = Math.max(1000, 3000 / simulationSpeed);

    const timer = setInterval(() => {
      setHerds((prevHerds) =>
        prevHerds.map((herd) => {
          // If herd is moving or charging, simulate movement step
          if (herd.status === 'MOVING' || herd.status === 'CHARGING') {
            const rad = (herd.headingDeg * Math.PI) / 180;
            // Small delta based on speed (km/h) converted to approx coordinate delta
            const stepFactor = (herd.speedKmH * 0.00008) * simulationSpeed;
            const deltaLat = Math.cos(rad) * stepFactor;
            const deltaLng = Math.sin(rad) * stepFactor;

            const newLat = herd.location.lat + deltaLat;
            const newLng = herd.location.lng + deltaLng;

            // Small jitter to heading
            const headingJitter = (Math.random() - 0.5) * 6;
            const newHeading = Math.round((herd.headingDeg + headingJitter + 360) % 360);

            // Re-calculate nearest settlement distance
            let closestDist = 999;
            let closestVillage = herd.nearestSettlement;

            settlements.forEach((st) => {
              const d = getDistanceKm(newLat, newLng, st.coordinates.lat, st.coordinates.lng);
              if (d < closestDist) {
                closestDist = d;
                const etaMins = herd.speedKmH > 0 ? Math.round((d / herd.speedKmH) * 60) : null;
                closestVillage = {
                  villageId: st.id,
                  villageName: st.name,
                  distanceKm: d,
                  estimatedArrivalMins: etaMins
                };
              }
            });

            // Dynamic Risk Level Calculation
            let newRisk: RiskLevel = 'SAFE';
            if (closestDist < 0.5) {
              newRisk = 'CRITICAL';
            } else if (closestDist < 1.2) {
              newRisk = 'HIGH';
            } else if (closestDist < 2.5) {
              newRisk = 'MEDIUM';
            } else if (closestDist < 4.0) {
              newRisk = 'LOW';
            }

            const newPoint = {
              lat: newLat,
              lng: newLng,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              speedKmH: herd.speedKmH,
              headingDeg: newHeading
            };

            const updatedTrail = [...herd.historyTrail.slice(-15), newPoint];

            return {
              ...herd,
              location: { lat: newLat, lng: newLng },
              headingDeg: newHeading,
              headingCardinal: degreesToCardinal(newHeading),
              nearestSettlement: closestVillage,
              riskLevel: newRisk,
              historyTrail: updatedTrail,
              lastUpdate: 'Just now'
            };
          }
          return herd;
        })
      );

      // Random Sensor pulse heartbeat
      setSensors((prevSensors) =>
        prevSensors.map((s) => ({
          ...s,
          lastPing: 'Just now'
        }))
      );
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isSimulating, simulationSpeed, settlements]);

  // Actions
  const triggerSimulatedBreach = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    // Move Bull Tusker Raja directly to the border of Nilgiri Hamlet
    setHerds((prev) =>
      prev.map((h) => {
        if (h.id === 'herd-02') {
          return {
            ...h,
            location: { lat: 11.5628, lng: 76.8492 },
            speedKmH: 6.5,
            status: 'CHARGING',
            riskLevel: 'CRITICAL',
            nearestSettlement: {
              villageId: 'settle-02',
              villageName: 'Nilgiri Foothills Hamlet',
              distanceKm: 0.15,
              estimatedArrivalMins: 1
            }
          };
        }
        return h;
      })
    );

    // Create event
    const newEvent: ElephantEvent = {
      id: `ev-${Date.now()}`,
      timestamp: `${timeStr} IST`,
      herdId: 'herd-02',
      herdName: 'Raja - Rogue Bull Tusker',
      sensorType: 'AI_CAMERA_TRAP',
      sensorId: 'sensor-cam-02',
      location: { lat: 11.5628, lng: 76.8492 },
      locationName: 'Nilgiri Foothills Perimeter Fence (150m)',
      riskLevel: 'CRITICAL',
      eventType: 'VILLAGE_BOUNDARY_BREACH',
      details: 'EMERGENCY INTRUSION: Bull Tusker Raja is breaching the primary bio-fence line. Solar siren auto-triggered. Immediate evacuation advisory dispatched.',
      speedKmH: 6.5,
      headingDeg: 280,
      actionTaken: 'Acoustic siren + High intensity strobe activated. Forest Rapid Action Force dispatched.',
      resolved: false
    };

    const newNotification: NotificationAlert = {
      id: `notif-${Date.now()}`,
      timestamp: timeStr,
      title: '🚨 CRITICAL EMERGENCY: Settlement Fence Breach!',
      message: 'Bull Tusker Raja has penetrated the 200m buffer zone of Nilgiri Foothills Hamlet! Defense units mobilised.',
      riskLevel: 'CRITICAL',
      read: false,
      herdId: 'herd-02',
      targetSector: 'Nilgiri Foothills Sector A',
      dispatchedTo: ['Forest Rapid Response Unit #2', 'Village Emergency WhatsApp Broadcast', 'Range Police Officer'],
      sirenActive: true
    };

    setEvents((prev) => [newEvent, ...prev]);
    setNotifications((prev) => [newNotification, ...prev]);
    setSelectedHerdId('herd-02');
  };

  const triggerAcousticSiren = (settlementId: string) => {
    setSettlements((prev) =>
      prev.map((s) => {
        if (s.id === settlementId) {
          return {
            ...s,
            activeDeterrents: {
              ...s.activeDeterrents,
              acousticSirens: s.activeDeterrents.acousticSirens + 1
            }
          };
        }
        return s;
      })
    );

    const st = settlements.find((s) => s.id === settlementId);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newEvent: ElephantEvent = {
      id: `ev-${Date.now()}`,
      timestamp: `${timeStr} IST`,
      herdId: 'herd-01',
      herdName: 'Manual Deterrent Command',
      sensorType: 'ACOUSTIC_ARRAY',
      sensorId: 'SIREN-CMD',
      location: st ? st.coordinates : { lat: 11.5760, lng: 76.8280 },
      locationName: st ? st.name : 'Settlement Grid',
      riskLevel: 'HIGH',
      eventType: 'ACOUSTIC_DETERRENT_TRIGGERED',
      details: `Bio-acoustic predator synthesizers & high-lumen solar strobes manually activated at ${st?.name || 'Village'}.`,
      speedKmH: 0,
      headingDeg: 0,
      actionTaken: 'Smart bio-acoustic siren array active.',
      resolved: true
    };

    setEvents((prev) => [newEvent, ...prev]);
  };

  const updateRailwaySpeedLimit = (newLimitKmH: number) => {
    setRailway((prev) => ({
      ...prev,
      currentSpeedLimitKmH: newLimitKmH,
      lastWarningBroadcast: `Manual override: speed limit adjusted to ${newLimitKmH} km/h`
    }));
  };

  const executeDecisionAction = (actionId: string) => {
    setDecisionActions((prev) =>
      prev.map((act) => (act.id === actionId ? { ...act, status: 'EXECUTED' } : act))
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addEventLog = (eventData: Omit<ElephantEvent, 'id' | 'timestamp'>) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newEvent: ElephantEvent = {
      ...eventData,
      id: `ev-${Date.now()}`,
      timestamp: `${timeStr} IST`
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  return (
    <TelemetryContext.Provider
      value={{
        herds,
        settlements,
        corridors,
        railway,
        highRiskZones,
        sensors,
        events,
        notifications,
        predictions,
        decisionActions,
        activeView,
        setActiveView,
        selectedHerdId,
        setSelectedHerdId,
        soundEnabled,
        setSoundEnabled,
        isSimulating,
        setIsSimulating,
        simulationSpeed,
        setSimulationSpeed,
        triggerSimulatedBreach,
        triggerAcousticSiren,
        updateRailwaySpeedLimit,
        executeDecisionAction,
        markNotificationRead,
        markAllNotificationsRead,
        addEventLog
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = () => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
};
