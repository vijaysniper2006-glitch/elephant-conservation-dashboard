import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  Flame, 
  ShieldAlert, 
  MapPin, 
  Wheat, 
  Calendar, 
  AlertTriangle, 
  Users, 
  Sliders,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';

export const HighRiskZoneView: React.FC = () => {
  const { highRiskZones, settlements } = useTelemetry();
  const [selectedSeason, setSelectedSeason] = useState<string>('ALL');

  const filteredZones = selectedSeason === 'ALL' 
    ? highRiskZones 
    : highRiskZones.filter(z => z.seasonality === selectedSeason);

  // Settlement ranking data sorted by vulnerability
  const sortedVillages = [...settlements].sort((a, b) => b.vulnerabilityIndex - a.vulnerabilityIndex);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <Flame className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-100">
                High-Risk Zone Mapping & Vulnerability Index
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Spatial conflict hotspot density modeling, agricultural crop raiding funnels, railway collision vectors, and community vulnerability rankings.
            </p>
          </div>

          {/* Season Filter Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Season:</span>
            </span>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Seasons (Full Year)</option>
              <option value="HARVEST_AUTUMN">Autumn Harvest (Paddy & Cane)</option>
              <option value="DRY_SEASON_MIGRATION">Dry Season Water Scarcity</option>
              <option value="MONSOON_DISPERSAL">Monsoon Dispersal</option>
              <option value="YEAR_ROUND">Year-Round Hazard (Railway/Highway)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hotspots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredZones.map((zone) => {
          const isCritical = zone.riskScore > 90;
          return (
            <div
              key={zone.id}
              className={`p-5 rounded-2xl border backdrop-blur-md shadow-lg space-y-3 transition-all ${
                isCritical
                  ? 'bg-rose-950/20 border-rose-500/40 hover:border-rose-500/80 shadow-rose-950/30'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {zone.seasonality.replace(/_/g, ' ')}
                </span>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-rose-400">{zone.riskScore}</span>
                  <span className="text-[10px] text-slate-500">/100 Risk</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-100">{zone.zoneName}</h3>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                  <Wheat className="w-3 h-3 text-amber-400" />
                  <span>Attractant: {zone.primaryCropAttractant}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px]">Conflict Intensity</span>
                  <div className="font-bold text-rose-300 font-mono">{zone.conflictIntensity}%</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">12M Incidents</span>
                  <div className="font-bold text-slate-200 font-mono">{zone.incidentsPast12M} events</div>
                </div>
              </div>

              <div className="pt-1 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Buffer Radius: <b>{zone.radiusM}m</b></span>
                <span className="text-emerald-400 font-medium">Sensors Active</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Community Vulnerability Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Village Vulnerability Ranking Chart */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-100">Settlement Vulnerability Index Ranking</h3>
              <p className="text-xs text-slate-400">Determined by crop buffer proximity, deterrent density, and historical incursions</p>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedVillages}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
              >
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis dataKey="name" type="category" stroke="#64748b" tick={{ fill: '#cbd5e1', fontSize: 11 }} width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar
                  dataKey="vulnerabilityIndex"
                  name="Vulnerability Index (/100)"
                  radius={[0, 6, 6, 0]}
                  fill="#f97316"
                >
                  {sortedVillages.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.vulnerabilityIndex > 80 ? '#ef4444' : entry.vulnerabilityIndex > 60 ? '#f97316' : '#10b981'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Community Defense Readiness Matrix */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <h3 className="font-bold text-sm text-slate-100">Community Defensive Readiness</h3>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">ALL SITES TELEMETRIC</span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-64 pr-1">
              {settlements.map((s) => (
                <div
                  key={s.id}
                  className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{s.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Pop: {s.population}</span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>🔊 {s.activeDeterrents.acousticSirens} Sirens</span>
                    <span>⚡ {s.activeDeterrents.solarStrobes} Strobes</span>
                    <span>👮 {s.forestGuardsOnDuty} Guards</span>
                    <span>🐝 {s.activeDeterrents.beehiveFences ? 'Bee-Fence' : 'None'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-300">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <span>Solar Acoustic deterrent coverage is active across 100% of critical zones.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
