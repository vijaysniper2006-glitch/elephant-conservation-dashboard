import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Send, 
  Volume2, 
  Zap, 
  BellRing,
  Radio
} from 'lucide-react';
import { EmergencyDispatchModal } from './EmergencyDispatchModal';

export const SectionRealtimeAlerts: React.FC = () => {
  const { notifications, triggerAcousticSiren, herds } = useTelemetry();
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);

  return (
    <section className="space-y-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <h2 className="text-base font-extrabold text-slate-100 uppercase tracking-tight">
              Section 4 — Real-Time Alerts
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated early warning push stream generated from edge sensors, geofences, and AI camera traps.
          </p>
        </div>

        <button
          onClick={() => setIsDispatchModalOpen(true)}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-950/50 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Zap className="w-4 h-4" />
          <span>Deploy Emergency Response Unit</span>
        </button>
      </div>

      {/* Alerts Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notifications.map((notif) => {
          const isHigh = notif.riskLevel === 'HIGH' || notif.riskLevel === 'CRITICAL';
          const isMedium = notif.riskLevel === 'MEDIUM';

          return (
            <div
              key={notif.id}
              className={`rounded-2xl p-4.5 border backdrop-blur-md shadow-lg transition-all space-y-3 ${
                isHigh
                  ? 'bg-rose-950/30 border-rose-500/40 shadow-rose-950/20 ring-1 ring-rose-500/30'
                  : isMedium
                  ? 'bg-amber-950/25 border-amber-500/40 shadow-amber-950/20'
                  : 'bg-emerald-950/20 border-emerald-500/30 shadow-emerald-950/10'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-extrabold px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${
                      isHigh
                        ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                        : isMedium
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    }`}
                  >
                    <span>{isHigh ? '🔴 HIGH RISK' : isMedium ? '🟠 MEDIUM RISK' : '🟢 LOW RISK'}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{notif.timestamp}</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-100">{notif.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{notif.message}</p>
              </div>

              {/* Target sector & Dispatched list */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <span className="text-slate-400 font-mono">
                  Target: <b className="text-slate-200">{notif.targetSector}</b>
                </span>

                <div className="flex items-center gap-1">
                  {notif.sirenActive && (
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                      <Volume2 className="w-3 h-3 text-rose-400 animate-pulse" />
                      <span>Siren Active</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <EmergencyDispatchModal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
      />
    </section>
  );
};
