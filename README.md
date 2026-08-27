# 🐘 Elephant Early Warning & Conservation Intelligence System

A modern, real-time Elephant Tracking, Human-Elephant Conflict Early Warning, and Conservation Intelligence Web Platform built with React, TypeScript, Vite, Tailwind CSS, Leaflet, and OpenStreetMap.

---

## 🌟 5-Section Architecture

### **Section 1 — Header & Cloud Platform Status**
- **System Status**: `🟢 Online` (Live telemetry feed)
- **Last Updated Time**: Live synchronization timestamp
- **Role & Access**: `Ranger Officer / Admin`
- **Simulation Control Engine**: Play/Pause, 1x/5x/10x simulation speeds, and emergency intrusion injection trigger.

### **Section 2 — Summary Metrics**
1. **Total Events**: `42` (`+12% this week`) — *From Database Server*
2. **High Risk Zones**: `8` (`3 Active`) — *From Analytics & ML Engine*
3. **Active Elephants**: `5` (`Currently detected`) — *From Sensors / ESP32 → Cloud*
4. **Active Alerts**: `3` (`2 High Priority`) — *From Notification Service*

### **Section 3 — Live Elephant Map (Leaflet + OpenStreetMap)**
- Interactive map rendered with **OpenStreetMap** (No API keys or tokens required).
- Real-time animated elephant markers (`E-001`, `E-002`, `E-003`, `E-004`, `E-005`).
- Individual parameters: Latitude, Longitude, Direction Vectors (`East →`, `North ↑`, `West ←`, `South ↓`), Risk Level (`🔴 HIGH`, `🟠 MEDIUM`, `🟢 SAFE`), and Detection Time.
- Layer toggles: Corridors, Settlements, Railway Tracks, Edge Sensors, and Movement Trails.

### **Section 4 — Real-Time Alerts**
- Multi-tier prioritized alert feed:
  - `🔴 HIGH RISK`: Elephant detected near Village A
  - `🟠 MEDIUM RISK`: Elephant movement detected in Zone B
  - `🟢 LOW RISK`: Elephant detected in forest corridor
- One-click Rapid Response Unit (QRU) dispatch modal and solar acoustic siren activation.

### **Section 5 — Data Analysis & Conservation Intelligence**
- **A. Elephant Corridor Identification**: Route mapping (`Forest A ────────→ Forest B`), connectivity scores, and bottleneck analysis.
- **B. High-Risk Zone Mapping**: Spatial conflict density heatmaps and risk formula modeling.
- **C. Trend Analysis**: Daily detection frequency bar charts (`Mon, Tue, Wed, Thu, Fri, Sat, Sun`).
- **D. AI Prediction**: Next 2-hour trajectory forecasting and encounter probability (`87%`).
- **Event History Table**: Chronological audit log with multi-criteria filtering by Date, Risk, Zone, and keyword search.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone repository
git clone <YOUR_REPO_URL>
cd elephant-conservation-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be running at `http://localhost:5173`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🛠️ Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Lucide React Icons
- **Mapping**: Leaflet + OpenStreetMap
- **Data Visualization**: Recharts
- **Telemetry Engine**: React Context + Real-time event simulator
