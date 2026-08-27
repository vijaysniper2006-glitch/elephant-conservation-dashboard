import React, { useState, useEffect } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  Radio, 
  Bell, 
  Play, 
  Pause, 
  Zap, 
  Volume2, 
  VolumeX, 
  User, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

export const SectionHeader: React.FC = () => {
  const { 
    notifications, 
    markAllNotificationsRead, 
    isSimulating, 
    setIsSimulating, 
    simulationSpeed, 
    setSimulationSpeed, 
    triggerSimulatedBreach,
    soundEnabled,
    setSoundEnabled
  } = useTelemetry();

  const [currentTime, setCurrentTime] = useState('18:52');
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-slate-900/95 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50 shadow-xl px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Branding & Title */}
        <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/60 border border-emerald-400/40 text-2xl">
              🐘
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base lg:text-lg text-slate-100 tracking-tight">
                  ELEPHANT MONITORING SYSTEM
                </h1>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  SECTION 1
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Cloud Platform & Wildlife Early Warning Operations
              </p>
            </div>
          </div>

          {/* Quick status chip for mobile */}
          <div className="md:hidden flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/40 text-[11px] text-emerald-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping-slow" />
            <span>Online</span>
          </div>
        </div>

        {/* Center: System Status & Last Updated */}
        <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800/90 rounded-xl px-4 py-2 text-xs font-mono">
          <div className="flex items-center gap-2 pr-3 border-r border-slate-800">
            <span className="text-slate-400 font-sans font-semibold">System Status:</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>🟢 Online</span>
            </span>
          </div>

          <div className="flex items-center gap-2 pr-3 border-r border-slate-800">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-sans font-semibold">Last Updated:</span>
            <span className="text-slate-200 font-bold">{currentTime}</span>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400 font-sans font-semibold">Role:</span>
            <span className="text-emerald-300 font-bold">Ranger Officer / Admin</span>
          </div>
        </div>

        {/* Right: Simulation Controls & Notification Center */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {/* Telemetry Simulator Play/Speed */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-1">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                isSimulating ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}
              title={isSimulating ? 'Pause Simulation' : 'Play Simulation'}
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {[1, 5, 10].map((spd) => (
              <button
                key={spd}
                onClick={() => setSimulationSpeed(spd)}
                className={`px-2 py-0.5 text-xs font-mono rounded ${
                  simulationSpeed === spd
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Trigger Emergency Breach */}
          <button
            onClick={triggerSimulatedBreach}
            className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            title="Simulate sudden elephant breach"
          >
            <Zap className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Simulate Breach</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-colors ${
              soundEnabled
                ? 'bg-slate-800 text-emerald-400 border-slate-700'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
            title={soundEnabled ? 'Acoustic Sound ON' : 'Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <span className="font-bold text-xs text-slate-200">Notifications ({notifications.length})</span>
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-emerald-400 hover:underline"
                  >
                    Mark read
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto text-xs">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-xl">
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <span className="text-rose-400 font-bold">{n.riskLevel}</span>
                        <span>{n.timestamp}</span>
                      </div>
                      <div className="font-semibold text-slate-200 mt-1">{n.title}</div>
                      <p className="text-slate-400 text-[11px] mt-0.5">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
