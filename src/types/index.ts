export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE';

export type SensorType = 'GPS_COLLAR' | 'PIR_MOTION' | 'AI_CAMERA_TRAP' | 'ACOUSTIC_ARRAY' | 'SEISMIC_SENSOR' | 'THERMAL_DRONE';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface BreadcrumbPoint extends Coordinates {
  timestamp: string;
  speedKmH: number;
  headingDeg: number;
}

export interface ElephantHerd {
  id: string;
  name: string;
  type: 'HERD' | 'LONE_BULL' | 'BACHELOR_GROUP' | 'MATRIARCH_LED';
  size: number;
  matriarchName?: string;
  collarId: string;
  batteryPct: number;
  collarSignalStrength: number; // 0-100%
  location: Coordinates;
  elevationM: number;
  headingDeg: number; // 0 - 360 degrees
  headingCardinal: string; // e.g. "NE", "SSW"
  speedKmH: number;
  status: 'MOVING' | 'FORAGING' | 'RESTING' | 'CHARGING';
  riskLevel: RiskLevel;
  nearestSettlement: {
    villageId: string;
    villageName: string;
    distanceKm: number;
    estimatedArrivalMins: number | null;
  };
  inCorridorId: string | null;
  inRailwayHazardZone: boolean;
  historyTrail: BreadcrumbPoint[];
  lastUpdate: string;
}

export interface SettlementGeofence {
  id: string;
  name: string;
  type: 'VILLAGE' | 'TEA_ESTATE' | 'PADDY_FIELD' | 'FOREST_STATION' | 'PRIMARY_SCHOOL';
  population: number;
  coordinates: Coordinates;
  radiusMeters: number;
  vulnerabilityIndex: number; // 0 - 100
  activeDeterrents: {
    acousticSirens: number;
    solarStrobes: number;
    beehiveFences: boolean;
    chiliRopeMeters: number;
  };
  forestGuardsOnDuty: number;
  currentRiskLevel: RiskLevel;
  lastIncidentDate?: string;
}

export interface RailwayTrackSegment {
  id: string;
  name: string;
  kmStart: number;
  kmEnd: number;
  path: [number, number][];
  speedLimitNormalKmH: number;
  currentSpeedLimitKmH: number;
  isElephantCrossingActive: boolean;
  activeAcousticFences: number;
  lastWarningBroadcast: string | null;
}

export interface WildlifeCorridor {
  id: string;
  name: string;
  region: string;
  lengthKm: number;
  avgWidthM: number;
  path: [number, number][];
  connectivityScore: number; // 0 - 100
  encroachmentPct: number; // 0 - 100
  status: 'OPTIMAL' | 'VULNERABLE' | 'DEGRADED' | 'SEVERELY_BLOCKED';
  bottlenecksCount: number;
  bottlenecks: {
    name: string;
    coordinates: Coordinates;
    cause: 'Highway' | 'Tea Plantation' | 'Human Settlement' | 'Fencing' | 'Railway';
    severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  }[];
  annualElephantsPassed: number;
  ecologicalImportance: 'KEYSTONE' | 'CRITICAL' | 'SECONDARY';
}

export interface HighRiskZone {
  id: string;
  zoneName: string;
  coordinates: Coordinates;
  radiusM: number;
  conflictIntensity: number; // 1-100
  incidentsPast12M: number;
  primaryCropAttractant: string;
  seasonality: 'HARVEST_AUTUMN' | 'MONSOON_DISPERSAL' | 'DRY_SEASON_MIGRATION' | 'YEAR_ROUND';
  riskScore: number;
}

export interface SensorDevice {
  id: string;
  name: string;
  type: SensorType;
  coordinates: Coordinates;
  status: 'ONLINE' | 'STANDBY' | 'TRIGGERED' | 'MAINTENANCE_REQUIRED';
  batteryPct: number;
  lastPing: string;
  recentDetection?: {
    confidence: number;
    elephantCount: number;
    direction: string;
    timestamp: string;
  };
}

export interface ElephantEvent {
  id: string;
  timestamp: string;
  herdId: string;
  herdName: string;
  sensorType: SensorType;
  sensorId: string;
  location: Coordinates;
  locationName: string;
  riskLevel: RiskLevel;
  eventType: 
    | 'GEOFENCE_PROXIMITY_WARNING'
    | 'VILLAGE_BOUNDARY_BREACH'
    | 'RAILWAY_CROSSING_DETECTED'
    | 'CORRIDOR_BOTTLENECK_CONGESTION'
    | 'CROP_RAID_ATTEMPT'
    | 'ACOUSTIC_DETERRENT_TRIGGERED'
    | 'SAFE_CORRIDOR_TRANSIT';
  details: string;
  speedKmH: number;
  headingDeg: number;
  actionTaken?: string;
  resolved: boolean;
  snapshotUrl?: string;
}

export interface NotificationAlert {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  riskLevel: RiskLevel;
  read: boolean;
  herdId: string;
  targetSector: string;
  dispatchedTo: string[]; // e.g. ["Forest Guard Unit 3", "Village Head WhatsApp", "Railway Master"]
  sirenActive: boolean;
}

export interface PredictionVector {
  herdId: string;
  herdName: string;
  horizonHours: number;
  predictedPath: Coordinates[];
  confidencePct: number;
  targetedVillages: {
    villageName: string;
    probabilityPct: number;
    estimatedTimeHours: number;
    threatSeverity: RiskLevel;
  }[];
  waterholeAttractionWeight: number;
  cropSmellVectorWeight: number;
  slopeResistanceWeight: number;
}

export interface DecisionSupportAction {
  id: string;
  title: string;
  category: 'IMMEDIATE_TACTICAL' | 'RAILWAY_SAFETY' | 'COMMUNITY_ALERT' | 'LONG_TERM_CORRIDOR_REPAIR';
  priority: 'URGENT' | 'HIGH' | 'MEDIUM';
  description: string;
  affectedZone: string;
  estimatedCostUsd: number;
  expectedConflictReductionPct: number;
  recommendedResources: string[];
  status: 'PENDING' | 'EXECUTED' | 'SCHEDULED';
  aiConfidence: number;
}
