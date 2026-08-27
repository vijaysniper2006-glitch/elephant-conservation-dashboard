import React, { useState } from 'react';
import { TelemetryProvider, useTelemetry } from './context/TelemetryContext';
import { SectionHeader } from './components/SectionHeader';
import { SectionSummaryCards } from './components/SectionSummaryCards';
import { SectionLiveMap } from './components/SectionLiveMap';
import { SectionRealtimeAlerts } from './components/SectionRealtimeAlerts';
import { SectionDataAnalysis } from './components/SectionDataAnalysis';
import { CorridorAnalysisView } from './views/CorridorAnalysisView';
import { HighRiskZoneView } from './views/HighRiskZoneView';
import { TrendAnalysisView } from './views/TrendAnalysisView';
import { PredictionView } from './views/PredictionView';
import { DecisionSupportView } from './views/DecisionSupportView';
import { EventHistoryView } from './views/EventHistoryView';
import { 
  LayoutDashboard, 
  MapPin, 
  Flame, 
  TrendingUp, 
  BrainCircuit, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

const MainDashboardLayout: React.FC = () => {
  const { activeView, setActiveView } = useTelemetry();

  const navigationTabs = [
    { id: 'unified', label: '5-Section Master View', icon: LayoutDashboard },
    { id: 'corridors', label: 'Corridor Intelligence', icon: MapPin },
    { id: 'high-risk', label: 'High-Risk Mapping', icon: Flame },
    { id: 'trends', label: 'Seasonal Trends', icon: TrendingUp },
    { id: 'predictions', label: 'AI Trajectory Forecast', icon: BrainCircuit },
    { id: 'decision-support', label: 'Conservation CDSS', icon: ShieldCheck },
    { id: 'events', label: 'Audit Log & Export', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-100 selection:bg-emerald-500/30">
      {/* Section 1 — Header */}
      <SectionHeader />

      {/* Sub-Navigation Bar for Deep Dive Views */}
      <div className="bg-slate-900/80 border-b border-slate-800/80 px-4 lg:px-8 py-2 sticky top-[57px] z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-max">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = (activeView === 'operations' && tab.id === 'unified') || activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id === 'unified' ? 'operations' : tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60 ring-2 ring-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-8 pb-16">
        {activeView === 'operations' || activeView === 'unified' ? (
          <>
            {/* Section 2 — Summary Cards */}
            <SectionSummaryCards />

            {/* Section 3 — Live Elephant Map */}
            <SectionLiveMap />

            {/* Section 4 — Real-Time Alerts */}
            <SectionRealtimeAlerts />

            {/* Section 5 — Data Analysis (Corridor, High-Risk, Trend, Prediction & Event History) */}
            <SectionDataAnalysis />
          </>
        ) : activeView === 'corridors' ? (
          <CorridorAnalysisView />
        ) : activeView === 'high-risk' ? (
          <HighRiskZoneView />
        ) : activeView === 'trends' ? (
          <TrendAnalysisView />
        ) : activeView === 'predictions' ? (
          <PredictionView />
        ) : activeView === 'decision-support' ? (
          <DecisionSupportView />
        ) : activeView === 'events' ? (
          <EventHistoryView />
        ) : (
          <SectionSummaryCards />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-4 px-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🐘 GajaSafe AI • Cloud Wildlife Telemetry & Conservation Intelligence System</span>
          <span>Status: All 5 Modules Synchronized • v2.4</span>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <TelemetryProvider>
      <MainDashboardLayout />
    </TelemetryProvider>
  );
}

export default App;
