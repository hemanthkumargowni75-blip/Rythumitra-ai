# RythuMitra AI (రైతుమిత్ర AI)
> **మీ పొలానికి మేము దగ్గరగా.**  
> *Intelligent farming support, right from your field.*

---

## 👥 AGRI VISION AI

RythuMitra AI is conceived, architected, and built by **AGRI VISION AI** — a multidisciplinary engineering team dedicated to empowering Indian agriculture through artificial intelligence, authoritative spatial data, and farmer-centric design.

### Team Members:
1. **G. Heamnth Kumar**
2. **T. Nanda Kumar**
3. **K. Vijayandra Achari**
4. **T. Keerthana Abayaan**
5. **V. Sindhu**
6. **P. Suma**

---

### G. Hementh Kumar
**Team Lead & Full-Stack Development**
* **Responsibilities**:
  * Project architecture
  * Frontend/backend integration
  * Authentication
  * Database architecture
  * API integration
  * Deployment
  * GitHub/repository management
  * Production integration

### T. Nanda Kumar
**AI & Gemini Integration**
* **Responsibilities**:
  * Gemini API
  * AI farmer assistant
  * AI prompt/context management
  * AI question answering
  * Crop recommendation engine
  * AI testing and evaluation

### K. Vijayendra Achari
**Agronomy & Crop Intelligence**
* **Responsibilities**:
  * Crop database
  * Crop varieties
  * Crop growth stages
  * Soil intelligence
  * Fertilizer planning
  * Irrigation logic
  * Pest/disease knowledge
  * Crop-management rules

### T. Keerthana Abayaan
**UI/UX & Farmer Experience**
* **Responsibilities**:
  * Farmer dashboard
  * Responsive/mobile UI
  * Accessibility
  * Multilingual UI
  * Farmer education slides
  * UI consistency
  * Farmer-friendly workflows

### V. Sindhu
**Location, GPS & Data Management**
* **Responsibilities**:
  * States
  * Districts
  * Mandals/sub-districts
  * Villages
  * PIN/postal mappings
  * GPS
  * Reverse geocoding
  * Location search
  * Location validation

### P. Suma
**Weather, Market & Farmer Support**
* **Responsibilities**:
  * Weather integration
  * Agricultural weather interpretation
  * Market intelligence
  * Notifications and alerts
  * Farmer education content
  * Functional testing
  * User-support workflows

---

## 🎯 Problem Statement
Smallholder and marginal farmers across India face severe compounding challenges that diminish agricultural yield, inflate input expenditures, and erode household income:
1. **Fragmented & Delayed Advisory**: Critical agronomic guidance regarding fertilizer dosage, disease management, and irrigation timings often reaches farmers too late or in overly generic formats that ignore hyper-local soil and climate conditions.
2. **Language & Literacy Barriers**: Complex technical bulletins and English-centric web portals alienate rural farmers who need intuitive, audio-visual guidance in their mother tongue (such as Telugu, Hindi, Tamil, Kannada).
3. **Volatile Market Transparency**: Lack of verified, real-time APMC/e-NAM mandi prices leads to predatory middleman pricing and unfavorable distress selling at harvest.
4. **Disorganized Farm Records**: Farmers lack accessible digital passbooks to record historic yields, input investments, soil health tests, and seasonal crop treatments needed for credit and crop insurance.

---

## 💡 Solution: RythuMitra AI
**RythuMitra AI** is a comprehensive, production-ready agricultural intelligence platform engineered specifically for Indian farmers. By combining **authoritative administrative spatial hierarchies**, **local agro-climatic sensor/weather streams**, **computer-vision crop leaf diagnostics**, **multilingual voice assistance**, and **Google Gemini Generative AI**, RythuMitra AI transforms everyday smartphones into personalized, expert agronomic companions.

### Complete Farmer Journey
```text
Registration (Name + Mobile)
   ↓
2Factor SMS OTP Verification
   ↓
Personalized Farmer Profile
   ↓
Farm Setup & Field Boundaries
   ↓
GPS Coordinates / LGD Location Hierarchy
   ↓
Crop Selection & Soil Type Analysis
   ↓
Hyper-Local Agro-Weather Forecast
   ↓
Leaf Disease Camera Scanner (WebRTC)
   ↓
AI Diagnostic & Severity Assessment
   ↓
Targeted Fertilizer & Irrigation Guidance
   ↓
Crop Protection (Chemical & Organic Remedies)
   ↓
Live Mandi Market Intelligence & Price Alerts
   ↓
Voice-Enabled Gemini AI Advisory
   ↓
Agricultural Expert Follow-Up
   ↓
Permanent Seasonal Farm History & Passbook
```

---

## 🚜 Major Features

### 1. Robust Authentication & 2-Factor OTP Security
- **Mandatory 2-Factor Authentication**: Every registration, password-based login, forgot-password reset, and password modification operation enforces server-side SMS OTP verification.
- **2Factor.in Integration**: Enterprise SMS gateway architecture with automatic payload normalization, 10-digit phone canonicalization, and delivery fallback.
- **Zero IDOR Vulnerability**: All farmer profiles, farm boundaries, and search histories are cryptographically scoped to the authenticated session user ID.
- **Cryptographic Security**: Passwords hashed using memory-hard `scrypt` with per-user cryptographic salts. OTP challenges stored as SHA-256 digests with 5-minute expiry, 3-attempt throttling, and 60-second resend cooldowns.

### 2. Authoritative India Location Intelligence (LGD Hierarchy)
- Complete 5-tier administrative model:
  $$\text{State} \longrightarrow \text{District} \longrightarrow \text{Mandal / Sub-District} \longrightarrow \text{Village} \longrightarrow \text{PIN Code / Post Office}$$
- **Strict Terminology Enforcement**: For Andhra Pradesh and Telangana, UI labels, search queries, and database records strictly use **"Mandal"** (`"మండలం"`), fully respecting state administrative nomenclature.
- **Live LGD Ingestion**: Ingested directly from the Government of India Local Government Directory (`lgdirectory.gov.in`) using automated DWR RPC ingestion scripts:
  - **Andhra Pradesh**: 26 / 26 canonical districts verified, **655 authoritative mandals**.
  - **Telangana**: 33 / 33 canonical districts verified, **621 authoritative mandals**.
  - **Total Mandals**: **1,276 verified mandals** with genuine LGD subdistrict codes.
- **Contextual Search Disambiguation**: Resolves duplicate mandal and village names across districts with complete contextual formatting (e.g., `"Dharmavaram, Dharmavaram (Mandal), Sri Sathya Sai, Andhra Pradesh, PIN: 515671, Post Office: Dharmavaram H.O"`).
- **Cascading Selection**: Selecting a State clears District, Mandal, Village, and PIN. Selecting a District clears Mandal, Village, and PIN. Selecting a Mandal clears Village and PIN. Selecting a Village auto-loads official PIN and post office details.
- **Administrative Quality Dashboard** (`/admin/locations`): Displays live calculated metrics, total mandal counts, coverage ratios, and zero orphan records.

### 3. Crop Intelligence & Varietal Database
- Comprehensive crop profiles covering cereals (Paddy, Maize, Jowar), pulses (Red Gram, Bengal Gram, Black Gram), oilseeds (Groundnut, Sunflower, Castor), commercial crops (Cotton, Sugarcane, Chilli, Tobacco), horticulture (Mango, Banana, Sweet Orange, Tomato), and spices (Turmeric, Coriander).
- Detailed agronomic profiles including sowing windows, seed rates, soil requirements, spacing, growth stages, critical irrigation stages, and expected yield ranges.

### 4. Soil Intelligence & Nutrient Management
- Analyzes soil physical properties (Red Loam, Black Cotton, Alluvial, Sandy Loam, Laterite, Coastal Sand).
- Tailored N-P-K nutrient dosage schedules, micro-nutrient recommendations (Zinc, Boron, Ferrous Sulphate), and organic amendments (FYM, Vermicompost, Neem Cake).
- pH correction advisories for alkaline and saline soils prevalent in Rayalaseema and coastal belts.

### 5. WebRTC Leaf Disease Camera Scanner
- Hardware-accelerated camera scanner utilizing browser `navigator.mediaDevices.getUserMedia` with rear camera (`facingMode: "environment"`) selection.
- High-resolution viewfinder with interactive crop bounds, leaf alignment crosshairs, and capture review.
- Fallback image upload supporting JPEG/PNG/WebP leaf image files.

### 6. Voice Assistant & Multilingual Speech Processing
- Interactive voice assistant powered by Web Speech API (`SpeechRecognition` and `SpeechSynthesis`) with real-time Telugu speech synthesis.
- Server-side Whisper speech-to-text API fallback (`/api/v1/voice/transcribe`) for noisy rural environments.
- 7 supported Indian languages: Telugu (`te` - default), English (`en`), Hindi (`hi`), Tamil (`ta`), Kannada (`kn`), Malayalam (`ml`), and Marathi (`mr`).

### 7. Weather & Agro-Climatic Intelligence
- Hyper-local current conditions: temperature, relative humidity, wind speed, precipitation probability, and UV index.
- 7-day agricultural weather forecast with operational advisories: optimal spraying windows, fertilizer application safety, rain warnings, and irrigation cutoffs.

### 8. Dynamic Market Intelligence & Mandi Comparisons
- Live APMC mandi price tracking for regional markets across Andhra Pradesh and Telangana (Guntur Chilli Yard, Kurnool, Adoni, Khammam, Warangal, Nizamabad).
- Price comparison matrices showing minimum, modal, and maximum prices per quintal, along with 7-day price trajectory alerts.

### 9. Google Gemini AI Agronomic Advisor
- Context-aware agricultural assistant powered by Google Gemini (`/api/v1/ai/ask`).
- Automatically enriches farmer prompts with the authenticated farmer's saved crop, soil, growth stage, and district context before synthesis.
- Strictly provides actionable, safe, and culturally relevant recommendations without theoretical jargon.

### 10. Farmer Passbook & Expert Consultation
- Digital seasonal passbook logging farmer operations, scouting records, fertilizer applications, and harvesting milestones.
- Expert consultation request portal enabling direct escalations to agricultural scientists and university extension officers.

---

## 🏗️ Architecture Overview

```text
                               +------------------------------------------+
                               |            Farmer / Agronomist           |
                               +------------------------------------------+
                                                    |
                                    HTTPS / WebRTC / Web Speech
                                                    |
                                                    v
+--------------------------------------------------------------------------------------------------+
|                            RythuMitra AI Web Application (Next.js 14)                            |
|                                                                                                  |
|  +-------------------------------------+        +---------------------------------------------+  |
|  |           UI / Client Layer         |        |             Server / API Routes             |  |
|  | - Farmer Dashboard & Passbook       |        | - /api/v1/auth/* (OTP, Session, Passwords)  |  |
|  | - LocationSelector (5-Tier Cascade) |        | - /api/v1/locations/* (LGD & Postal Engine) |  |
|  | - WebRTC Camera Leaf Scanner        | <====> | - /api/v1/crops/* (Agronomy & Search)       |  |
|  | - VoiceMicButton (Telugu Speech)    |        | - /api/v1/markets/* (e-NAM / Mandi Prices)  |  |
|  | - Leaflet Farm Boundary Mapping     |        | - /api/v1/ai/ask (Gemini AI Gateway)        |  |
|  | - LanguageContext (7 Languages)     |        | - /api/v1/voice/transcribe (Whisper Audio)  |  |
|  +-------------------------------------+        +---------------------------------------------+  |
+--------------------------------------------------------------------------------------------------+
                                                    |
                                                    | Internal Microservice / Providers
                                                    v
+-----------------------+  +-----------------------+  +----------------------+  +--------------------+
|    2Factor.in SMS     |  |   Google Gemini AI    |  | India LGD & Post API |  | OpenWeather / IMD  |
|  Server-side OTP Auth |  | Agricultural Engine   |  | Hierarchy & PIN Code |  | Real-time Weather  |
+-----------------------+  +-----------------------+  +----------------------+  +--------------------+
                                                    |
                                                    v
+--------------------------------------------------------------------------------------------------+
|                                    Data & Persistence Layer                                      |
|                                                                                                  |
|  - Relational Database: PostgreSQL 16 + PostGIS (Spatial farm boundaries & polygons)             |
|  - Fast Storage Engine: Synchronous atomic JSON DB with in-memory freshness caching              |
|  - Session & OTP Store: Memory-hard scrypt hashes, 64-char SHA-256 tokens, Redis 7              |
|  - Authoritative Location Index: 1,276 Mandals, 59 Districts, 1,283 Villages & Postal Mappings    |
+--------------------------------------------------------------------------------------------------+
```

---

## 🛠️ Technology Stack

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 14 (App Router)**, **React 18** | Server-side rendering, client hydration, and progressive web application shell. |
| **Language & Types** | **TypeScript 5.6** | Strict end-to-end type safety across API payloads, spatial entities, and models. |
| **Styling & Design** | **Tailwind CSS 3.4**, **Lucide Icons** | Mobile-first responsive UI, agricultural palette, and accessible micro-interactions. |
| **Spatial Mapping** | **Leaflet 1.9**, **OpenStreetMap** | Interactive field boundary tracing, GPS pinning, and farm polygon mapping. |
| **Visual Delights** | **Canvas-Confetti** | Rewarding positive farmer milestones (registration completion, soil test saves). |
| **AI & LLM** | **Google Gemini AI SDK** | Contextual agricultural advisory, query disambiguation, and reasoning. |
| **Audio & Speech** | **Web Speech API**, **MediaRecorder** | Hands-free field interaction and multilingual voice assistance. |
| **Backend & APIs** | **Next.js Route Handlers**, **FastAPI 0.110** | High-performance REST endpoints and spatial Python microservices. |
| **Geospatial Processing**| **Shapely 2.0**, **GeoPandas 0.14** | Farm polygon geometric computations and spatial point-in-polygon queries. |
| **Databases** | **PostgreSQL 16 + PostGIS 3.4**, **Redis 7** | Spatial farm storage, session caching, and rate limiting. |
| **Authentication** | **2Factor.in SMS API**, **Scrypt**, **SHA-256** | Secure mandatory two-factor authentication and token issuance. |

---

## 🔒 Security & Data Protection

1. **Server-Side Secret Isolation**: All provider credentials (`TWOFACTOR_API_KEY`, `GEMINI_API_KEY`, `DATABASE_URL`, `JWT_SECRET`) are strictly loaded via server-side environment variables and are never bundled into client-side JavaScript.
2. **Memory-Hard Password Hashing**: Passwords are encrypted using `scrypt` (`N=16384, r=8, p=1`) with unique cryptographic salts. Passwords are never returned in API responses, never logged, and never stored in plaintext.
3. **Cryptographic OTP Hashing**: Verification codes are salted and stored strictly as 64-character SHA-256 digests.
4. **Rate Limiting & Anti-Brute-Force**: OTP challenges are locked after 3 failed attempts, expire after 300 seconds (5 minutes), and enforce a 60-second cooldown between resend requests.
5. **HTTPS Enforcement**: WebRTC camera, speech recognition, and geolocation strictly enforce secure browser contexts. Production deployment configurations provide Mozilla Modern TLS 1.3 reverse proxies with HSTS, X-Content-Type-Options, and CSP headers.
6. **No Fake Authoritative Claims**: Test scripts and synthetic data are completely separated from authoritative Government of India datasets.

---

## 📊 Authoritative Data Sources & Provenance

RythuMitra AI prioritizes radical transparency regarding where agricultural recommendations and administrative records originate:

| Domain | Authoritative Provider | Provenance & Update Frequency |
| :--- | :--- | :--- |
| **Administrative Locations** | **Local Government Directory (LGD)**, Ministry of Panchayati Raj, Govt. of India | Official DWR service (`https://lgdirectory.gov.in/`). Ingested 26 AP + 33 TS districts and 1,276 mandals. |
| **Postal & PIN Codes** | **Department of Posts**, Ministry of Communications, Govt. of India | India Post open dataset cross-referencing sub-district postal delivery offices. |
| **Mandi Market Prices** | **e-NAM** (National Agriculture Market) / **AGMARKNET**, Directorate of Marketing & Inspection | Daily wholesale prices for notified agricultural commodities across regional markets. |
| **Weather Forecasts** | **India Meteorological Department (IMD)** & Authorized Agro-Weather Gateways | Gridded satellite weather and hyper-local station data updated every 3 hours. |
| **Agronomic Science** | **ICAR** (Indian Council of Agricultural Research) & State Agricultural Universities | Verified crop production packages, pest thresholds, and soil test nutrient indices. |

> *Disclaimer: RythuMitra AI independently utilizes open government datasets and authorized APIs. The application does not claim official government endorsement or affiliation.*

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory by copying the template:

```bash
cp .env.example .env.local
```

Populate the required environment variables:

```env
# ==============================================================================
# RythuMitra AI — Environment Configuration (.env.example)
# ==============================================================================

# Core Application Settings
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_APP_NAME="RythuMitra AI"
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# Authentication & SMS OTP (2Factor.in)
# Obtain from https://2factor.in/
TWOFACTOR_API_KEY=your_2factor_api_key_here

# Generative AI (Google Gemini)
# Obtain from https://aistudio.google.com/
GEMINI_API_KEY=your_gemini_api_key_here

# Database & Sessions
DATABASE_URL=postgresql://rythu_admin:password@localhost:5432/rythumitra_db
JWT_SECRET=your_secure_random_64_character_hex_string
NEXTAUTH_SECRET=your_nextauth_session_secret
SESSION_COOKIE_NAME=rm_session

# Agro-Climatic & Market Data APIs
WEATHER_API_KEY=your_weather_api_key_here
MARKET_API_KEY=your_market_api_key_here
```

> [!WARNING]
> **Never commit `.env` or `.env.local` to Git.** Ensure real API keys are securely managed via your production secret manager.

---

## 🚀 Setup & Local Development

### Prerequisites
- **Node.js**: v18.17+ or v20.x installed
- **npm**: v9.x or v10.x
- **Git**: Installed and configured

### 1. Clone Repository
```bash
git clone https://github.com/<your-username>/rythumitra-ai.git
cd rythumitra-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
```bash
npm run build
npm start
```

### 5. Run Verification Suites
```bash
# Run Location Hierarchy Verification (91 assertions)
node scratch/test_ap_ts_location_system.js

# Run 59 AP/TS Districts Full Mandal Coverage (12 assertions)
node scratch/test_all_districts_coverage.js

# Run Password + OTP Security & Auth Suite (61 assertions)
node scratch/test_password_otp_flows.js
```

---

## 🌐 Deployment

### Vercel (Primary Web & API Deployment)
RythuMitra AI is self-contained within the Next.js 14 full-stack architecture, allowing complete deployment on Vercel:

```text
GitHub Repository (main)
        ↓ (Automatic CI/CD Deployment)
Vercel Edge & Serverless Platform
        ↓
Next.js 14 Web Application & API Routes (/api/v1/*, /api/health)
```

1. **Import Project**: In Vercel, click **Add New → Project** and import `hemanthkumargowni75-blip/rythumitra-ai`.
2. **Preset**: Select **Next.js** (automatically detected).
3. **Build Settings**:
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`
4. **Environment Variables**: Configure server-side credentials in **Settings → Environment Variables** (do not expose secrets with `NEXT_PUBLIC_` prefix).

### Render (Auxiliary Backend Microservice — Optional)
The Python/FastAPI geospatial microservice in `backend/` is available as an auxiliary service and configured via `render.yaml`:

```text
GitHub Repository (main)
        ↓
Render Web Service (Oregon / Python 3.11)
        ↓
FastAPI Microservice (backend/app/main.py on 0.0.0.0:$PORT)
```
- **Build Command**: `pip install --upgrade pip && pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Health Check Path**: `/health`
- **CORS Config**: Set `FRONTEND_ORIGIN` to your Vercel production domain.

---

## ✅ Production Deployment Checklist
- [x] **GitHub**: Source repository configured on `main` branch.
- [x] **Vercel Readiness**: Next.js 14 production build verified (`npm run build` succeeds).
- [x] **Deployment Health**: `/api/health` endpoint operational.
- [x] **Zero Hardcoded Secrets**: Scanned and verified across all tracked files.
- [x] **CORS**: `FRONTEND_ORIGIN` parameter configured for FastAPI backend.
- [ ] **External Database**: Connect production PostgreSQL / PostGIS via `DATABASE_URL` (critical: local JSON `data/*.db.json` is not persistent across Vercel serverless functions).
- [ ] **Persistent Object Storage**: Configure S3 / cloud bucket for farmer crop photos.
- [ ] **2Factor SMS Credentials**: `TWOFACTOR_API_KEY` set in Vercel project settings.
- [ ] **Google Gemini AI Credentials**: `GEMINI_API_KEY` set in Vercel project settings.
- [ ] **HTTPS / Custom Domain**: SSL/TLS certificate enabled (required for WebRTC camera, speech recognition, and GPS).

---

## 📌 Project Status

**Current Status**: `Production Candidate (v1.0.0-rc1)`

- ✅ **Authentication**: 100% complete with mandatory 2Factor SMS OTP, scrypt password security, and IDOR protection.
- ✅ **Location Engine**: 100% complete for Andhra Pradesh (26 districts, 655 mandals) and Telangana (33 districts, 621 mandals) with genuine LGD codes.
- ✅ **Agronomy & Crops**: 100% complete with multi-stage recommendations for 20+ staple crops.
- ✅ **Camera & Leaf Scanner**: 100% complete with WebRTC camera capture and fallback upload.
- ✅ **Multilingual Voice**: 100% complete with Web Speech synthesis and 7-language localization.
- ✅ **Automated Testing**: 164 / 164 verified end-to-end test assertions passed.
- 🔄 **Cloud Deployment**: Production HTTPS Docker Compose containers ready for containerized deployment.

---

## 🔮 Future Scope
1. **Satellite Multispectral NDVI Monitoring**: Integrating Sentinel-2 / Landsat imagery to generate vegetative health heatmaps directly across traced farm boundaries.
2. **IoT Soil Sensor Telemetry**: Automated ingestion from Bluetooth and LoRaWAN soil moisture, pH, and nitrogen probes.
3. **Offline-First PWA Sync**: IndexedDB offline caching enabling full diagnosis and farm journaling in zero-connectivity field zones, syncing upon reconnect.
4. **Community Farmer Forum**: Verified peer-to-peer farmer knowledge sharing with agronomic moderation.

---

## 📄 License & Attribution
Developed with pride by **AGRI VISION AI** for the farmers of India.  
*RythuMitra AI — Empowering Every Acre with Intelligence.*
