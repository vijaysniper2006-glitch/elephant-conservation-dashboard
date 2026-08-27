import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { AlertOctagon, Zap, ShieldAlert, ArrowRight, X, Volume2 } from 'lucide-react';

interface AlertBannerProps {
  onOpenDispatch: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ onOpenDispatch }) => {
  const { herds, notifications, triggerAcousticSiren } = useTelemetry();
  const [dismissed, setDismissed] = useState(false);

  // Find most critical herd
  const criticalHerd = herds.find(h => h.riskLevel === 'CRITICAL') || herds.find(h => h.riskLevel === 'HIGH');

  if (!criticalHerd || dismissed) return null;

  const isCritical = criticalHerd.riskLevel === 'CRITICAL';

  return (
    <div
      className={`w-full py-2.5 px-4 lg:px-6 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b shadow-lg ${
        isCritical
          ? 'bg-rose-950/80 border-rose-600/60 text-rose-100 shadow-rose-950/40'
          : 'bg-amber-950/80 border-amber-600/60 text-amber-100 shadow-amber-950/40'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-xl flex items-center justify-center shrink-0 ${
            isCritical ? 'bg-rose-600 text-white animate-pulse' : 'bg-amber-500 text-slate-950'
          }`}
        >
          <ShieldAlert className="w-5 h-5" />
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                isCritical ? 'bg-rose-500 text-white animate-pulse' : 'bg-amber-500 text-slate-950'
              }`}
            >
              {criticalHerd.riskLevel} ALERT
            </span>
            <h3 className="font-bold text-xs sm:text-sm">
              {criticalHerd.name} approaching {criticalHerd.nearestSettlement.villageName}
            </h3>
          </div>
          <p className="text-xs opacity-90 mt-0.5">
            Distance: <span className="font-mono font-bold">{criticalHerd.nearestSettlement.distanceKm} km</span> | 
            Speed: <span className="font-mono">{criticalHerd.speedKmH} km/h</span> ({criticalHerd.headingCardinal}) | 
            ETA to Perimeter: <span className="font-mono font-bold text-amber-300">
              {criticalHerd.nearestSettlement.estimatedArrivalMins !== null ? `${criticalHerd.nearestSettlement.estimatedArrivalMins} mins` : 'Immediate'}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        <button
          onClick={() => triggerAcousticSiren(criticalHerd.nearestSettlement.villageId)}
          className="px-3 py-1.5 bg-slate-900/80 hover:bg-slate-900 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Fire Solar Siren</span>
        </button>

        <button
          onClick={onOpenDispatch}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
            isCritical
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/50'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-900/50'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Dispatch QRT & Alert</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setDismissed(true)}
          className="p-1.5 text-slate-400 hover:text-slate-200 rounded-md"
          title="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
