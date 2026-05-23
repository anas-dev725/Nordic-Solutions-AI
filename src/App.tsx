/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Phone, Mail, Globe, BrainCircuit, ShieldAlert, ArrowRight,
  TrendingUp, Users, Cpu, FileCheck, CheckCircle2, ChevronRight, 
  MapPin, HelpCircle, ArrowUp, Sun, Moon, TreePine
} from 'lucide-react';

import { Language, Theme } from './types';
import { translations } from './translations';
import { VoiceAgentDemo } from './components/VoiceAgentDemo';
import { CRMWorkflowBuilder } from './components/CRMWorkflowBuilder';
import { RoiCalculator } from './components/RoiCalculator';
import { InquiryRoadmap } from './components/InquiryRoadmap';
import { VoiceServicePage, CrmServicePage, WorkflowsServicePage } from './components/ServicePages';
import { Typewriter } from './components/Typewriter';
import { PricingPackages } from './components/PricingPackages';
import { FaqAccordion } from './components/FaqAccordion';
import { SpecializedAgents } from './components/SpecializedAgents';
import { MeetingScheduler } from './components/MeetingScheduler';
import { BlogsAndCaseStudies } from './components/BlogsAndCaseStudies';
import { HeroConsole } from './components/HeroConsole';

export default function App() {
  const [language, setLanguage] = useState<Language>('da');
  const [theme, setTheme] = useState<Theme>('slate'); // Default to Nordic Dark Editorial for premium default feel
  const [activeSandboxTab, setActiveSandboxTab] = useState<'voice' | 'crm' | 'roi'>('voice');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [selectedServicePage, setSelectedServicePage] = useState<'voice' | 'crm' | 'automation' | 'blogs' | null>(null);

  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });

  // Rotating dynamic subheadings list
  const dynamicSubheadings = {
    da: [
      "bygget til nordiske virksomheder",
      "automatiseret med absolut præcision",
      "designet til skandinavisk vækst",
      "udviklet til kompromisløs drift"
    ],
    en: [
      "tailored for Nordic enterprises",
      "automated with absolute precision",
      "designed for Scandinavian growth",
      "engineered for flawless operations"
    ]
  };

  const [subheadingIndex, setSubheadingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubheadingIndex((prev) => (prev + 1) % 4);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const handleHeroMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroMouse({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setHeroMouse({ x: 0, y: 0 });
  };

  // Dynamic scroll listener to transition navigation bar to floating capsule layout
  useEffect(() => {
    const handleScroll = () => {
      setScrolledToTop(window.scrollY < 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initially if page loads scrolled down
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Synchronize document body & html backgrounds with the active theme to eliminate any mismatched whitespace
  useEffect(() => {
    const bgColors = {
      sand: '#FAF9F6',
      slate: '#080809',
      sage: '#0C0C0E',
    };
    const color = bgColors[theme] || '#080809';
    document.documentElement.style.backgroundColor = color;
    document.body.style.backgroundColor = color;
  }, [theme]);

  const dict = translations[language];

  // Helper for custom color schemas on the fly based on selected scandinavian theme
  const getThemeClasses = () => {
    switch (theme) {
      case 'sand':
        return {
          wrapper: 'bg-[#FAF9F6] text-[#0F1210] font-sans transition-all duration-500 selection:bg-[#F59E0B] selection:text-[#FAF9F6]',
          navbar: 'border-[#E5DFD3] bg-[#FAF9F6]/85 backdrop-blur-md',
          card: 'bg-white border-[#E5DFD3] shadow-xs',
          cardHover: 'transition-all duration-500 hover:translate-y-[-6px] hover:shadow-[0_30px_60px_rgba(217,119,6,0.08)] hover:border-[#D97706]/40',
          textMuted: 'text-[#555B56] font-sans opacity-95',
          buttonPrimary: 'bg-[#0F1210] hover:bg-[#FAB319] hover:text-[#0F1210] text-[#FAF9F6] font-bold uppercase transition-all duration-300',
          buttonSecondary: 'bg-white hover:bg-[#FAF9F6] border border-[#E5DFD3] text-[#0F1210] font-bold uppercase transition-all duration-300',
          badge: 'bg-[#FEF3C7] text-[#B45309] border border-[#FAB319]/25',
          footer: 'bg-[#EAE3DF] border-t border-[#DECFB6]',
          gridPattern: 'grid-lines',
          accentText: 'text-[#D97706] hover:text-[#B45309]',
          divider: 'border-[#EBE2D4]',
        };
      case 'slate': // Authentic Luxurious Dark Gold & Obsidian Aesthetic
        return {
          wrapper: 'bg-[#080809] text-[#F2F0EC] font-sans transition-all duration-500 selection:bg-[#FAB319] selection:text-[#080809]',
          navbar: 'border-white/5 bg-[#080809]/90 backdrop-blur-md',
          card: 'bg-[#0F1012] border border-white/5 shadow-xs',
          cardHover: 'transition-all duration-500 hover:translate-y-[-6px] hover:shadow-[0_30px_60px_rgba(250,179,25,0.065)] hover:border-[#FAB319]/45',
          textMuted: 'text-neutral-400 opacity-80 font-sans',
          buttonPrimary: 'bg-[#FAB319] hover:bg-[#FFC107] text-[#080809] hover:text-[#080809] font-bold uppercase transition-all duration-300',
          buttonSecondary: 'bg-[#151619] hover:bg-[#1E2023] text-[#F2F0EC] border border-white/10 font-bold uppercase transition-all duration-300',
          badge: 'bg-[#151619] text-[#FAB319] border border-[#FAB319]/25',
          footer: 'bg-[#0B0C0E] border-t border-white/5',
          gridPattern: 'grid-lines-dark',
          accentText: 'text-[#FAB319] hover:text-[#FFC107]',
          divider: 'border-white/5',
        };
      case 'sage': // Deep Midnight Umber & Amber Sunset Accent
        return {
          wrapper: 'bg-[#0C0C0E] text-[#EFECE6] font-sans transition-all duration-500 selection:bg-[#FFA31A] selection:text-[#0C0C0E]',
          navbar: 'border-[#1A1A1E] bg-[#0C0C0E]/90 backdrop-blur-md',
          card: 'bg-[#121215] border border-white/5 shadow-xs',
          cardHover: 'transition-all duration-500 hover:translate-y-[-6px] hover:shadow-[0_30px_60px_rgba(234,162,29,0.09)] hover:border-[#FFA31A]/45',
          textMuted: 'text-[#B8B2AA] font-sans opacity-85',
          buttonPrimary: 'bg-[#FAF8F5] hover:bg-[#FFA31A] hover:text-[#0C0C0E] text-[#0C0C0E] font-bold uppercase transition-all duration-300',
          buttonSecondary: 'bg-[#16161C] hover:bg-[#1D1D24] text-[#FAF8F5] border border-white/10 font-bold uppercase transition-all duration-300',
          badge: 'bg-[#16161C] text-[#FFA31A] border border-[#FFA31A]/25',
          footer: 'bg-[#060608] border-t border-[#1A1A1E]',
          gridPattern: 'grid-lines-dark',
          accentText: 'text-[#FFA31A] hover:text-[#FFC107]',
          divider: 'border-[#1A1A1E]',
        };
    }
  };

  const c = getThemeClasses();

  const handleScrollToSection = (id: string) => {
    setSelectedServicePage(null);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className={`min-h-screen relative flex flex-col justify-between ${c.wrapper}`}>
      
      {/* Background Glow Ring Overlay from Editorial Aesthetic */}
      <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-[#A3B18A] rounded-full blur-[160px] opacity-[0.035] pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-[#A3B18A] rounded-full blur-[160px] opacity-[0.025] pointer-events-none"></div>

      {/* Background Grid Pattern */}
      <div className={`absolute inset-0 ${c.gridPattern} pointer-events-none opacity-[0.35] z-0`}></div>

      {/* FIXED HEADER AND NAVIGATION */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 pointer-events-none transition-all duration-300">
        <nav className={`mx-auto w-full transition-all duration-500 pointer-events-auto rounded-none ${
          scrolledToTop 
            ? `max-w-7xl border-b bg-transparent border-transparent pt-3 pb-3` 
            : `max-w-5xl rounded-2xl border bg-opacity-90 dark:bg-opacity-90 shadow-[0_12px_44px_-10px_rgba(0,0,0,0.15)] ${
                theme === 'sand' 
                  ? 'bg-white/95 border-[#E5DFD3] shadow-neutral-200/50' 
                  : theme === 'sage' 
                  ? 'bg-[#101913]/95 border-[#23382B] shadow-black/40' 
                  : 'bg-[#141715]/95 border-white/10 shadow-black/50'
              }`
        } ${c.navbar}`}>
          <div className="px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
            
            {/* Brand Logo Signature - Premium Golden Helix */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setSelectedServicePage(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#FAB319] dark:text-[#FAB319] animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M 50 10 C 25 20, 20 40, 50 90 C 80 40, 75 20, 50 10 Z" strokeOpacity="0.8" />
                  <path d="M 10 50 C 20 25, 40 20, 90 50 C 40 80, 20 75, 10 50 Z" strokeOpacity="0.4" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="16" strokeWidth="1" strokeOpacity="0.6" />
                  <circle cx="50" cy="50" r="6" fill="currentColor" />
                </svg>
                <div className="absolute w-3 h-3 rounded-full bg-[#FAB319] opacity-35 blur-[3px] animate-pulse"></div>
              </div>
              <div>
                <span className="font-display font-medium text-xs sm:text-sm tracking-[0.1em] block leading-none">
                  Nordic Solutions <span className="text-[#FAB319] font-bold">AI</span>
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase opacity-45 block mt-1">
                  Bespoke Integrations
                </span>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6 text-xs font-sans font-medium">
              <button onClick={() => { setSelectedServicePage(null); setTimeout(() => handleScrollToSection('solutions'), 50); }} className={`hover:opacity-100 opacity-75 transition-all cursor-pointer ${c.accentText}`}>
                {dict.navServices}
              </button>
              <button onClick={() => { setSelectedServicePage(null); setTimeout(() => handleScrollToSection('sandbox'), 50); }} className={`hover:opacity-100 opacity-75 transition-all cursor-pointer ${c.accentText}`}>
                {dict.navSimulator}
              </button>
              <button onClick={() => { setSelectedServicePage(null); setTimeout(() => handleScrollToSection('calculator'), 50); }} className={`hover:opacity-100 opacity-75 transition-all cursor-pointer ${c.accentText}`}>
                {dict.navCalculator}
              </button>
              <button 
                onClick={() => {
                  setSelectedServicePage('blogs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className={`hover:opacity-100 opacity-75 transition-all cursor-pointer ${selectedServicePage === 'blogs' ? 'text-[#FAB319] underline font-bold' : ''} ${c.accentText}`}
              >
                {language === 'da' ? 'Cases & Blog' : 'Cases & Blog'}
              </button>
              <button onClick={() => { setSelectedServicePage(null); setTimeout(() => handleScrollToSection('scheduler-section'), 50); }} className={`hover:opacity-100 opacity-75 transition-all cursor-pointer ${c.accentText}`}>
                {language === 'da' ? 'Book Møde' : 'Book Session'}
              </button>
              <button onClick={() => { setSelectedServicePage(null); setTimeout(() => handleScrollToSection('roadmap'), 50); }} className={`hover:opacity-100 opacity-75 transition-all cursor-pointer ${c.accentText}`}>
                {dict.navContact}
              </button>
            </div>

            {/* Interactive Actions - Theme selector + Language toggle */}
            <div className="flex items-center gap-2 sm:gap-4 text-xs">
              
              {/* Theme switcher picker */}
              <div className="flex gap-1 p-0.5 rounded-full bg-neutral-200/20 border border-neutral-300/10 shrink-0">
                <button
                  onClick={() => setTheme('sand')}
                  title={dict.themeSand}
                  className={`p-1 sm:p-1.5 rounded-full transition-all cursor-pointer ${theme === 'sand' ? 'bg-[#D97706] text-white shadow-xxs' : 'opacity-60 text-current'}`}
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTheme('slate')}
                  title={dict.themeSlate}
                  className={`p-1 sm:p-1.5 rounded-full transition-all cursor-pointer ${theme === 'slate' ? 'bg-[#FAB319] text-[#080809] shadow-xxs' : 'opacity-60 text-current'}`}
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTheme('sage')}
                  title={dict.themeSage}
                  className={`p-1 sm:p-1.5 rounded-full transition-all cursor-pointer ${theme === 'sage' ? 'bg-[#FFA31A] text-[#0C0C0E] shadow-xxs' : 'opacity-60 text-current'}`}
                >
                  <TreePine className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Language switch toggle */}
              <button
                onClick={() => setLanguage(language === 'da' ? 'en' : 'da')}
                className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg border font-mono font-medium text-[10px] sm:text-xs transition-transform cursor-pointer tracking-wider hover:scale-[1.02] active:scale-[0.98] ${
                  theme === 'sand' 
                  ? 'border-neutral-300 text-neutral-800' 
                  : theme === 'slate' 
                  ? 'border-neutral-700 text-white' 
                  : 'border-neutral-800 text-neutral-100'
                }`}
              >
                {language === 'da' ? 'EN' : 'DK'}
              </button>

            </div>
          </div>
        </nav>
      </div>

      {selectedServicePage === null ? (
        <>
          {/* HERO SECTION - COPENHAGEN DESIGN STUDIO STYLE */}
          <header 
            onPointerMove={handleHeroMouseMove}
            onPointerLeave={handleHeroMouseLeave}
            className="relative z-10 pt-32 sm:pt-40 pb-20 sm:pb-28 w-full px-6 sm:px-16 lg:px-24 flex flex-col items-center overflow-hidden border-b border-current/[0.04] bg-current/[0.004] my-0 cursor-default group"
          >
                     {/* Subtle dynamic background texture & kinetic ambient gradient overlay */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
              
              {/* Soft modern glowing ambient pools */}
              <motion.div 
                animate={{ 
                  x: heroMouse.x * 25, 
                  y: heroMouse.y * 25 
                }}
                transition={{ type: "spring", stiffness: 45, damping: 20 }}
                className="absolute inset-0 opacity-[0.2] dark:opacity-[0.16] filter blur-[100px] select-none pointer-events-none"
              >
                <div className="absolute top-[5%] left-[10%] w-[380px] h-[380px] rounded-full bg-[#FAB319]/15" />
                <div className="absolute bottom-[8%] right-[20%] w-[420px] h-[420px] rounded-full bg-[#D97706]/10 animate-pulse" />
              </motion.div>

              {/* Ultra-fine tactile film grain SVG backdrop */}
              <motion.div 
                animate={{ 
                  x: heroMouse.x * -4, 
                  y: heroMouse.y * -4 
                }}
                transition={{ type: "spring", stiffness: 30, damping: 15 }}
                className="absolute -inset-[50%] w-[200%] h-[200%] opacity-[0.03] dark:opacity-[0.02] mix-blend-overlay"
              >
                <svg 
                  viewBox="0 0 250 250" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-full h-full animate-noise-grain"
                >
                  <filter id="editorialNoise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.8 0" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#editorialNoise)" />
                </svg>
              </motion.div>

              {/* MODERN ARCHITECTURAL PIPELINE CIRCUIT GRID */}
              <div className="absolute inset-0 flex items-center justify-center -z-5 opacity-40 dark:opacity-30">
                <svg className="w-full h-full text-[#FAB319]/20" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                      <path d="M 80 0 L 0 0 0 80" className="text-current opacity-20" strokeWidth="0.5" />
                      <circle cx="80" cy="80" r="1.5" className="text-[#FAB319]" fill="currentColor" fillOpacity="0.4" />
                    </pattern>
                    <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FAB319" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#FAB319" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FAB319" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill the background with a soft technical grid pattern */}
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                  
                  {/* Active flow pipelines (interconnected circuit paths with flowing dash phase) */}
                  <g className="opacity-70">
                    {/* Horizontal pipeline 1 */}
                    <path d="M -100,150 L 300,150 L 400,250 L 900,250 L 1000,150 L 2200,150" 
                      stroke="url(#line-grad)" strokeWidth="1.2" strokeDasharray="12 180" className="animate-pipeline-flow-1" />
                    
                    {/* Horizontal pipeline 2 */}
                    <path d="M -100,450 L 600,450 L 700,350 L 1200,350 L 1300,450 L 2200,450" 
                      stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="15 220" className="animate-pipeline-flow-2" />

                    {/* Transversal connector pipeline */}
                    <path d="M 200,50 L 200,300 L 350,300 L 350,550" 
                      stroke="#FAB319" strokeWidth="0.8" strokeOpacity="0.15" />
                    <path d="M 850,100 L 850,400 L 1100,400 Q 1150,400 1150,500" 
                      stroke="#FAB319" strokeWidth="0.8" strokeOpacity="0.15" />
                  </g>
                </svg>
              </div>

              {/* Technical indicators and brackets on the margin */}
              <motion.div
                animate={{ 
                  x: heroMouse.x * -10, 
                  y: heroMouse.y * -10 
                }}
                transition={{ type: "spring", stiffness: 60, damping: 25 }}
                className="absolute inset-0 select-none pointer-events-none z-10"
              >
                {/* Micro tech info */}
                <div className="absolute top-4 left-6 font-mono text-[9px] tracking-widest opacity-25 hidden lg:block">✦ 55.6761° N, 12.5683° E // CPH.INTELLIGENCE</div>
                <div className="absolute top-4 right-6 font-mono text-[9px] tracking-widest opacity-25 hidden lg:block">NORDIC_SOLUTIONS_AGENTS_v1.07</div>
                <div className="absolute bottom-5 left-6 font-mono text-[9px] tracking-widest opacity-20 hidden lg:block">CORE_VM_INGRESS: PORT_3000 // OPERATIONAL STATUS LIVE</div>
                <div className="absolute bottom-5 right-6 font-mono text-[9px] tracking-widest opacity-20 hidden lg:block">SECURE_GDPR_LOCAL_DATA_ISOLATION_12MS</div>
 
                {/* Minimal geometric corner brackets */}
                <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-current/15"></div>
                <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-current/15"></div>
                <div className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-current/15"></div>
                <div className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-current/15"></div>

                {/* Highly structured, floating technical indicators representing core service statuses */}
                <div className="absolute top-[15%] left-[5%] hidden xl:flex flex-col gap-1 p-3.5 rounded-xl bg-[#0F1012]/80 border border-white/5 shadow-2xl backdrop-blur-md animate-float">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold opacity-80 text-white">LIVE_VOICE_LINE</span>
                  </div>
                  <span className="font-mono text-[8.5px] opacity-40">SIP SLA: 0.4s response</span>
                </div>

                <div className="absolute top-[22%] right-[5%] hidden xl:flex flex-col gap-1 p-3.5 rounded-xl bg-[#0F1012]/80 border border-white/5 shadow-2xl backdrop-blur-md animate-float" style={{ animationDelay: '1.2s' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold opacity-80 text-white">HUBSPOT_PIPELINE</span>
                  </div>
                  <span className="font-mono text-[8.5px] opacity-45">SYNC_STATUS: SECURE_GDPR</span>
                </div>

                <div className="absolute bottom-[20%] left-[6%] hidden xl:flex flex-col gap-1 p-3.5 rounded-xl bg-[#0F1012]/80 border border-white/5 shadow-2xl backdrop-blur-md animate-float" style={{ animationDelay: '0.6s' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FAB319] animate-pulse" />
                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold opacity-80 text-white">n8n_SCHEDULER</span>
                  </div>
                  <span className="font-mono text-[8.5px] opacity-45">QUEUE: Idle (0 errors)</span>
                </div>

                <div className="absolute bottom-[24%] right-[6%] hidden xl:flex flex-col gap-1 p-3.5 rounded-xl bg-[#0F1012]/80 border border-white/5 shadow-2xl backdrop-blur-md animate-float" style={{ animationDelay: '1.8s' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold opacity-80 text-white">EU_DATA_HOST</span>
                  </div>
                  <span className="font-mono text-[8.5px] opacity-45">Location: Copenhagen Node</span>
                </div>
              </motion.div>
 
              {/* Crosshair target in exact center */}
              <motion.div 
                animate={{ 
                  x: heroMouse.x * 12, 
                  y: heroMouse.y * 12 
                }}
                transition={{ type: "spring", stiffness: 75, damping: 18 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-15 text-[#FAB319]"
              >
                <div className="absolute top-0 bottom-0 left-2 w-[1px] bg-current" />
                <div className="absolute left-0 right-0 top-2 h-[1px] bg-current" />
              </motion.div>
 
              {/* Edge vignetting mask for refined visual focus */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-current/[0.015]" />
            </div>
        
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-20">
          
          {/* Left Column: Words and interactive call-to-actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-medium tracking-wide uppercase ${c.badge}`}>
                <Sparkles className="w-3.5 h-3.5 fill-current animate-float" />
                {dict.tagline}
              </span>
            </motion.div>

            <div className="space-y-4 max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 25 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-5xl lg:text-[45px] xl:text-[54px] font-display font-medium leading-[1.1] tracking-tight"
              >
                {dict.heroTitle_1} <br />
                <span className={`block sm:inline mt-1.5 sm:mt-0 select-none min-h-[1.2em] font-serif italic font-normal ${c.accentText}`}>
                  <Typewriter phrases={dynamicSubheadings[language]} currentIndex={subheadingIndex} />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`text-sm sm:text-base leading-relaxed ${c.textMuted}`}
              >
                {dict.heroSub}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                onClick={() => handleScrollToSection('scheduler-section')}
                className={`w-full sm:w-auto px-6 py-4 rounded-xl text-xs font-display font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${c.buttonPrimary}`}
              >
                {language === 'da' ? 'Book Gratis Driftsanalyse' : 'Book Free Analysis'}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                onClick={() => handleScrollToSection('solutions')}
                className={`w-full sm:w-auto px-6 py-4 rounded-xl text-xs font-display font-semibold flex items-center justify-center cursor-pointer border border-current/10 hover:bg-current/[0.02] ${c.buttonSecondary}`}
              >
                {dict.ctaExplore}
              </motion.button>
            </motion.div>

          </div>

          {/* Right Column: Premium Interactive Telemetry Console */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full relative z-10"
          >
            <HeroConsole language={language} theme={theme} />
          </motion.div>

        </div>
 
        {/* Horizontal Danish logos ribbon with sophisticated scale/opacity fade */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 border-t w-full max-w-5xl pt-8 flex flex-col items-center space-y-4 border-gray-200/40 dark:border-neutral-800/40 opacity-40 hover:opacity-80 transition-opacity duration-500"
        >
          <p className="text-[9px] font-mono uppercase tracking-widest opacity-50">
            {language === 'da' ? 'TILLID AF DE BEDSTE DANSKE VIRKSOMHEDER' : 'TRUSTED BY LEADING DANISH ENTERPRISES'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 font-serif italic text-sm sm:text-base">
            <span className="font-display font-bold text-xs sm:text-sm tracking-tight text-current uppercase not-italic">✓ Cph_Furniture™</span>
            <span className="font-sans font-semibold tracking-wide text-xs sm:text-sm opacity-90 not-italic">Aarhus Clinic Hub</span>
            <span className="font-serif text-current font-medium">Odense Logistics ApS</span>
            <span className="font-mono text-xs text-current not-italic uppercase tracking-tight">Vesterbro.Design</span>
          </div>
        </motion.div>

      </header>

      {/* SECTION 1: CORE SOLUTIONS SHOWCASE (Asymmetrical Elegant Presentation) */}
      <section id="solutions" className={`relative z-10 py-16 sm:py-28 border-t ${c.divider} overflow-hidden`}>
        {/* Subtle decorative background laser beam */}
        <div className="absolute top-0 right-[15%] w-[1px] h-full bg-gradient-to-b from-[#FAB319]/25 via-transparent to-transparent pointer-events-none select-none hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
            <div className="lg:col-span-8">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase ${c.badge} animate-pulse`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current block" />
                {language === 'da' ? 'Komplet Driftsrevision' : 'Complete Workflow Audit'}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium mt-3 tracking-tight leading-none text-current">
                {language === 'da' ? 'Tre søjler til intelligent enterprise' : 'Three Core Pillars to Intelligent Enterprise'}
              </h2>
              <p className={`text-sm sm:text-base mt-4 max-w-2xl leading-relaxed opacity-85 ${c.textMuted}`}>
                {language === 'da'
                  ? 'Vi bygger ikke isolerede bots. Vi udvikler modstandsdygtige, dybe strukturer af automationer, der forbinder jeres igangværende systemer og forbedrer medarbejderens dagligdag.'
                  : 'Isolated bots decay. We construct robust, deep structural layers of custom automation linking your active CRM and legacy systems seamlessly.'
                }
              </p>
            </div>
            
            <div className="lg:col-span-4 lg:text-right font-mono text-[10px] opacity-40 uppercase tracking-widest pt-2 lg:pt-8 hidden lg:block">
              <span className="block text-[#FAB319]">SYSTEM // CAPABILITIES // v1.17</span>
              <span className="block mt-1">SWEDISH & DANISH LANGUAGE SUITE</span>
              <span className="block mt-1">SECURED BY GDPR STANDARDS // CORE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1: Voice */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between relative overflow-hidden group ${c.card} ${c.cardHover}`}
            >
              {/* Fiber light accent line glow */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FAB319]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 right-4 font-mono text-[9px] opacity-25">01 // TELEPHONY</div>

              <div className="space-y-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${theme === 'sand' ? 'bg-[#7A8A64]/10 text-[#7A8A64]' : 'bg-[#FAB319]/10 text-[#FAB319]'}`}>
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <h3 className="font-display font-semibold text-lg text-current tracking-tight">{dict.voiceAgents}</h3>
                <p className={`text-xs sm:text-[13px] leading-relaxed ${c.textMuted}`}>{dict.voiceAgentsDesc}</p>
              </div>
              <div className="pt-6 border-t mt-6 border-current/[0.05] flex items-center justify-between gap-4">
                <button
                  onClick={() => {
                    handleScrollToSection('sandbox');
                    setActiveSandboxTab('voice');
                  }}
                  className={`text-xs font-semibold flex items-center gap-1 cursor-pointer ${c.accentText} hover:underline`}
                >
                  {language === 'da' ? 'Prøv stemmetest' : 'Try mock dialer'}
                  <ChevronRight className="w-4 h-4 animate-bounce-horizontal" />
                </button>
                <button
                  onClick={() => {
                    setSelectedServicePage('voice');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className={`text-[11px] font-mono opacity-70 hover:opacity-100 hover:underline cursor-pointer flex items-center gap-0.5 transition-opacity ${c.accentText}`}
                >
                  {language === 'da' ? 'Læs mere' : 'Deep Dive'}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>

            {/* Box 2: CRM */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between relative overflow-hidden group ${c.card} ${c.cardHover}`}
            >
              {/* Fiber light accent line glow */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FAB319]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 right-4 font-mono text-[9px] opacity-25">02 // LEDGER</div>

              <div className="space-y-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${theme === 'sand' ? 'bg-[#7A8A64]/10 text-[#7A8A64]' : 'bg-[#FAB319]/10 text-[#FAB319]'}`}>
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-current tracking-tight">{dict.crmTitle}</h3>
                <p className={`text-xs sm:text-[13px] leading-relaxed ${c.textMuted}`}>{dict.crmDesc}</p>
              </div>
              <div className="pt-6 border-t mt-6 border-current/[0.05] flex items-center justify-between gap-4">
                <button
                  onClick={() => {
                    handleScrollToSection('sandbox');
                    setActiveSandboxTab('crm');
                  }}
                  className={`text-xs font-semibold flex items-center gap-1 cursor-pointer ${c.accentText} hover:underline`}
                >
                  {language === 'da' ? 'Test pipeline flow' : 'Simulate pipeline'}
                  <ChevronRight className="w-4 h-4 animate-bounce-horizontal" />
                </button>
                <button
                  onClick={() => {
                    setSelectedServicePage('crm');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className={`text-[11px] font-mono opacity-70 hover:opacity-100 hover:underline cursor-pointer flex items-center gap-0.5 transition-opacity ${c.accentText}`}
                >
                  {language === 'da' ? 'Læs mere' : 'Deep Dive'}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>

            {/* Box 3: Workflows */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between relative overflow-hidden group ${c.card} ${c.cardHover}`}
            >
              {/* Fiber light accent line glow */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FAB319]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 right-4 font-mono text-[9px] opacity-25">03 // PIPELINES</div>

              <div className="space-y-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${theme === 'sand' ? 'bg-[#7A8A64]/10 text-[#7A8A64]' : 'bg-[#FAB319]/10 text-[#FAB319]'}`}>
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-current tracking-tight">{dict.automationTitle}</h3>
                <p className={`text-xs sm:text-[13px] leading-relaxed ${c.textMuted}`}>{dict.automationDesc}</p>
              </div>
              <div className="pt-6 border-t mt-6 border-current/[0.05] flex items-center justify-between gap-4">
                <button
                  onClick={() => {
                    handleScrollToSection('sandbox');
                    setActiveSandboxTab('roi');
                  }}
                  className={`text-xs font-semibold flex items-center gap-1 cursor-pointer ${c.accentText} hover:underline`}
                >
                  {language === 'da' ? 'Beregn ROI' : 'Calculate savings'}
                  <ChevronRight className="w-4 h-4 animate-bounce-horizontal" />
                </button>
                <button
                  onClick={() => {
                    setSelectedServicePage('automation');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className={`text-[11px] font-mono opacity-70 hover:opacity-100 hover:underline cursor-pointer flex items-center gap-0.5 transition-opacity ${c.accentText}`}
                >
                  {language === 'da' ? 'Læs mere' : 'Deep Dive'}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ADJOINING SECTION: SPECIALIZED AI WORKFORCE AGENTS */}
      <SpecializedAgents 
        language={language}
        theme={theme}
        onBookClick={() => handleScrollToSection('scheduler-section')}
      />

      {/* SECTION 2: INTERACTIVE AI SANDBOX PLAYGROUND (Bespoke Operating Console Style) */}
      <section id="sandbox" className={`relative z-10 py-16 sm:py-28 border-t ${c.divider} overflow-hidden`}>
        {/* Subtle decorative linear grid lines in background */}
        <div className="absolute inset-0 bg-radial-gradient from-current/[0.01] to-transparent pointer-events-none select-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase ${c.badge} shadow-[0_0_15px_rgba(250,179,25,0.08)]`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {language === 'da' ? 'Interaktiv Sandkasse' : 'Interactive Sandbox Console'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium mt-3 tracking-tight">
              {dict.tryDemoHeader}
            </h2>
            <p className={`text-xs sm:text-sm mt-2 max-w-xl mx-auto opacity-75 ${c.textMuted}`}>
              {dict.tryDemoSub}
            </p>
          </div>

          {/* Majestic Command Terminal outer chassis frame */}
          <div className="rounded-3xl border border-current/[0.08] bg-current/[0.01] backdrop-blur-xs p-2 sm:p-4 overflow-hidden relative shadow-2xl">
            
            {/* Window chrome header styling mimicking a high-end AI mainframe */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 border-b border-current/[0.05] mb-6 gap-3">
              {/* Fake operating system traffic lights */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 block" />
                <span className="ml-3 font-mono text-[10px] opacity-40 uppercase tracking-widest hidden sm:inline">nordic_ai_terminal.sh</span>
              </div>

              {/* Module Pick Tab Menu Bar inside window chrome */}
              <div className="flex p-1 rounded-xl bg-gray-100 dark:bg-neutral-900 border border-gray-200/65 dark:border-neutral-800/80 max-w-md w-full sm:w-80 gap-1 text-[11px]">
                <button
                  onClick={() => setActiveSandboxTab('voice')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-sans transition-all cursor-pointer ${
                    activeSandboxTab === 'voice' 
                      ? 'bg-white dark:bg-neutral-950 font-semibold shadow-xs text-neutral-900 dark:text-amber-300' 
                      : 'opacity-65 hover:opacity-100 text-current'
                  }`}
                >
                  {dict.voiceAgents}
                </button>
                <button
                  onClick={() => setActiveSandboxTab('crm')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-sans transition-all cursor-pointer ${
                    activeSandboxTab === 'crm' 
                      ? 'bg-white dark:bg-neutral-950 font-semibold shadow-xs text-neutral-900 dark:text-amber-300' 
                      : 'opacity-65 hover:opacity-100 text-current'
                  }`}
                >
                  {language === 'da' ? 'Visual Builder' : 'CRM Tracker'}
                </button>
                <button
                  onClick={() => setActiveSandboxTab('roi')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-sans transition-all cursor-pointer ${
                    activeSandboxTab === 'roi' 
                      ? 'bg-white dark:bg-neutral-950 font-semibold shadow-xs text-neutral-900 dark:text-amber-300' 
                      : 'opacity-65 hover:opacity-100 text-current'
                  }`}
                >
                  {dict.navCalculator}
                </button>
              </div>

              {/* Dynamic simulated parameters */}
              <div className="flex items-center gap-3 font-mono text-[9px] opacity-50 justify-between sm:justify-end">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  API STATUS: 200 OK
                </span>
                <span className="hidden md:inline">LATENCY: 14ms</span>
              </div>
            </div>

            {/* Tab Views Content Area with deep rich shadows */}
            <div className={`p-6 sm:p-10 rounded-2xl border ${c.card} relative overflow-hidden shadow-inner min-h-[440px] flex items-center justify-center`}>
              {/* Soft backdrop grids */}
              <div className={`absolute inset-0 ${c.gridPattern} opacity-10 pointer-events-none`}></div>

              <div className="relative z-10 w-full">
                {activeSandboxTab === 'voice' && <VoiceAgentDemo language={language} />}
                {activeSandboxTab === 'crm' && <CRMWorkflowBuilder language={language} />}
                {activeSandboxTab === 'roi' && <RoiCalculator language={language} />}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: DANISH ROI CALCULATOR SLIDERS */}
      <section id="calculator" className={`relative z-10 py-16 sm:py-24 border-t ${c.divider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase ${c.badge}`}>
              Finansiel Relevans
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium mt-2 tracking-tight">
              {language === 'da' ? 'Hvad koster manuel administration dig?' : 'What does manual entry overhead cost your agency?'}
            </h2>
            <p className={`text-xs sm:text-sm mt-1 opacity-75 ${c.textMuted}`}>
              {language === 'da'
                ? 'Indtast jeres ugentlige spildtid og gennemsnitlige lønninger og se det akkumulerede afkast, hvis I automatiserer workflows.'
                : 'Input your company overhead parameters and manual hour friction logs to see immediate payback indicators.'}
            </p>
          </div>

          <RoiCalculator language={language} />

        </div>
      </section>

      {/* SECTION 4: CLIENT DISCOVERY ROADMAP FORM (Bespoke Two-Column Editorial Layout) */}
      <section id="roadmap" className={`relative z-10 py-20 sm:py-32 border-t ${c.divider} overflow-hidden`}>
        {/* Subtle decorative grid lines */}
        <div className="absolute top-0 left-[35%] w-[1px] h-full bg-gradient-to-b from-[#FAB319]/10 via-transparent to-transparent pointer-events-none select-none hidden lg:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Premium Brand Editorial Positioning */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
              <div className="space-y-4">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase ${c.badge}`}>
                  Proces & Køreplan
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium leading-tight tracking-tight">
                  {language === 'da' ? 'Design din automatiserede fremtid' : 'Design Your Automated Future'}
                </h2>
                <p className={`text-base leading-relaxed opacity-75 ${c.textMuted}`}>
                  {language === 'da'
                    ? 'Vi tror på fuld gennemsigtighed. Brug vores interaktive køreplan til at fortælle os om din virksomhed, så sender vi dig en komplet blueprint-rapport inden for 24 timer.'
                    : 'We value strategic clarity. Complete our secure interactive wizard to map your operations, and receive a customized core integration roadmap within 24 hours.'}
                </p>
              </div>

              {/* Outstanding Editorial Quote Statement */}
              <div className="relative pl-6 py-2 border-l-2 border-[#FAB319]/40">
                <p className="font-sans italic text-sm opacity-80 leading-relaxed text-current">
                  {language === 'da'
                    ? '"Automatisering handler ikke om at erstatte menneskelig formåen. Det handler om at fjerne friktion og øge den ugentlige overskudstid."'
                    : '"Automation is not about substituting human ingenuity—it is about eradicating operational drag to expand your mental runway."'}
                </p>
                <span className="block mt-2 font-mono text-[9px] uppercase tracking-widest opacity-40">— Nordic Automation Lead</span>
              </div>

              {/* Consultation Deliverables list */}
              <div className="space-y-3.5 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider opacity-90">{language === 'da' ? 'Komplet arkitekturark i PDF' : 'Complete Architecture Blueprint PDF'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider opacity-90">{language === 'da' ? 'Fast pris og præcist tidsestimat' : 'Fixed Scope & Direct Payback Model'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-950/30 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider opacity-90">{language === 'da' ? 'En uforpligtende 30-min gennemgang' : 'No-obligation 30-Minute Review Session'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Multi-step Form Wizard Container */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`p-6 sm:p-10 rounded-3xl border ${c.card} relative overflow-hidden shadow-2xl`}
              >
                {/* Visual glow backdrop highlight */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-[#FAB319]/5 to-transparent filter blur-3xl pointer-events-none" />
                
                <h3 className="font-display font-medium text-lg mb-6 tracking-tight text-current border-b border-current/[0.04] pb-4">
                  {language === 'da' ? 'Interaktiv forespørgsel' : 'Structured Assessment Wizard'}
                </h3>
                
                <InquiryRoadmap language={language} theme={theme} />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* CASE STUDIES BENTO GRID */}
      <section className={`relative z-10 py-16 sm:py-24 border-t ${c.divider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 border-b border-current/[0.04] pb-8">
            <div className="lg:col-span-7">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase ${c.badge}`}>
                Gennemførte Cases
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-medium mt-3 tracking-tight leading-tight">
                {language === 'da' ? 'Skandinaviske Succeshistorier' : 'Scandinavian Real-World Integrations'}
              </h2>
              <p className={`text-xs sm:text-sm mt-2 max-w-xl opacity-75 ${c.textMuted}`}>
                {language === 'da'
                  ? 'Se eksempler på hvordan vi har revideret arbejdsgange og øget marginerne hos rigtige nordiske selskaber.'
                  : 'Discover metrics achieved in-production across clinical, commerce, and agency ventures in Denmark.'}
              </p>
            </div>
            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <div className="p-4 rounded-xl bg-current/[0.012] border border-current/[0.04] flex items-center gap-4 text-left">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
                <div className="font-mono text-[10px] uppercase tracking-wider opacity-80 leading-snug">
                  <div>SYSTEMS METRIC: UPTIME 99.98%</div>
                  <div className="opacity-50">PROCESSED SEAMLESSLY: 42,400+ AGENT CALLS</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-stretch">
            
            {/* Box 1 - Wide - Clinic case */}
            <div className={`md:col-span-4 p-6 sm:p-8 rounded-3xl border flex flex-col justify-between ${c.card} ${c.cardHover}`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Content Left Column */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest">Aarhus Tandklinik Hub</span>
                      <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-500/10 dark:bg-emerald-950/30 px-2.5 py-1 rounded inline-block sm:hidden">
                        -82% Telefonkø
                      </span>
                    </div>
                    <h3 className="font-display font-medium text-lg text-current leading-snug">
                      {language === 'da' 
                        ? 'AI-Receptionist overtog 430 ugentlige telefonopkald' 
                        : 'AI-Receptionist handled 430 Weekly client inquiries autonomously'}
                    </h3>
                    <p className={`text-xs leading-relaxed ${c.textMuted}`}>
                      {language === 'da'
                        ? "Ved at integrere vores stemmestyrede AI-gateway direkte til klinikkens journalsystem, kan patienter nu booke og rykke tider døgnet rundt uden ventetid. Receptionisterne sparer 14 timer om ugen."
                        : "By bridging our automated vocal gateway directly into patient database schemas, patients now book or adjust check-up appointments in real time. Dental desks recovered 14 manual service hours weekly."
                      }
                    </p>
                  </div>
                  <div className="pt-6 border-t border-gray-150/40 dark:border-neutral-800/40 font-mono text-[10.5px] opacity-70 flex justify-between gap-4">
                    <span>INTERFACED: Dental journal API</span>
                    <span>IMPLEMENTED: 11 Dage</span>
                  </div>
                </div>

                {/* Visual Right Column (Live Agent flow simulator element) */}
                <div className="lg:col-span-4 hidden lg:flex flex-col justify-between p-4 bg-current/[0.015] dark:bg-neutral-900/30 border border-current/[0.04] rounded-2xl relative overflow-hidden text-xs">
                  {/* Absolute header indicator */}
                  <div className="flex justify-between items-center text-[9px] font-mono opacity-60 border-b border-current/[0.05] pb-2 mb-2 w-full">
                    <span>LIVE GATEWAY STATUS</span>
                    <span className="text-emerald-500 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      ACTIVE
                    </span>
                  </div>

                  {/* Micro Steps Visual */}
                  <div className="space-y-2.5 my-auto">
                    <div className="flex items-center gap-2 p-1.5 rounded bg-white dark:bg-neutral-900 border border-current/[0.03] shadow-xxs">
                      <span className="w-4 h-4 rounded-full bg-[#A3B18A]/20 text-[#718259] dark:text-[#A3B18A] flex items-center justify-center font-mono text-[9px]">1</span>
                      <div className="leading-none text-[10px]">
                        <div className="font-semibold text-current">Inbound Call</div>
                        <div className="text-[8px] opacity-40 mt-0.5">SIP Gateway routed</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 rounded bg-white dark:bg-neutral-900 border border-current/[0.03] shadow-xxs">
                      <span className="w-4 h-4 rounded-full bg-[#A3B18A]/20 text-[#718259] dark:text-[#A3B18A] flex items-center justify-center font-mono text-[9px]">2</span>
                      <div className="leading-none text-[10px]">
                        <div className="font-semibold text-current">Parsed Journal</div>
                        <div className="text-[8px] opacity-40 mt-0.5">Identified CPR registry</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 rounded bg-white dark:bg-neutral-900 border border-current/[0.03] shadow-xxs">
                      <span className="w-4 h-4 rounded-full bg-[#A3B18A]/20 text-[#718259] dark:text-[#A3B18A] flex items-center justify-center font-mono text-[9px]">3</span>
                      <div className="leading-none text-[10px]">
                        <div className="font-semibold text-current">Calendar Booked</div>
                        <div className="text-[8px] opacity-40 mt-0.5">Write successful in 1.4s</div>
                      </div>
                    </div>
                  </div>

                  {/* Giant Badge */}
                  <div className="mt-3 bg-emerald-500/10 text-emerald-500 p-2 rounded text-center border border-emerald-500/10">
                    <div className="text-lg font-mono font-bold leading-none">-82%</div>
                    <div className="text-[8px] uppercase tracking-widest font-mono opacity-80 mt-1">TELEFONKØ REDUCERET</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Box 2 - Small - Furniture case */}
            <div className={`md:col-span-2 p-6 sm:p-8 rounded-3xl border flex flex-col justify-between ${c.card} ${c.cardHover}`}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest">Cph Furniture</span>
                  <span className="w-2 h-2 rounded-full bg-[#A3B18A]"></span>
                </div>
                <h3 className="font-display font-medium text-lg text-current leading-tight">
                  {language === 'da' ? 'Opdatering af CRM' : 'Salesforce Bridge'}
                </h3>
                <p className={`text-xs leading-relaxed ${c.textMuted}`}>
                  {language === 'da'
                    ? "Fuldt synkroniseret e-mail workflow. AI udtrækker budget, lokation og tlf. og opretter leadet i HubSpot. Fejlrate faldet til under 0,5%."
                    : "Automated parsing processes budget variables and flags leads in HubSpot. Entry errors decreased down to 0%."
                  }
                </p>
              </div>

              {/* Progress gauge visual block */}
              <div className="mt-5 pt-4 border-t border-current/[0.03] flex items-center gap-3">
                <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle cx="20" cy="20" r="16" fill="transparent" stroke="currentColor" className="opacity-10" strokeWidth="3" />
                    <circle cx="20" cy="20" r="16" fill="transparent" stroke="#10B981" strokeDasharray="100" strokeDashoffset="5" strokeWidth="3" />
                  </svg>
                  <span className="text-[9px] font-mono font-bold text-[#10B981]">95%</span>
                </div>
                <div className="text-[9.5px] font-mono leading-tight opacity-75">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">95% FAST COMPLETED</div>
                  <div className="opacity-50">BYPASS MANUAL DATA ENTRY</div>
                </div>
              </div>
            </div>

            {/* Box 3 - Small - Cargo case */}
            <div className={`md:col-span-2 p-6 sm:p-8 rounded-3xl border flex flex-col justify-between ${c.card} ${c.cardHover}`}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest">Odense Logistics</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                </div>
                <h3 className="font-display font-medium text-lg text-current leading-tight">
                  {language === 'da' ? 'SMS-Notifikationer' : 'Delivery SMS Alert'}
                </h3>
                <p className={`text-xs leading-relaxed ${c.textMuted}`}>
                  {language === 'da'
                    ? "Integrationer, der automatisk pinger kunder over SMS ti minutter før fragtmandens ankomst baseret på GPS-data."
                    : "Synchronous webhook dispatches high-accuracy SMS notices based on transit GPS triggers gracefully."
                  }
                </p>
              </div>

              {/* Mock SMS Widget */}
              <div className="mt-5 p-2 bg-current/[0.02] border border-current/[0.04] rounded-xl font-sans text-[10px] space-y-1">
                <div className="flex justify-between font-mono text-[8px] opacity-40">
                  <span>SMS GATEWAY</span>
                  <span>10 min ago</span>
                </div>
                <div className="bg-current/[0.04] rounded-lg p-1.5 leading-tight opacity-90">
                  {language === 'da' 
                    ? "Fragtfører Michael ankommer om 12 min. CVR: DK-8274..." 
                    : "Courier Michael arriving in 12 min. Transit ref: CPH-81"
                  }
                </div>
                <div className="text-right text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  +4.200 SMS/md
                </div>
              </div>
            </div>

            {/* Box 4 - Wide - Tech venture case */}
            <div className={`md:col-span-4 p-6 sm:p-8 rounded-3xl border flex flex-col justify-between ${c.card} ${c.cardHover}`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Content Left */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono font-bold opacity-50 uppercase tracking-widest">Vesterbro Tech Ventures</span>
                      <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded inline-block sm:hidden">
                        CVR Synkroniseret
                      </span>
                    </div>
                    <h3 className="font-display font-medium text-lg text-current leading-snug">
                      {language === 'da'
                        ? 'Automatiseret CVR-opslag berigede HubSpot-emner'
                        : 'CVR registry auto-lookup enriched inbound opportunities'
                      }
                    </h3>
                    <p className={`text-xs leading-relaxed ${c.textMuted}`}>
                      {language === 'da'
                        ? "Virksomheden modtog mange useriøse e-mails. Vores workflow laver automatisk opslag i det danske CVR-register, henter regnskabstal, overskudsgrupper og ansatte, og tildeler en AI Prioritets-score i CRM-systemet før opfølgning."
                        : "Automated workflows fetch Danish financial metrics from standard CVR indexes, loading company headcounts, profit graphs, and priority scoring straight in Salesforce, preparing agents for quick follow-ups."
                      }
                    </p>
                  </div>
                  <div className="pt-6 border-t border-gray-150/40 dark:border-neutral-800/40 font-mono text-[10.5px] opacity-70 flex justify-between gap-4">
                    <span>RECOVERED: 80 timer/md</span>
                    <span>CVR API CONNECTED: True</span>
                  </div>
                </div>

                {/* Enrichment report widget Right Column */}
                <div className="lg:col-span-4 hidden lg:flex flex-col justify-between p-4 bg-current/[0.015] dark:bg-neutral-900/30 border border-current/[0.04] rounded-2xl text-[10px] space-y-2">
                  <div className="font-mono text-[9px] opacity-50 border-b border-current/[0.05] pb-1.5 uppercase">
                    CVR Enrichment Payload
                  </div>
                  
                  <div className="space-y-1.5 font-mono opacity-85">
                    <div className="flex justify-between">
                      <span className="opacity-50">CVR REG:</span>
                      <span className="font-semibold text-current">DK-48293021</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">STAFF:</span>
                      <span className="font-semibold text-current">24 FTE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">REVENUE:</span>
                      <span className="font-semibold text-current">18.4M DKK</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-50">COMMUNE:</span>
                      <span className="font-semibold text-current">København</span>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/10 text-amber-600 dark:text-amber-400 p-2 rounded text-center">
                    <div className="font-bold text-xs">● PRIORITY HIGH</div>
                    <div className="text-[7.5px] uppercase font-mono opacity-70 mt-0.5">HubSpot Score: 9.8/10</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* DEDICATED MEETING BOOKING SECTION */}
      <section id="scheduler-section" className={`relative z-10 py-16 sm:py-24 border-t ${c.divider}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <MeetingScheduler language={language} theme={theme} />
        </div>
      </section>

      {/* SECTION 6: PACKAGES & INVESTMENT PLANS */}
      <section id="packages" className={`relative z-10 py-16 sm:py-24 border-t ${c.divider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingPackages 
            language={language} 
            theme={theme} 
            onSelectPlan={(planName) => {
              handleScrollToSection('scheduler-section');
            }} 
          />
        </div>
      </section>

      {/* SECTION 7: FAQS ACCORDION */}
      <section id="faq" className={`relative z-10 py-16 sm:py-24 border-t ${c.divider}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqAccordion language={language} theme={theme} />
        </div>
      </section>

        </>
      ) : (
        <div className="pt-24 min-h-[calc(100vh-140px)]">
          <AnimatePresence mode="wait">
            {selectedServicePage === 'voice' && (
              <VoiceServicePage 
                language={language}
                theme={theme}
                onBack={() => setSelectedServicePage(null)}
                onGoToSandbox={(t) => {
                  setSelectedServicePage(null);
                  setActiveSandboxTab(t);
                  setTimeout(() => handleScrollToSection('sandbox'), 120);
                }}
                onGoToRoadmap={() => {
                  setSelectedServicePage(null);
                  setTimeout(() => handleScrollToSection('roadmap'), 120);
                }}
              />
            )}
            {selectedServicePage === 'crm' && (
              <CrmServicePage 
                language={language}
                theme={theme}
                onBack={() => setSelectedServicePage(null)}
                onGoToSandbox={(t) => {
                  setSelectedServicePage(null);
                  setActiveSandboxTab(t);
                  setTimeout(() => handleScrollToSection('sandbox'), 120);
                }}
                onGoToRoadmap={() => {
                  setSelectedServicePage(null);
                  setTimeout(() => handleScrollToSection('roadmap'), 120);
                }}
              />
            )}
            {selectedServicePage === 'automation' && (
              <WorkflowsServicePage 
                language={language}
                theme={theme}
                onBack={() => setSelectedServicePage(null)}
                onGoToSandbox={(t) => {
                  setSelectedServicePage(null);
                  setActiveSandboxTab(t === 'crm' ? 'crm' : t === 'voice' ? 'voice' : 'roi');
                  setTimeout(() => handleScrollToSection('sandbox'), 120);
                }}
                onGoToRoadmap={() => {
                  setSelectedServicePage(null);
                  setTimeout(() => handleScrollToSection('roadmap'), 120);
                }}
              />
            )}
            {selectedServicePage === 'blogs' && (
              <BlogsAndCaseStudies 
                language={language}
                theme={theme}
                onBackToHome={() => setSelectedServicePage(null)}
                onGoToRoadmap={() => {
                  setSelectedServicePage(null);
                  setTimeout(() => handleScrollToSection('scheduler-section'), 120);
                }}
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {/* PREMIUM SCANDINAVIAN DETAILED FOOTER */}
      <footer className={`relative z-10 py-16 sm:py-20 ${c.footer}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 border-b pb-12 border-current/[0.06]">
            
            {/* Logo signature col */}
            <div className="md:col-span-4 space-y-5">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#FAB319]" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M 50 10 C 25 20, 20 40, 50 90 C 80 40, 75 20, 50 10 Z" />
                    <circle cx="50" cy="50" r="6" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <span className="font-display font-medium text-sm tracking-widest block leading-none">
                    Nordic Solutions <span className="text-[#FAB319] font-bold">AI</span>
                  </span>
                  <span className="text-[8px] font-mono tracking-widest uppercase opacity-45 block mt-1">
                    Bespoke System Integrations
                  </span>
                </div>
              </div>
              <p className={`text-xs sm:text-[12.5px] max-w-sm leading-relaxed ${c.textMuted}`}>
                {dict.footerText}
              </p>
              <div className="pt-2">
                <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest block text-[#FAB319]">
                  ⚙️ AUTOMATED BY DESIGN
                </span>
              </div>
            </div>

            {/* Quick links col - Solutions */}
            <div className="md:col-span-2 text-xs space-y-3.5 font-sans">
              <h5 className="font-bold opacity-80 uppercase tracking-wider text-[10px] font-mono border-b border-current/[0.04] pb-2 text-[#FAB319]">
                {language === 'da' ? 'LØSNINGER' : 'SOLUTIONS'}
              </h5>
              <ul className="space-y-2.5 opacity-80 text-left">
                <li>
                  <button onClick={() => { setSelectedServicePage('voice'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAB319] dark:hover:text-[#FAB319] hover:underline cursor-pointer text-left font-medium transition-colors">
                    {dict.voiceAgents}
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedServicePage('crm'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAB319] dark:hover:text-[#FAB319] hover:underline cursor-pointer text-left font-medium transition-colors">
                    {dict.crmTitle}
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedServicePage('automation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FAB319] dark:hover:text-[#FAB319] hover:underline cursor-pointer text-left font-medium transition-colors">
                    {dict.automationTitle}
                  </button>
                </li>
                <li>
                  <a href="https://nordicsolutions.ai/" target="_blank" rel="noreferrer" className="hover:text-[#FAB319] dark:hover:text-[#FAB319] hover:underline text-left block text-[#FAB319] font-semibold mt-1">
                    {language === 'da' ? 'Hovedportal ↗' : 'Main Portal ↗'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick links col - Platform overview */}
            <div className="md:col-span-2 text-xs space-y-3.5 font-sans">
              <h5 className="font-bold opacity-80 uppercase tracking-wider text-[10px] font-mono border-b border-current/[0.04] pb-2 text-[#FAB319]">
                {language === 'da' ? 'OVERSIGT' : 'OVERVIEW'}
              </h5>
              <ul className="space-y-2.5 opacity-80 text-left">
                <li>
                  <button onClick={() => handleScrollToSection('sandbox')} className="hover:text-[#FAB319] dark:hover:text-[#FAB319] hover:underline cursor-pointer text-left transition-colors">
                    {language === 'da' ? 'Interaktiv Demo' : 'Interactive Sandbox'}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection('calculator')} className="hover:text-[#FAB319] dark:hover:text-[#FAB319] hover:underline cursor-pointer text-left transition-colors">
                    {dict.navCalculator}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection('packages')} className="hover:text-[#FAB319] dark:hover:text-[#FAB319] hover:underline cursor-pointer text-left transition-colors">
                    {language === 'da' ? 'Investeringspakker' : 'Pricing & Packages'}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection('faq')} className="hover:text-[#FAB319] dark:hover:text-[#FAB319] hover:underline cursor-pointer text-left transition-colors">
                    {language === 'da' ? 'Ofte Stillede Svar' : 'Platform FAQs'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Contacts location card col */}
            <div className="md:col-span-4 text-xs space-y-3 font-sans">
              <div className="p-4 sm:p-5 rounded-2xl bg-current/[0.015] border border-current/[0.04] space-y-3.5 shadow-xxs">
                <h5 className="font-bold opacity-80 uppercase tracking-wider text-[10.5px] font-mono border-b border-current/[0.04] pb-2 text-[#FAB319]">
                  {language === 'da' ? 'KØBENHAVN HOVEDKONTOR' : 'COPENHAGEN STATION'}
                </h5>
                <p className="opacity-90 leading-relaxed font-sans">
                  Søndergade 21, 2. sal <br />
                  2100 København Ø, Danmark
                </p>
                <div className="space-y-1 text-[11.5px] font-sans">
                  <div className="flex justify-between">
                    <span className="opacity-55">{language === 'da' ? 'Direkte tlf:' : 'Direct tel:'}</span>
                    <a href="tel:+4580129099" className="hover:text-[#FAB319] dark:hover:text-[#FAB319] font-semibold hover:underline">+45 80 12 90 99</a>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-55">{language === 'da' ? 'E-mail:' : 'Email:'}</span>
                    <a href="mailto:kontakt@nordicsolutions.ai" className="hover:text-[#FAB319] dark:hover:text-[#FAB319] font-semibold hover:underline">kontakt@nordicsolutions.ai</a>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 opacity-60 border-t border-current/[0.03] pt-2.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="text-[10px] font-mono uppercase tracking-wider">{language === 'da' ? 'ØSTERBRO, REGIN' : 'EAST GATEWAY, CONTINENT'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legal bottoms */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11.5px] opacity-55 font-sans">
            <p>
              © {new Date().getFullYear()} Nordic Solutions AI. {dict.rightsReserved}
            </p>
            <div className="flex gap-5 mt-3 sm:mt-0 font-medium">
              <a href="#solutions" className="hover:underline hover:text-current">{language === 'da' ? 'Sikkerhedspolitik' : 'Security Standards'}</a>
              <span className="opacity-20">|</span>
              <a href="#roadmap" className="hover:underline hover:text-current">CVR: DK-48293721</a>
            </div>
          </div>

        </div>
      </footer>

      {/* FIXED FLOATING BRUTALIST BACK TO TOP BUTTON */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-amber-500 text-neutral-950 shadow-lg hover:bg-amber-400 cursor-pointer hover:translate-y-[-2px] hover:shadow-amber-500/20 active:translate-y-0 transition-all z-40 block"
        title="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

    </div>
  );
}
