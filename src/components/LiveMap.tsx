import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useTelemetry } from '../context/TelemetryContext';
import { ElephantHerd, SettlementGeofence } from '../types';
import { 
  Layers, 
  Compass, 
  MapPin, 
  AlertTriangle, 
  Train, 
  Shield, 
  Maximize2, 
  Zap,
  Activity,
  Crosshair
} from 'lucide-react';

export const LiveMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersRef = useRef<{
    herds: L.LayerGroup;
    trails: L.LayerGroup;
    settlements: L.LayerGroup;
    corridors: L.LayerGroup;
    railway: L.LayerGroup;
    sensors: L.LayerGroup;
  }>({
    herds: L.layerGroup(),
    trails: L.layerGroup(),
    settlements: L.layerGroup(),
    corridors: L.layerGroup(),
    railway: L.layerGroup(),
    sensors: L.layerGroup()
  });

  const { 
    herds, 
    settlements, 
    corridors, 
    railway, 
    sensors, 
    selectedHerdId, 
    setSelectedHerdId,
    triggerAcousticSiren
  } = useTelemetry();

  // Layer Visibility Toggles
  const [showCorridors, setShowCorridors] = useState(true);
  const [showSettlements, setShowSettlements] = useState(true);
  const [showRailway, setShowRailway] = useState(true);
  const [showTrails, setShowTrails] = useState(true);
  const [showSensors, setShowSensors] = useState(true);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on reserve area
    const map = L.map(mapContainerRef.current, {
      center: [12.9716, 77.5946],
      zoom: 12,
      zoomControl: false
    });

    // Add OpenStreetMap Map Tiles (No API key required)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // Zoom control on top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add layer groups to map
    layersRef.current.corridors.addTo(map);
    layersRef.current.settlements.addTo(map);
    layersRef.current.railway.addTo(map);
    layersRef.current.sensors.addTo(map);
    layersRef.current.trails.addTo(map);
    layersRef.current.herds.addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Corridors Layer
  useEffect(() => {
    const layer = layersRef.current.corridors;
    layer.clearLayers();
    if (!showCorridors) return;

    corridors.forEach((corr) => {
      const color = corr.status === 'OPTIMAL' ? '#10b981' : corr.status === 'VULNERABLE' ? '#f59e0b' : '#ef4444';
      
      // Corridor corridor polygon/thick line
      const poly = L.polyline(corr.path, {
        color: color,
        weight: 16,
        opacity: 0.25,
        lineCap: 'round',
        lineJoin: 'round'
      });

      const centerLine = L.polyline(corr.path, {
        color: color,
        weight: 3,
        dashArray: '6, 6',
        opacity: 0.85
      });

      poly.bindPopup(`
        <div style="min-width: 220px; font-family: sans-serif; padding: 4px;">
          <div style="font-weight: 700; font-size: 13px; color: #10b981;">🌿 ${corr.name}</div>
          <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">${corr.region}</div>
          <div style="margin-top: 8px; font-size: 11px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
            <div>Connectivity: <b>${corr.connectivityScore}%</b></div>
            <div>Encroachment: <b>${corr.encroachmentPct}%</b></div>
            <div>Length: <b>${corr.lengthKm} km</b></div>
            <div>Status: <b style="color: ${color}">${corr.status}</b></div>
          </div>
          <div style="margin-top: 6px; font-size: 10px; color: #cbd5e1;">Annual Elephants: ${corr.annualElephantsPassed}</div>
        </div>
      `);

      layer.addLayer(poly);
      layer.addLayer(centerLine);

      // Add Bottlenecks
      corr.bottlenecks.forEach((bn) => {
        const bnMarker = L.circleMarker([bn.coordinates.lat, bn.coordinates.lng], {
          radius: 8,
          color: '#ef4444',
          fillColor: '#f97316',
          fillOpacity: 0.9,
          weight: 2
        });
        bnMarker.bindPopup(`
          <div style="font-size: 11px; padding: 4px;">
            <b style="color: #ef4444;">⚠️ Bottleneck:</b> ${bn.name}<br/>
            <span>Cause: ${bn.cause} | Severity: <b>${bn.severity}</b></span>
          </div>
        `);
        layer.addLayer(bnMarker);
      });
    });
  }, [corridors, showCorridors]);

  // Update Settlements & Geofences Layer
  useEffect(() => {
    const layer = layersRef.current.settlements;
    layer.clearLayers();
    if (!showSettlements) return;

    settlements.forEach((st) => {
      const riskColor = 
        st.currentRiskLevel === 'CRITICAL' ? '#ef4444' :
        st.currentRiskLevel === 'HIGH' ? '#f97316' :
        st.currentRiskLevel === 'MEDIUM' ? '#eab308' : '#3b82f6';

      // Geofence boundary circle
      const circle = L.circle([st.coordinates.lat, st.coordinates.lng], {
        radius: st.radiusMeters,
        color: riskColor,
        weight: 1.5,
        fillColor: riskColor,
        fillOpacity: 0.12,
        dashArray: '4, 4'
      });

      // Village Center Pin Icon
      const villageIcon = L.divIcon({
        className: 'custom-settlement-icon',
        html: `
          <div style="
            background: #0f172a; 
            border: 2px solid ${riskColor}; 
            color: #f8fafc; 
            border-radius: 8px; 
            padding: 2px 6px; 
            font-size: 10px; 
            font-weight: 700; 
            white-space: nowrap; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            <span>🏡</span>
            <span>${st.name}</span>
          </div>
        `,
        iconSize: [120, 24],
        iconAnchor: [60, 12]
      });

      const marker = L.marker([st.coordinates.lat, st.coordinates.lng], { icon: villageIcon });

      const popupContent = `
        <div style="min-width: 240px; font-family: sans-serif; padding: 4px;">
          <div style="font-weight: 700; font-size: 13px; color: #f8fafc; display: flex; justify-content: space-between;">
            <span>${st.name}</span>
            <span style="font-size: 10px; padding: 1px 6px; border-radius: 4px; background: ${riskColor}33; color: ${riskColor}; border: 1px solid ${riskColor};">
              ${st.currentRiskLevel}
            </span>
          </div>
          <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">Type: ${st.type} • Pop: ${st.population.toLocaleString()}</div>
          
          <div style="margin-top: 8px; padding: 6px; background: rgba(30, 41, 59, 0.7); border-radius: 6px; font-size: 11px;">
            <div>🛡️ Vulnerability Index: <b>${st.vulnerabilityIndex}/100</b></div>
            <div>👮 Guards On Duty: <b>${st.forestGuardsOnDuty} personnel</b></div>
            <div>🔊 Acoustic Sirens: <b>${st.activeDeterrents.acousticSirens} active</b></div>
            <div>⚡ Beehive & Chili Line: <b>${st.activeDeterrents.beehiveFences ? 'Armed' : 'None'} (${st.activeDeterrents.chiliRopeMeters}m)</b></div>
          </div>
          <div style="margin-top: 8px;">
            <button id="siren-btn-${st.id}" style="
              width: 100%; 
              padding: 6px; 
              background: #ef4444; 
              color: white; 
              font-weight: 600; 
              font-size: 11px; 
              border: none; 
              border-radius: 6px; 
              cursor: pointer;
            ">
              🔊 Trigger Solar Acoustic Siren
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('popupopen', () => {
        const btn = document.getElementById(`siren-btn-${st.id}`);
        if (btn) {
          btn.onclick = () => triggerAcousticSiren(st.id);
        }
      });

      layer.addLayer(circle);
      layer.addLayer(marker);
    });
  }, [settlements, showSettlements]);

  // Update Railway Layer
  useEffect(() => {
    const layer = layersRef.current.railway;
    layer.clearLayers();
    if (!showRailway) return;

    // Railway track polyline
    const railPoly = L.polyline(railway.path, {
      color: railway.isElephantCrossingActive ? '#ef4444' : '#64748b',
      weight: 4,
      dashArray: '8, 8'
    });

    railPoly.bindPopup(`
      <div style="min-width: 220px; font-family: sans-serif; padding: 4px;">
        <div style="font-weight: 700; font-size: 12px; color: #f8fafc;">🚆 ${railway.name}</div>
        <div style="margin-top: 6px; font-size: 11px;">
          <div>Status: <b style="color: ${railway.isElephantCrossingActive ? '#ef4444' : '#10b981'};">
            ${railway.isElephantCrossingActive ? '⚠️ ELEPHANT HAZARD ACTIVE' : 'CLEAR'}
          </b></div>
          <div>Speed Limit: <b>${railway.currentSpeedLimitKmH} km/h</b> (Normal: ${railway.speedLimitNormalKmH} km/h)</div>
          <div>Active Track Acoustic Fences: <b>${railway.activeAcousticFences}</b></div>
          <div style="margin-top: 4px; font-size: 10px; color: #94a3b8;">${railway.lastWarningBroadcast || ''}</div>
        </div>
      </div>
    `);

    layer.addLayer(railPoly);
  }, [railway, showRailway]);

  // Update Sensors Layer
  useEffect(() => {
    const layer = layersRef.current.sensors;
    layer.clearLayers();
    if (!showSensors) return;

    sensors.forEach((s) => {
      const isTriggered = s.status === 'TRIGGERED';
      const color = isTriggered ? '#f97316' : '#06b6d4';

      const sensorIcon = L.divIcon({
        className: 'sensor-icon',
        html: `
          <div style="
            width: 14px; 
            height: 14px; 
            background: ${color}; 
            border: 2px solid #ffffff; 
            border-radius: 50%; 
            box-shadow: 0 0 10px ${color};
            ${isTriggered ? 'animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;' : ''}
          "></div>
        `,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });

      const marker = L.marker([s.coordinates.lat, s.coordinates.lng], { icon: sensorIcon });
      marker.bindPopup(`
        <div style="font-family: sans-serif; font-size: 11px; padding: 4px;">
          <b style="color: ${color};">📡 ${s.name}</b><br/>
          <span>Type: <b>${s.type}</b></span><br/>
          <span>Status: <b>${s.status}</b></span><br/>
          <span>Battery: <b>${s.batteryPct}%</b> | Ping: ${s.lastPing}</span>
          ${s.recentDetection ? `
            <div style="margin-top: 6px; padding: 4px; background: #1e293b; border-radius: 4px;">
              <b style="color: #38bdf8;">Detection:</b> ${s.recentDetection.elephantCount} elephants (${s.recentDetection.confidence}%)<br/>
              <span>Dir: ${s.recentDetection.direction}</span>
            </div>
          ` : ''}
        </div>
      `);
      layer.addLayer(marker);
    });
  }, [sensors, showSensors]);

  // Update Herds and Trajectory Trails Layer
  useEffect(() => {
    const herdsLayer = layersRef.current.herds;
    const trailsLayer = layersRef.current.trails;
    herdsLayer.clearLayers();
    trailsLayer.clearLayers();

    herds.forEach((herd) => {
      const isSelected = selectedHerdId === herd.id;
      const riskColor = 
        herd.riskLevel === 'CRITICAL' ? '#ef4444' :
        herd.riskLevel === 'HIGH' ? '#f97316' :
        herd.riskLevel === 'MEDIUM' ? '#eab308' :
        herd.riskLevel === 'LOW' ? '#3b82f6' : '#22c55e';

      // Historical Trail Breadcrumb
      if (showTrails && herd.historyTrail.length > 1) {
        const trailCoords = herd.historyTrail.map(pt => [pt.lat, pt.lng] as [number, number]);
        const trailPoly = L.polyline(trailCoords, {
          color: riskColor,
          weight: isSelected ? 3 : 2,
          opacity: 0.6,
          dashArray: '3, 4'
        });
        trailsLayer.addLayer(trailPoly);

        // Historical breadcrumb dots
        herd.historyTrail.forEach((pt, idx) => {
          if (idx < herd.historyTrail.length - 1) {
            const dot = L.circleMarker([pt.lat, pt.lng], {
              radius: 3,
              color: riskColor,
              fillColor: riskColor,
              fillOpacity: 0.4,
              weight: 1
            });
            trailsLayer.addLayer(dot);
          }
        });
      }

      // Live Herd Custom Marker with Elephant Icon and Heading Direction Arrow
      const herdMarkerHtml = `
        <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
          ${herd.riskLevel === 'CRITICAL' ? `
            <div style="
              position: absolute; 
              width: 50px; 
              height: 50px; 
              border-radius: 50%; 
              border: 2px solid #ef4444; 
              animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
          ` : ''}

          <!-- Direction Bearing Pointer -->
          <div style="
            position: absolute; 
            width: 36px; 
            height: 36px; 
            transform: rotate(${herd.headingDeg}deg); 
            display: flex; 
            justify-content: center; 
            align-items: flex-start;
          ">
            <div style="
              width: 0; 
              height: 0; 
              border-left: 5px solid transparent; 
              border-right: 5px solid transparent; 
              border-bottom: 9px solid ${riskColor};
              margin-top: -7px;
              filter: drop-shadow(0 2px 3px rgba(0,0,0,0.8));
            "></div>
          </div>

          <!-- Main Elephant Pin Bubble -->
          <div style="
            width: 34px; 
            height: 34px; 
            background: #0f172a; 
            border: 2.5px solid ${riskColor}; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 16px; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.6);
            transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
            transition: transform 0.2s ease;
          ">
            🐘
          </div>

          <!-- Herd Size Badge -->
          <div style="
            position: absolute; 
            bottom: -2px; 
            right: -2px; 
            background: ${riskColor}; 
            color: #0f172a; 
            font-size: 10px; 
            font-weight: 800; 
            width: 16px; 
            height: 16px; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            border: 1.5px solid #0f172a;
          ">
            ${herd.size}
          </div>
        </div>
      `;

      const elephantIcon = L.divIcon({
        className: 'custom-elephant-marker',
        html: herdMarkerHtml,
        iconSize: [44, 44],
        iconAnchor: [22, 22]
      });

      const marker = L.marker([herd.location.lat, herd.location.lng], { icon: elephantIcon });

      marker.on('click', () => {
        setSelectedHerdId(herd.id);
      });

      marker.bindPopup(`
        <div style="min-width: 250px; font-family: sans-serif; padding: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 6px;">
            <div>
              <div style="font-weight: 800; font-size: 13px; color: #f8fafc;">${herd.name}</div>
              <div style="font-size: 10px; color: #94a3b8;">${herd.collarId} • ${herd.type}</div>
            </div>
            <span style="font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: ${riskColor}22; color: ${riskColor}; border: 1px solid ${riskColor};">
              ${herd.riskLevel}
            </span>
          </div>

          <div style="margin-top: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 11px;">
            <div>Size: <b>${herd.size} elephants</b></div>
            <div>Speed: <b>${herd.speedKmH} km/h</b></div>
            <div>Heading: <b>${herd.headingDeg}° (${herd.headingCardinal})</b></div>
            <div>Elevation: <b>${herd.elevationM}m</b></div>
            <div>Battery: <b>${herd.batteryPct}%</b></div>
            <div>Status: <b style="color: ${riskColor};">${herd.status}</b></div>
          </div>

          <div style="margin-top: 8px; padding: 6px; background: rgba(30, 41, 59, 0.8); border-radius: 6px; font-size: 11px;">
            <div style="color: #cbd5e1;">🎯 Nearest Settlement:</div>
            <div style="font-weight: 700; color: #f8fafc;">${herd.nearestSettlement.villageName}</div>
            <div style="font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between; margin-top: 2px;">
              <span>Distance: <b>${herd.nearestSettlement.distanceKm} km</b></span>
              <span>ETA: <b style="color: #f97316;">${herd.nearestSettlement.estimatedArrivalMins !== null ? `${herd.nearestSettlement.estimatedArrivalMins} mins` : 'N/A'}</b></span>
            </div>
          </div>
        </div>
      `);

      herdsLayer.addLayer(marker);
    });
  }, [herds, selectedHerdId, showTrails]);

  // Center on Selected Herd
  const centerOnHerd = (herdId: string) => {
    setSelectedHerdId(herdId);
    const target = herds.find(h => h.id === herdId);
    if (target && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([target.location.lat, target.location.lng], 14, {
        duration: 1.2
      });
    }
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Top Floating Map Controls & Layer Toggles */}
      <div className="absolute top-3 left-3 z-[1000] flex flex-wrap items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/80 shadow-lg text-xs font-medium">
        <span className="text-slate-400 px-2 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Layers:</span>
        </span>

        <button
          onClick={() => setShowCorridors(!showCorridors)}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            showCorridors ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
          }`}
        >
          🌿 Corridors
        </button>

        <button
          onClick={() => setShowSettlements(!showSettlements)}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            showSettlements ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400'
          }`}
        >
          🏡 Settlements
        </button>

        <button
          onClick={() => setShowRailway(!showRailway)}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            showRailway ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-slate-800 text-slate-400'
          }`}
        >
          🚆 Railway
        </button>

        <button
          onClick={() => setShowSensors(!showSensors)}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            showSensors ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'
          }`}
        >
          📡 Sensors
        </button>

        <button
          onClick={() => setShowTrails(!showTrails)}
          className={`px-2.5 py-1 rounded-lg transition-all ${
            showTrails ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-slate-800 text-slate-400'
          }`}
        >
          🐾 Trails
        </button>
      </div>

      {/* Herd Quick Switcher Carousel on Bottom Left */}
      <div className="absolute bottom-4 left-3 right-3 sm:right-auto z-[1000] max-w-xl">
        <div className="bg-slate-900/95 backdrop-blur-md p-2.5 rounded-2xl border border-slate-700/80 shadow-2xl">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
            <span className="flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tracked Herds ({herds.length})</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Click to zoom</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {herds.map((h) => {
              const isSelected = selectedHerdId === h.id;
              const isCritical = h.riskLevel === 'CRITICAL';
              const isHigh = h.riskLevel === 'HIGH';

              return (
                <button
                  key={h.id}
                  onClick={() => centerOnHerd(h.id)}
                  className={`flex-shrink-0 text-left p-2 rounded-xl transition-all border ${
                    isSelected
                      ? 'bg-emerald-950/60 border-emerald-500 text-slate-100 shadow-md ring-2 ring-emerald-500/30'
                      : isCritical
                      ? 'bg-rose-950/30 border-rose-500/40 text-slate-200 hover:bg-rose-900/40'
                      : isHigh
                      ? 'bg-amber-950/30 border-amber-500/40 text-slate-200 hover:bg-amber-900/40'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/80'
                  }`}
                  style={{ minWidth: '155px' }}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-xs truncate">{h.name}</span>
                    <span
                      className={`text-[9px] font-mono px-1 py-0.2 rounded font-bold ${
                        isCritical
                          ? 'bg-rose-500 text-white animate-pulse'
                          : isHigh
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {h.riskLevel}
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-400 space-y-0.5 font-mono">
                    <div className="flex justify-between">
                      <span>Speed:</span>
                      <span className="text-slate-200">{h.speedKmH} km/h ({h.headingCardinal})</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nearest:</span>
                      <span className="text-amber-300 truncate max-w-[80px]">
                        {h.nearestSettlement.distanceKm}km
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
