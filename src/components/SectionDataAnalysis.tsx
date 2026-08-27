import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  TrendingUp, 
  MapPin, 
  Flame, 
  BrainCircuit, 
  Sparkles, 
  Trees, 
  BarChart3, 
  FileText, 
  Search, 
  Filter, 
  Download, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Clock,
  Compass
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { WEEKLY_DETECTIONS_DATA } from '../data/mockData';

export const SectionDataAnalysis: React.FC = () => {
  const { corridors, highRiskZones, predictions, events } = useTelemetry();

  // Filters for Event History Table
  const [filterDate, setFilterDate] = useState('Today');
  const [filterRisk, setFilterRisk] = useState('All');
  const [filterZone, setFilterZone] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');

  const currentPred = predictions[0];

  // Filtered Events
  const filteredEvents = events.filter((ev) => {
    const matchesRisk = filterRisk === 'All' || ev.riskLevel === filterRisk;
    const matchesZone = filterZone === 'All' || ev.locationName.includes(filterZone);
    const matchesSearch = 
      ev.herdName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      ev.locationName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      ev.details.toLowerCase().includes(searchKeyword.toLowerCase());

    return matchesRisk && matchesZone && matchesSearch;
  });

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <BrainCircuit className="w-4 h-4" />
          </span>
          <h2 className="text-base font-extrabold text-slate-100 uppercase tracking-tight">
            Section 5 — Data Analysis & Conservation Intelligence
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Four core predictive intelligence modules + interactive event history audit log.
        </p>
      </div>

      {/* 4 Core Analysis Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* A. Elephant Corridor Identification */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Trees className="w-4 h-4" />
              </span>
              <h3 className="font-extrabold text-sm text-slate-100 uppercase tracking-wide">
                A. Elephant Corridor Identification
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              82% Connectivity
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Visual route mapping showing frequently used elephant migratory paths identified from historical GPS & sensor telemetry.
          </p>

          {/* Exact ASCII / Graphical Flow Diagram matching student UML requirement */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-3 font-mono text-xs">
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              ELEPHANT CORRIDOR ROUTE
            </div>

            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 flex flex-col items-center justify-center space-y-2 text-center">
              <div className="flex items-center justify-between w-full text-slate-200 font-bold px-4">
                <span className="px-3 py-1 bg-emerald-950/80 rounded-md border border-emerald-500/40 text-emerald-300">
                  🌲 Forest A
                </span>
                <span className="text-emerald-400 font-bold tracking-widest animate-pulse">
                  ─────────→
                </span>
                <span className="px-3 py-1 bg-emerald-950/80 rounded-md border border-emerald-500/40 text-emerald-300">
                  🌲 Forest B
                </span>
              </div>

              <div className="text-sm tracking-widest text-amber-300">
                🐘 🐘 🐘 (Herd Migrating Path)
              </div>

              <div className="text-rose-400 font-bold flex flex-col items-center">
                <span>↓</span>
                <span className="px-2.5 py-0.5 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[11px]">
                  🏡 Village Area (Zone A Risk)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
              <div>• Corridor Length: <b>14.2 km</b></div>
              <div>• Encroachment: <b className="text-amber-400">18%</b></div>
              <div>• Annual Transit: <b>430 Elephants</b></div>
              <div>• Bottlenecks: <b className="text-rose-400">1 Highway Crossing</b></div>
            </div>
          </div>
        </div>

        {/* B. High-Risk Zone Mapping */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                <Flame className="w-4 h-4" />
              </span>
              <h3 className="font-extrabold text-sm text-slate-100 uppercase tracking-wide">
                B. High-Risk Zone Mapping
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Hotspot Matrix
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Spatial conflict intensity classification based on elephant encounter frequency and village boundary proximity.
          </p>

          {/* Zone Ratings List */}
          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between p-2.5 bg-rose-950/30 rounded-xl border border-rose-500/40">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100">Zone A (Village Border):</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base tracking-widest">🔴🔴🔴</span>
                <span className="font-bold text-rose-400">92% Risk</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-rose-950/20 rounded-xl border border-rose-500/30">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100">Zone B (Railway Line):</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base tracking-widest">🔴🔴</span>
                <span className="font-bold text-rose-400">97% Risk</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-amber-950/20 rounded-xl border border-amber-500/30">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100">Zone C (Forest Corridor):</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base tracking-widest">🟠</span>
                <span className="font-bold text-amber-400">48% Risk</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-emerald-950/20 rounded-xl border border-emerald-500/30">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100">Zone D (Reserve Outpost):</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base tracking-widest">🟢</span>
                <span className="font-bold text-emerald-400">25% Safe</span>
              </div>
            </div>
          </div>

          {/* Risk Formula Box */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="text-slate-400 font-bold block mb-1">📐 Dynamic Risk Calculation Formula:</span>
            <div className="text-purple-300 font-bold">
              Risk Score = Elephant Frequency + Distance from Village + Movement Direction + Time
            </div>
          </div>
        </div>

        {/* C. Trend Analysis */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h3 className="font-extrabold text-sm text-slate-100 uppercase tracking-wide">
                C. Trend Analysis (Elephant Detections per Day)
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Mon - Sun
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Daily frequency of elephant movement detections vs high-risk incursion events across the current tracking week.
          </p>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DETECTIONS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="detections" name="Daily Detections" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="highRiskEvents" name="High Risk Incursions" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* D. Prediction (AI/ML Component) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="font-extrabold text-sm text-slate-100 uppercase tracking-wide">
                  D. Prediction (AI / ML Engine)
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 animate-pulse">
                Next 2 Hours
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Predictive ML model forecasting movement trajectory cones and encounter probability for conservation decision support.
            </p>

            {/* Exact Prediction Box from user specification */}
            <div className="mt-3 p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center pb-2 border-b border-purple-500/20">
                <span className="text-slate-400 font-sans font-bold">Horizon:</span>
                <span className="text-purple-300 font-bold font-mono">Next 2 Hours</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-purple-500/20">
                <span className="text-slate-400 font-sans font-bold">Elephant Activity:</span>
                <span className="text-rose-400 font-extrabold font-mono text-sm">HIGH</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-purple-500/20">
                <span className="text-slate-400 font-sans font-bold">Predicted Zone:</span>
                <span className="text-amber-300 font-bold font-mono">Village Border - Zone A</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-sans font-bold">Risk Probability:</span>
                <span className="text-2xl font-black text-rose-400 font-mono">87%</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <span>AI Advisory: Pre-emptively arm solar acoustic siren at Zone A border.</span>
          </div>
        </div>
      </div>

      {/* 7. Event History Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                <FileText className="w-4 h-4" />
              </span>
              <h3 className="font-extrabold text-sm text-slate-100 uppercase tracking-wide">
                Event History Table
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive chronological log of elephant encounters with interactive filters.
            </p>
          </div>

          {/* Interactive Filters matching user request */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-2.5 py-1 text-slate-200 focus:outline-none focus:border-emerald-500 text-xs w-32 sm:w-40"
              />
            </div>

            {/* Date Filter */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1">
              <span className="text-slate-400 font-semibold">Date:</span>
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none text-xs"
              >
                <option value="Today">Today ▼</option>
                <option value="Yesterday">Yesterday</option>
                <option value="This Week">This Week</option>
              </select>
            </div>

            {/* Risk Filter */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1">
              <span className="text-slate-400 font-semibold">Risk:</span>
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none text-xs"
              >
                <option value="All">All ▼</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
                <option value="SAFE">SAFE</option>
              </select>
            </div>

            {/* Zone Filter */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1">
              <span className="text-slate-400 font-semibold">Zone:</span>
              <select
                value={filterZone}
                onChange={(e) => setFilterZone(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none text-xs"
              >
                <option value="All">All ▼</option>
                <option value="Zone A">Zone A</option>
                <option value="Zone B">Zone B</option>
                <option value="Zone C">Zone C</option>
                <option value="Zone D">Zone D</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Content matching exact requested columns */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3">Time</th>
                <th className="p-3">Elephant</th>
                <th className="p-3">Location</th>
                <th className="p-3 text-center">Direction</th>
                <th className="p-3">Risk</th>
                <th className="p-3 font-sans">Action / Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredEvents.map((ev) => {
                const isHigh = ev.riskLevel === 'HIGH' || ev.riskLevel === 'CRITICAL';
                const isMed = ev.riskLevel === 'MEDIUM';

                return (
                  <tr key={ev.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-slate-400 whitespace-nowrap">{ev.timestamp}</td>
                    <td className="p-3 font-bold text-emerald-400 whitespace-nowrap">🐘 {ev.herdId}</td>
                    <td className="p-3 font-semibold text-slate-200">{ev.locationName}</td>
                    <td className="p-3 text-center font-bold text-base text-amber-400">
                      {ev.headingDeg >= 45 && ev.headingDeg < 135 ? '→' :
                       ev.headingDeg >= 135 && ev.headingDeg < 225 ? '↓' :
                       ev.headingDeg >= 225 && ev.headingDeg < 315 ? '←' : '↑'}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded font-extrabold text-[10px] border ${
                          isHigh
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : isMed
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        }`}
                      >
                        {ev.riskLevel}
                      </span>
                    </td>
                    <td className="p-3 font-sans text-slate-300 text-xs">
                      {ev.details}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
