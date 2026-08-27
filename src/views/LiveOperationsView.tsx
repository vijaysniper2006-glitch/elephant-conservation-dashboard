import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { LiveMap } from '../components/LiveMap';
import { MetricCard } from '../components/MetricCard';
import { AlertBanner } from '../components/AlertBanner';
import { EmergencyDispatchModal } from '../components/EmergencyDispatchModal';
import { 
  Compass, 
  Activity, 
  ShieldAlert, 
  Train, 
  Radio, 
  Zap, 
  Users, 
  Clock, 
  Volume2, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle,
  Battery,
  Navigation
} from 'lucide-react';

export const LiveOperationsView: React.FC = () => {
  const { 
    herds, 
    settlements, 
    railway, 
    sensors, 
    events, 
    selectedHerdId, 
    setSelectedHerdId, 
    triggerAcousticSiren,
    triggerSimulatedBreach,
    updateRailwaySpeedLimit
  } = useTelemetry();

  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [selectedSensorId, setSelectedSensorId] = useState<string | null>(null);

  // Selected herd
  const currentHerd = herds.find(h => h.id === selectedHerdId) || herds[0];
  const criticalCount = herds.filter(h => h.riskLevel === 'CRITICAL').length;
  const highCount = herds.filter(h => h.riskLevel === 'HIGH').length;
  const totalElephants = herds.reduce((acc, h) => acc + h.size, 0);

  return (
    <div className="space-y-4">
      {/* Alert Banner for highest risk */}
      <AlertBanner onOpenDispatch={() => setIsDispatchModalOpen(true)} />

      {/* Top Quick Stats Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
        <MetricCard
          title="Tracked Elephants"
          value={`${totalElephants} total`}
          subValue={`${herds.length} active GPS clans`}
          icon={Compass}
          iconColor="text-emerald-400"
          badge="100% Signal"
          badgeColor="bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
        />

        <MetricCard
          title="Perimeter Risk"
          value={criticalCount > 0 ? `${criticalCount} CRITICAL` : highCount > 0 ? `${highCount} HIGH` : 'NORMAL'}
          subValue="Real-time early warning"
          icon={ShieldAlert}
          iconColor={criticalCount > 0 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}
          badge={criticalCount > 0 ? 'Action Req.' : 'Monitored'}
          badgeColor={criticalCount > 0 ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'}
        />

        <MetricCard
          title="Railway Rail Speed"
          value={`${railway.currentSpeedLimitKmH} km/h`}
          subValue={`Track Km ${railway.kmStart}-${railway.kmEnd} active`}
          icon={Train}
          iconColor={railway.isElephantCrossingActive ? 'text-amber-400' : 'text-blue-400'}
          badge={railway.isElephantCrossingActive ? 'Slowdown ON' : 'Normal 80km/h'}
          badgeColor={railway.isElephantCrossingActive ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-blue-500/20 text-blue-300 border-blue-500/30'}
        />

        <MetricCard
          title="Safe Deterrence Rate"
          value="96.4%"
          subValue="Past 30 days encounters"
          icon={Activity}
          iconColor="text-teal-400"
          change="+3.2% this month"
          changeType="positive"
        />
      </div>

      {/* Main Grid: Live Interactive Map (Left/Center) + Telemetry & Event Feed (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Map Column */}
        <div className="xl:col-span-8 h-[540px] lg:h-[620px] flex flex-col">
          <LiveMap />
        </div>

        {/* Right Operations Feed & Selected Herd Telemetry Inspector */}
        <div className="xl:col-span-4 space-y-4 flex flex-col h-full">
          {/* Selected Herd Live Telemetry Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Telemetry Stream
                </span>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-1.5 mt-0.5">
                  <span>🐘 {currentHerd.name}</span>
                </h3>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  currentHerd.riskLevel === 'CRITICAL'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                    : currentHerd.riskLevel === 'HIGH'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {currentHerd.riskLevel} RISK
              </span>
            </div>

            {/* Live Data Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <div className="text-slate-400 text-[10px]">Collar GPS ID</div>
                <div className="font-mono font-bold text-slate-200">{currentHerd.collarId}</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <Battery className="w-3 h-3" />
                  <span>{currentHerd.batteryPct}% Battery</span>
                </div>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <div className="text-slate-400 text-[10px]">Speed & Direction</div>
                <div className="font-mono font-bold text-amber-300">
                  {currentHerd.speedKmH} km/h ({currentHerd.headingCardinal})
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                  Bearing: {currentHerd.headingDeg}°
                </div>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <div className="text-slate-400 text-[10px]">Coordinates</div>
                <div className="font-mono text-[11px] text-slate-200">
                  {currentHerd.location.lat.toFixed(4)}, {currentHerd.location.lng.toFixed(4)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Elev: {currentHerd.elevationM}m MSL
                </div>
              </div>

              <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <div className="text-slate-400 text-[10px]">Group Structure</div>
                <div className="font-bold text-slate-200">{currentHerd.size} Elephants</div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                  {currentHerd.matriarchName ? `Lead: ${currentHerd.matriarchName}` : currentHerd.type}
                </div>
              </div>
            </div>

            {/* Nearest Village Proximity Box */}
            <div className="mt-3 p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Nearest Human Settlement:</span>
                </span>
                <span className="font-bold text-slate-200">
                  {currentHerd.nearestSettlement.villageName}
                </span>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">
                  Distance: <b className="text-amber-400">{currentHerd.nearestSettlement.distanceKm} km</b>
                </span>
                <span className="text-slate-300">
                  ETA:{' '}
                  <b className="text-rose-400 font-bold">
                    {currentHerd.nearestSettlement.estimatedArrivalMins !== null
                      ? `${currentHerd.nearestSettlement.estimatedArrivalMins} mins`
                      : 'Stationary'}
                  </b>
                </span>
              </div>
            </div>

            {/* Quick Action Button for this herd */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => triggerAcousticSiren(currentHerd.nearestSettlement.villageId)}
                className="flex-1 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Fire Village Siren</span>
              </button>

              <button
                onClick={() => setIsDispatchModalOpen(true)}
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Dispatch QRT</span>
              </button>
            </div>
          </div>

          {/* Live Cloud Events Log Stream */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md flex-1 flex flex-col min-h-[220px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300">
                  Live Telemetry Feeds ({events.length})
                </h4>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Auto-refreshing</span>
            </div>

            <div className="overflow-y-auto space-y-2 max-h-56 pr-1 divide-y divide-slate-800/50">
              {events.slice(0, 5).map((ev) => (
                <div key={ev.id} className="pt-2 text-xs">
                  <div className="flex items-start justify-between gap-1">
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        ev.riskLevel === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : ev.riskLevel === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {ev.eventType.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{ev.timestamp}</span>
                  </div>

                  <p className="text-slate-300 mt-1 text-[11px] leading-relaxed line-clamp-2">
                    {ev.details}
                  </p>

                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono text-emerald-400">📡 {ev.sensorType}</span>
                    <span className="truncate max-w-[140px] text-slate-400">{ev.locationName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Dispatch Modal */}
      <EmergencyDispatchModal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
      />
    </div>
  );
};
