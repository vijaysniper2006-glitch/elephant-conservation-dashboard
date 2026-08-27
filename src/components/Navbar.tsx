import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  Radio, 
  Bell, 
  Play, 
  Pause, 
  Zap, 
  Volume2, 
  VolumeX, 
  Activity, 
  ShieldAlert, 
  CheckCircle2, 
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    isSimulating, 
    setIsSimulating, 
    simulationSpeed, 
    setSimulationSpeed, 
    triggerSimulatedBreach,
    soundEnabled,
    setSoundEnabled,
    setActiveView
  } = useTelemetry();

  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalNotifs = notifications.filter(n => n.riskLevel === 'CRITICAL');

  return (
    <header className="h-16 bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Brand / System Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-400/30">
          <span className="text-xl">🐘</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-base lg:text-lg text-slate-100 tracking-tight flex items-center gap-2">
              GAJASAFE AI
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                UML CLOUD v2.4
              </span>
            </h1>
          </div>
          <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
            Elephant Early Warning & Conservation Intelligence Platform
          </p>
        </div>
      </div>

      {/* Center: Live Telemetry Simulator Control Widget */}
      <div className="hidden md:flex items-center gap-2 bg-slate-950/70 border border-slate-800 rounded-lg p-1 px-2.5">
        <div className="flex items-center gap-1.5 pr-2 border-r border-slate-800 text-xs font-medium">
          <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-500 animate-ping-slow' : 'bg-amber-500'}`} />
          <span className="text-slate-300 font-mono">
            {isSimulating ? 'LIVE CLOUD TELEMETRY' : 'TELEMETRY PAUSED'}
          </span>
        </div>

        {/* Play / Pause */}
        <button
          onClick={() => setIsSimulating(!isSimulating)}
          className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
            isSimulating ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
          }`}
          title={isSimulating ? 'Pause Telemetry Simulation' : 'Resume Telemetry Simulation'}
        >
          {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isSimulating ? 'Pause' : 'Play'}</span>
        </button>

        {/* Simulation Speed Buttons */}
        <div className="flex items-center gap-1 pl-1">
          {[1, 5, 10].map((spd) => (
            <button
              key={spd}
              onClick={() => setSimulationSpeed(spd)}
              className={`px-2 py-1 text-xs font-mono font-medium rounded transition-colors ${
                simulationSpeed === spd
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>

        {/* Emergency Simulator Trigger */}
        <button
          onClick={triggerSimulatedBreach}
          className="ml-2 px-2.5 py-1 text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          title="Simulate sudden perimeter fence breach by Bull Tusker"
        >
          <Zap className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>Simulate Breach</span>
        </button>
      </div>

      {/* Right Controls: Sound, Emergency Trigger for Mobile, Notifications, System Status */}
      <div className="flex items-center gap-2">
        {/* Mobile emergency breach */}
        <button
          onClick={triggerSimulatedBreach}
          className="md:hidden p-2 bg-rose-500/20 text-rose-300 rounded-lg border border-rose-500/40"
          title="Simulate Breach"
        >
          <Zap className="w-4 h-4 text-rose-400" />
        </button>

        {/* Sound toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 rounded-lg border transition-colors ${
            soundEnabled
              ? 'bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700'
              : 'bg-slate-900 text-slate-500 border-slate-800 hover:bg-slate-800'
          }`}
          title={soundEnabled ? 'Acoustic Alerts Enabled' : 'Acoustic Alerts Muted'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Notifications Center */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className={`relative p-2 rounded-lg border transition-colors ${
              unreadCount > 0
                ? 'bg-rose-950/40 border-rose-500/50 text-rose-300 hover:bg-rose-900/50'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900/95 border border-slate-700/80 rounded-xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden">
              <div className="p-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span className="font-semibold text-xs uppercase tracking-wider text-slate-200">
                    Live Dispatch Alerts ({notifications.length})
                  </span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-emerald-400 hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 transition-colors hover:bg-slate-800/50 ${
                      !notif.read ? 'bg-rose-950/20' : 'opacity-80'
                    }`}
                    onClick={() => markNotificationRead(notif.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            notif.riskLevel === 'CRITICAL'
                              ? 'bg-rose-500 animate-ping'
                              : notif.riskLevel === 'HIGH'
                              ? 'bg-amber-500'
                              : 'bg-blue-500'
                          }`}
                        />
                        <h4 className="text-xs font-semibold text-slate-100">{notif.title}</h4>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                        {notif.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-1">{notif.message}</p>

                    <div className="mt-2 flex flex-wrap items-center gap-1">
                      <span className="text-[10px] text-slate-400">Dispatched:</span>
                      {notif.dispatchedTo.map((target, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded border border-slate-700"
                        >
                          {target}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 bg-slate-800/50 border-t border-slate-700 text-center">
                <button
                  onClick={() => {
                    setActiveView('events');
                    setShowNotifMenu(false);
                  }}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center justify-center gap-1 w-full py-1"
                >
                  <span>View Complete Event Audit Log</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Network & Cloud Status Indicator */}
        <div className="hidden xl:flex items-center gap-2 pl-2 border-l border-slate-800 text-xs">
          <div className="flex flex-col text-right">
            <span className="text-slate-300 font-semibold text-[11px]">AWS IoT Core + LoRa</span>
            <span className="text-[10px] text-emerald-400 font-mono">LATENCY: 12ms (ONLINE)</span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
        </div>
      </div>
    </header>
  );
};
