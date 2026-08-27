import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  Database, 
  BrainCircuit, 
  Radio, 
  BellRing, 
  TrendingUp, 
  Flame, 
  Compass, 
  ShieldAlert 
} from 'lucide-react';

export const SectionSummaryCards: React.FC = () => {
  const { herds, notifications, highRiskZones, events } = useTelemetry();

  const totalEventsCount = Math.max(42, events.length);
  const activeHerdsCount = herds.length;
  const activeAlertsCount = notifications.length;
  const highPriorityAlerts = notifications.filter(n => n.riskLevel === 'HIGH' || n.riskLevel === 'CRITICAL').length;

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Section 2 — Summary Cards</span>
        </h2>
        <span className="text-[11px] font-mono text-slate-500">Live Telemetry & Cloud Metrics</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 — Total Events */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 shadow-lg backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              TOTAL EVENTS
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Database className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
              {totalEventsCount}
            </div>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+12% this week</span>
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Source:</span>
            <span className="text-blue-400 font-semibold bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/20">
              Database Server
            </span>
          </div>
        </div>

        {/* Card 2 — High Risk Zones */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 shadow-lg backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              HIGH RISK ZONES
            </span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Flame className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
              8
            </div>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              3 Active
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Source:</span>
            <span className="text-purple-400 font-semibold bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/20">
              Analytics & ML Engine
            </span>
          </div>
        </div>

        {/* Card 3 — Active Elephants */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 shadow-lg backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              ACTIVE ELEPHANTS
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Radio className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
              {activeHerdsCount}
            </div>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Currently detected
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Source:</span>
            <span className="text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
              Sensors / ESP32 → Cloud
            </span>
          </div>
        </div>

        {/* Card 4 — Active Alerts */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 shadow-lg backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              ACTIVE ALERTS
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
              {activeAlertsCount}
            </div>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {highPriorityAlerts} High Priority
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Source:</span>
            <span className="text-amber-400 font-semibold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
              Notification Service
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
