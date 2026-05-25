import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Bot, 
  Calendar, 
  Database,
  Play,
  Shield,
  Activity,
  Sparkles,
  Volume2,
  Sliders,
  Mail,
  FileCheck
} from 'lucide-react';

interface Props {
  language: 'da' | 'en';
  theme: 'sand' | 'slate' | 'sage';
}

type CampaignType = 'dental' | 'logistics' | 'invoice';

export function HeroConsole({ language, theme }: Props) {
  const [activeTab, setActiveTab] = useState<CampaignType>('dental');
  const [toneOption, setToneOption] = useState<'empathetic' | 'swift' | 'executive'>('empathetic');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  
  const isDa = language === 'da';

  // Get localized strings for console actions
  const getSimContent = () => {
    switch (activeTab) {
      case 'dental':
        return {
          header: isDa ? "Aarhus Tandklinik AI Reception" : "Aarhus Dental AI Front Desk",
          roleSec: isDa ? "Tandlæge- & patientbooking" : "Patient-centric scheduling",
          initialGreeting: isDa 
            ? "Mød Freja, klinikkens AI. Hun taler med patienterne døgnet rundt, parrer CPR-numre og booker tider." 
            : "Meet Freja, the clinical booking agent. Fields appointment lines, parses clinic IDs, and books slots.",
          steps: [
            {
              logDa: "📞 Indgående tlf-opkald fanget (Aarhus Ingress Gateway)",
              logEn: "📞 Inbound call captured (Aarhus Ingress Gateway)",
              speaker: "USER",
              textDa: '"Hej, jeg vil booke tid til kontrol i morgen hos Marianne."' ,
              textEn: '"Hi, I want to book a routine checkup tomorrow with doctor Marianne."'
            },
            {
              logDa: "🧠 AI parrer patientjournal & tjekker ledige tider...",
              logEn: "🧠 AI queries clinical charts & localizes slots...",
              speaker: "AGENT",
              textDa: '"Det klarer jeg. Marianne har en ledig tid kl. 14:30. Skal jeg reservere den?"',
              textEn: '"Sure! Dr. Marianne has an open session at 2:30 PM. Shall I book that in?"'
            },
            {
              logDa: "📅 Kalenderoprettelse gennemført & SMS bekræftelse sendt",
              logEn: "📅 Calendar slot secured & SMS notification dispatched",
              speaker: "SYSTEM",
              textDa: "✓ Journal synkroniseret og låst (SLA 380ms).",
              textEn: "✓ Records synchronized and secured (SLA 380ms)."
            }
          ]
        };
      case 'logistics':
        return {
          header: isDa ? "Odense Logistics CRM Pipeline" : "Odense Freight Lead Capturer",
          roleSec: isDa ? "B2B salgskvalificering" : "High-velocity sales routing",
          initialGreeting: isDa 
            ? "Automatiseret salgsagent. Slår mængder og CVR-numre op og opretter leads i HubSpot." 
            : "B2B intelligence. Scrapes corporate parameters & maps opportunities in Salesforce automatically.",
          steps: [
            {
              logDa: "💬 LinkedIn lead-forespørgsel modtaget via Chatbot",
              logEn: "💬 LinkedIn lead query logged via chat gateway",
              speaker: "USER",
              textDa: '"Kan I fragte 12 paller fra Odense til havn i morgen? Budget: 45k."',
              textEn: '"Can you transport 12 pallets from Odense tomorrow afternoon? Budget: 45k."'
            },
            {
              logDa: "🤖 CVR API kaldes: Henter regnskab & prioriterer lead score...",
              logEn: "🤖 CVR Registry pinged: Fetching headcount & lead score...",
              speaker: "AGENT",
              textDa: '"Vi har ledig kapacitet. Jeg har oprettet sagen til prioritering i HubSpot."',
              textEn: '"Yes, we have freight capacity. I setup the project directly in your CRM."'
            },
            {
              logDa: "📥 n8n synkroniserer data og pinger salgsteamet på Slack",
              logEn: "📥 n8n synchronizes database & broadcasts team on Slack",
              speaker: "SYSTEM",
              textDa: "✓ Lead oprettet med prioritet: HØJ. Medarbejder adviseret.",
              textEn: "✓ Premium lead created: HIGH impact. Slack digest sent."
            }
          ]
        };
      case 'invoice':
      default:
        return {
          header: isDa ? "København ERP Invoice Auditor" : "Copenhagen ERP Invoice Auditor",
          roleSec: isDa ? "Skanning, OCR & Bogføring" : "PDF processing & billing",
          initialGreeting: isDa 
            ? "Mindre manuel papirgang. AI læser faktura-PDF'er, kontrollerer beløb og logger dem i ERP." 
            : "Zero back-office drag. AI parses attachments, audits ledger totals, and balance invoice files.",
          steps: [
            {
              logDa: "📧 Faktura modtaget i inbox fra ekstern partner (PDF)",
              logEn: "📧 External invoice received in inbox (PDF attachment)",
              speaker: "USER",
              textDa: '"Vedhæftet finder I faktura for transportydelser (DK-827391)."',
              textEn: '"Please find the attached invoice for freight shipment (DK-827391)."'
            },
            {
              logDa: "🔍 OCR-skanning vasker PII & sammenligner priser...",
              logEn: "🔍 Deep OCR strips private PII & audits item pricing...",
              speaker: "AGENT",
              textDa: '"Faktura godkendt. Beløb stemmer overens med kontraktbetingelser."',
              textEn: '"Invoice audited successfully. Figures match historic contracts."'
            },
            {
              logDa: "📂 ERP-bogføring udført. Krypteret kvittering gemt på server",
              logEn: "📂 Ledger balancing complete. Receipt stored on secure node",
              speaker: "SYSTEM",
              textDa: "✓ Bilag bogført automatisk i e-conomic uden fejl.",
              textEn: "✓ Bill auto-booked inside e-conomic with zero deviation."
            }
          ]
        };
    }
  };

  const currentSim = getSimContent();

  const handleStartSim = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);
    
    const logsList = [currentSim.steps[0].logDa];
    setSimLogs(isDa ? [currentSim.steps[0].logDa] : [currentSim.steps[0].logEn]);

    const timers = [
      setTimeout(() => {
        setSimStep(2);
        setSimLogs(prev => [...prev, isDa ? currentSim.steps[1].logDa : currentSim.steps[1].logEn]);
      }, 1800),
      setTimeout(() => {
        setSimStep(3);
        setSimLogs(prev => [...prev, isDa ? currentSim.steps[2].logDa : currentSim.steps[2].logEn]);
      }, 3600),
      setTimeout(() => {
        setSimStep(4);
        setIsSimulating(false);
      }, 5200)
    ];

    return () => timers.forEach(clearTimeout);
  };

  // Switch tabs & reset simulator
  const changeTab = (tab: CampaignType) => {
    setActiveTab(tab);
    setSimStep(0);
    setIsSimulating(false);
    setSimLogs([]);
  };

  const getColors = () => {
    switch (theme) {
      case 'sand':
        return {
          cardBg: 'bg-white border-[#E5DFD3] text-[#0F1210] shadow-[0_30px_60px_rgba(217,119,6,0.06)]',
          badgeActive: 'bg-[#FEF3C7] text-[#B45309] border-[#FAB319]/40',
          badgeInactive: 'bg-[#FAF9F6] text-neutral-600 border-[#E5DFD3] hover:bg-[#F3EFE7]',
          accentText: 'text-[#D97706]',
          glowBlob: 'bg-[#D97706]/5',
          terminalBg: 'bg-[#FAF9F6] border-[#E5DFD3]',
          dotColor: 'bg-[#D97706]',
          lineColor: '#D97706',
          btnPrimary: 'bg-[#0F1210] hover:bg-[#D97706] text-[#FAF9F6]',
          textMuted: 'text-[#555B56]',
          tabActive: 'bg-white border-[#E5DFD3] text-[#0F1210] shadow-xs',
          tabInactive: 'text-neutral-500 hover:text-neutral-800'
        };
      case 'sage':
        return {
          cardBg: 'bg-[#121215] border-white/5 text-[#EFECE6] shadow-[0_35px_70px_rgba(0,0,0,0.5)]',
          badgeActive: 'bg-[#FFA31A]/10 text-[#FFA31A] border-[#FFA31A]/35',
          badgeInactive: 'bg-white/[0.02] text-[#B5B5B5] border-white/5 hover:bg-white/[0.05]',
          accentText: 'text-[#FFA31A]',
          glowBlob: 'bg-[#FFA31A]/10',
          terminalBg: 'bg-[#18181F] border-white/5',
          dotColor: 'bg-[#FFA31A]',
          lineColor: '#FFA31A',
          btnPrimary: 'bg-[#FFA31A] hover:bg-[#FFA31A]/90 text-[#0C0C0E]',
          textMuted: 'text-[#B8B2AA]',
          tabActive: 'bg-[#1D1D24] border-white/10 text-white shadow-md',
          tabInactive: 'text-[#B5B5B5] hover:text-[#EFECE6]'
        };
      case 'slate':
      default:
        return {
          cardBg: 'bg-[#0F1012] border border-white/5 text-[#F2F0EC] shadow-[0_35px_70px_rgba(0,0,0,0.55)]',
          badgeActive: 'bg-[#FAB319]/10 text-[#FAB319] border-[#FAB319]/35',
          badgeInactive: 'bg-white/[0.02] text-[#B5B5B5] border-white/5 hover:bg-white/[0.05]',
          accentText: 'text-[#FAB319]',
          glowBlob: 'bg-[#FAB319]/10',
          terminalBg: 'bg-[#151619] border-white/5',
          dotColor: 'bg-[#FAB319]',
          lineColor: '#FAB319',
          btnPrimary: 'bg-[#FAB319] hover:bg-[#FAB319]/90 text-[#080809]',
          textMuted: 'text-neutral-400',
          tabActive: 'bg-[#1C1E22] border-white/10 text-white shadow-md',
          tabInactive: 'text-[#B5B5B5] hover:text-[#F2F0EC]'
        };
    }
  };

  const c = getColors();

  return (
    <div className={`p-5 sm:p-6 rounded-3xl border ${c.cardBg} font-sans relative group transition-all duration-500 select-none overflow-hidden`}>
      
      {/* Editorial Glowing Radial Backlight Pool */}
      <div className={`absolute top-[-20%] right-[-20%] w-72 h-72 rounded-full filter blur-[100px] pointer-events-none ${c.glowBlob} transition-all duration-700`} />

      {/* Title Segment */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-current/[0.04] pb-5 mb-5">
        <div className="flex items-center gap-2">
          <Activity className={`w-4 h-4 ${c.accentText} animate-pulse`} />
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest opacity-60">
            {isDa ? "KOGNITIV OPERATIONS-KONSOL" : "COGNITIVE WORKPLACE CONTROLLER"}
          </span>
        </div>

        {/* Campaign Type Tab Switchers */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar scroll-smooth">
          {(['dental', 'logistics', 'invoice'] as CampaignType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => changeTab(tab)}
              className={`px-3 py-1 text-[9px] font-mono uppercase font-bold tracking-widest rounded-md border transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab ? c.badgeActive : c.badgeInactive
              }`}
            >
              {tab === 'dental' ? (isDa ? 'KlinikAI' : 'DentalAI') : tab === 'logistics' ? (isDa ? 'CRM_Sync' : 'CRM_Sync') : (isDa ? 'ERP_Faktura' : 'ERP_Audit')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Column Grid: Waveform monitor & interactive simulation logs */}
      <div className="space-y-4">
        
        {/* Holographic Speech / Call Interface representation */}
        <div className={`p-4 rounded-2xl ${c.terminalBg} border relative flex flex-col justify-between overflow-hidden min-h-[160px]`}>
          
          <div className="flex items-center justify-between border-b border-current/[0.03] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isSimulating ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'} block`} />
              <span className="font-mono text-[9.5px] uppercase tracking-wider font-semibold">
                {currentSim.header}
              </span>
            </div>
            <span className="font-mono text-[8px] opacity-40 uppercase">Sovereign Danish NLP v1.8</span>
          </div>

          {/* Simulated Dialogue Output Area */}
          <div className="flex-1 space-y-3 relative z-10 py-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {simStep === 0 && (
                <motion.div 
                  key="idle-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-1.5"
                >
                  <p className="font-sans text-xs opacity-90 leading-relaxed font-medium">
                    {currentSim.initialGreeting}
                  </p>
                  <p className="font-mono text-[10px] opacity-50 italic">
                    {isDa ? "💬 Klik nedenfor for at starte simulationsopkaldet..." : "💬 Press simulate workflow below to start live run..."}
                  </p>
                </motion.div>
              )}

              {simStep >= 1 && (
                <motion.div 
                  key="simulating-states"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2.5 text-xs"
                >
                  {simStep >= 1 && (
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-[8px] bg-sky-500/10 text-sky-500 px-1 rounded uppercase font-semibold mt-0.5">
                        {isDa ? 'BRUGER' : 'CLIENT'}
                      </span>
                      <p className={`font-medium ${c.textMuted} leading-tight italic`}>
                        {isDa ? currentSim.steps[0].textDa : currentSim.steps[0].textEn}
                      </p>
                    </div>
                  )}

                  {simStep >= 2 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 border-t border-current/[0.03] pt-2"
                    >
                      <span className={`font-mono text-[8px] bg-[#FAB319]/10 text-[#FAB319] px-1 rounded uppercase font-semibold mt-0.5`}>
                        AI AGENT
                      </span>
                      <p className="font-medium text-current leading-tight">
                        {isDa ? currentSim.steps[1].textDa : currentSim.steps[1].textEn}
                      </p>
                    </motion.div>
                  )}

                  {simStep >= 3 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-[10px] font-mono text-emerald-500 bg-emerald-500/5 px-2.5 py-1.5 rounded-lg border border-emerald-500/10 w-full"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span className="leading-none text-[9px] tracking-wide uppercase font-bold">
                        {isDa ? currentSim.steps[2].textDa : currentSim.steps[2].textEn}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dynamic Interactive Sound Waveforms */}
          <div className="absolute bottom-1 right-2 w-28 h-8 opacity-25 pointer-events-none flex items-end justify-between px-1">
            {isSimulating ? (
              Array.from({ length: 14 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: simStep === 2 
                      ? [3, Math.random() * 26 + 4, 3] 
                      : [2, Math.random() * 10 + 2, 2]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.5 + i * 0.05,
                    ease: 'easeInOut'
                  }}
                  className="w-[3px] rounded-full"
                  style={{ backgroundColor: c.lineColor }}
                />
              ))
            ) : (
              <div className="w-full h-[1px] opacity-20 border-b border-dashed" style={{ borderColor: c.lineColor }} />
            )}
          </div>

        </div>

        {/* Live System Logging & Operations Stream */}
        <div className={`p-4 rounded-xl font-mono text-[10.5px] ${c.terminalBg} border space-y-2 relative overflow-hidden`}>
          <div className="flex items-center justify-between text-[8px] opacity-40 uppercase tracking-widest mb-1 pb-1 border-b border-current/[0.03]">
            <span>SYSTEM_LEDGER_FEED // WEBH00K_STATUS</span>
            <span>n8n_GATEWAY</span>
          </div>
          
          <div className="space-y-1.5">
            {simLogs.length === 0 ? (
              <div className="opacity-35 italic">
                {isDa ? "[Klar til driftsaudit. Afventer trigger...]" : "[System calibrated. Awaiting inbound triggers...]"}
              </div>
            ) : (
              simLogs.map((log, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -5 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  key={index} 
                  className="flex items-center gap-1.5 text-current opacity-90 leading-tight"
                >
                  <span className={`w-1 h-1 rounded-full ${c.dotColor}`} />
                  <span>{log}</span>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Live Customizer sliders represent tuning vocal personality */}
        <div className={`p-3.5 rounded-xl border border-current/[0.05] bg-current/[0.005]`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Sliders className={`w-3.5 h-3.5 ${c.accentText}`} />
              <span className="font-mono text-[9px] uppercase tracking-wider opacity-60">
                {isDa ? 'STEMME-FINTUNING (INTERAKTIV)' : 'VOCAL SYNTH PARAMETERS (INTERACTIVE)'}
              </span>
            </div>
            <span className={`font-mono text-[9px] uppercase font-bold text-current opacity-70`}>
              {toneOption === 'empathetic' ? (isDa ? 'Empatisk' : 'Empathetic') : toneOption === 'swift' ? (isDa ? 'Hurtig' : 'Swift Tech') : (isDa ? 'Formel' : 'Formal')}
            </span>
          </div>

          {/* Interactive radio switches */}
          <div className="grid grid-cols-3 gap-1.5 select-none text-[9px] font-mono">
            {(['empathetic', 'swift', 'executive'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setToneOption(opt)}
                className={`py-1 rounded border text-center transition-all cursor-pointer ${
                  toneOption === opt
                    ? 'bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:border-white dark:text-black font-semibold'
                    : 'border-current/10 opacity-50 hover:opacity-100'
                }`}
              >
                {opt === 'empathetic' ? (isDa ? 'NATURLIG' : 'NATURAL') : opt === 'swift' ? (isDa ? '160 WPM' : '160 WPM') : (isDa ? 'FORMEL' : 'FORMAL')}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Footer controls */}
      <div className="mt-5 pt-3 border-t border-current/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        {/* BIG SIMULATE ACTION BUTTON */}
        <button
          onClick={handleStartSim}
          disabled={isSimulating}
          className={`w-full sm:w-auto px-4.5 py-2.5 rounded-xl font-display text-[9px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all ${c.btnPrimary} disabled:opacity-50`}
        >
          {isSimulating ? (
            <>
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-3 h-3 border-2 border-current border-t-transparent rounded-full"
              />
              {isDa ? "AUTOMATISERER..." : "EXECUTING WORKFLOW..."}
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              {isDa ? "SIMULER INTENT FLOW" : "SIMULATE DIGITAL ROUTE"}
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5 opacity-40 font-mono text-[8.5px] uppercase tracking-wider">
          <Shield className={`w-3.5 h-3.5 ${c.accentText}`} />
          <span>EU-GDPR Secure Compliant Sync</span>
        </div>

      </div>

    </div>
  );
}
