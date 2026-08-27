import React from 'react';
import { 
  TrendingUp, 
  Moon, 
  Sun, 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  BarChart3, 
  Activity 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { HISTORICAL_TRENDS_DATA, DIURNAL_ACTIVITY_DATA } from '../data/mockData';

export const TrendAnalysisView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <TrendingUp className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-100">
                Temporal Trend Analysis & Long-Term Conservation Outcomes
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Multi-year statistical evaluation of crop-raiding seasonality, 24-hour diurnal incursion curves, early warning deterrent efficacy, and coexistence outcomes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-emerald-950/40 border border-emerald-500/40 px-4 py-2 rounded-xl text-right">
              <div className="text-[10px] text-emerald-300 uppercase font-mono">Deterrence Success Rate</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">94.8% Safe Repulsions</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-md">
          <div className="text-xs font-semibold text-slate-400 uppercase">Crop Raids Prevented</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-2">268 Incidents</div>
          <div className="text-xs text-slate-400 mt-1">Saved estimated $142,000 in farmer crops</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-md">
          <div className="text-xs font-semibold text-slate-400 uppercase">Elephant Mortality</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-2">0 Fatalities</div>
          <div className="text-xs text-slate-400 mt-1">Zero train hits or retaliatory poisonings</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-md">
          <div className="text-xs font-semibold text-slate-400 uppercase">Avg Response Time</div>
          <div className="text-2xl font-bold font-mono text-cyan-400 mt-2">4.2 Minutes</div>
          <div className="text-xs text-slate-400 mt-1">From sensor trigger to guard deployment</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-md">
          <div className="text-xs font-semibold text-slate-400 uppercase">Community Trust Score</div>
          <div className="text-2xl font-bold font-mono text-amber-300 mt-2">91 / 100</div>
          <div className="text-xs text-slate-400 mt-1">Based on 8 village panchayat feedback surveys</div>
        </div>
      </div>

      {/* Chart 1: Monthly Seasonal Incursion vs Deterrent Diverted */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Annual Seasonal Trends: Crop Raids vs Successful Deterrence</span>
            </h3>
            <p className="text-xs text-slate-400">
              Notice high surge during Autumn Harvest (October - November) successfully mitigated by automated bio-sirens.
            </p>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={HISTORICAL_TRENDS_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSightings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRaids" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDiverted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="elephantSightings" name="Elephant Telemetry Sightings" stroke="#10b981" fillOpacity={1} fill="url(#colorSightings)" />
              <Area type="monotone" dataKey="cropRaidIncidents" name="Attempted Crop Raids" stroke="#ef4444" fillOpacity={1} fill="url(#colorRaids)" />
              <Area type="monotone" dataKey="deterrentDiverted" name="Safely Diverted by Deterrents" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDiverted)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: 24-Hour Diurnal Nocturnal Activity Curve */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Moon className="w-4 h-4 text-purple-400" />
              <span>24-Hour Diurnal Activity Curve (Nocturnal Conflict Dynamics)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Elephants shift to village perimeters under darkness (20:00 - 04:00), triggering automated thermal & seismic tripwires.
            </p>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={DIURNAL_ACTIVITY_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="hour" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="elephantActivityIndex" name="Elephant Nocturnal Movement Index" stroke="#a855f7" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="humanConflictRisk" name="Human Conflict Vulnerability" stroke="#f97316" strokeWidth={2} strokeDasharray="4 4" />
              <Line type="monotone" dataKey="deterrentTriggers" name="Automated Siren Triggers" stroke="#06b6d4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
