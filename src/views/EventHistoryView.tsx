import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { ElephantEvent, RiskLevel } from '../types';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  ShieldAlert, 
  CheckCircle, 
  ChevronRight, 
  Calendar, 
  Radio, 
  X,
  ExternalLink
} from 'lucide-react';

export const EventHistoryView: React.FC = () => {
  const { events } = useTelemetry();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('ALL');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');
  const [inspectedEvent, setInspectedEvent] = useState<ElephantEvent | null>(null);

  // Filter events
  const filteredEvents = events.filter((ev) => {
    const matchesSearch = 
      ev.herdName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisk = selectedRiskFilter === 'ALL' || ev.riskLevel === selectedRiskFilter;
    const matchesType = selectedTypeFilter === 'ALL' || ev.eventType === selectedTypeFilter;

    return matchesSearch && matchesRisk && matchesType;
  });

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Timestamp', 'Herd', 'Event Type', 'Risk Level', 'Location', 'Sensor', 'Details', 'Action Taken'];
    const rows = filteredEvents.map(ev => [
      ev.id,
      `"${ev.timestamp}"`,
      `"${ev.herdName}"`,
      `"${ev.eventType}"`,
      `"${ev.riskLevel}"`,
      `"${ev.locationName}"`,
      `"${ev.sensorType}"`,
      `"${ev.details.replace(/"/g, '""')}"`,
      `"${ev.actionTaken || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `elephant_events_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
                <FileText className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-100">
                Elephant Events & Telemetry Audit Log
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Complete chronological audit trail of geofence proximity alerts, crop raid deterrent triggers, railway warnings, and acoustic countermeasures.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV ({filteredEvents.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by herd, village, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Risk:</span>
            <select
              value={selectedRiskFilter}
              onChange={(e) => setSelectedRiskFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 focus:outline-none"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL">CRITICAL</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="SAFE">SAFE</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-slate-400">Type:</span>
            <select
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-200 focus:outline-none"
            >
              <option value="ALL">All Event Types</option>
              <option value="VILLAGE_BOUNDARY_BREACH">Village Breach</option>
              <option value="GEOFENCE_PROXIMITY_WARNING">Geofence Warning</option>
              <option value="RAILWAY_CROSSING_DETECTED">Railway Hazard</option>
              <option value="CROP_RAID_ATTEMPT">Crop Raid Attempt</option>
              <option value="ACOUSTIC_DETERRENT_TRIGGERED">Acoustic Triggered</option>
              <option value="SAFE_CORRIDOR_TRANSIT">Safe Corridor Transit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Risk</th>
                <th className="p-3.5">Event Type</th>
                <th className="p-3.5">Herd / Entity</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Sensor Trigger</th>
                <th className="p-3.5">Action Status</th>
                <th className="p-3.5 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredEvents.map((ev) => {
                const riskBadgeColor = 
                  ev.riskLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                  ev.riskLevel === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                  ev.riskLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' :
                  'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                return (
                  <tr
                    key={ev.id}
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                    onClick={() => setInspectedEvent(ev)}
                  >
                    <td className="p-3.5 font-mono text-slate-400 whitespace-nowrap">{ev.timestamp}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full font-mono font-bold text-[9px] border ${riskBadgeColor}`}>
                        {ev.riskLevel}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-100">
                      {ev.eventType.replace(/_/g, ' ')}
                    </td>
                    <td className="p-3.5 font-medium text-slate-200">🐘 {ev.herdName}</td>
                    <td className="p-3.5 text-slate-300 truncate max-w-xs">{ev.locationName}</td>
                    <td className="p-3.5 font-mono text-cyan-400">📡 {ev.sensorType}</td>
                    <td className="p-3.5">
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Mitigated</span>
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Inspect Modal */}
      {inspectedEvent && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400">
                  Event Details • {inspectedEvent.id}
                </span>
                <h3 className="font-bold text-base text-slate-100 mt-0.5">
                  {inspectedEvent.eventType.replace(/_/g, ' ')}
                </h3>
              </div>
              <button
                onClick={() => setInspectedEvent(null)}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Timestamp:</span>
                  <span className="font-mono text-slate-200">{inspectedEvent.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tracked Entity:</span>
                  <span className="font-bold text-slate-200">🐘 {inspectedEvent.herdName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-slate-200">{inspectedEvent.locationName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Coordinates:</span>
                  <span className="font-mono text-slate-300">
                    {inspectedEvent.location.lat.toFixed(4)}, {inspectedEvent.location.lng.toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Speed / Heading:</span>
                  <span className="font-mono text-amber-300">
                    {inspectedEvent.speedKmH} km/h @ {inspectedEvent.headingDeg}°
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                  Incident Description:
                </span>
                <p className="mt-1 text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                  {inspectedEvent.details}
                </p>
              </div>

              {inspectedEvent.actionTaken && (
                <div>
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                    Mitigation Action Logged:
                  </span>
                  <p className="mt-1 text-emerald-300 bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/30">
                    {inspectedEvent.actionTaken}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectedEvent(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
