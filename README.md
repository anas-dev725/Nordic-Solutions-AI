# Nordic Solutions AI 🇩🇰🤖

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind--CSS-4.x-38B2AC.svg)](https://tailwindcss.com/)
[![TS](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![Motion](https://img.shields.io/badge/Motion-12.x-F43F5E.svg)](https://motion.dev/)

A premium, Scandi-minimalist, high-performance web application designed for Danish and Nordic enterprises. **Nordic Solutions AI** delivers bespoke vocal integrations, real-time CRM connector pipelines, and state-of-the-art workflow automatons, designed specifically for clean, secure, GDPR-compliant performance.

---

## 🎨 Design Philosophy & Theme

Designed purely on the tenets of **Scandinavian Modernism**:
*   **Warm Sand vs. Deep Obsidian Theme**: Support for toggling between a warm tactile editorial texture and a high-contrast charcoal slate design.
*   **Aesthetic Typographic Pairings**: Clean, high-readability `Inter` for intuitive UI operations, configured with elegant `Playfair Display`/`Space Grotesk` display typography, and balanced by `JetBrains Mono` for precise systems payload simulation details.
*   **Perfect Micro-Animations**: Smooth UI transitions powered by `motion` (`motion/react`) with custom bezier ease curves.
*   **No Clutter Principle**: Clean, responsive layout utilizing generous whitespace, precise touch-targets (44px min), and human-focused, literal labeling.

---

## ✨ Core Platforms & Modules

### 1. Dynamic Typewriter Hero Text
An interactive typewriter banner that cycles gracefully between custom-crafted enterprise declarations in both Danish and English:
*   *\"bygget til nordiske virksomheder\"* / *\"tailored for Nordic enterprises\"*
*   *\"automatiseret med absolut præcision\"* / *\"automated with absolute precision\"*
*   *\"designet til skandinavisk vækst\"* / *\"designed for Scandinavian growth\"*
*   *\"udviklet til kompromisløs drift\"* / *\"engineered for flawless operations\"*

### 2. Live Agent Sandbox
An interactive, client-authoritative simulator where prospects can customize:
*   **Agent Persona** (Warm front desk assistant, formal advisor, technical gateway)
*   **Synthetic Voice Engine** (Danish neural dialects, local regional accents, standard English voice)
*   **Target API Integrations** (HubSpot ERP, Salesforce CRM database, custom JSON Webhooks)

### 3. Scandinavian ROI Calculator
A fully functional interactive financial calculator custom-tuned to Danish business structures (calculating saved receptionist costs, employee hours recovered, and CRM processing times), providing direct instant cash-equivalent monthly and annual savings graphs.

### 4. Transparent Investment Packaging
Detailed, clear, modular investment tiers tailored for Nordic businesses:
*   **AI Pilot/Grundlag**: Suited for local clinical hubs or boutique service desks.
*   **Core Systems/Active**: Tailored to full scale automated CRM syncs, CVR registries payload enrichment, and priority SLAs.
*   **Enterprise Support/Unlimited**: Dedicated private cloud nodes (Frankfurt/Copenhagen clusters), non-disclosure agreements, and custom legacy SAP integrations.

### 5. In-Depth GDPR FAQ Accordion
An interactive panel addressing secure TLS 1.3 transits, CPR-indicator automatic masking, Datatilsynet guidelines, and zero-lock-in IP data ownership policies.

---

## ⚙️ Project File Structure

```
├── src/
│   ├── components/
│   │   ├── FaqAccordion.tsx        # Interactive GDPR FAQ accordion
│   │   ├── InquiryRoadmap.tsx      # Process onboarding pipeline visualizer
│   │   ├── PricingPackages.tsx     # Transparent Danish/English business packages
│   │   ├── RoiCalculator.tsx       # Live savings feedback metric tool
│   │   ├── ServicePages.tsx        # Detail flyouts for technical offerings
│   │   └── Typewriter.tsx          # Real-time writing effects for subheading rotation
│   ├── App.tsx                     # Primary layout core, view orchestrator & themes
│   ├── main.tsx                    # React client mounting configuration
│   ├── index.css                   # Custom global Tailwind directives & Google Font imports
│   └── types.ts                    # Strongly typed definitions for CRM triggers & languages
├── index.html                      # DOM structure shell
├── vite.config.ts                  # Vite builder plug orchestration
└── package.json                    # Active build script & packaging configurations
```

---

## 🚀 Quick Start / Development

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone <repository_url>
cd <repository_directory>

# Install npm dependencies
npm install
```

### 2. Start the Development Server
```bash
# Starts Vite on port 3000
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 3. Lint the Project
Ensure type-safety and check for any syntax errors:
```bash
npm run lint
```

### 4. Build for Production
To generate a fully optimized client-side distribution bundle:
```bash
npm run build
```
This produces static artifacts ready for direct container hosting inside the `dist/` directory.

---

## 🛡️ Security & Compliance Standards

*   **GDPR Compliant**: Zero client database storage of personal identifiers without direct CPR encryption gateway filters.
*   **No Exponent Lock-In**: Built entirely on modular, multi-vendor REST/gRPC structures.
*   **No Key Leaking**: Server-side proxies must be used for any sensitive API secrets (`process.env.GEMINI_API_KEY`, etc.), adhering to strict secure enterprise architectural practices.

---

© 2026 Nordic Solutions AI. All Rights Reserved. Crafted for premium digital operations.
