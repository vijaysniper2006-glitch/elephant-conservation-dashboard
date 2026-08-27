import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  BrainCircuit, 
  Sparkles, 
  Target, 
  Clock, 
  Compass, 
  AlertTriangle, 
  Waves, 
  Mountain, 
  Wheat,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';

export const PredictionView: React.FC = () => {
  const { predictions, herds } = useTelemetry();
  const [selectedHorizon, setSelectedHorizon] = useState<number>(6);
  const [selectedPredHerdId, setSelectedPredHerdId] = useState<string>('herd-02');

  const currentPred = predictions.find(p => p.herdId === selectedPredHerdId) || predictions[0];
  const trackedHerd = herds.find(h => h.id === currentPred.herdId);

  const factorWeights = [
    { factor: 'Ripe Crop Smell', weight: Math.round(currentPred.cropSmellVectorWeight * 100) },
    { factor: 'Waterhole Attraction', weight: Math.round(currentPred.waterholeAttractionWeight * 100) },
    { factor: 'Topographic Slope', weight: Math.round((1 - currentPred.slopeResistanceWeight) * 100) },
    { factor: 'Historical Corridor Memory', weight: 85 },
    { factor: 'Human Disturbance Avoidance', weight: 75 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <BrainCircuit className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-100">
                AI Predictive Trajectory & Encounter Risk Engine
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Machine learning movement forecast projecting elephant transit cones across 6h, 12h, and 24h horizons based on environmental attractants and terrain vectors.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Forecast Horizon:</span>
            {[6, 12, 24].map((hr) => (
              <button
                key={hr}
                onClick={() => setSelectedHorizon(hr)}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-xl transition-all ${
                  selectedHorizon === hr
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                +{hr} Hours
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Target Herd Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {predictions.map((p) => {
          const isSelected = selectedPredHerdId === p.herdId;
          return (
            <button
              key={p.herdId}
              onClick={() => setSelectedPredHerdId(p.herdId)}
              className={`p-3 rounded-2xl border text-left min-w-[200px] transition-all ${
                isSelected
                  ? 'bg-purple-950/40 border-purple-500 text-slate-100 shadow-md ring-2 ring-purple-500/20'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800/80'
              }`}
            >
              <div className="font-bold text-xs text-slate-200">{p.herdName}</div>
              <div className="flex items-center justify-between mt-2 text-[11px] font-mono">
                <span className="text-purple-300 font-bold">{p.confidencePct}% Confidence</span>
                <span className="text-slate-500">{p.horizonHours}h Horizon</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Forecast Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Targeted Settlement Probability Matrix */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-purple-400" />
                <span>Projected Settlement Encounter Probabilities</span>
              </h3>
              <p className="text-xs text-slate-400">Next {selectedHorizon} hours risk projection</p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              AI MODEL v4.8
            </span>
          </div>

          <div className="space-y-3">
            {currentPred.targetedVillages.map((tv, idx) => {
              const isHigh = tv.probabilityPct > 70;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    isHigh
                      ? 'bg-rose-950/20 border-rose-500/40'
                      : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="font-bold text-sm text-slate-100">{tv.villageName}</div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                        tv.threatSeverity === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                          : tv.threatSeverity === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}>
                        {tv.threatSeverity}
                      </span>
                      <span className="font-bold font-mono text-base text-purple-400">
                        {tv.probabilityPct}%
                      </span>
                    </div>
                  </div>

                  {/* Probability Bar */}
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full ${
                        tv.probabilityPct > 75 ? 'bg-rose-500' : tv.probabilityPct > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${tv.probabilityPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Estimated Encounter Time:</span>
                    <span className="text-amber-300 font-bold">~ {tv.estimatedTimeHours} hours</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Early Warning Advisory Box */}
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Predictive Early Warning Advisory</span>
            </div>
            <p className="leading-relaxed">
              Based on historical nocturnal movement velocity (5.2 km/h) and moisture concentration in western paddy fields, high probability of perimeter fence encounter within 25 minutes. Pre-emptive acoustic deterrence recommended.
            </p>
          </div>
        </div>

        {/* Right Column: Environmental Vector Weights */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-100">Environmental Vector Weights</h3>
            <p className="text-xs text-slate-400">Factors influencing AI trajectory prediction cone</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={factorWeights}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="factor" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis stroke="#334155" domain={[0, 100]} />
                <Radar name="Weight Influence" dataKey="weight" stroke="#a855f7" fill="#a855f7" fillOpacity={0.4} />
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

          <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Wheat className="w-3.5 h-3.5 text-amber-400" />
                <span>Crop Odor Attractant:</span>
              </span>
              <span className="font-mono text-slate-200 font-bold">{Math.round(currentPred.cropSmellVectorWeight * 100)}%</span>
            </div>

            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5 text-cyan-400" />
                <span>Waterhole Distance Vector:</span>
              </span>
              <span className="font-mono text-slate-200 font-bold">{Math.round(currentPred.waterholeAttractionWeight * 100)}%</span>
            </div>

            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5 text-emerald-400" />
                <span>Slope Gradient Resistance:</span>
              </span>
              <span className="font-mono text-slate-200 font-bold">{Math.round(currentPred.slopeResistanceWeight * 100)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
