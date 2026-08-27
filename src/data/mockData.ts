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
  DecisionSupportAction 
} from '../types';

export const INITIAL_HERDS: ElephantHerd[] = [
  {
    id: 'E-001',
    name: 'E-001 (Indira Matriarch Clan)',
    type: 'MATRIARCH_LED',
    size: 14,
    matriarchName: 'Indira (Age 48)',
    collarId: 'ESP32-COLLAR-001',
    batteryPct: 88,
    collarSignalStrength: 94,
    location: { lat: 12.9716, lng: 77.5946 },
    elevationM: 840,
    headingDeg: 90,
    headingCardinal: 'East (→)',
    speedKmH: 3.8,
    status: 'MOVING',
    riskLevel: 'HIGH',
    nearestSettlement: {
      villageId: 'settle-01',
      villageName: 'Zone A (Village Border)',
      distanceKm: 0.45,
      estimatedArrivalMins: 7
    },
    inCorridorId: 'corr-01',
    inRailwayHazardZone: false,
    historyTrail: [
      { lat: 12.9650, lng: 77.5750, timestamp: '17:30', speedKmH: 2.5, headingDeg: 85 },
      { lat: 12.9680, lng: 77.5820, timestamp: '18:10', speedKmH: 3.2, headingDeg: 88 },
      { lat: 12.9700, lng: 77.5890, timestamp: '18:30', speedKmH: 3.6, headingDeg: 90 },
      { lat: 12.9716, lng: 77.5946, timestamp: '18:52', speedKmH: 3.8, headingDeg: 90 }
    ],
    lastUpdate: '18:52'
  },
  {
    id: 'E-002',
    name: 'E-002 (Raja - Rogue Bull Tusker)',
    type: 'LONE_BULL',
    size: 1,
    matriarchName: undefined,
    collarId: 'ESP32-COLLAR-002',
    batteryPct: 62,
    collarSignalStrength: 82,
    location: { lat: 12.9850, lng: 77.6120 },
    elevationM: 710,
    headingDeg: 0,
    headingCardinal: 'North (↑)',
    speedKmH: 5.2,
    status: 'CHARGING',
    riskLevel: 'CRITICAL',
    nearestSettlement: {
      villageId: 'settle-02',
      villageName: 'Zone B (Settlement Fringe)',
      distanceKm: 0.28,
      estimatedArrivalMins: 3
    },
    inCorridorId: null,
    inRailwayHazardZone: true,
    historyTrail: [
      { lat: 12.9720, lng: 77.6120, timestamp: '18:00', speedKmH: 4.1, headingDeg: 0 },
      { lat: 12.9780, lng: 77.6120, timestamp: '18:25', speedKmH: 4.8, headingDeg: 0 },
      { lat: 12.9850, lng: 77.6120, timestamp: '18:52', speedKmH: 5.2, headingDeg: 0 }
    ],
    lastUpdate: '18:52'
  },
  {
    id: 'E-003',
    name: 'E-003 (Brahma Family Pod)',
    type: 'HERD',
    size: 9,
    matriarchName: 'Sita',
    collarId: 'ESP32-COLLAR-003',
    batteryPct: 95,
    collarSignalStrength: 98,
    location: { lat: 12.9520, lng: 77.6350 },
    elevationM: 920,
    headingDeg: 270,
    headingCardinal: 'West (←)',
    speedKmH: 1.2,
    status: 'FORAGING',
    riskLevel: 'LOW',
    nearestSettlement: {
      villageId: 'settle-04',
      villageName: 'Zone C (Forest Corridor)',
      distanceKm: 3.40,
      estimatedArrivalMins: 170
    },
    inCorridorId: 'corr-02',
    inRailwayHazardZone: false,
    historyTrail: [
      { lat: 12.9520, lng: 77.6450, timestamp: '17:00', speedKmH: 1.1, headingDeg: 270 },
      { lat: 12.9520, lng: 77.6400, timestamp: '18:00', speedKmH: 1.2, headingDeg: 270 },
      { lat: 12.9520, lng: 77.6350, timestamp: '18:52', speedKmH: 1.2, headingDeg: 270 }
    ],
    lastUpdate: '18:52'
  },
  {
    id: 'E-004',
    name: 'E-004 (Chota Bachelor Trio)',
    type: 'BACHELOR_GROUP',
    size: 3,
    matriarchName: undefined,
    collarId: 'ESP32-COLLAR-004',
    batteryPct: 74,
    collarSignalStrength: 89,
    location: { lat: 12.9380, lng: 77.5850 },
    elevationM: 680,
    headingDeg: 180,
    headingCardinal: 'South (↓)',
    speedKmH: 2.6,
    status: 'MOVING',
    riskLevel: 'MEDIUM',
    nearestSettlement: {
      villageId: 'settle-03',
      villageName: 'Zone D (Tea Plantation)',
      distanceKm: 1.45,
      estimatedArrivalMins: 33
    },
    inCorridorId: 'corr-01',
    inRailwayHazardZone: false,
    historyTrail: [
      { lat: 12.9480, lng: 77.5850, timestamp: '17:40', speedKmH: 2.2, headingDeg: 180 },
      { lat: 12.9380, lng: 77.5850, timestamp: '18:52', speedKmH: 2.6, headingDeg: 180 }
    ],
    lastUpdate: '18:52'
  },
  {
    id: 'E-005',
    name: 'E-005 (Gauri Valley Herd)',
    type: 'HERD',
    size: 11,
    matriarchName: 'Gauri',
    collarId: 'ESP32-COLLAR-005',
    batteryPct: 91,
    collarSignalStrength: 92,
    location: { lat: 13.0120, lng: 77.5620 },
    elevationM: 1040,
    headingDeg: 135,
    headingCardinal: 'South-East (↘)',
    speedKmH: 0.8,
    status: 'RESTING',
    riskLevel: 'SAFE',
    nearestSettlement: {
      villageId: 'settle-06',
      villageName: 'Zone E (Reserve Buffer)',
      distanceKm: 4.20,
      estimatedArrivalMins: 315
    },
    inCorridorId: 'corr-03',
    inRailwayHazardZone: false,
    historyTrail: [
      { lat: 13.0160, lng: 77.5580, timestamp: '17:15', speedKmH: 0.9, headingDeg: 135 },
      { lat: 13.0120, lng: 77.5620, timestamp: '18:52', speedKmH: 0.8, headingDeg: 135 }
    ],
    lastUpdate: '18:52'
  }
];

export const SETTLEMENTS: SettlementGeofence[] = [
  {
    id: 'settle-01',
    name: 'Zone A (Village Border)',
    type: 'PADDY_FIELD',
    population: 1420,
    coordinates: { lat: 12.9716, lng: 77.6010 },
    radiusMeters: 900,
    vulnerabilityIndex: 88,
    activeDeterrents: {
      acousticSirens: 4,
      solarStrobes: 8,
      beehiveFences: true,
      chiliRopeMeters: 450
    },
    forestGuardsOnDuty: 4,
    currentRiskLevel: 'HIGH',
    lastIncidentDate: 'Today 18:42'
  },
  {
    id: 'settle-02',
    name: 'Zone B (Settlement Fringe)',
    type: 'VILLAGE',
    population: 2100,
    coordinates: { lat: 12.9890, lng: 77.6120 },
    radiusMeters: 1100,
    vulnerabilityIndex: 94,
    activeDeterrents: {
      acousticSirens: 6,
      solarStrobes: 12,
      beehiveFences: true,
      chiliRopeMeters: 800
    },
    forestGuardsOnDuty: 6,
    currentRiskLevel: 'CRITICAL',
    lastIncidentDate: 'Today 18:35'
  },
  {
    id: 'settle-03',
    name: 'Zone D (Tea Plantation)',
    type: 'TEA_ESTATE',
    population: 850,
    coordinates: { lat: 12.9280, lng: 77.5850 },
    radiusMeters: 1400,
    vulnerabilityIndex: 65,
    activeDeterrents: {
      acousticSirens: 2,
      solarStrobes: 6,
      beehiveFences: false,
      chiliRopeMeters: 300
    },
    forestGuardsOnDuty: 2,
    currentRiskLevel: 'MEDIUM',
    lastIncidentDate: 'Today 17:15'
  },
  {
    id: 'settle-04',
    name: 'Zone C (Forest Corridor Post)',
    type: 'FOREST_STATION',
    population: 120,
    coordinates: { lat: 12.9520, lng: 77.6700 },
    radiusMeters: 600,
    vulnerabilityIndex: 25,
    activeDeterrents: {
      acousticSirens: 2,
      solarStrobes: 4,
      beehiveFences: true,
      chiliRopeMeters: 600
    },
    forestGuardsOnDuty: 8,
    currentRiskLevel: 'SAFE',
    lastIncidentDate: 'Today 18:21'
  }
];

export const RAILWAY_TRACK: RailwayTrackSegment = {
  id: 'rail-01',
  name: 'Railway Track Line (Zone B - Track Km 44)',
  kmStart: 38,
  kmEnd: 54,
  path: [
    [12.9700, 77.6300],
    [12.9780, 77.6200],
    [12.9860, 77.6100],
    [12.9940, 77.6000],
    [13.0020, 77.5900]
  ],
  speedLimitNormalKmH: 80,
  currentSpeedLimitKmH: 30,
  isElephantCrossingActive: true,
  activeAcousticFences: 4,
  lastWarningBroadcast: '18:45 IST (Speed restricted to 30km/h for safety)'
};

export const WILDLIFE_CORRIDORS: WildlifeCorridor[] = [
  {
    id: 'corr-01',
    name: 'Forest A ────────→ Forest B Primary Corridor',
    region: 'North-South Wildlife Migration Belt',
    lengthKm: 14.2,
    avgWidthM: 650,
    path: [
      [13.0100, 77.5600],
      [12.9800, 77.5800],
      [12.9650, 77.5950],
      [12.9400, 77.5900],
      [12.9200, 77.5800]
    ],
    connectivityScore: 82,
    encroachmentPct: 18,
    status: 'OPTIMAL',
    bottlenecksCount: 1,
    bottlenecks: [
      {
        name: 'Zone A Village Road Crossing',
        coordinates: { lat: 12.9700, lng: 77.5980 },
        cause: 'Highway',
        severity: 'HIGH'
      }
    ],
    annualElephantsPassed: 430,
    ecologicalImportance: 'KEYSTONE'
  },
  {
    id: 'corr-02',
    name: 'East Ridge Canopy Corridor',
    region: 'Protected Reserve Ridge',
    lengthKm: 18.6,
    avgWidthM: 1200,
    path: [
      [12.9600, 77.6200],
      [12.9550, 77.6350],
      [12.9500, 77.6500],
      [12.9450, 77.6650]
    ],
    connectivityScore: 94,
    encroachmentPct: 6,
    status: 'OPTIMAL',
    bottlenecksCount: 0,
    bottlenecks: [],
    annualElephantsPassed: 610,
    ecologicalImportance: 'CRITICAL'
  }
];

export const HIGH_RISK_ZONES: HighRiskZone[] = [
  {
    id: 'hrz-01',
    zoneName: 'Zone A (Village Border & Paddy Crop)',
    coordinates: { lat: 12.9716, lng: 77.6010 },
    radiusM: 850,
    conflictIntensity: 92,
    incidentsPast12M: 38,
    primaryCropAttractant: 'Ripe Paddy & Sugarcane',
    seasonality: 'HARVEST_AUTUMN',
    riskScore: 92
  },
  {
    id: 'hrz-02',
    zoneName: 'Zone B (Settlement Fringe & Railway Line)',
    coordinates: { lat: 12.9890, lng: 77.6120 },
    radiusM: 1100,
    conflictIntensity: 96,
    incidentsPast12M: 24,
    primaryCropAttractant: 'Water Reservoir & Food Crops',
    seasonality: 'YEAR_ROUND',
    riskScore: 97
  },
  {
    id: 'hrz-03',
    zoneName: 'Zone C (Forest Corridor Path)',
    coordinates: { lat: 12.9520, lng: 77.6350 },
    radiusM: 700,
    conflictIntensity: 45,
    incidentsPast12M: 12,
    primaryCropAttractant: 'Natural Bamboo & Grasses',
    seasonality: 'MONSOON_DISPERSAL',
    riskScore: 48
  },
  {
    id: 'hrz-04',
    zoneName: 'Zone D (Tea Plantation Buffer)',
    coordinates: { lat: 12.9280, lng: 77.5850 },
    radiusM: 600,
    conflictIntensity: 62,
    incidentsPast12M: 17,
    primaryCropAttractant: 'Jackfruit & Banana Groves',
    seasonality: 'DRY_SEASON_MIGRATION',
    riskScore: 65
  }
];

export const SENSOR_DEVICES: SensorDevice[] = [
  {
    id: 'ESP32-PIR-01',
    name: 'ESP32 PIR Sensor Alpha',
    type: 'PIR_MOTION',
    coordinates: { lat: 12.9710, lng: 77.5950 },
    status: 'TRIGGERED',
    batteryPct: 92,
    lastPing: 'Just now',
    recentDetection: {
      confidence: 97,
      elephantCount: 14,
      direction: 'East (→)',
      timestamp: '18:52'
    }
  },
  {
    id: 'ESP32-CAM-02',
    name: 'ESP32-CAM AI Node Beta',
    type: 'AI_CAMERA_TRAP',
    coordinates: { lat: 12.9840, lng: 77.6110 },
    status: 'TRIGGERED',
    batteryPct: 84,
    lastPing: '1 min ago',
    recentDetection: {
      confidence: 99.4,
      elephantCount: 1,
      direction: 'North (↑)',
      timestamp: '18:50'
    }
  }
];

export const INITIAL_EVENTS: ElephantEvent[] = [
  {
    id: 'ev-01',
    timestamp: '18:42',
    herdId: 'E-001',
    herdName: 'E-001',
    sensorType: 'GPS_COLLAR',
    sensorId: 'ESP32-COLLAR-001',
    location: { lat: 12.9716, lng: 77.5946 },
    locationName: 'Zone A',
    riskLevel: 'HIGH',
    eventType: 'GEOFENCE_PROXIMITY_WARNING',
    details: 'Elephant detected near Village A perimeter moving East (→). 450m from border.',
    speedKmH: 3.8,
    headingDeg: 90,
    actionTaken: 'Acoustic siren activated. SMS sent to Village A head.',
    resolved: false
  },
  {
    id: 'ev-02',
    timestamp: '18:35',
    herdId: 'E-002',
    herdName: 'E-002',
    sensorType: 'AI_CAMERA_TRAP',
    sensorId: 'ESP32-CAM-02',
    location: { lat: 12.9850, lng: 77.6120 },
    locationName: 'Zone B',
    riskLevel: 'HIGH',
    eventType: 'VILLAGE_BOUNDARY_BREACH',
    details: 'Elephant movement detected in Zone B moving North (↑) at 5.2 km/h. Near railway track.',
    speedKmH: 5.2,
    headingDeg: 0,
    actionTaken: 'Railway caution signal sent. QRT-Alpha dispatched.',
    resolved: false
  },
  {
    id: 'ev-03',
    timestamp: '18:21',
    herdId: 'E-003',
    herdName: 'E-003',
    sensorType: 'GPS_COLLAR',
    sensorId: 'ESP32-COLLAR-003',
    location: { lat: 12.9520, lng: 77.6350 },
    locationName: 'Zone C',
    riskLevel: 'LOW',
    eventType: 'SAFE_CORRIDOR_TRANSIT',
    details: 'Elephant detected in forest corridor moving West (←) safely in reserve deep canopy.',
    speedKmH: 1.2,
    headingDeg: 270,
    actionTaken: 'Normal passive logging.',
    resolved: true
  },
  {
    id: 'ev-04',
    timestamp: '18:10',
    herdId: 'E-001',
    herdName: 'E-001',
    sensorType: 'PIR_MOTION',
    sensorId: 'ESP32-PIR-01',
    location: { lat: 12.9700, lng: 77.5890 },
    locationName: 'Zone A',
    riskLevel: 'HIGH',
    eventType: 'GEOFENCE_PROXIMITY_WARNING',
    details: 'PIR sensor triggered in Sector 3 buffer moving East towards Zone A.',
    speedKmH: 3.6,
    headingDeg: 90,
    actionTaken: 'Early warning push notification triggered.',
    resolved: true
  },
  {
    id: 'ev-05',
    timestamp: '17:45',
    herdId: 'E-004',
    herdName: 'E-004',
    sensorType: 'SEISMIC_SENSOR',
    sensorId: 'SEIS-04',
    location: { lat: 12.9380, lng: 77.5850 },
    locationName: 'Zone D',
    riskLevel: 'MEDIUM',
    eventType: 'CROP_RAID_ATTEMPT',
    details: 'Bachelor group detected in Tea Estate edge moving South (↓).',
    speedKmH: 2.6,
    headingDeg: 180,
    actionTaken: 'Strobe light deterrent active.',
    resolved: true
  },
  {
    id: 'ev-06',
    timestamp: '17:15',
    herdId: 'E-005',
    herdName: 'E-005',
    sensorType: 'GPS_COLLAR',
    sensorId: 'ESP32-COLLAR-005',
    location: { lat: 13.0120, lng: 77.5620 },
    locationName: 'Zone E',
    riskLevel: 'SAFE',
    eventType: 'SAFE_CORRIDOR_TRANSIT',
    details: 'Gauri herd resting at natural waterhole in northern reserve.',
    speedKmH: 0.8,
    headingDeg: 135,
    actionTaken: 'Telemetry normal.',
    resolved: true
  }
];

export const INITIAL_NOTIFICATIONS: NotificationAlert[] = [
  {
    id: 'notif-01',
    timestamp: '2 minutes ago',
    title: '🔴 HIGH RISK: Elephant detected near Village A',
    message: 'Elephant E-001 detected 450m from Village A moving East (→). Solar siren armed.',
    riskLevel: 'HIGH',
    read: false,
    herdId: 'E-001',
    targetSector: 'Zone A - Village Border',
    dispatchedTo: ['Village A WhatsApp Broadcast', 'Forest Guard Team Alpha'],
    sirenActive: true
  },
  {
    id: 'notif-02',
    timestamp: '8 minutes ago',
    title: '🟠 MEDIUM RISK: Elephant movement detected in Zone B',
    message: 'Elephant E-002 heading North (↑) at 5.2 km/h near railway track. Speed limit lowered.',
    riskLevel: 'MEDIUM',
    read: false,
    herdId: 'E-002',
    targetSector: 'Zone B - Railway Track Km 44',
    dispatchedTo: ['Railway Control Room', 'QRT Mobile Patrol #2'],
    sirenActive: false
  },
  {
    id: 'notif-03',
    timestamp: '15 minutes ago',
    title: '🟢 LOW RISK: Elephant detected in forest corridor',
    message: 'Elephant E-003 transiting safely in deep reserve corridor moving West (←).',
    riskLevel: 'LOW',
    read: true,
    herdId: 'E-003',
    targetSector: 'Zone C - Forest Corridor',
    dispatchedTo: ['Reserve Central Log'],
    sirenActive: false
  }
];

export const PREDICTION_DATA: PredictionVector[] = [
  {
    herdId: 'E-001',
    herdName: 'E-001 (Indira Herd)',
    horizonHours: 2,
    confidencePct: 87,
    predictedPath: [
      { lat: 12.9716, lng: 77.5946 },
      { lat: 12.9725, lng: 77.5980 },
      { lat: 12.9735, lng: 77.6020 }
    ],
    targetedVillages: [
      { villageName: 'Village Border - Zone A', probabilityPct: 87, estimatedTimeHours: 0.3, threatSeverity: 'HIGH' }
    ],
    waterholeAttractionWeight: 0.35,
    cropSmellVectorWeight: 0.55,
    slopeResistanceWeight: 0.10
  }
];

export const DECISION_SUPPORT_ACTIONS: DecisionSupportAction[] = [
  {
    id: 'cdss-01',
    title: 'Deploy QRT Rapid Response Team to Zone A Border',
    category: 'IMMEDIATE_TACTICAL',
    priority: 'URGENT',
    description: 'Intercept Elephant E-001 before entering ripe paddy fields using chili-smoke flares and floodlights.',
    affectedZone: 'Zone A (Village Border)',
    estimatedCostUsd: 80,
    expectedConflictReductionPct: 92,
    recommendedResources: ['Forest Quick Response Patrol #1', 'Chili-Smoke Generators'],
    status: 'PENDING',
    aiConfidence: 94
  },
  {
    id: 'cdss-02',
    title: 'Enforce Railway 30 km/h Slowdown on Track Km 44',
    category: 'RAILWAY_SAFETY',
    priority: 'URGENT',
    description: 'Maintain low speed restriction until Elephant E-002 completes track crossing.',
    affectedZone: 'Zone B Railway Line',
    estimatedCostUsd: 0,
    expectedConflictReductionPct: 99,
    recommendedResources: ['Railway Signaling Automation'],
    status: 'EXECUTED',
    aiConfidence: 98
  }
];

// Weekly Trend Data: Mon to Sun detections
export const WEEKLY_DETECTIONS_DATA = [
  { day: 'Mon', detections: 8, highRiskEvents: 2, divertedSafely: 7 },
  { day: 'Tue', detections: 5, highRiskEvents: 1, divertedSafely: 5 },
  { day: 'Wed', detections: 14, highRiskEvents: 4, divertedSafely: 12 },
  { day: 'Thu', detections: 6, highRiskEvents: 1, divertedSafely: 6 },
  { day: 'Fri', detections: 19, highRiskEvents: 6, divertedSafely: 17 },
  { day: 'Sat', detections: 12, highRiskEvents: 3, divertedSafely: 11 },
  { day: 'Sun', detections: 16, highRiskEvents: 5, divertedSafely: 15 }
];

export const HISTORICAL_TRENDS_DATA = [
  { month: 'Jan', cropRaidIncidents: 12, elephantSightings: 84, deterrentDiverted: 11, humanInjuries: 0 },
  { month: 'Feb', cropRaidIncidents: 9,  elephantSightings: 92, deterrentDiverted: 9,  humanInjuries: 0 },
  { month: 'Mar', cropRaidIncidents: 14, elephantSightings: 110, deterrentDiverted: 13, humanInjuries: 1 },
  { month: 'Apr', cropRaidIncidents: 19, elephantSightings: 145, deterrentDiverted: 17, humanInjuries: 0 },
  { month: 'May', cropRaidIncidents: 26, elephantSightings: 180, deterrentDiverted: 23, humanInjuries: 0 },
  { month: 'Jun', cropRaidIncidents: 31, elephantSightings: 210, deterrentDiverted: 28, humanInjuries: 1 },
  { month: 'Jul', cropRaidIncidents: 24, elephantSightings: 195, deterrentDiverted: 22, humanInjuries: 0 },
  { month: 'Aug', cropRaidIncidents: 22, elephantSightings: 170, deterrentDiverted: 21, humanInjuries: 0 },
  { month: 'Sep', cropRaidIncidents: 39, elephantSightings: 240, deterrentDiverted: 35, humanInjuries: 0 },
  { month: 'Oct (Harvest)', cropRaidIncidents: 68, elephantSightings: 320, deterrentDiverted: 62, humanInjuries: 2 },
  { month: 'Nov (Harvest)', cropRaidIncidents: 74, elephantSightings: 350, deterrentDiverted: 69, humanInjuries: 1 },
  { month: 'Dec', cropRaidIncidents: 35, elephantSightings: 205, deterrentDiverted: 33, humanInjuries: 0 }
];

export const DIURNAL_ACTIVITY_DATA = [
  { hour: '00:00', elephantActivityIndex: 78, humanConflictRisk: 82, deterrentTriggers: 14 },
  { hour: '02:00', elephantActivityIndex: 92, humanConflictRisk: 95, deterrentTriggers: 21 },
  { hour: '04:00', elephantActivityIndex: 85, humanConflictRisk: 88, deterrentTriggers: 18 },
  { hour: '06:00', elephantActivityIndex: 44, humanConflictRisk: 35, deterrentTriggers: 5 },
  { hour: '08:00', elephantActivityIndex: 18, humanConflictRisk: 12, deterrentTriggers: 1 },
  { hour: '10:00', elephantActivityIndex: 12, humanConflictRisk: 8,  deterrentTriggers: 0 },
  { hour: '12:00', elephantActivityIndex: 9,  humanConflictRisk: 5,  deterrentTriggers: 0 },
  { hour: '14:00', elephantActivityIndex: 14, humanConflictRisk: 9,  deterrentTriggers: 1 },
  { hour: '16:00', elephantActivityIndex: 29, humanConflictRisk: 22, deterrentTriggers: 3 },
  { hour: '18:00', elephantActivityIndex: 65, humanConflictRisk: 72, deterrentTriggers: 12 },
  { hour: '20:00', elephantActivityIndex: 88, humanConflictRisk: 91, deterrentTriggers: 19 },
  { hour: '22:00', elephantActivityIndex: 94, humanConflictRisk: 96, deterrentTriggers: 24 }
];

export const CORRIDOR_CONNECTIVITY_METRICS = [
  { name: 'Moyar-Mudumalai Link', connectivity: 78, canopyCoverPct: 68, bottleneckCount: 2, humanDensityPerSqKm: 42, annualElephants: 430 },
  { name: 'Shivalik Ridge Passage', connectivity: 92, canopyCoverPct: 91, bottleneckCount: 0, humanDensityPerSqKm: 8,  annualElephants: 610 },
  { name: 'Bhavani Riparian Belt', connectivity: 61, canopyCoverPct: 49, bottleneckCount: 3, humanDensityPerSqKm: 76, annualElephants: 280 },
  { name: 'Brahmagiri-Tirunelli Link', connectivity: 84, canopyCoverPct: 82, bottleneckCount: 1, humanDensityPerSqKm: 28, annualElephants: 390 },
  { name: 'Kallar Valley Corridor', connectivity: 54, canopyCoverPct: 41, bottleneckCount: 4, humanDensityPerSqKm: 110, annualElephants: 195 }
];
