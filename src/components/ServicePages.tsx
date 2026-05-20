import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  PhoneCall, 
  Cpu, 
  Globe, 
  Bot, 
  CheckCircle, 
  ShieldCheck, 
  Workflow, 
  TrendingUp, 
  Zap, 
  Layers, 
  Database,
  ArrowRight,
  Phone,
  MessageSquare
} from 'lucide-react';

interface ServicePageProps {
  language: 'da' | 'en';
  theme: 'sand' | 'slate' | 'sage';
  onBack: () => void;
  onGoToSandbox: (tab: 'voice' | 'crm' | 'roi') => void;
  onGoToRoadmap: () => void;
}

export function ServicePages({ language, theme, onBack, onGoToSandbox, onGoToRoadmap }: ServicePageProps) {
  // Let us check the active service page type by looking at custom query states or we can render all three page layouts dynamically according to parent page selection
  return null;
}

// 1. VOICE SERVICE PAGE
export function VoiceServicePage({ language, theme, onBack, onGoToSandbox, onGoToRoadmap }: ServicePageProps) {
  const isDa = language === 'da';
  
  const text = isDa ? {
    title: "AI Stemmeagenter",
    subtitle: "STALE- & KUNDEHÅNDTERING I REALTID",
    headline: "Næste generations AI, der besvarer telefonen, forstår jyske & københavnske dialekter og opdaterer jeres systemer på flyvende dansk.",
    intro: "Tidligere var telefonsvarere stive og robotagtige. Nordics Solutions introducerer kognitive stemmeløsninger bygget på avancerede sprogmodeller. Vores agenter lytter, analyserer hensigt og taler flydende dansk med naturlig intonation. De tøver ikke, laver ingen fejl, og arbejder 24 timer i døgnet.",
    tabSim: "Prøv vores live simulationstest",
    tabRoad: "Bestil skræddersyet blueprint",
    back: "Tilbage til forsiden",
    architectureTitle: "Bespoke System Arkitektur",
    useCasesTitle: "3 Strategiske Brugsscenarier",
    roiTitle: "Dansk Afkast-Matrix (ROI)",
    specTitle: "Tekniske Specifikationer",
    useCases: [
      {
        title: "1. Automatiseret Mødebooking for Rådgivere & Klinikker",
        desc: "Når en patient eller klient ringer ind, forstår stemmeagenten hensigten, anmoder om CPR/kunde-id, tjekker jeres kalender-API i realtid og booker en ledig tid. Samtidig oprettes eller opdateres journalen direkte i jeres interne bookingsystem.",
        metric: "Effekt: Spildtid på telefonkøer reduceres til 0 minutter."
      },
      {
        title: "2. Outbound Lead-Kvalificering efter Kampagner",
        desc: "Glem alt om manuelle kolde og lunkne opkald. Voice Agenten ringer automatisk ud til ventelister eller tilmeldte emner, introducerer løsningen høfligt, screener efter budget og interesse, og logger øjeblikkeligt resultatet i HubSpot. Kun varme, godkendte leads sendes videre til jeres salgsteam.",
        metric: "Effekt: Sælgere bruger udelukkende tid på klar-til-køb leads."
      },
      {
        title: "3. Akut Kundesupport & Vagthavende-gateway 24/7",
        desc: "Perfekt til el-installatører, logistikfirmaer og forsyning. Ved opkald udenfor åbningstid kategoriserer AI'en fejlens alvorlighed. Hvis kritisk, overføres opkaldet til vagthavende medarbejder; hvis ikke, oprettes en sag i systemet og kunden informeres via SMS.",
        metric: "Effekt: Fuld tryghed for slutkunden uden dyre nattevagts-tillæg."
      }
    ]
  } : {
    title: "Cognitive AI Voice Agents",
    subtitle: "INTELLIGENT SPEECH PLATFORMS 24/7",
    headline: "Bespoke speech-enabled assistants answering corporate calls, booking meetings, and updating your CRM within seconds.",
    intro: "Traditional interactive voice responses are rigid and confusing. We conceptualize fluid human-like cognitive vocal pipelines. Our custom agents listen, recognize context, analyze customer intent, and execute back-end actions flawlessly in fluent Danish, Swedish, and English.",
    tabSim: "Trigger live simulator test",
    tabRoad: "Configure custom blueprint",
    back: "Back to Home",
    architectureTitle: "Bespoke Integration Topology",
    useCasesTitle: "3 High-Impact Enterprise Use Cases",
    roiTitle: "Calibrated Financial Projections",
    specTitle: "Technical Specifications Matrix",
    useCases: [
      {
        title: "1. Automated Appointment Booking & Check-In",
        desc: "Incoming callers are greeted instantly. The voice agent parses calendar API openings, registers customer contact info, reserves the direct slot, and writes detailed record summaries straight into HubSpot or Salesforce.",
        metric: "Impact: Front-desk phone support overhead drops by 76%."
      },
      {
        title: "2. Dynamic Outbound Campaign Screening",
        desc: "Scale outbound prospecting effortlessly. The agent queries cold or warm subscriber lists, gauges budget sizes or timeline fit in natural speech, and logs structured scores in CRM pipelines, pinging sales reps with Hot leads.",
        metric: "Impact: Closes lead lag times from 14 hours to 0 seconds."
      },
      {
        title: "3. 24/7 Emergencies Dispatching & Issue Triage",
        desc: "Ideal for logistics, utility, and infrastructure firms. AI classifies incoming emergency parameters, triggers corporate incident response webhooks, or files automated tickets, alerting backup officers selectively.",
        metric: "Impact: Guarantees 100% SLA coverage without night shift labor premiums."
      }
    ]
  };

  const c = getThemeColorClasses(theme);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      {/* Back button */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 mb-8 opacity-75 hover:opacity-100 transition-opacity text-xs font-mono tracking-wider uppercase cursor-pointer text-current"
      >
        <ArrowLeft className="w-4 h-4" />
        {text.back}
      </button>

      {/* Hero Header */}
      <div className="border-b pb-8 border-current/10 mb-12">
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#A3B18A] block mb-2">
          {text.subtitle}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight mb-4">
          {text.title}
        </h1>
        <p className="text-sm sm:text-base max-w-3xl leading-relaxed font-serif italic opacity-90 mt-2">
          {text.headline}
        </p>
      </div>

      {/* Grid: Description and CTA Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main core content */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Deep intro */}
          <section className="space-y-4">
            <p className="text-xs sm:text-sm leading-relaxed text-current/80 font-sans">
              {text.intro}
            </p>
          </section>

          {/* Three strategic use cases */}
          <section className="space-y-6">
            <h3 className="text-lg sm:text-xl font-display font-semibold tracking-tight">
              {text.useCasesTitle}
            </h3>
            
            <div className="space-y-5">
              {text.useCases.map((uc, i) => (
                <div key={i} className={`p-5 rounded-2xl border ${c.card} space-y-3`}>
                  <h4 className="font-sans font-medium text-sm text-current">
                    {uc.title}
                  </h4>
                  <p className="text-xs leading-relaxed opacity-75">
                    {uc.desc}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {uc.metric}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Flow Architecture section */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-display font-semibold tracking-tight">
              {text.architectureTitle}
            </h3>
            <p className="text-xs opacity-75 font-sans leading-relaxed">
              {isDa 
                ? "Billedet nedenfor simulerer signalflowet for et typisk opkald besvaret af vores integrerede AI Stemmeagenter. Systemet forbinder telefoni med webhooks og databaser på under 300 millisekunder."
                : "The blueprint diagram below maps a typical call flow. We maintain ultra-low latency bridging raw audio signals to system databases in under 300ms."}
            </p>

            {/* Simulated Architecture visual sketch with tailwind nodes */}
            <div className="border border-current/10 rounded-2xl p-6 bg-[#0F1210] text-[#A3B18A] font-mono text-[10.5px] space-y-4 shadow-inner">
              <div className="text-[9px] text-white/40 uppercase tracking-widest font-bold border-b border-white/5 pb-2">
                SIGNAL FLOW // REAL-TIME COGNITIVE DIALER
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                
                {/* Node 1 */}
                <div className="border border-white/10 p-3 rounded-xl bg-white/5 space-y-1">
                  <span className="text-amber-500 block font-bold">[TRIN 01]</span>
                  <span className="font-bold text-white uppercase text-[10px]">Indgående Opkald</span>
                  <p className="text-[10px] opacity-60">
                    {isDa ? "Opkald modtages fra teleselskabets gateway." : "Caller dials in via SIP trunk protocol."}
                  </p>
                </div>

                {/* Node 2 */}
                <div className="border border-white/10 p-3 rounded-xl bg-white/5 space-y-1">
                  <span className="text-[#A3B18A] block font-bold">[TRIN 02]</span>
                  <span className="font-bold text-white uppercase text-[10px]">Whisper STT & AI</span>
                  <p className="text-[10px] opacity-60">
                    {isDa ? "Konverterer tale til tekst, tolker hensigt og humør." : "Speech-to-Text converts audio, maps intent filters."}
                  </p>
                </div>

                {/* Node 3 */}
                <div className="border border-white/10 p-3 rounded-xl bg-white/5 space-y-1">
                  <span className="text-[#A3B18A] block font-bold">[TRIN 03]</span>
                  <span className="font-bold text-white uppercase text-[10px]">API Integration</span>
                  <p className="text-[10px] opacity-60">
                    {isDa ? "Slår kunden op i CVR og forespørger HubSpot." : "Queries the Danish CVR and matches CRM records."}
                  </p>
                </div>

                {/* Node 4 */}
                <div className="border border-white/10 p-3 rounded-xl bg-white/5 space-y-1">
                  <span className="text-emerald-500 block font-bold">[TRIN 04]</span>
                  <span className="font-bold text-white uppercase text-[10px]">Syntese (TTS)</span>
                  <p className="text-[10px] opacity-60">
                    {isDa ? "Svarer kunden med flyvende dansk tale." : "Synthesizes ultra-real human speech response."}
                  </p>
                </div>

              </div>

              <div className="text-center text-[9px] text-[#A3B18A]/60 animate-pulse border-t border-white/5 pt-2">
                ⬤ SYSTEM LATENCY: ~280ms // STT-TTS PIPELINE: ACTIVE
              </div>
            </div>
          </section>

        </div>

        {/* Right Sidebar stats and tools links */}
        <div className="space-y-6">
          
          {/* ROI metrics highlight info */}
          <div className={`p-6 rounded-2xl border ${c.card} space-y-4`}>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#A3B18A] font-bold">
              {text.roiTitle}
            </h4>
            
            <div className="space-y-4 text-xs">
              <div className="border-b pb-3 border-current/10">
                <span className="block opacity-65 text-[10px] uppercase font-mono">
                  {isDa ? "Besparelse på medarbejdertimer" : "Labor savings potential"}
                </span>
                <span className="text-lg font-bold font-display text-current">70% til 90%</span>
              </div>
              <div className="border-b pb-3 border-current/10">
                <span className="block opacity-65 text-[10px] uppercase font-mono">
                  {isDa ? "Gennemsnitlig svartid" : "Average response speed"}
                </span>
                <span className="text-lg font-bold font-display text-current">&lt; 1,5 sekunder</span>
              </div>
              <div>
                <span className="block opacity-65 text-[10px] uppercase font-mono">
                  {isDa ? "Implementationsfase" : "Setup delivery duration"}
                </span>
                <span className="text-lg font-bold font-display text-current">3 - 4 uger</span>
              </div>
            </div>
          </div>

          {/* Quick specs section */}
          <div className={`p-6 rounded-2xl border ${c.card} space-y-3`}>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#A3B18A] font-bold">
              {text.specTitle}
            </h4>
            <ul className="text-[11px] font-mono space-y-2 opacity-80 list-disc list-inside">
              <li>OpenAI Audio engine compliance</li>
              <li>SAML & OAuth2 database encryption</li>
              <li>Danish dial telephony compatibility</li>
              <li>Realtime HubSpot/Salesforce hooks</li>
              <li>GDPR & EU AI Act policy standard</li>
            </ul>
          </div>

          {/* Direct Actions Group */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onGoToSandbox('voice')}
              className={`w-full py-3.5 rounded-xl font-display text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all hover:translate-y-[-1px] ${c.buttonPrimary}`}
            >
              <Zap className="w-4 h-4" />
              {text.tabSim}
            </button>
            <button
              onClick={onGoToRoadmap}
              className={`w-full py-3.5 rounded-xl font-display text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all ${c.buttonSecondary}`}
            >
              <MessageSquare className="w-4 h-4" />
              {text.tabRoad}
            </button>
          </div>

        </div>

      </div>

    </motion.div>
  );
}

// 2. CRM SERVICE PAGE
export function CrmServicePage({ language, theme, onBack, onGoToSandbox, onGoToRoadmap }: ServicePageProps) {
  const isDa = language === 'da';

  const text = isDa ? {
    title: "Intelligent CRM",
    subtitle: "STÆRK DANSK DATASYNKRONISERING // AUTOMATISERET PIPELINE",
    headline: "Fjern manuel datatastning. Gør jeres HubSpot, Salesforce eller interne SQL-databasestruktur kognitiv og proaktiv.",
    intro: "Mange virksomheder taber værdifulde oplysninger, fordi konsulenter og sælgere glemmer at opdatere CRM-systemet. Med Nordics Solutions' AI-integrationslag analyseres indkommende e-mails, mødenotater og dokumenter automatisk, hvorefter de rigtige data indføres på de rette pladser. Ingen manuelle feeds, ingen fejl, fuld kontrol.",
    tabSim: "Prøv vores crm-flow simulation",
    tabRoad: "Design dit AI-roadmap",
    back: "Tilbage til forsiden",
    architectureTitle: "Bespoke System Arkitektur",
    useCasesTitle: "3 Strategiske Brugsscenarier",
    roiTitle: "Beregnet Afkast-Matrix (ROI)",
    specTitle: "Tekniske Specifikationer",
    useCases: [
      {
        title: "1. Indbakke-skrabning & Automatisk Lead-Berigelse",
        desc: "I stedet for at koble leads manuelt, skanner vores system indkommende e-mails eller ansøgninger. Systemet slår automatisk CVR-nummeret op, henter virksomhedens overskud, medarbejderantal samt branchekode, og opdaterer jeres pipeline inden for 5 sekunder.",
        metric: "Effekt: Sælgere ved med det samme, hvem de skal prioritere top-3."
      },
      {
        title: "2. Automatiseret Samtalereferat & Opfølgningsmail",
        desc: "Når et møde afsluttes på Teams eller mobiltelefonen, konverterer AI samtaleoptagelsen til et struktureret tekstresumé. Referatet opdeles automatisk efter behov, tidslinjer og næste trin, og gemmes sikkert under kunden i CRM, mens der sendes en personlig takkeskrivelse.",
        metric: "Effekt: Fuldstændig fjernelse af post-møde administrative opgaver."
      },
      {
        title: "3. Automatisk AI-lead scoring baseret på dialog",
        desc: "Ikke alle leads er lige meget værd. Vores AI-scringsmotor gennemlæser kundens henvendelse, tolker engagement, budgetstørrelse, hastighed og sammenholder det med historiske data. Systemet ændrer derefter automatisk deal-stadiet og prioriterer salgslisten.",
        metric: "Effekt: Konverteringsrater øges grundet eksplosiv responstid."
      }
    ]
  } : {
    title: "Cognitive CRM Integrations",
    subtitle: "ZERO-CHORE DATA PIPELINES // DANSK PIPELINE AUTOMATION",
    headline: "Transform HubSpot, Salesforce, or proprietary databases into proactive and automated lead closure engines.",
    intro: "Valuable sales data disappears when staff forget to type updates into the system. Our cognitive middleware reads incoming customer emails, transcribes meetings, analyzes customer pain points, and fills CRM attributes automatically. No manual copy-pasting required.",
    tabSim: "Trigger crm sandbox test",
    tabRoad: "Order custom blueprint",
    back: "Back to Home",
    architectureTitle: "Seamless Node Connectivity Blueprint",
    useCasesTitle: "3 Enterprise Workflows To Leverage Sales",
    roiTitle: "Projected Cost Reduction Matrix",
    specTitle: "Technical Compliance Matrix",
    useCases: [
      {
        title: "1. Automatic Inbound Lead Enrichment",
        desc: "When a customer submits a contact query, AI extracts critical variables, queries the official Danish CVR registry databases for profit data & headcount, and maps fields instantaneously on submission.",
        metric: "Impact: Salesteams focus strictly on high-yield accounts."
      },
      {
        title: "2. Speech-to-Text Call Logging Summaries",
        desc: "Directly parses conversation recordings, identifies next steps, registers action items, and populates clear, clean textual summaries into customer logs, drafting follow-up emails.",
        metric: "Impact: Saves up to 45 minutes of post-call typing weekly per consultant."
      },
      {
        title: "3. Algorithmic Lead Scoring & Auto Triage",
        desc: "System reviews email parameters (budget, intent indicators, technical stack), assigns a numeric priority from 1 to 100, and triggers automated SMS notifications to top sales agents.",
        metric: "Impact: Accelerates overall response speed from 6 hours to 4 minutes."
      }
    ]
  };

  const c = getThemeColorClasses(theme);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      {/* Back button */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 mb-8 opacity-75 hover:opacity-100 transition-opacity text-xs font-mono tracking-wider uppercase cursor-pointer text-current"
      >
        <ArrowLeft className="w-4 h-4" />
        {text.back}
      </button>

      {/* Hero Header */}
      <div className="border-b pb-8 border-current/10 mb-12">
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#A3B18A] block mb-2">
          {text.subtitle}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight mb-4">
          {text.title}
        </h1>
        <p className="text-sm sm:text-base max-w-3xl leading-relaxed font-serif italic opacity-90 mt-2">
          {text.headline}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main core content */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Deep intro */}
          <section className="space-y-4">
            <p className="text-xs sm:text-sm leading-relaxed text-current/80 font-sans">
              {text.intro}
            </p>
          </section>

          {/* Three strategic use cases */}
          <section className="space-y-6">
            <h3 className="text-lg sm:text-xl font-display font-semibold tracking-tight">
              {text.useCasesTitle}
            </h3>
            
            <div className="space-y-5">
              {text.useCases.map((uc, i) => (
                <div key={i} className={`p-5 rounded-2xl border ${c.card} space-y-3`}>
                  <h4 className="font-sans font-medium text-sm text-current">
                    {uc.title}
                  </h4>
                  <p className="text-xs leading-relaxed opacity-75">
                    {uc.desc}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold">
                    <Database className="w-3.5 h-3.5" />
                    {uc.metric}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Flow Architecture section */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-display font-semibold tracking-tight">
              {text.architectureTitle}
            </h3>
            <p className="text-xs opacity-75 font-sans leading-relaxed">
              {isDa 
                ? "Billedet nedenfor viser signalflowet for et typisk og robust integrationsscenario. CRM-pipelines opdateres asynkront og overvåges mod transaktionsfejl."
                : "The blueprint diagrams asynchronous CRM updates linking database write-calls via robust webhook queues for error prevention."}
            </p>

            {/* Simulated Architecture visual sketch with tailwind nodes */}
            <div className="border border-current/10 rounded-2xl p-6 bg-[#0F1210] text-[#A3B18A] font-mono text-[10.5px] space-y-4 shadow-inner">
              <div className="text-[9px] text-white/40 uppercase tracking-widest font-bold border-b border-white/5 pb-2">
                SCHEMA PIPELINE // DYNAMIC CRM HOOKS
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                
                {/* Node 1 */}
                <div className="border border-white/10 p-3 rounded-xl bg-white/5 space-y-1">
                  <span className="text-amber-500 block font-bold">[DATA IN]</span>
                  <span className="font-bold text-white uppercase text-[10px]">Indkommende e-mail</span>
                  <p className="text-[10px] opacity-60">
                    {isDa ? "E-mail modtages på fælles-indbakke." : "Email enters corporate support inbox."}
                  </p>
                </div>

                {/* Node 2 */}
                <div className="border border-white/10 p-3 rounded-xl bg-white/5 space-y-1">
                  <span className="text-[#A3B18A] block font-bold">[SCRAPE]</span>
                  <span className="font-bold text-white uppercase text-[10px]">AI-Udtræk</span>
                  <p className="text-[10px] opacity-60">
                    {isDa ? "Udtrækker kontaktdetaljer, budget og tidslinje." : "Parses sender details, budget signals."}
                  </p>
                </div>

                {/* Node 3 */}
                <div className="border border-white/10 p-3 rounded-xl bg-white/5 space-y-1">
                  <span className="text-[#A3B18A] block font-bold">[BERIG]</span>
                  <span className="font-bold text-white uppercase text-[10px]">CVR API Opslag</span>
                  <p className="text-[10px] opacity-60">
                    {isDa ? "Slår selskabets overskud og CVR stats op." : "Fetches CVR business registry analytics."}
                  </p>
                </div>

                {/* Node 4 */}
                <div className="border border-white/10 p-3 rounded-xl bg-white/5 space-y-1">
                  <span className="text-emerald-500 block font-bold">[WRITE]</span>
                  <span className="font-bold text-white uppercase text-[10px]">Sync til CRM</span>
                  <p className="text-[10px] opacity-60">
                    {isDa ? "Opretter lead med prioritering." : "Bespoke webhook inserts lead and updates stage."}
                  </p>
                </div>

              </div>

              <div className="text-center text-[9px] text-[#A3B18A]/60 animate-pulse border-t border-white/5 pt-2">
                ⬤ DATABASE SYNC: 100% WORKING // HUBSPOT - SALESFORCE - SQL HOOKS LINKED
              </div>
            </div>
          </section>

        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          
          {/* ROI metrics highlight info */}
          <div className={`p-6 rounded-2xl border ${c.card} space-y-4`}>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#A3B18A] font-bold">
              {text.roiTitle}
            </h4>
            
            <div className="space-y-4 text-xs">
              <div className="border-b pb-3 border-current/10">
                <span className="block opacity-65 text-[10px] uppercase font-mono">
                  {isDa ? "Fjernelse af manuel tidsforbrug" : "Data entry fatigue decrease"}
                </span>
                <span className="text-lg font-bold font-display text-current">Op til 92%</span>
              </div>
              <div className="border-b pb-3 border-current/10">
                <span className="block opacity-65 text-[10px] uppercase font-mono">
                  {isDa ? "Kunderesponstid reduceret" : "Average response speedup"}
                </span>
                <span className="text-lg font-bold font-display text-current">Fra 8 t til 2 min</span>
              </div>
              <div>
                <span className="block opacity-65 text-[10px] uppercase font-mono">
                  {isDa ? "ROI / Investering tilbage" : "Mean ROI return cycle"}
                </span>
                <span className="text-lg font-bold font-display text-current">2 - 3 måneder</span>
              </div>
            </div>
          </div>

          {/* Quick specs section */}
          <div className={`p-6 rounded-2xl border ${c.card} space-y-3`}>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#A3B18A] font-bold">
              {text.specTitle}
            </h4>
            <ul className="text-[11px] font-mono space-y-2 opacity-80 list-disc list-inside">
              <li>HubSpot Developer API compliance</li>
              <li>Salesforce Bulk API REST compliance</li>
              <li>Official Danish CVR Registry querying</li>
              <li>SSL 256-bit relational encryption</li>
              <li>Strict ISO9001 and GDPR compatibility</li>
            </ul>
          </div>

          {/* Direct Actions Group */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onGoToSandbox('crm')}
              className={`w-full py-3.5 rounded-xl font-display text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all hover:translate-y-[-1px] ${c.buttonPrimary}`}
            >
              <Zap className="w-4 h-4" />
              {text.tabSim}
            </button>
            <button
              onClick={onGoToRoadmap}
              className={`w-full py-3.5 rounded-xl font-display text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all ${c.buttonSecondary}`}
            >
              <MessageSquare className="w-4 h-4" />
              {text.tabRoad}
            </button>
          </div>

        </div>

      </div>

    </motion.div>
  );
}

// 3. AUTOMATION RANGE SERVICE PAGE
export function WorkflowsServicePage({ language, theme, onBack, onGoToSandbox, onGoToRoadmap }: ServicePageProps) {
  const isDa = language === 'da';

  const text = isDa ? {
    title: "Proces-automation",
    subtitle: "KOGNITIVE AGENTIC WORKFLOWS // DRIFTSIKKER BACK-END",
    headline: "Undgå manuelle flaskehalse. Forbind jeres værktøjer med præcision og lad AI-agenter håndtere komplekse administrative beslutninger i baggrunden.",
    intro: "Punkt-til-punkt-overførsler og manuelle godkendelser sænker farten i jeres virksomhed. Vores procesautomation og agentic workflows forbinder jeres favorit-værktøjer (e-conomic, HubSpot, Slack, Gmail, osv.) og lader AI orkestrere komplekse administrative vurderinger i baggrunden. Det svarer til at have en super-medarbejder, der aldrig sover.",
    tabSim: "Prøv vores ROI beregner",
    tabRoad: "Søg personligt blueprint",
    back: "Tilbage til forsiden",
    architectureTitle: "Bespoke System Arkitektur",
    useCasesTitle: "3 Strategiske Brugsscenarier",
    roiTitle: "Beregnet Afkast-Matrix (ROI)",
    specTitle: "Tekniske Specifikationer",
    useCases: [
      {
        title: "1. Ordrehåndtering, Faktura-match & Bogføring",
        desc: "AI'en lytter efter modtagne indkøbs-fakturaer på e-mailen, udtrækker beløb, varelinjer, momsindstillinger og sammenligner oplysningerne med godkendte indkøbsordrer på lageret. Hvis der er 100% overensstemmelse, bogføres fakturaen direkte i e-conomic eller Dinero, og der sendes advisering via Slack.",
        metric: "Effekt: Fjerne manuelle bogføringsfejl og sikrer 100% moms-overholdelse."
      },
      {
        title: "2. Automatiseret Medarbejder- og Kunde Onboarding",
        desc: "Det sekund en ny medarbejder underskriver en kontrakt via Adobe Sign, opretter vores AI automatisk deres profiler i Teams, Slack og jeres adgangskontrol, tildeler standard tilladelser og sender en varm velkomst-SMS til den nyansatte med instruktioner.",
        metric: "Effekt: Sparer HR-medarbejderen for 3 timers kedeligt klik-arbejde pr. ansat."
      },
      {
        title: "3. Smart logistikovervågning og told-anmeldelse",
        desc: "Perfekt til distribution og b2b-handel. AI'en overvåger forsendelser hos fragt-API'er, tjekker uoverensstemmelser i tolddokumenter og opdaterer automatisk modtageren samt distributionscentret via SMS, hvis skibe eller lastbiler er forsinkede på ruten.",
        metric: "Effekt: Eliminering af manuelle opkald fra sure kunder."
      }
    ]
  } : {
    title: "Process Automation",
    subtitle: "DRIFTSIKKER COGNITIVE WORKFLOWS // AGENTIC OPERATIONS",
    headline: "Orchestrate compound background workflows connecting e-conomic, HubSpot, Slack, and email silos cleanly.",
    intro: "Isolated software applications create data silos. Our agentic workflow orchestrations connect your current tools using smart APIs and cognitive trigger logic. Let your systems communicate natively, and let AI make autonomous routine decisions in the background, freeing your human experts.",
    tabSim: "Try our ROI savings calculator",
    tabRoad: "Download custom roadmap blueprint",
    back: "Back to Home",
    architectureTitle: "Compound Automation Pipeline Model",
    useCasesTitle: "3 Enterprise Workflows We Program Natively",
    roiTitle: "Calibrated Financial Projections",
    specTitle: "Compliance & Integration Standards",
    useCases: [
      {
        title: "1. Automated Purchase Matching & Bookkeeping",
        desc: "Incoming invoice files are fetched from shared email folders, parsed line-by-line, matched against active inventory sheets, and posted directly to accounting systems like e-conomic or Dinero once approved.",
        metric: "Impact: Total elimination of duplicate entry books and filing delays."
      },
      {
        title: "2. Automatic Employee and Client Onboarding",
        desc: "Upon remote e-contract signatures, the middleware creates accounts in Slack, generates default login permissions, populates customer directory cards, and sends a warm welcoming email sequence.",
        metric: "Impact: Lowers HR admin onboarding work from 4 hours to 0 seconds."
      },
      {
        title: "3. Intelligent Logistics Discrepancy Tracking",
        desc: "Monitors shipment statuses dynamically. Parses customs clearance reports, and automatically handles customer delay alerts via transactional SMS networks.",
        metric: "Impact: Drops support inquiries regarding delivery queries by 55%."
      }
    ]
  };

  const c = getThemeColorClasses(theme);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
    >
      {/* Back button */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 mb-8 opacity-75 hover:opacity-100 transition-opacity text-xs font-mono tracking-wider uppercase cursor-pointer text-current"
      >
        <ArrowLeft className="w-4 h-4" />
        {text.back}
      </button>

      {/* Hero Header */}
      <div className="border-b pb-8 border-current/10 mb-12">
        <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#A3B18A] block mb-2">
          {text.subtitle}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight mb-4">
          {text.title}
        </h1>
        <p className="text-sm sm:text-base max-w-3xl leading-relaxed font-serif italic opacity-90 mt-2">
          {text.headline}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main core content */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Deep intro */}
          <section className="space-y-4">
            <p className="text-xs sm:text-sm leading-relaxed text-current/80 font-sans">
              {text.intro}
            </p>
          </section>

          {/* Three strategic use cases */}
          <section className="space-y-6">
            <h3 className="text-lg sm:text-xl font-display font-semibold tracking-tight">
              {text.useCasesTitle}
            </h3>
            
            <div className="space-y-5">
              {text.useCases.map((uc, i) => (
                <div key={i} className={`p-5 rounded-2xl border ${c.card} space-y-3`}>
                  <h4 className="font-sans font-medium text-sm text-current">
                    {uc.title}
                  </h4>
                  <p className="text-xs leading-relaxed opacity-75">
                    {uc.desc}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold">
                    <Workflow className="w-3.5 h-3.5" />
                    {uc.metric}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Flow Architecture section */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-display font-semibold tracking-tight">
              {text.architectureTitle}
            </h3>
            <p className="text-xs opacity-75 font-sans leading-relaxed">
              {isDa 
                ? "Billedet nedenfor simulerer en fuldstændigt automatiseret faktura-match pipeline i vores system. Hele workflowet kører i baggrunden uden behov for manuel involvering."
                : "The blueprint details automated invoice matches. The entire pipeline executes silently in the background, minimizing manual touchpoints."}
            </p>

            {/* Simulated Architecture visual sketch with tailwind nodes */}
            <div className="border border-current/10 rounded-2xl p-6 bg-[#0F1210] text-[#A3B18A] font-mono text-[10.5px] space-y-4 shadow-inner">
              <div className="text-[9px] text-white/40 uppercase tracking-widest font-bold border-b border-white/5 pb-2">
                WORKFLOW MAP // AUTO FACTURE & LEDGER SYNC
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                
                {/* Node 1 */}
                <div className="border border-white/10 p-3 rounded-xl bg-white/5 space-y-1">
                  <span className="text-amber-500 block font-bold">[TRIGGER]</span>
                  <span className="font-bold text-white uppercase text-[10px]">PDF Faktura Mail</span>
                  <p className="text-[10px] opacity-60">
                    {isDa ? "E-mail med PDF modtages." : "Email enters with purchase PDF."}
                  </p>
                </div>

                {/* Node 2 */}
                <div className="border border-white/10 p-3 rounded-xl bg-white/5 space-y-1">
                  <span className="text-[#A3B18A] block font-bold">[EXTRACT]</span>
                  <span className="font-bold text-white uppercase text-[10px]">PDF Parsing</span>
                  <p className="text-[10px] opacity-60">
                    {isDa ? "Udtrækker moms beløb, dato og udsteder." : "Extracts VAT fields, amounts, dates."}
                  </p>
                </div>

                {/* Node 3 */}
                <div className="border border-white/10 p-3 rounded-xl bg-white/5 space-y-1">
                  <span className="text-[#A3B18A] block font-bold">[VALIDATE]</span>
                  <span className="font-bold text-white uppercase text-[10px]">Lager Match</span>
                  <p className="text-[10px] opacity-60">
                    {isDa ? "Sammenligner priser med aktive indkøbsordrer." : "Validates against active purchase orders."}
                  </p>
                </div>

                {/* Node 4 */}
                <div className="border border-white/10 p-3 rounded-xl bg-white/5 space-y-1">
                  <span className="text-emerald-500 block font-bold">[POST]</span>
                  <span className="font-bold text-white uppercase text-[10px]">Bogført i e-conomic</span>
                  <p className="text-[10px] opacity-60">
                    {isDa ? "Poster i journalsystem, pinger Slack." : "Posts bookkeeping record, logs in Slack."}
                  </p>
                </div>

              </div>

              <div className="text-center text-[9px] text-[#A3B18A]/60 animate-pulse border-t border-white/5 pt-2">
                ⬤ WORKFLOW HEALTH: 100% SECURE // COMPLIANT WITH SKAT & DANISH GDPR
              </div>
            </div>
          </section>

        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          
          {/* ROI metrics highlight info */}
          <div className={`p-6 rounded-2xl border ${c.card} space-y-4`}>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#A3B18A] font-bold">
              {text.roiTitle}
            </h4>
            
            <div className="space-y-4 text-xs">
              <div className="border-b pb-3 border-current/10">
                <span className="block opacity-65 text-[10px] uppercase font-mono">
                  {isDa ? "Administrative timer sparet" : "Administrative hours saved"}
                </span>
                <span className="text-lg font-bold font-display text-current">20+ t / ugentligt</span>
              </div>
              <div className="border-b pb-3 border-current/10">
                <span className="block opacity-65 text-[10px] uppercase font-mono">
                  {isDa ? "Bogførings-fejlrate" : "Human bookkeeping errors"}
                </span>
                <span className="text-lg font-bold font-display text-current">Næsten 0%</span>
              </div>
              <div>
                <span className="block opacity-65 text-[10px] uppercase font-mono">
                  {isDa ? "Gennemsnitlig integrationstid" : "Mean integration timeline"}
                </span>
                <span className="text-lg font-bold font-display text-current">2 - 3 uger</span>
              </div>
            </div>
          </div>

          {/* Quick specs section */}
          <div className={`p-6 rounded-2xl border ${c.card} space-y-3`}>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#A3B18A] font-bold">
              {text.specTitle}
            </h4>
            <ul className="text-[11px] font-mono space-y-2 opacity-80 list-disc list-inside">
              <li>e-conomic REST and SOAP compliance</li>
              <li>Slack, Teams & Telegram corporate webhooks</li>
              <li>Encrypted JSON schema databases</li>
              <li>Strict backup server schedules</li>
              <li>SKAT & Danish Bookkeeping Act verified</li>
            </ul>
          </div>

          {/* Direct Actions Group */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onGoToSandbox('roi')}
              className={`w-full py-3.5 rounded-xl font-display text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all hover:translate-y-[-1px] ${c.buttonPrimary}`}
            >
              <Zap className="w-4 h-4" />
              {text.tabSim}
            </button>
            <button
              onClick={onGoToRoadmap}
              className={`w-full py-3.5 rounded-xl font-display text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all ${c.buttonSecondary}`}
            >
              <MessageSquare className="w-4 h-4" />
              {text.tabRoad}
            </button>
          </div>

        </div>

      </div>

    </motion.div>
  );
}

// THEME GRAPH UTILITIES (keeps colors aligned to parent design theme)
function getThemeColorClasses(theme: 'sand' | 'slate' | 'sage') {
  switch (theme) {
    case 'sand':
      return {
        card: "bg-white border-[#E5DFD3] text-[#0F1210] shadow-sm",
        buttonPrimary: "bg-[#0F1210] hover:bg-[#718259] text-white",
        buttonSecondary: "bg-transparent text-[#0F1210] border-[#0F1210] hover:bg-neutral-100",
        accentText: "text-[#718259]"
      };
    case 'sage':
      return {
        card: "bg-[#17251C] border-[#A3B18A]/10 text-[#EBEFEB] shadow-md",
        buttonPrimary: "bg-[#A3B18A] hover:bg-[#A3B18A]/95 text-[#101913]",
        buttonSecondary: "bg-white/5 border-white/5 hover:bg-white/10 text-white",
        accentText: "text-[#A3B18A]"
      };
    case 'slate':
    default:
      return {
        card: "bg-[#141715]/40 border-white/5 text-[#F2F0EC] shadow-md",
        buttonPrimary: "bg-[#A3B18A] hover:bg-[#A3B18A]/91 text-[#0F1210]",
        buttonSecondary: "bg-white/5 border-white/5 hover:bg-white/10 text-white",
        accentText: "text-[#A3B18A]"
      };
  }
}
