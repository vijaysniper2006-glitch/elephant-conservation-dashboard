import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  ShieldAlert, 
  X, 
  Send, 
  Radio, 
  Volume2, 
  Train, 
  Users, 
  CheckCircle, 
  Flame, 
  Bell, 
  AlertTriangle 
} from 'lucide-react';

interface EmergencyDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyDispatchModal: React.FC<EmergencyDispatchModalProps> = ({ isOpen, onClose }) => {
  const { 
    herds, 
    settlements, 
    triggerAcousticSiren, 
    updateRailwaySpeedLimit, 
    addEventLog 
  } = useTelemetry();

  const [selectedVillageId, setSelectedVillageId] = useState<string>(settlements[1].id);
  const [selectedPatrolUnit, setSelectedPatrolUnit] = useState<string>('QRT-Alpha (Forest Rapid Response Unit #2)');
  const [enableSiren, setEnableSiren] = useState<boolean>(true);
  const [enableSmsBroadcast, setEnableSmsBroadcast] = useState<boolean>(true);
  const [enableRailwaySlowdown, setEnableRailwaySlowdown] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const targetVillage = settlements.find(s => s.id === selectedVillageId) || settlements[0];

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();

    if (enableSiren) {
      triggerAcousticSiren(targetVillage.id);
    }

    if (enableRailwaySlowdown) {
      updateRailwaySpeedLimit(20);
    }

    addEventLog({
      herdId: 'herd-02',
      herdName: 'Manual Dispatch Command',
      sensorType: 'AI_CAMERA_TRAP',
      sensorId: 'DISPATCH-OPS-9',
      location: targetVillage.coordinates,
      locationName: `${targetVillage.name} Defensive Perimeter`,
      riskLevel: 'CRITICAL',
      eventType: 'VILLAGE_BOUNDARY_BREACH',
      details: `EMERGENCY DISPATCH INITIATED: ${selectedPatrolUnit} dispatched to ${targetVillage.name}. SMS push broadcasted to ${targetVillage.population} residents.`,
      speedKmH: 0,
      headingDeg: 0,
      actionTaken: `${selectedPatrolUnit} in route with bio-acoustic sirens and chili flairs.`,
      resolved: true
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-rose-950/60 border-b border-rose-600/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-600 text-white">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Emergency Incident Response & Dispatch</h3>
              <p className="text-xs text-rose-300">Deploy Rapid Response Team & Automated Deterrents</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle className="w-8 h-8 animate-bounce" />
            </div>
            <h4 className="text-lg font-bold text-slate-100">Dispatch Order Transmitted!</h4>
            <p className="text-xs text-slate-300">
              Response team mobilized, SMS broadcast queued, and acoustic deterrents fired.
            </p>
          </div>
        ) : (
          <form onSubmit={handleDispatch} className="p-5 space-y-4 text-xs">
            {/* Target Settlement Selection */}
            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1">
                Target Settlement / Hotspot Area
              </label>
              <select
                value={selectedVillageId}
                onChange={(e) => setSelectedVillageId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                {settlements.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} (Risk: {s.currentRiskLevel}, Pop: {s.population})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Patrol Unit */}
            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1">
                Forest Patrol / Quick Response Unit (QRU)
              </label>
              <select
                value={selectedPatrolUnit}
                onChange={(e) => setSelectedPatrolUnit(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="QRT-Alpha (Forest Rapid Response Unit #2)">
                  QRT-Alpha (Rapid Response Team #2 - 6 Rangers, Chili Smoke Flares)
                </option>
                <option value="QRT-Bravo (Night Intercept Mobile Jeep #4)">
                  QRT-Bravo (Night Intercept Jeep #4 - High Lumen Floodlights & Acoustic Siren)
                </option>
                <option value="Village-Defense (Local Elephant Tracking Squad)">
                  Village Defense Squad (12 Volunteers + Flash Torches)
                </option>
              </select>
            </div>

            {/* Deterrence & Alert Toggles */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800">
              <label className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                Automated Protocols to Trigger:
              </label>

              <label className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700 cursor-pointer hover:bg-slate-800">
                <input
                  type="checkbox"
                  checked={enableSiren}
                  onChange={(e) => setEnableSiren(e.target.checked)}
                  className="w-4 h-4 text-rose-500 rounded border-slate-700 bg-slate-900 focus:ring-0"
                />
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="font-semibold text-slate-200">Activate Solar Acoustic Siren & Predator Sounds</div>
                    <div className="text-[11px] text-slate-400">Emits tiger roar & bee hive synthesized frequencies</div>
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700 cursor-pointer hover:bg-slate-800">
                <input
                  type="checkbox"
                  checked={enableSmsBroadcast}
                  onChange={(e) => setEnableSmsBroadcast(e.target.checked)}
                  className="w-4 h-4 text-emerald-500 rounded border-slate-700 bg-slate-900 focus:ring-0"
                />
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-semibold text-slate-200">WhatsApp & SMS Community Push Broadcast</div>
                    <div className="text-[11px] text-slate-400">Alerts local farmers and school administrators</div>
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700 cursor-pointer hover:bg-slate-800">
                <input
                  type="checkbox"
                  checked={enableRailwaySlowdown}
                  onChange={(e) => setEnableRailwaySlowdown(e.target.checked)}
                  className="w-4 h-4 text-blue-500 rounded border-slate-700 bg-slate-900 focus:ring-0"
                />
                <div className="flex items-center gap-2">
                  <Train className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="font-semibold text-slate-200">Railway Caution Signal (Restrict to 20 km/h)</div>
                    <div className="text-[11px] text-slate-400">Enforces speed reduction on Track Km 38-54</div>
                  </div>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-rose-950/50"
              >
                <Send className="w-4 h-4" />
                <span>Execute Emergency Dispatch</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
