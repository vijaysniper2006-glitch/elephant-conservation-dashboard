import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  ShieldCheck, 
  Zap, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  TrendingDown, 
  Sparkles, 
  Train, 
  Volume2, 
  Trees, 
  Send,
  AlertCircle
} from 'lucide-react';

export const DecisionSupportView: React.FC = () => {
  const { decisionActions, executeDecisionAction } = useTelemetry();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const filteredActions = activeCategory === 'ALL'
    ? decisionActions
    : decisionActions.filter(a => a.category === activeCategory);

  const pendingCount = decisionActions.filter(a => a.status === 'PENDING').length;
  const executedCount = decisionActions.filter(a => a.status === 'EXECUTED').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-100">
                Conservation Decision Support System (CDSS)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Automated expert system providing prescriptive conflict mitigation recommendations, rapid intervention protocols, cost-benefit modeling, and habitat corridor restoration planning.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 text-right">
              <div className="text-[10px] text-slate-400 uppercase font-mono">System Confidence</div>
              <div className="text-lg font-bold text-teal-400 font-mono">96.4% Multi-Agent AI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs & Quick Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'ALL', label: 'All Actions' },
            { id: 'IMMEDIATE_TACTICAL', label: '⚡ Tactical Interventions' },
            { id: 'RAILWAY_SAFETY', label: '🚆 Railway Safety' },
            { id: 'COMMUNITY_ALERT', label: '🔊 Bio-Acoustic Sirens' },
            { id: 'LONG_TERM_CORRIDOR_REPAIR', label: '🌿 Corridor Restoration' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeCategory === tab.id
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>Pending: <b className="text-amber-400">{pendingCount}</b></span>
          <span>Executed: <b className="text-emerald-400">{executedCount}</b></span>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredActions.map((action) => {
          const isUrgent = action.priority === 'URGENT';
          const isExecuted = action.status === 'EXECUTED';

          return (
            <div
              key={action.id}
              className={`bg-slate-900/90 border rounded-2xl p-5 shadow-lg backdrop-blur-md space-y-4 transition-all ${
                isExecuted
                  ? 'border-emerald-500/40 bg-emerald-950/10'
                  : isUrgent
                  ? 'border-rose-500/40 hover:border-rose-500/80 shadow-rose-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                      action.priority === 'URGENT'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {action.priority}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {action.category.replace(/_/g, ' ')}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full border ${
                    isExecuted
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {action.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-100">{action.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{action.description}</p>
              </div>

              {/* Impact & Cost Metrics */}
              <div className="grid grid-cols-3 gap-2 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px]">Zone</span>
                  <div className="font-semibold text-slate-200 truncate">{action.affectedZone}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">Conflict Reduction</span>
                  <div className="font-bold text-emerald-400 font-mono">-{action.expectedConflictReductionPct}%</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">Estimated Cost</span>
                  <div className="font-bold text-slate-200 font-mono">${action.estimatedCostUsd}</div>
                </div>
              </div>

              {/* Recommended Resources List */}
              <div className="space-y-1 text-xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Required Resources:</span>
                <div className="flex flex-wrap gap-1">
                  {action.recommendedResources.map((res, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono"
                    >
                      {res}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Trigger Button */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>AI Confidence: {action.aiConfidence}%</span>
                </span>

                {isExecuted ? (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Protocol Executed</span>
                  </span>
                ) : (
                  <button
                    onClick={() => executeDecisionAction(action.id)}
                    className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Execute Decision</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
