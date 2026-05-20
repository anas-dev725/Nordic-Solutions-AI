/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, PhoneOff, Mic, Volume2, CheckCircle2, Play, ChevronRight, RefreshCw, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface VoiceAgentDemoProps {
  language: Language;
}

interface DialogueNode {
  userSayDa: string;
  userSayEn: string;
  agentReplyDa: string;
  agentReplyEn: string;
  actionDa?: string;
  actionEn?: string;
}

const DEMO_CAMPAIGNS = [
  {
    id: 'logistic',
    nameDa: 'Copenhagen Logistics AI',
    nameEn: 'Copenhagen Logistics AI',
    roleDa: 'Leverings- & fragtassistent',
    roleEn: 'Delivery & Freight Assistant',
    initialGreetingDa: 'Hej, du har ringet til Copenhagen Logistics. Mit navn er Freja, og jeg er en AI-assistent. Hvordan kan jeg hjælpe dig med din levering i dag?',
    initialGreetingEn: 'Hello, you have reached Copenhagen Logistics. My name is Freja, and I am an AI assistant. How can I help you with your freight or shipment today?',
    nodes: [
      {
        userSayDa: 'Hvornår ankommer min pakke til Aarhus?',
        userSayEn: 'When will my shipment arrive in Aarhus?',
        agentReplyDa: 'Jeg kan se på dit fragtnummer, at din forsendelse er lastet på vores el-lastbil nu og forventes leveret på havnen i Århus i dag kl. 16:30. Vil du have en SMS-opdatering?',
        agentReplyEn: 'I can see from your tracking number that your shipment is currently loaded on our electric van and is scheduled to reach Aarhus port today at 4:30 PM. Would you like an automated SMS alert?',
        actionDa: 'Søger i database...',
        actionEn: 'Querying cargo database...'
      },
      {
        userSayDa: 'Ja tak, send gerne en SMS til +45 28 49 10 22',
        userSayEn: 'Yes please, send an SMS to +45 28 49 10 22',
        agentReplyDa: 'Perfekt! Jeg har registreret dit mobilnummer. Du modtager en SMS umiddelbart før ankomst. Jeg har også opdateret fragtjournalen med dine kontaktdetaljer. Noget andet jeg skal fikse?',
        agentReplyEn: 'Perfect! I have registered your mobile number. You will receive an SMS exactly 15 minutes prior to delivery. I have also automatically updated our logistics CRM logs with your contact details. Anything else?',
        actionDa: 'Opdaterer CRM og sender SMS...',
        actionEn: 'Updating transit CRM & sending SMS API trigger...'
      },
      {
        userSayDa: 'Nej, det var alt. Mange tak for hjælpen!',
        userSayEn: 'No, that is all. Thank you so much!',
        agentReplyDa: 'Det var så lidt! Dejligt vi fik det løst hurtigt. Hav en fantastisk dag i Aarhus. Farvel!',
        agentReplyEn: 'My pleasure! Glad I could help handle your delivery queries so quickly. Have an amazing day. Goodbye!',
        actionDa: 'Samtale afsluttet',
        actionEn: 'Call successfully closed'
      }
    ] as DialogueNode[]
  },
  {
    id: 'dental',
    nameDa: 'Aarhus TandlægeAI',
    nameEn: 'Aarhus DentalAI Booking',
    roleDa: 'Automatiseret tidsbestilling',
    roleEn: 'Automated Appointment Booker',
    initialGreetingDa: 'Velkommen til Tandlægerne i Aarhus. Jeg er din digitale receptionist. Vil du booke en ny tid, ændre en aftale eller noget helt tredje?',
    initialGreetingEn: 'Welcome to Aarhus Dental Hub. I am your automated digital receptionist. Would you like to book an appointment, reschedule, or something else?',
    nodes: [
      {
        userSayDa: 'Jeg vil gerne have en tid til tandeftersyn i morgen hvis muligt.',
        userSayEn: 'I would like to book a routine checkup tomorrow if possible.',
        agentReplyDa: 'Lad mig kigge i kalenderen... Jeg har to ledige tider i morgen. Kl. 10:15 hos klinkassistent Jonas, eller kl. 14:30 hos tandlæge Marianne. Hvad passer bedst?',
        agentReplyEn: 'Let me query our live calendar... I found two slots tomorrow: 10:15 AM with dental hygienist Jonas, or 2:30 PM with Dr. Marianne. What matches your schedule?',
        actionDa: 'Søger i klinikkalender...',
        actionEn: 'Consulting Clinic Calendar database...'
      },
      {
        userSayDa: 'Kl. 14:30 hos tandlæge Marianne passer perfekt.',
        userSayEn: '2:30 PM with Dr. Marianne fits perfectly.',
        agentReplyDa: 'Fremragende. Jeg har reserveret tiden til dig i morgen d. 21. maj kl. 14:30. Jeg har også sendt en kalenderinvitation og opdateret dit patientkort. Skal jeg notere noget specifikt til behandlingen?',
        agentReplyEn: 'Splendid. I have reserved the slot for you tomorrow, May 21st, at 2:30 PM. A calendar invitation has been sent, and your patient record updated. Shall I note down any specific symptoms?',
        actionDa: 'Reserverer tid og opdaterer journalsystem...',
        actionEn: 'Booking slot & writing to medical health records...'
      },
      {
        userSayDa: 'Nej tak, det er bare almindelig kontrol. Vi ses i morgen!',
        userSayEn: 'No, just a regular checkup. See you tomorrow!',
        agentReplyDa: 'Det er modtaget! Vi glæder os til at se dig i klinikken i morgen klokken halv tre. Hav en rigtig dejlig dag!',
        agentReplyEn: 'Excellent. Looking forward to welcoming you to the clinic tomorrow at 2:30 PM. Have a pleasant day, stay smiling!',
        actionDa: 'Oprettelse gennemført',
        actionEn: 'Appointment synchronized'
      }
    ] as DialogueNode[]
  }
];

export function VoiceAgentDemo({ language }: VoiceAgentDemoProps) {
  const [activeCampaignIdx, setActiveCampaignIdx] = useState(0);
  const [callStatus, setCallStatus] = useState<'idle' | 'ringing' | 'connected' | 'completed'>('idle');
  const [currentNodeIdx, setCurrentNodeIdx] = useState<number>(-1);
  const [transcript, setTranscript] = useState<{ sender: 'agent' | 'user'; text: string; action?: string }[]>([]);
  const [isWaveActive, setIsWaveActive] = useState(false);
  const pulseTimer = useRef<NodeJS.Timeout | null>(null);

  const campaign = DEMO_CAMPAIGNS[activeCampaignIdx];

  // Auto-handling voice wave animation or robotic pulsing
  useEffect(() => {
    if (callStatus === 'connected') {
      setIsWaveActive(true);
      const timer = setTimeout(() => setIsWaveActive(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentNodeIdx, callStatus]);

  const handleStartCall = () => {
    setCallStatus('ringing');
    setTranscript([]);
    setCurrentNodeIdx(-1);
    
    // Simulate ringtone delay
    setTimeout(() => {
      setCallStatus('connected');
      const initialText = language === 'da' ? campaign.initialGreetingDa : campaign.initialGreetingEn;
      setTranscript([{ sender: 'agent', text: initialText }]);
      setCurrentNodeIdx(0);
    }, 1500);
  };

  const handleHangUp = () => {
    setCallStatus('idle');
    setTranscript([]);
    setCurrentNodeIdx(-1);
    setIsWaveActive(false);
  };

  const handleSelectOption = (node: DialogueNode, index: number) => {
    if (callStatus !== 'connected') return;

    const userText = language === 'da' ? node.userSayDa : node.userSayEn;
    const agentReply = language === 'da' ? node.agentReplyDa : node.agentReplyEn;
    const systemAction = language === 'da' ? node.actionDa : node.actionEn;

    // 1. Add user dialog line
    setTranscript((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsWaveActive(false);

    // 2. Simulate AI agent brain activity & speech lag
    setTimeout(() => {
      setTranscript((prev) => [
        ...prev,
        { sender: 'agent', text: agentReply, action: systemAction }
      ]);
      setIsWaveActive(true);
      
      // Advance dialogue index
      if (index === campaign.nodes.length - 1) {
        setTimeout(() => {
          setCallStatus('completed');
        }, 3000);
      } else {
        setCurrentNodeIdx(index + 1);
      }
    }, 1200);
  };

  return (
    <div id="voice-agent-playground" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Selector & Setup - 5 columns */}
      <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/40">
            <Sparkles className="w-3 h-3" />
            100% Ultra-Bespoke
          </span>
          <h3 className="text-2xl font-display font-medium mt-3 tracking-tight">
            {language === 'da' ? '1. Vælg Stemmemodel' : '1. Select Voice Persona'}
          </h3>
          <p className="text-sm opacity-70 mt-1 mb-4 font-sans leading-relaxed">
            {language === 'da' 
              ? 'Prøv vores to fuldstændigt integrerede agenter, udviklet med ultra-lave svartider på flydende dansk.'
              : 'Interact with our industry-leading live voice integrations engineered with ultra-low latency response cycles.'}
          </p>

          <div className="space-y-3">
            {DEMO_CAMPAIGNS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => {
                  if (callStatus === 'idle') setActiveCampaignIdx(i);
                }}
                disabled={callStatus !== 'idle'}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 border flex items-center justify-between ${
                  activeCampaignIdx === i
                    ? 'bg-amber-100 hover:bg-amber-100/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/60 shadow-xs'
                    : 'bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 border-gray-200 dark:border-neutral-800'
                } ${callStatus !== 'idle' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div>
                  <h4 className="font-medium text-sm font-sans">
                    {language === 'da' ? c.nameDa : c.nameEn}
                  </h4>
                  <p className="text-xs opacity-60 mt-0.5 font-mono">
                    {language === 'da' ? c.roleDa : c.roleEn}
                  </p>
                </div>
                <div className={`p-1.5 rounded-full ${activeCampaignIdx === i ? 'bg-amber-200 dark:bg-amber-900/60' : 'bg-transparent'}`}>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Diagnostic parameters summary */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800/80 font-mono text-[11px] space-y-2 text-neutral-600 dark:text-neutral-400">
          <div className="flex justify-between">
            <span>AUD_ENGINE:</span>
            <span className="text-green-600 font-medium font-mono">✓ Denmark_West_3 (Aarhus Hub)</span>
          </div>
          <div className="flex justify-between">
            <span>TTS_MODEL:</span>
            <span className="text-green-600 font-medium font-mono">Custom-DK NaturalVocal_v3.2</span>
          </div>
          <div className="flex justify-between">
            <span>AVG_LATENCY:</span>
            <span className="text-green-600 font-medium font-mono">420ms (DK Backplane Fiber)</span>
          </div>
          <div className="flex justify-between">
            <span>CRM_AUTO_SYNC:</span>
            <span className="text-amber-600 font-medium font-mono">Enabled (HTTP Triggers Live)</span>
          </div>
        </div>
      </div>

      {/* Main interactive phone and transcript representation - 8 columns */}
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Phone Widget - 5 columns */}
        <div className="md:col-span-5 flex flex-col justify-center items-center p-6 bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800/80 shadow-md">
          {/* Audio interface container */}
          <div className="relative w-full aspect-[9/16] max-w-[210px] bg-neutral-900 dark:bg-neutral-950 border-[5px] border-neutral-800 dark:border-neutral-900 rounded-[30px] p-4 flex flex-col justify-between overflow-hidden shadow-xl text-white">
            
            {/* Speaker bar */}
            <div className="mx-auto w-12 h-4 bg-neutral-800 rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-neutral-950/80 rounded-full"></span>
            </div>

            {/* Display screen area */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-6">
              <div className="text-center">
                <p className="text-[10px] text-amber-400 font-mono tracking-widest uppercase font-medium">
                  {callStatus === 'idle' && (language === 'da' ? 'KLAR TIL OPKALD' : 'READY TO CALL')}
                  {callStatus === 'ringing' && (language === 'da' ? 'RINGER...' : 'CALLING...')}
                  {callStatus === 'connected' && (language === 'da' ? 'LIVE FORBINDELSE' : 'LIVE CONVERSATION')}
                  {callStatus === 'completed' && (language === 'da' ? 'AFSLUTTET' : 'DISCONNECTED')}
                </p>
                <h4 className="font-display font-semibold text-sm mt-1">
                  {language === 'da' ? campaign.nameDa : campaign.nameEn}
                </h4>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  +45 80 12 90 99
                </p>
              </div>

              {/* Dynamic state logo / animations */}
              <div className="w-20 h-20 rounded-full bg-neutral-800/80 flex items-center justify-center relative shadow-inner">
                {callStatus === 'connected' && (
                  <>
                    {/* Ring ripple animations */}
                    <span className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping"></span>
                    <span className="absolute inset-2 rounded-full bg-amber-400/10 animate-pulse"></span>
                  </>
                )}

                <div className={`p-4 rounded-full transition-all duration-300 ${
                  callStatus === 'connected' 
                    ? 'bg-amber-400 text-neutral-950 scale-105' 
                    : callStatus === 'ringing' 
                    ? 'bg-neutral-700 text-amber-400 animate-pulse'
                    : 'bg-neutral-700 text-neutral-400'
                }`}>
                  {callStatus === 'connected' ? (
                    <Volume2 className="w-7 h-7" />
                  ) : (
                    <Mic className="w-7 h-7" />
                  )}
                </div>
              </div>

              {/* Dynamic visual soundwaves inside phone screen */}
              <div className="w-full flex items-center justify-center gap-1 h-5 px-4">
                {callStatus === 'connected' ? (
                  Array.from({ length: 9 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: isWaveActive 
                          ? [6, Math.random() * 18 + 7, 6] 
                          : [4, Math.random() * 8 + 4, 4]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6 + i * 0.08,
                        ease: 'easeInOut'
                      }}
                      className="w-1 bg-amber-400/80 rounded-full"
                    />
                  ))
                ) : (
                  <div className="w-12 h-1 bg-neutral-700 rounded-full"></div>
                )}
              </div>
            </div>

            {/* Interaction Action Trigger Button */}
            <div className="w-full flex justify-center pb-2">
              <AnimatePresence mode="wait">
                {callStatus === 'idle' || callStatus === 'completed' ? (
                  <motion.button
                    key="call-btn"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={handleStartCall}
                    className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-white cursor-pointer shadow-lg hover:shadow-emerald-500/20 active:scale-95 transition-all"
                  >
                    <Phone className="w-5 h-5 fill-white" />
                  </motion.button>
                ) : (
                  <motion.button
                    key="hangup-btn"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={handleHangUp}
                    className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white cursor-pointer shadow-lg hover:shadow-red-500/20 active:scale-95 transition-all animate-pulse-slow"
                  >
                    <PhoneOff className="w-5 h-5 fill-white animate-float" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Live Conversation Transcript - 7 columns */}
        <div className="md:col-span-7 flex flex-col justify-between py-1">
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b pb-2 mb-3 border-gray-100 dark:border-neutral-800">
                <span className="text-xs font-mono text-neutral-500 tracking-wider">
                  {language === 'da' ? 'REALTIDS-TRANSKRIPT' : 'REAL-TIME DIALOGUE LOG'}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${callStatus === 'connected' ? 'bg-amber-400 animate-pulse' : 'bg-gray-300 dark:bg-neutral-800'}`}></span>
                  <span className="text-[10px] font-mono opacity-60">
                    {callStatus === 'connected' ? 'LIVE_STREAMING' : 'IDLE'}
                  </span>
                </span>
              </div>

              {/* Streaming conversation lines */}
              <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1 text-xs">
                {transcript.length === 0 ? (
                  <div className="text-center py-10 opacity-40 font-serif italic">
                    {language === 'da' 
                      ? 'Klik på den grønne telefon på mobilen for at teste live stemmeassistenten...' 
                      : 'Click the green phone icon to launch call reception simulation...'}
                  </div>
                ) : (
                  transcript.map((line, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex flex-col ${line.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`p-3 rounded-2xl max-w-[85%] font-sans leading-relaxed ${
                        line.sender === 'user'
                          ? 'bg-amber-100 text-neutral-900 rounded-tr-none'
                          : 'bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800/60 rounded-tl-none'
                      }`}>
                        {line.sender === 'agent' && (
                          <div className="text-[9px] font-mono tracking-wider font-semibold text-neutral-400 mb-1 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                            AI FREJA {language === 'da' ? '(AGENTSVAR)' : '(AGENT)'}
                          </div>
                        )}
                        <p className="font-sans text-xs">{line.text}</p>
                      </div>

                      {line.action && (
                        <span className="text-[9px] font-mono font-medium text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                          <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                          {line.action}
                        </span>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Interactive Reply Prompts - This makes it incredibly high fidelity! */}
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-neutral-800">
              <p className="text-[10px] font-mono opacity-50 mb-2 uppercase tracking-tight">
                {language === 'da' ? '2. Din Svar-Simulering' : '2. Your Dialogue Reply'}
              </p>

              <div className="space-y-2">
                {callStatus === 'connected' && currentNodeIdx !== -1 && currentNodeIdx < campaign.nodes.length ? (
                  <button
                    onClick={() => handleSelectOption(campaign.nodes[currentNodeIdx], currentNodeIdx)}
                    className="w-full text-left font-sans text-xs p-3 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/20 dark:border-amber-800/40 text-neutral-900 dark:text-amber-300 flex items-center justify-between group active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <span>
                      {language === 'da' 
                        ? campaign.nodes[currentNodeIdx].userSayDa 
                        : campaign.nodes[currentNodeIdx].userSayEn}
                    </span>
                    <Play className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity fill-current" />
                  </button>
                ) : callStatus === 'completed' ? (
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-sans">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                    <span>
                      {language === 'da'
                        ? 'Succes! Samtalen sluttede fejlfrit, og kildedata er nu overført synkront til dit CRM-system.'
                        : 'Success! Simulated telephone call closed gracefully, database records auto-synchronized.'}
                    </span>
                  </div>
                ) : (
                  <div className="p-3 text-center text-xs opacity-40 font-serif italic bg-gray-50 dark:bg-neutral-900/40 rounded-xl">
                    {language === 'da' 
                      ? 'Når opkaldet er forbundet, vil du se svarmuligheder her.' 
                      : 'Trigger dial-in to see conversation action prompts here.'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
