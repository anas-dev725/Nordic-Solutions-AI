import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  Bot, 
  Calendar, 
  Database,
  Play,
  Shield,
  Activity
} from 'lucide-react';

interface Props {
  language: 'da' | 'en';
  theme: 'sand' | 'slate' | 'sage';
}

type PipelineType = 'booking' | 'lead' | 'support';

export function HeroConsole({ language, theme }: Props) {
  const [activePipeline, setActivePipeline] = useState<PipelineType>('booking');
  const [simStep, setSimStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const isDa = language === 'da';

  // Run automatic pipeline rotation when not actively simulating
  useEffect(() => {
    if (isSimulating) return;
    const interval = setInterval(() => {
      setActivePipeline(prev => {
        if (prev === 'booking') return 'lead';
        if (prev === 'lead') return 'support';
        return 'booking';
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Handle simulation sequence
  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);

    // Timeline for simulation steps
    const timers = [
      setTimeout(() => setSimStep(2), 1500),
      setTimeout(() => setSimStep(3), 3200),
      setTimeout(() => {
        setSimStep(4);
        setIsSimulating(false);
      }, 5000)
    ];

    return () => timers.forEach(clearTimeout);
  };

  const getThemeColors = () => {
    switch (theme) {
      case 'sand':
        return {
          cardBg: 'bg-white border-[#E5DFD3] text-[#0F1210] shadow-[0_24px_50px_rgba(217,119,6,0.08)]',
          badgeActive: 'bg-[#FEF3C7] text-[#B45309] border-[#FCD34D]',
          badgeInactive: 'bg-[#FAF9F6] text-neutral-600 border-[#E5DFD3] hover:bg-[#F3EFE7]',
          nodeBg: 'bg-[#FAF9F6] border-[#E5DFD3]',
          nodeActive: 'border-[#D97706] bg-amber-500/5 shadow-[0_0_20px_rgba(217,119,6,0.1)]',
          connector: 'stroke-[#E5DFD3]',
          connectorActive: 'stroke-[#D97706]',
          accentText: 'text-[#D97706]',
          btnSim: 'bg-[#0F1210] text-[#FAF9F6] hover:bg-neutral-800'
        };
      case 'sage':
        return {
          cardBg: 'bg-[#121215] border-white/5 text-[#EFECE6] shadow-[0_30px_60px_rgba(0,0,0,0.4)]',
          badgeActive: 'bg-[#1D2B22] text-[#A3B18A] border-[#A3B18A]/30',
          badgeInactive: 'bg-white/[0.02] text-[#A3A3A3] border-white/5 hover:bg-white/[0.05]',
          nodeBg: 'bg-[#18181F] border-white/5',
          nodeActive: 'border-[#7CB342] bg-[#7CB342]/10 shadow-[0_0_25px_rgba(124,179,66,0.25)]',
          connector: 'stroke-white/10',
          connectorActive: 'stroke-[#7CB342]',
          accentText: 'text-[#A3B18A]',
          btnSim: 'bg-white text-black hover:bg-neutral-200'
        };
      case 'slate':
      default:
        return {
          cardBg: 'bg-[#0F1012] border border-white/5 text-[#F2F0EC] shadow-[0_30px_60px_rgba(0,0,0,0.5)]',
          badgeActive: 'bg-[#FAB319]/10 text-[#FAB319] border-[#FAB319]/40',
          badgeInactive: 'bg-white/[0.02] text-[#A3A3A3] border-white/5 hover:bg-white/[0.05]',
          nodeBg: 'bg-[#151619] border-white/5',
          nodeActive: 'border-[#FAB319] bg-[#FAB319]/10 shadow-[0_0_25px_rgba(250,179,25,0.25)]',
          connector: 'stroke-white/10',
          connectorActive: 'stroke-[#FAB319]',
          accentText: 'text-[#FAB319]',
          btnSim: 'bg-[#FAB319] text-[#080809] hover:bg-[#FFA31A]'
        };
    }
  };

  const c = getThemeColors();

  // Data specs for current active pipeline
  const pipelineSpecs = {
    booking: {
      titleDa: 'Klinik & Patientbooking',
      titleEn: 'Clinic & Appointment Flow',
      step1DescDa: '1. Patient bestiller tid over telefonen',
      step1DescEn: '1. Inbound telephone call captured',
      step2DescDa: '2. AI fjerner støj & matcher CPR',
      step2DescEn: '2. AI filters voice & matches CRM',
      step3DescDa: '3. Ledigt tidspunkt findes i systemet',
      step3DescEn: '3. Real-time calendar slot secured',
      step4DescDa: '✓ SMS-bekræftelse og aftale godkendt',
      step4DescEn: '✓ SMS dispatched, booking finalized',
      icon1: <Phone className="w-5 h-5 text-sky-400" />,
      icon2: <Calendar className="w-5 h-5 text-emerald-400" />
    },
    lead: {
      titleDa: 'B2B Lead CRM Berigelse',
      titleEn: 'B2B CRM Sync Pipeline',
      step1DescDa: '1. LinkedIn-lead anmoder i Chatbot',
      step1DescEn: '1. High-value lead queries chatbot',
      step2DescDa: '2. AI verificerer e-mail & CVR data',
      step2DescEn: '2. Core Agent checks CVR & domain',
      step3DescDa: '3. CRM oprettes & n8n flow starter',
      step3DescEn: '3. Profile generated inside CRM',
      step4DescDa: '✓ Medarbejder adviseret i Slack med detaljer',
      step4DescEn: '✓ Team alerted on Slack with rich brief',
      icon1: <MessageSquare className="w-5 h-5 text-orange-400" />,
      icon2: <Database className="w-5 h-5 text-blue-400" />
    },
    support: {
      titleDa: 'Fakturering & Support',
      titleEn: 'ERP & Support Invoice Audit',
      step1DescDa: '1. Support-mail modtaget med PDF-fil',
      step1DescEn: '1. Support ticket received with attachment',
      step2DescDa: '2. OCR analyserer & vasker personoplysninger',
      step2DescEn: '2. Deep OCR parses data & strips private PII',
      step3DescDa: '3. n8n bogfører beløb direkte i ERP',
      step3DescEn: '3. Invoice logged in corporate ledger',
      step4DescDa: '✓ Svar e-mail afsendt på 4 sekunder',
      step4DescEn: '✓ Email dispatch complete with payment slip',
      icon1: <Mail className="w-5 h-5 text-purple-400" />,
      icon2: <Shield className="w-5 h-5 text-amber-400" />
    }
  };

  const spec = pipelineSpecs[activePipeline];

  return (
    <div className={`p-4 sm:p-5 rounded-3xl border ${c.cardBg} select-none relative group transition-all duration-500`}>
      
      {/* Visual Ambient Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FAB319]/5 rounded-full filter blur-[70px] pointer-events-none select-none z-0" />

      {/* Header Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-current/[0.04] pb-4 mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#FAB319] animate-pulse" />
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider opacity-60">
            {isDa ? 'AKTIVE PIPELINES // VISUALISERING' : 'ORCHESTRATION ENGINE'}
          </span>
        </div>

        {/* Action switchers */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          {(['booking', 'lead', 'support'] as PipelineType[]).map((p) => (
            <button
              key={p}
              onClick={() => {
                setActivePipeline(p);
                setSimStep(0);
                setIsSimulating(false);
              }}
              className={`px-2.5 py-1 text-[9px] font-mono uppercase font-bold tracking-wider rounded-md border transition-all cursor-pointer whitespace-nowrap ${
                activePipeline === p ? c.badgeActive : c.badgeInactive
              }`}
            >
              {p === 'booking' ? (isDa ? 'Klinik' : 'Scheduling') : p === 'lead' ? (isDa ? 'CRM Sync' : 'Lead Capture') : (isDa ? 'Support' : 'Support Desk')}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Area: Curved flowing connector schema */}
      <div className="grid grid-cols-12 gap-4 items-center min-h-[190px] relative z-10 py-2 sm:py-4">
        
        {/* Node 1: Inbound Source Channel */}
        <div className="col-span-3 flex flex-col items-center justify-center space-y-1.5">
          <motion.div 
            animate={isSimulating && simStep === 1 ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.6 }}
            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
              (isSimulating && simStep >= 1) || activePipeline ? c.nodeActive : c.nodeBg
            }`}
          >
            {spec.icon1}
          </motion.div>
          <span className="font-mono text-[9px] text-center opacity-60 uppercase tracking-widest leading-tight block">
            {activePipeline === 'booking' ? (isDa ? 'OPKALD' : 'INBOUND') : activePipeline === 'lead' ? (isDa ? 'CHATBOT' : 'WEBCHAT') : (isDa ? 'E-MAIL' : 'SUPPORT')}
          </span>
        </div>

        {/* Dynamic Connectors: SVG paths with running signal light pulses */}
        <div className="col-span-2 h-14 relative flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 60 40" fill="none">
            <path d="M 0 20 Q 30 20 60 20" className={c.connector} strokeWidth="1.5" strokeDasharray="3 3" />
            
            {/* Pulsing visual spark riding from Node 1 to Node 2 */}
            {isSimulating && simStep === 1 && (
              <motion.circle 
                cx="0" cy="20" r="3.5" fill={theme === 'sand' ? '#D97706' : '#FAB319'}
                animate={{ cx: [0, 60] }}
                transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
                className="filter drop-shadow-[0_0_5px_rgba(250,179,25,0.8)]"
              />
            )}
            {/* Soft highlight when connected */}
            {simStep >= 2 && (
              <path d="M 0 20 Q 30 20 60 20" className={c.connectorActive} strokeWidth="2" />
            )}
          </svg>
        </div>

        {/* Node 2: Cognitive AI Agent Worker */}
        <div className="col-span-2 flex flex-col items-center justify-center space-y-1.5">
          <motion.div 
            animate={
              isSimulating && simStep === 2 
                ? { scale: [1, 1.2, 1], rotate: 360 } 
                : simStep >= 2 ? { rotate: 360 } : {}
            }
            transition={{ duration: 0.8 }}
            className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${
              isSimulating && simStep >= 2 ? c.nodeActive : c.nodeBg
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#FAB319]/10`}>
              <Bot className="w-5 h-5 text-[#FAB319] animate-float" />
            </div>
          </motion.div>
          <span className="font-mono text-[9px] text-center font-bold tracking-widest block text-[#FAB319]">
            AI AGENT
          </span>
        </div>

        {/* Dynamic Connectors: SVG paths with running signal light pulses */}
        <div className="col-span-2 h-14 relative flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 60 40" fill="none">
            <path d="M 0 20 Q 30 20 60 20" className={c.connector} strokeWidth="1.5" strokeDasharray="3 3" />
            
            {/* Pulsing visual spark riding from Node 2 to Node 3 */}
            {isSimulating && simStep === 2 && (
              <motion.circle 
                cx="0" cy="20" r="3.5" fill={theme === 'sand' ? '#D97706' : '#FAB319'}
                animate={{ cx: [0, 60] }}
                transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
                className="filter drop-shadow-[0_0_5px_rgba(250,179,25,0.8)]"
              />
            )}
            {/* Soft highlight when connected */}
            {simStep >= 3 && (
              <path d="M 0 20 Q 30 20 60 20" className={c.connectorActive} strokeWidth="2" />
            )}
          </svg>
        </div>

        {/* Node 3: Integrated Endpoint Hub */}
        <div className="col-span-3 flex flex-col items-center justify-center space-y-1.5">
          <motion.div 
            animate={isSimulating && simStep === 3 ? { scale: [1, 1.15, 1], y: [-2, 2, -2] } : {}}
            transition={{ duration: 0.6 }}
            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
              isSimulating && simStep >= 3 ? c.nodeActive : c.nodeBg
            }`}
          >
            {spec.icon2}
          </motion.div>
          <span className="font-mono text-[9px] text-center opacity-60 uppercase tracking-widest leading-tight block">
            {activePipeline === 'booking' ? (isDa ? 'KALENDER' : 'CALENDAR') : activePipeline === 'lead' ? (isDa ? 'DATABASE' : 'HUBSPOT') : (isDa ? 'ERP-BOG' : 'ERP LEDGER')}
          </span>
        </div>

      </div>

      {/* Audit Step Status Box */}
      <div className="mt-4 p-3.5 rounded-xl bg-current/[0.02] border border-current/[0.05] relative z-10">
        
        {/* Dynamic pipeline title */}
        <div className="flex items-center justify-between text-xs font-bold font-display italic tracking-tight mb-2.5">
          <span className="text-current opacity-90">{isDa ? spec.titleDa : spec.titleEn}</span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FAB319] bg-[#FAB319]/10 px-2 py-0.5 rounded">
            {isSimulating ? (isDa ? 'AUDITERER...' : 'SIMULATING...') : (isDa ? 'KLAR TIL SIM' : 'IDLE')}
          </span>
        </div>

        {/* Simulation Text logs */}
        <div className="space-y-2 font-mono text-[10.5px]">
          <div className={`transition-opacity duration-300 ${simStep >= 1 ? 'opacity-100 font-bold ' + c.accentText : 'opacity-40'}`}>
            {isDa ? spec.step1DescDa : spec.step1DescEn}
          </div>
          <div className={`transition-opacity duration-300 ${simStep >= 2 ? 'opacity-100 font-bold ' + c.accentText : 'opacity-40'}`}>
            {isDa ? spec.step2DescDa : spec.step2DescEn}
          </div>
          <div className={`transition-opacity duration-300 ${simStep >= 3 ? 'opacity-100 font-bold ' + c.accentText : 'opacity-40'}`}>
            {isDa ? spec.step3DescDa : spec.step3DescEn}
          </div>
          <div className={`transition-opacity duration-300 ${simStep >= 4 ? 'opacity-100 font-semibold text-emerald-500' : 'opacity-40'}`}>
            {isDa ? spec.step4DescDa : spec.step4DescEn}
          </div>
        </div>

      </div>

      {/* Control Actions & GDPR Footer */}
      <div className="mt-4 pt-3.5 border-t border-current/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
        
        <button
          onClick={startSimulation}
          disabled={isSimulating}
          className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-display text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all ${c.btnSim} disabled:opacity-50`}
        >
          {isSimulating ? (
            <>
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-3 h-3 border-2 border-current border-t-transparent rounded-full"
              />
              {isDa ? 'Simulerer Flow...' : 'Processing Flow...'}
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              {isDa ? 'Mød AI Agenten i Aktion' : 'Simulate Live Workflow'}
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5 opacity-40 font-mono text-[9px] uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5 text-[#FAB319]" />
          <span>EU-GDPR Secure Compliant Pipelines</span>
        </div>

      </div>

    </div>
  );
}
