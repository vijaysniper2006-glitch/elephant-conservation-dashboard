import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  Compass, 
  MapPin, 
  Flame, 
  TrendingUp, 
  BrainCircuit, 
  ShieldCheck, 
  FileText, 
  Sliders, 
  Radio, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, herds, events, decisionActions } = useTelemetry();

  const criticalHerds = herds.filter(h => h.riskLevel === 'CRITICAL' || h.riskLevel === 'HIGH').length;
  const pendingActions = decisionActions.filter(a => a.status === 'PENDING').length;

  const navItems = [
    {
      id: 'operations',
      label: 'Live Operations',
      section: 'Real-Time Telemetry',
      icon: Compass,
      badge: criticalHerds > 0 ? `${criticalHerds} Alert` : null,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    },
    {
      id: 'corridors',
      label: 'Corridor Identification',
      section: 'Conservation Intelligence',
      icon: MapPin,
      badge: '3 Corridors',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'high-risk',
      label: 'High-Risk Zones',
      section: 'Conservation Intelligence',
      icon: Flame,
      badge: '4 Hotspots',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'trends',
      label: 'Trend & Outcomes',
      section: 'Conservation Intelligence',
      icon: TrendingUp,
      badge: '+94% Safe',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    },
    {
      id: 'predictions',
      label: 'AI Trajectory Forecast',
      section: 'Predictive Intelligence',
      icon: BrainCircuit,
      badge: '6h / 24h AI',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    {
      id: 'decision-support',
      label: 'Conservation DSS',
      section: 'Decision Support',
      icon: ShieldCheck,
      badge: pendingActions > 0 ? `${pendingActions} Action` : 'Optimal',
      badgeColor: pendingActions > 0 ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'events',
      label: 'Event History & Log',
      section: 'Audit & Records',
      icon: FileText,
      badge: `${events.length} logs`,
      badgeColor: 'bg-slate-700/50 text-slate-300 border-slate-600'
    }
  ];

  return (
    <aside className="w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between shrink-0 hidden lg:flex">
      {/* Navigation Links */}
      <div className="p-3 space-y-6 overflow-y-auto">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 mb-2">
            Operations & Feeds
          </div>
          <div className="space-y-1">
            {navItems.slice(0, 1).map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950/50'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 mb-2">
            Analytics & Long-Term Intelligence
          </div>
          <div className="space-y-1">
            {navItems.slice(1, 5).map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950/50'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 mb-2">
            Decisions & Audit Log
          </div>
          <div className="space-y-1">
            {navItems.slice(5).map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950/50'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Health Status Panel */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60">
        <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 text-xs">
          <div className="flex items-center justify-between text-slate-300 font-semibold mb-1">
            <span className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Sensors Array</span>
            </span>
            <span className="text-emerald-400 font-mono">100% ONLINE</span>
          </div>
          <div className="space-y-1 text-[11px] text-slate-400">
            <div className="flex justify-between">
              <span>Collar GPS Satellites:</span>
              <span className="text-slate-200 font-mono">12 Fixed</span>
            </div>
            <div className="flex justify-between">
              <span>AI Camera Traps:</span>
              <span className="text-slate-200 font-mono">8 Active</span>
            </div>
            <div className="flex justify-between">
              <span>Bio-Sirens Armed:</span>
              <span className="text-slate-200 font-mono">18 Units</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
