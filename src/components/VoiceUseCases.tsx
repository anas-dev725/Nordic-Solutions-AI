/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  Volume2, 
  Phone, 
  Plus, 
  Check, 
  Share2,
  Sliders,
  Database,
  Info
} from 'lucide-react';
import { Language, Theme } from '../types';

interface VoiceUseCasesProps {
  language: Language;
  theme: Theme;
}

interface VoicePersona {
  id: string;
  name: string;
  roleDa: string;
  roleEn: string;
  categoryDa: string;
  categoryEn: string;
  descriptionDa: string;
  descriptionEn: string;
  quoteDa: string;
  quoteEn: string;
  image: string;
  duration: number; // in seconds
  bgColor: string;
}

const VOICE_PERSONAS: VoicePersona[] = [
  {
    id: 'clara',
    name: 'Clara',
    roleDa: 'Tandlægeklinik Receptionist',
    roleEn: 'Dental Clinic Receptionist',
    categoryDa: 'Sundhed',
    categoryEn: 'Medical',
    descriptionDa: 'Hør hvordan vores AI-stemmeagent høfligt minder en patient om deres kommende tid hos tandlægen.',
    descriptionEn: 'Listen how our AI Voice Agent politely reminds a client about their upcoming dental appointment.',
    quoteDa: 'Hej! Det er Clara fra Aarhus Tandklinik. Jeg ringer blot for at bekræfte din aftale i morgen klokken 14:30 hos Marianne.',
    quoteEn: 'Hi there! This is Clara calling from Aarhus Dental Clinic. I am just calling to confirm your appointment tomorrow at 2:30 PM with Dr. Marianne.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80',
    duration: 12,
    bgColor: 'from-purple-500/10 to-indigo-500/10 border-indigo-500/20'
  },
  {
    id: 'jenny',
    name: 'Jenny',
    roleDa: 'E-commerce Kundeservice',
    roleEn: 'E-commerce Customer Support',
    categoryDa: 'Detailhandel',
    categoryEn: 'E-commerce',
    descriptionDa: 'Automatiser ordrestatusser og leveringsdetaljer med et smil og uovertruffen præcision.',
    descriptionEn: 'Automate order statuses, dynamic delivery coordination, and product checks with an eye for detail.',
    quoteDa: 'Hej, det er Jenny fra Vesterbro Design! Jeg kan se at dit håndlavede spisebord i egetræ er færdigt og sendes i dag kl. 15:00.',
    quoteEn: 'Hi, this is Jenny from Vesterbro Design! I can see that your custom handmade oak dining table is finished and is set to ship today at 3:00 PM.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    duration: 14,
    bgColor: 'from-amber-500/10 to-orange-500/10 border-amber-500/20'
  },
  {
    id: 'sam',
    name: 'Sam',
    roleDa: 'Logistik & Fragtkoordinator',
    roleEn: 'Logistics & Dispatch Liaison',
    categoryDa: 'Transport',
    categoryEn: 'Logistics',
    descriptionDa: 'Håndter tidsfølsomme ruteændringer og statusopdateringer til forsendelser helt flydende.',
    descriptionEn: 'Handle time-sensitive routing requests, warehouse dispatches, and urgent transit notifications globally.',
    quoteDa: 'Hej, du taler med Sam fra Copenhagen Logistics. Lastbilen med dine varer er netop kørt over Storebæltsbroen og ankommer om 45 minutter.',
    quoteEn: 'Hey, you are speaking with Sam from Copenhagen Logistics. The delivery van has just crossed the Storebælt bridge and is due in 45 minutes.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    duration: 11,
    bgColor: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20'
  },
  {
    id: 'jordan',
    name: 'Jordan',
    roleDa: 'Fitness Studio Assistent',
    roleEn: 'Wellness Studio Coordinator',
    categoryDa: 'Velvære',
    categoryEn: 'Wellness',
    descriptionDa: 'Optimer holdbookinger, ventelister og medlemskabsopgraderinger uden ventetid.',
    descriptionEn: 'Optimize active session bookings, class waitlists, and instant membership renewals without any drop-offs.',
    quoteDa: 'Hej! Det er Jordan fra Copenhagen Health Hub. Der er lige blevet en plads ledig på det populære Pilates-hold i aften kl. 18. Skal jeg booke dig?',
    quoteEn: 'Hi! This is Jordan from Copenhagen Health Hub. A spot just freed up on our fully booked Pilates class tonight at 6 PM. Shall I lock it in for you?',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    duration: 13,
    bgColor: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20'
  }
];

export function VoiceUseCases({ language, theme }: VoiceUseCasesProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [subtitlesVisible, setSubtitlesVisible] = useState<boolean>(false);
  const activePersona = VOICE_PERSONAS[selectedIdx];
  
  // Simulated soundwave count
  const waveBarsCount = 18;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset play state when voice persona changes
    setIsPlaying(false);
    setProgress(0);
    setSubtitlesVisible(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [selectedIdx]);

  useEffect(() => {
    if (isPlaying) {
      setSubtitlesVisible(true);
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            setSubtitlesVisible(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev + (100 / (activePersona.duration * 10)); // updates 10x per second
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activePersona]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const getThemeColors = () => {
    switch (theme) {
      case 'sand':
        return {
          accent: 'text-[#D97706]',
          accentBg: 'bg-[#D97706]',
          badge: 'bg-[#FEF3C7] text-[#B45309] border-[#FAB319]/40',
          innerBg: 'bg-[#FAF9F6] border-[#E5DFD3]',
          cardBg: 'bg-white border-[#E5DFD3] text-[#0F1210]',
          border: 'border-[#E5DFD3]',
          sliderFill: 'accent-[#D97706]',
          btnWave: 'bg-[#D97706]',
          tint: 'bg-[#FAF9F6]',
          waveColor: '#D97706',
          panelHeader: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200/40 text-[#B45309]'
        };
      case 'sage':
        return {
          accent: 'text-[#FFA31A]',
          accentBg: 'bg-[#FFA31A]',
          badge: 'bg-[#FFA31A]/10 text-[#FFA31A] border-[#FFA31A]/35',
          innerBg: 'bg-[#16161C] border border-white/5',
          cardBg: 'bg-[#121215] border border-white/5 text-[#EFECE6]',
          border: 'border-white/5',
          sliderFill: 'accent-[#FFA31A]',
          btnWave: 'bg-[#FFA31A]',
          tint: 'bg-[#16161C]',
          waveColor: '#FFA31A',
          panelHeader: 'bg-white/[0.02] border-white/5 text-amber-500'
        };
      case 'slate':
      default:
        return {
          accent: 'text-[#FAB319]',
          accentBg: 'bg-[#FAB319]',
          badge: 'bg-[#FAB319]/10 text-[#FAB319] border-[#FAB319]/35',
          innerBg: 'bg-[#151619] border border-white/5',
          cardBg: 'bg-[#0F1012] border border-white/5 text-[#F2F0EC]',
          border: 'border-white/5',
          sliderFill: 'accent-[#FAB319]',
          btnWave: 'bg-[#FAB319]',
          tint: 'bg-[#151619]',
          waveColor: '#FAB319',
          panelHeader: 'bg-white/[0.02] border-white/5 text-[#FAB319]'
        };
    }
  };

  const tc = getThemeColors();

  return (
    <section id="voice-showcase" className={`py-12 sm:py-20 border-t ${tc.border} overflow-hidden bg-transparent`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-16 lg:px-24 text-center space-y-12 relative">
        
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-radial-gradient from-current/[0.015] to-transparent pointer-events-none -z-10" />

        {/* Header Block with Rotated Yellow Language Badge & Handwriting Callout */}
        <div className="relative max-w-3xl mx-auto space-y-4">
          
          {/* Main Title Section */}
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-5xl mt-6 font-display font-semibold tracking-tight text-current leading-[1.12]">
              {language === 'da' 
                ? 'Udrul AI-stemmeagenter, der lyder menneskeligt og arbejder 24/7' 
                : 'Deploy AI voice agents that sound human and work 24/7'
              }
            </h2>

            {/* Rotated Handcrafted Badge (Matching user screenshot) */}
            <div className="absolute -top-12 -left-6 sm:-left-20 rotate-[-11deg] pointer-events-none select-none">
              <div className="bg-[#FAB319] text-[#1E1C15] font-display font-extrabold text-[11px] sm:text-xs px-3.5 py-1.5 rounded-md shadow-md border-2 border-[#1E1C15]/20 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0 fill-current" />
                <span>
                  {language === 'da' ? 'på 40+ sprog' : 'in 40+ languages'}
                </span>
              </div>
            </div>

            {/* Handwriting style "Click to Play Recordings" arrow (Matching user screenshot) */}
            <div className="absolute right-[-40px] sm:right-[-120px] top-[-30px] hidden md:block select-none pointer-events-none">
              <span className="font-serif italic text-xs tracking-wide text-current/60 dark:text-neutral-300 block text-right">
                {language === 'da' ? 'Klik for at høre stemmer' : 'Click to Play Recordings'}
              </span>
              <svg className="w-16 h-12 text-current opacity-60 ml-auto mt-1" viewBox="0 0 71 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 5,5 Q 40,0 55,25 T 60,40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 52,35 L 60,40 L 58,28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <p className="text-sm sm:text-base leading-relaxed opacity-70 max-w-2xl mx-auto">
            {language === 'da'
              ? 'Lever en spektakulær kundeoplevelse med døgnåbne interaktioner der lyder præcis som et menneske, understøttet af 400+ naturlige AI-stemmer fordelt på 40 globale sprog.'
              : 'Deliver spectacular customer experience with round-the-clock human-like interactions, 400+ AI voices and in 40 global languages.'
            }
          </p>

          <div className="flex justify-center items-center gap-2 pt-2 text-[11px] font-mono tracking-wider opacity-60">
            <span>🎧 400+ Neural Voices For Lifelike Voice Agents</span>
          </div>
        </div>

        {/* Personas Row with Featured Left Block & Vertical Right Selector (Grid Matching Screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
          
          {/* Left Featured Card (Combined profile picture + details) - 8 Cols */}
          <div className={`lg:col-span-8 overflow-hidden rounded-3xl border shadow-lg flex flex-col md:flex-row items-stretch ${tc.cardBg}`}>
            
            {/* Split A: Profile picture block with tag overlay */}
            <div className="md:w-[40%] relative min-h-[220px] md:min-h-full">
              <img 
                src={activePersona.image} 
                alt={activePersona.name} 
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-transparent" />
              
              {/* Profile Pill Name overlay */}
              <div className="absolute bottom-4 left-4">
                <span className="px-5 py-2 font-display font-bold text-xs bg-white text-neutral-950 rounded-full shadow-lg border border-neutral-100/20">
                  {activePersona.name}
                </span>
              </div>
            </div>

            {/* Split B: Config details & sound audio engine */}
            <div className="md:w-[60%] p-6 sm:p-8 flex flex-col justify-between text-left space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full border border-current/10 ${tc.badge}`}>
                    {language === 'da' ? activePersona.categoryDa : activePersona.categoryEn}
                  </span>
                  <span className="text-[10px] font-mono opacity-40">24/7 AUTO_AGENT</span>
                </div>

                <h3 className="text-2xl font-display font-semibold tracking-tight text-current">
                  {language === 'da' ? activePersona.roleDa : activePersona.roleEn}
                </h3>

                <p className="text-xs sm:text-sm leading-relaxed opacity-70">
                  {language === 'da' ? activePersona.descriptionDa : activePersona.descriptionEn}
                </p>
              </div>

              {/* IMMERSIVE PLAYBACK CONTROLLERS WITH PROGRESS STACKS */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  
                  {/* Floating Play Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlayback}
                    className={`w-12 h-12 rounded-full cursor-pointer flex items-center justify-center text-neutral-950 ${tc.btnWave} shadow-md`}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    )}
                  </motion.button>

                  {/* Soundwaves horizontal animation (dancing wave) */}
                  <div className="flex-1 bg-current/[0.04] p-3 rounded-2xl flex items-center gap-1 h-12 border border-current/[0.03] overflow-hidden">
                    {Array.from({ length: waveBarsCount }).map((_, barIdx) => (
                      <motion.div
                        key={barIdx}
                        animate={{
                          height: isPlaying 
                            ? [8, Math.random() * 26 + 8, 8] 
                            : [5, Math.random() * 7 + 5, 5]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.5 + barIdx * 0.05,
                          ease: 'easeInOut'
                        }}
                        className="w-[3px] rounded-full shrink-0"
                        style={{ 
                          backgroundColor: tc.waveColor,
                          opacity: isPlaying ? 0.9 : 0.4
                        }}
                      />
                    ))}

                    {/* Progress Percentage */}
                    <span className="ml-auto font-mono text-[9px] opacity-40">
                      {Math.floor((activePersona.duration * progress) / 100)}S / {activePersona.duration}S
                    </span>
                  </div>

                </div>

                {/* Progress bar line */}
                <div className="w-full h-[3px] bg-current/[0.05] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-100 ease-out"
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: tc.waveColor 
                    }}
                  />
                </div>

                {/* Live Transcript / Speech bubble if playing (Incredible user delight indicator!) */}
                <AnimatePresence>
                  {subtitlesVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-3.5 rounded-xl border relative font-mono text-[11px] leading-relaxed italic ${tc.panelHeader}`}
                    >
                      <span className="block absolute -top-1.5 left-5 w-3 h-3 rotate-45 border-t border-l border-current/10 bg-inherit" />
                      <div className="flex items-start gap-2">
                        <Volume2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0 animate-pulse" />
                        <span className="text-current opacity-90">
                          {language === 'da' ? activePersona.quoteDa : activePersona.quoteEn}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>

          {/* Right Selector Vertical List Elements - 4 Cols */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3 sm:gap-4 md:grid md:grid-cols-3 lg:flex lg:flex-col">
            
            {VOICE_PERSONAS.map((person, index) => {
              const isSelected = selectedIdx === index;
              return (
                <button
                  key={person.id}
                  onClick={() => setSelectedIdx(index)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer relative overflow-hidden group hover:scale-[1.015] shadow-sm ${
                    isSelected 
                      ? `${tc.accentBg}/5 ${tc.accent.replace('text', 'border')} bg-current/[0.005]` 
                      : 'border-current/5 hover:border-current/10 bg-current/10'
                  }`}
                  style={{
                    backgroundColor: isSelected ? undefined : 'rgba(255,255,255,0.015)'
                  }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden relative border border-current/[0.06] shrink-0">
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      className="w-full h-full object-cover pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    {isSelected && (
                      <span className="absolute inset-0 bg-neutral-950/25 flex items-center justify-center text-white">
                        <Check className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5">
                      <h4 className="font-display font-semibold text-xs leading-none text-current">
                        {person.name}
                      </h4>
                      <span className="font-mono text-[8px] opacity-40 uppercase leading-none">
                        {person.id === 'clara' ? 'Primary' : `Agent ${index}`}
                      </span>
                    </div>
                    <p className="text-[10px] opacity-60 mt-1 font-sans truncate pr-2">
                      {language === 'da' ? person.roleDa : person.roleEn}
                    </p>
                  </div>

                  {/* Tiny Play Indicator icon */}
                  <div className={`p-1.5 rounded-full border border-current/10 transition-colors ${
                    isSelected ? tc.accentBg + ' text-neutral-950' : 'bg-transparent text-current opacity-40 group-hover:opacity-80'
                  }`}>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}

          </div>

        </div>

        {/* Lower Features Section: Multi-Neural voices dashboard & Elevenlabs 1-Click wrapper (Grid Layout matching user screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          
          {/* Card A: 400+ Neural AI Voices & Twilio numbers interface (From screenshot) */}
          <div className={`p-6 sm:p-8 rounded-3xl border text-left flex flex-col justify-between space-y-6 ${tc.cardBg}`}>
            
            <div className="space-y-4">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20`}>
                <Database className="w-3 h-3" />
                TWILIO & TELCO CAPABLE
              </span>

              <h3 className="text-2xl font-display font-semibold tracking-tight text-current">
                {language === 'da' ? '400+ Neurale AI-stemmer' : '400+ Neural AI Voices'}
              </h3>
              
              <p className="text-xs sm:text-sm opacity-70 leading-relaxed">
                {language === 'da'
                  ? 'Udgiv stemme-workflows med ultralav ventetid. Tilslut i dag på under 5 minutter ved blot at overføre dit eget telefonnummer eller købe et via vores n8n cloud-system.'
                  : 'Deliver rich, lifelike calls and conversations seamlessly. Activate with any custom Danish or international telephone line or buy directly via cloud integration configurations.'
                }
              </p>
            </div>

            {/* Interactive phone numbers settings simulator (Matching screenshot) */}
            <div className={`p-4 rounded-2xl border font-sans text-xs space-y-4 shadow-inner ${tc.innerBg}`}>
              <div className="flex items-center justify-between border-b border-current/[0.06] pb-2 text-[10px] font-mono opacity-50 uppercase tracking-widest">
                <span>Phone Numbers Configuration</span>
                <span>Active Link</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-current">+45 80 12 90 99</h4>
                  <p className="text-[10px] opacity-50 mt-0.5">Primary Aarhus Office Inbound</p>
                </div>
                <div className="flex items-center gap-1 bg-emerald-500/15 text-emerald-500 px-2 py-0.5 rounded-full font-bold font-mono text-[9px]">
                  <Check className="w-2.5 h-2.5" />
                  <span>attached</span>
                </div>
              </div>

              {/* Configure selector bar mock */}
              <div className="pt-2 flex items-center justify-between border-t border-current/[0.06]">
                <span className="font-mono text-[10px] opacity-45 uppercase">Core Voice mapping:</span>
                <span className="font-display font-bold text-xs text-amber-500">Clara (Primary Hub)</span>
              </div>
            </div>

          </div>

          {/* Card B: Elevenlabs 1-click integrations (From screenshot) */}
          <div className="p-6 sm:p-8 rounded-3xl border text-left flex flex-col justify-between bg-neutral-950 text-neutral-100 border-white/5 shadow-xl relative overflow-hidden group">
            
            {/* Absolute ambient mesh blur overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-amber-500/10 filter blur-[50px] pointer-events-none" />

            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-400/10 text-amber-400 border border-amber-400/20">
                1-CLICK ELEVENLABS INTEGRATION
              </span>

              <h3 className="text-2xl font-display font-semibold tracking-tight">
                Elevenlabs
              </h3>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {language === 'da'
                  ? 'Klon din egen ledelses- eller supportstemme, og opbyg skræddersyede accenter på sekunder. Forbind dit personlige Elevenlabs API-miljø for uendelig stemmevariation.'
                  : 'Create custom voices and authentic accents or clone your own voice instantly. Connect your ElevenLabs workspace API for unlimited custom voice engines.'
                }
              </p>
            </div>

            {/* Simulated 1-click status dashboard */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between font-sans text-xs pt-4 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 font-bold font-mono shrink-0">
                  XI
                </div>
                <div>
                  <h4 className="font-bold text-xs">ElevenLabs SDK Active</h4>
                  <p className="text-[10px] text-white/40 mt-0.5">Personal Voice Accents Enabled</p>
                </div>
              </div>
              
              <button className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-[10px] tracking-wide uppercase transition-colors shrink-0">
                Configure API
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
