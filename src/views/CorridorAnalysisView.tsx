import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  Trees, 
  Activity, 
  Layers, 
  TrendingUp, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';
import { CORRIDOR_CONNECTIVITY_METRICS } from '../data/mockData';

export const CorridorAnalysisView: React.FC = () => {
  const { corridors, herds } = useTelemetry();

  const totalLength = corridors.reduce((acc, c) => acc + c.lengthKm, 0);
  const totalElephants = corridors.reduce((acc, c) => acc + c.annualElephantsPassed, 0);
  const avgConnectivity = Math.round(
    corridors.reduce((acc, c) => acc + c.connectivityScore, 0) / corridors.length
  );

  const radarData = [
    { metric: 'Canopy Density', Moyar: 68, Shivalik: 91, Bhavani: 49 },
    { metric: 'Connectivity', Moyar: 78, Shivalik: 92, Bhavani: 61 },
    { metric: 'Safety from Roads', Moyar: 55, Shivalik: 88, Bhavani: 42 },
    { metric: 'Water Access', Moyar: 85, Shivalik: 75, Bhavani: 95 },
    { metric: 'Low Encroachment', Moyar: 76, Shivalik: 92, Bhavani: 62 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Trees className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-100">
                Elephant Corridor Identification & Connectivity Analysis
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Spatial tracking of ecological wildlife migration routes, habitat fragmentation indices, anthropogenic pinch-points, and corridor protection status.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 text-right">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Total Monitored Corridors</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">{corridors.length} Passages ({totalLength} km)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Corridor Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {corridors.map((c) => {
          const statusColor = 
            c.status === 'OPTIMAL' ? 'emerald' :
            c.status === 'VULNERABLE' ? 'amber' : 'rose';

          return (
            <div
              key={c.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-md space-y-4 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border bg-${statusColor}-500/20 text-${statusColor}-300 border-${statusColor}-500/40`}>
                    {c.status}
                  </span>
                  <h3 className="font-bold text-base text-slate-100 mt-2">{c.name}</h3>
                  <p className="text-xs text-slate-400">{c.region}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-slate-100">
                    {c.connectivityScore}%
                  </div>
                  <div className="text-[10px] text-slate-400">Connectivity Index</div>
                </div>
              </div>

              {/* Progress Bar for Connectivity */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Habitat Integrity</span>
                  <span className="font-mono">{c.connectivityScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      c.connectivityScore > 80 ? 'bg-emerald-500' : c.connectivityScore > 65 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${c.connectivityScore}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <div>
                  <div className="text-slate-500 text-[10px]">Length</div>
                  <div className="font-bold text-slate-200 font-mono">{c.lengthKm} km</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">Encroachment</div>
                  <div className="font-bold text-amber-400 font-mono">{c.encroachmentPct}%</div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px]">Elephants/Yr</div>
                  <div className="font-bold text-emerald-400 font-mono">{c.annualElephantsPassed}</div>
                </div>
              </div>

              {/* Bottlenecks List */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 flex items-center justify-between">
                  <span>Identified Bottlenecks ({c.bottlenecksCount}):</span>
                </div>
                {c.bottlenecks.length === 0 ? (
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5 py-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Clean ecological continuity (Zero pinch points)</span>
                  </div>
                ) : (
                  c.bottlenecks.map((bn, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-rose-950/20 border border-rose-500/20 text-xs flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-rose-200">{bn.name}</div>
                        <div className="text-[10px] text-slate-400">Cause: {bn.cause}</div>
                      </div>
                      <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {bn.severity}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Comparison Chart */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-100">Corridor Ecological Health Radar</h3>
              <p className="text-xs text-slate-400">Multi-factor habitat quality comparison across corridors</p>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="metric" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <PolarRadiusAxis stroke="#334155" angle={30} domain={[0, 100]} />
                <Radar name="Shivalik Passage" dataKey="Shivalik" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Radar name="Moyar-Mudumalai" dataKey="Moyar" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                <Radar name="Bhavani Valley" dataKey="Bhavani" stroke="#ef4444" fill="#ef4444" fillOpacity={0.25} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Human Density vs Annual Elephant Volume */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-100">Annual Elephant Migration vs Human Density</h3>
              <p className="text-xs text-slate-400">Tracking corridor usage throughput vs anthropogenic pressure</p>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CORRIDOR_CONNECTIVITY_METRICS}>
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
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
                <Bar dataKey="annualElephants" name="Annual Elephants Passed" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="humanDensityPerSqKm" name="Human Density (/km²)" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
