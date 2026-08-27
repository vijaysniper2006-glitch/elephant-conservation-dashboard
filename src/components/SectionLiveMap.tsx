import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { LiveMap } from './LiveMap';
import { 
  MapPin, 
  Compass, 
  Navigation, 
  Battery, 
  Radio, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Volume2, 
  Zap,
  Layers,
  Crosshair
} from 'lucide-react';

export const SectionLiveMap: React.FC = () => {
  const { herds, selectedHerdId, setSelectedHerdId, triggerAcousticSiren, triggerSimulatedBreach } = useTelemetry();

  const selectedHerd = herds.find(h => h.id === selectedHerdId) || herds[0];

  return (
    <section className="space-y-3">
      {/* Section Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <MapPin className="w-4 h-4" />
            </span>
            <h2 className="text-base font-extrabold text-slate-100 uppercase tracking-tight">
              Section 3 — Live Elephant Map
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time geospatial tracking using Leaflet + OpenStreetMap with GPS/ESP32 live telemetry.
          </p>
        </div>

        {/* Quick Elephant Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {herds.map((h) => {
            const isSelected = selectedHerdId === h.id;
            const isHigh = h.riskLevel === 'HIGH' || h.riskLevel === 'CRITICAL';
            return (
              <button
                key={h.id}
                onClick={() => setSelectedHerdId(h.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-500/30'
                    : isHigh
                    ? 'bg-rose-950/40 text-rose-300 border-rose-500/30 hover:bg-rose-900/50'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>🐘 {h.id}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    h.riskLevel === 'CRITICAL' ? 'bg-rose-500 animate-ping' :
                    h.riskLevel === 'HIGH' ? 'bg-rose-400' :
                    h.riskLevel === 'MEDIUM' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map + Detailed Elephant Telemetry Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Map Container */}
        <div className="xl:col-span-8 h-[480px] lg:h-[540px] rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
          <LiveMap />
        </div>

        {/* Elephant Real-Time Parameter Inspector Box */}
        <div className="xl:col-span-4 bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Target Telemetry
                </span>
                <h3 className="font-extrabold text-base text-slate-100 flex items-center gap-2 mt-0.5">
                  <span>🐘 Elephant ID:</span>
                  <span className="text-emerald-400 font-mono">{selectedHerd.id}</span>
                </h3>
                <div className="text-xs text-slate-400">{selectedHerd.name}</div>
              </div>

              <span
                className={`text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full border ${
                  selectedHerd.riskLevel === 'CRITICAL'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                    : selectedHerd.riskLevel === 'HIGH'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : selectedHerd.riskLevel === 'MEDIUM'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {selectedHerd.riskLevel === 'CRITICAL' || selectedHerd.riskLevel === 'HIGH' ? '🔴 HIGH RISK' :
                 selectedHerd.riskLevel === 'MEDIUM' ? '🟠 MEDIUM RISK' : '🟢 SAFE'}
              </span>
            </div>

            {/* Exact 5 Parameters matching user specification */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-sans font-medium">Latitude:</span>
                <span className="text-slate-100 font-bold">{selectedHerd.location.lat.toFixed(4)}</span>
              </div>

              <div className="flex justify-between items-center bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-sans font-medium">Longitude:</span>
                <span className="text-slate-100 font-bold">{selectedHerd.location.lng.toFixed(4)}</span>
              </div>

              <div className="flex justify-between items-center bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-sans font-medium">Movement Direction:</span>
                <span className="text-amber-300 font-bold flex items-center gap-1">
                  <span>{selectedHerd.headingCardinal}</span>
                  <span className="text-slate-400">({selectedHerd.headingDeg}°)</span>
                </span>
              </div>

              <div className="flex justify-between items-center bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-sans font-medium">Risk Level:</span>
                <span className={`font-bold ${
                  selectedHerd.riskLevel === 'CRITICAL' || selectedHerd.riskLevel === 'HIGH' ? 'text-rose-400' :
                  selectedHerd.riskLevel === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {selectedHerd.riskLevel}
                </span>
              </div>

              <div className="flex justify-between items-center bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-sans font-medium">Detected Time:</span>
                <span className="text-cyan-300 font-bold">18:52 (Live)</span>
              </div>
            </div>

            {/* Proximity warning */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-amber-500/30 text-xs">
              <div className="flex items-center justify-between text-slate-300 font-semibold mb-1">
                <span>Nearest Zone:</span>
                <span className="text-amber-300">{selectedHerd.nearestSettlement.villageName}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Distance: <b>{selectedHerd.nearestSettlement.distanceKm} km</b></span>
                <span>Speed: <b>{selectedHerd.speedKmH} km/h</b></span>
              </div>
            </div>
          </div>

          {/* Quick deterrence buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => triggerAcousticSiren(selectedHerd.nearestSettlement.villageId)}
              className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Trigger Solar Acoustic Siren</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
