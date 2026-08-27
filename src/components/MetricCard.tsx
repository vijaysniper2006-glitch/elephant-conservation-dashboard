import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  badge?: string;
  badgeColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subValue,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'text-emerald-400',
  badge,
  badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 shadow-lg backdrop-blur-sm hover:border-slate-700/80 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">{title}</span>
        <div className={`p-2 rounded-xl bg-slate-800/80 ${iconColor} border border-slate-700/50`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-2xl font-bold text-slate-100 font-mono tracking-tight">{value}</div>
        {badge && (
          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>

      {(subValue || change) && (
        <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
          {subValue && <span>{subValue}</span>}
          {change && (
            <span
              className={`font-mono font-medium ${
                changeType === 'positive'
                  ? 'text-emerald-400'
                  : changeType === 'negative'
                  ? 'text-rose-400'
                  : 'text-slate-400'
              }`}
            >
              {change}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
