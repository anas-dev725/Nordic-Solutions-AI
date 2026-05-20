/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Users, AppWindow, ArrowRight, ArrowLeft, Send, Sparkles, 
  CheckCircle2, FileText, Download, Calendar, Mail, FileCheck, PhoneCall
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface InquiryRoadmapProps {
  language: Language;
  theme: 'sand' | 'slate' | 'sage';
}

const INDUSTRIES = [
  { id: 'professional', labelDa: 'Liberale erhverv / Konsulent', labelEn: 'Professional Services / Agencies', icon: 'Building2' },
  { id: 'clinic', labelDa: 'Klinik & Sundhed (Tandlæge, Fys)', labelEn: 'Clinics & Care (Dental, Physio)', icon: 'Users' },
  { id: 'logistics', labelDa: 'E-handel, Logistik & Produktion', labelEn: 'E-commerce, Logistics & Mfg', icon: 'AppWindow' },
  { id: 'saas', labelDa: 'SaaS, Tech & Software', labelEn: 'Tech & Software Ventures', icon: 'Building2' }
];

export function InquiryRoadmap({ language, theme }: InquiryRoadmapProps) {
  const [step, setStep] = useState<number>(1);
  const [industry, setIndustry] = useState<string>('professional');
  const [painPoints, setPainPoints] = useState<string[]>([]);
  const [hoursSpent, setHoursSpent] = useState<string>('5-10');
  
  // Contacts
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [crm, setCrm] = useState('');
  const [details, setDetails] = useState('');

  // Compiler results
  const [isCompiling, setIsCompiling] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [scheduledMeeting, setScheduledMeeting] = useState<string | null>(null);

  const dict = translations[language];

  // System options translations
  const painPointsList = language === 'da' ? [
    { id: 'phone', label: 'Spilder for meget tid på telefonbooking og kundeservice' },
    { id: 'data', label: 'Manuel indtastning af kundedata mellem e-mails og CRM' },
    { id: 'followup', label: 'Manglende opfølgning på nye indkommende leads' },
    { id: 'inventory', label: 'Dårligt synkroniseret lager- eller ordrestatus' }
  ] : [
    { id: 'phone', label: 'Too much time lost on phone bookings & routine inquiries' },
    { id: 'data', label: 'Manual copy-pasting of leads between email and CRM' },
    { id: 'followup', label: 'Slow or missing follow-ups on hot prospective leads' },
    { id: 'inventory', label: 'Uncoordinated order status or inventory logging' }
  ];

  const handleTogglePainPoint = (id: string) => {
    if (painPoints.includes(id)) {
      setPainPoints(prev => prev.filter(p => p !== id));
    } else {
      setPainPoints(prev => [...prev, id]);
    }
  };

  const handleSubmitSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !company) return;

    setIsCompiling(true);
    setLogs([]);

    const logsDa = [
      "Opretter fuld-kryds referencederivater...",
      "Forbinder til det danske CVR-register via krypteret API-gateway...",
      `Udhastningsanalyse: ${company} branchens datapunkter korreleres med standarder...`,
      "Modulerer automatiseret CRM pipeline, webhooks og HubSpot endpoints...",
      `Beregner ROI-tidsbesparelser: reducerer administrative huller med ~${hoursSpent} t/uge...`,
      "Genererer PDF-audit blueprint og tilpasser integrationsscenarie...",
      "Verificerer EU AI Act overholdelse og datasikkerhed...",
      "Udfærdiger bespoke AI-blueprint audit forsendelse..."
    ];

    const logsEn = [
      "Establishing secure workspace pipelines...",
      "Querying official Danish CVR registry search gateways...",
      `Analyzing structural bottlenecks for ${company} with standard models...`,
      "Generating workflow node webhooks and relational database maps...",
      `Calibrating ROI projections based on ~${hoursSpent} lost hours weekly...`,
      "Constructing custom PDF blueprint payload assets...",
      "Verifying GDPR & EU AI Act policy standard compliance...",
      "Bespoke AI Blueprint compilation successfully completed!"
    ];

    const targetLogs = language === 'da' ? logsDa : logsEn;

    targetLogs.forEach((msg, idx) => {
      setTimeout(() => {
        setLogs(prev => [...prev, msg]);
      }, (idx + 1) * 550 - 250);
    });

    // Simulate elite AI analytical compilation
    setTimeout(() => {
      setIsCompiling(false);
      setIsCompleted(true);
      setStep(4);
    }, 4800);
  };

  const handleBookMeeting = (day: string) => {
    setScheduledMeeting(day);
  };

  const themeClasses = {
    progressBg: theme === 'sand' ? 'bg-[#718259]' : 'bg-[#A3B18A]',
    btnBg: theme === 'sand' ? 'bg-[#0F1210] hover:bg-[#718259] text-white' : 'bg-[#F2F0EC] hover:bg-[#A3B18A] hover:text-[#0F1210] text-[#0F1210]',
    cardBorder: theme === 'sand' ? 'border-[#E5DFD3]' : 'border-white/5',
    pillBg: theme === 'sand' ? 'bg-[#718259]/15 text-[#718259]' : 'bg-[#A3B18A]/10 text-[#A3B18A]'
  };

  return (
    <div id="blueprint-onboarding-panel" className="w-full max-w-4xl mx-auto bg-transparent p-6 sm:p-8 rounded-2xl border border-current/10 shadow-xl overflow-hidden relative">
      
      {/* Absolute ambient grid background */}
      <div className="absolute inset-0 grid-dots dark:grid-dots-dark pointer-events-none opacity-20"></div>

      {step <= 3 && !isCompiling && (
        <div className="relative z-10 flex justify-between items-center mb-6">
          <div className="flex gap-2.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 w-12 rounded-full transition-all duration-300 ${
                  s === step 
                    ? `${themeClasses.progressBg} scale-102` 
                    : s < step 
                    ? 'bg-emerald-600' 
                    : 'bg-current/15'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest font-bold">
            TRIN {step} AF 3
          </span>
        </div>
      )}

      {/* Main Container Multi-step Animation */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Select industry */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-medium tracking-tight">
                  {language === 'da' ? 'Hvilken branche repræsenterer du?' : 'Which industry is your firm in?'}
                </h3>
                <p className="text-sm opacity-65 font-sans mt-1">
                  {language === 'da' 
                    ? 'Vi tilpasser AI Blueprint-anbefalingerne specifikt til de mest almindelige administrative barrierer i din branche.'
                    : 'We customize the workflow architecture constraints based on specific industry regulations & parameters.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => setIndustry(ind.id)}
                    className={`p-5 rounded-xl text-left border transition-all duration-300 flex items-center gap-4 ${
                      industry === ind.id
                        ? `bg-current/5 border-current shadow-xs`
                        : 'bg-transparent hover:bg-current/5 border-current/10'
                    } cursor-pointer`}
                  >
                    <div className={`p-3 rounded-lg ${industry === ind.id ? 'bg-[#A3B18A]/25 text-current' : 'bg-current/5 text-current/60'}`}>
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-medium text-sm">
                        {language === 'da' ? ind.labelDa : ind.labelEn}
                      </h4>
                      <p className="text-[10px] opacity-60 font-mono mt-0.5 uppercase tracking-wider">
                        {ind.id}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className={`px-5 py-2.5 rounded-xl transition-all duration-300 text-xs font-display flex items-center gap-1.5 cursor-pointer font-semibold shadow-md active:scale-95 ${themeClasses.btnBg}`}
                >
                  {language === 'da' ? 'Fortsæt' : 'Continue'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Main Painpoints and time parameters */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-medium tracking-tight">
                  {language === 'da' ? 'Hvad koster mest tid i hverdagen?' : 'Select your biggest time drains'}
                </h3>
                <p className="text-sm opacity-65 font-sans mt-1">
                  {language === 'da' 
                    ? 'Vælg én eller flere processer, du godt tænke dig blev fuldstændigt automatiseret.'
                    : 'We design the bespoke CRM pipeline hooks to specifically automate manual administrative work.'}
                </p>
              </div>

              {/* Checkboxes list of painpoints */}
              <div className="space-y-3 font-sans">
                {painPointsList.map((pain) => {
                  const isChecked = painPoints.includes(pain.id);
                  return (
                    <button
                      key={pain.id}
                      onClick={() => handleTogglePainPoint(pain.id)}
                      className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all duration-350 cursor-pointer ${
                        isChecked
                          ? 'bg-current/5 border-current font-medium text-current'
                          : 'bg-transparent hover:bg-current/5 border-current/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                          isChecked ? 'bg-[#A3B18A] border-[#A3B18A] text-[#0F1210]' : 'border-current/30'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
                        </div>
                        <span className="text-xs font-sans">{pain.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Estimate hours selector */}
              <div className="space-y-2 border-t pt-4 border-current/10">
                <label className="text-xs font-medium font-sans block opacity-80">
                  {language === 'da' ? 'Skønnet spildtid pr. medarbejder ugentligt:' : 'Estimated wasted time per employee weekly:'}
                </label>
                <div className="flex gap-2 sm:gap-4 font-mono">
                  {['2-5', '5-10', '10-20', '20+'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setHoursSpent(opt)}
                      className={`flex-1 py-2 rounded-lg border text-xs transition-all duration-300 cursor-pointer ${
                        hoursSpent === opt
                          ? 'bg-[#A3B18A] border-[#A3B18A] text-[#0F1210] font-bold'
                          : 'bg-transparent hover:bg-current/10 border-current/10'
                      }`}
                    >
                      {opt} {language === 'da' ? 't/uge' : 'h/week'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-sans opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {language === 'da' ? 'Tilbage' : 'Back'}
                </button>

                <button
                  onClick={() => setStep(3)}
                  className={`px-5 py-2.5 rounded-xl transition-all duration-300 text-xs font-display flex items-center gap-1.5 cursor-pointer font-semibold shadow-md ${themeClasses.btnBg}`}
                >
                  {language === 'da' ? 'Næste trin' : 'Next Step'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Company contact and submit */}
          {step === 3 && !isCompiling && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-medium tracking-tight">
                  {language === 'da' ? 'Næsten færdig. Hvem sender vi blueprintet til?' : 'Almost there. Where should we deliver the blueprint?'}
                </h3>
                <p className="text-sm opacity-65 font-sans mt-1">
                  {language === 'da' 
                    ? 'Vores interne AI analyserer jeres valg og opbygger et skræddersyet PDF-audit. Det tager under 3 sekunder.'
                    : 'Our internal automated blueprint compiler processes your variables and writes real integration scopes.'}
                </p>
              </div>

              <form onSubmit={handleSubmitSurvey} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-medium opacity-80">{dict.fullName} *</label>
                    <input
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Morten Jespersen"
                      className="w-full p-3 rounded-lg border border-current/10 bg-transparent text-sm focus:outline-hidden focus:ring-1 focus:ring-[#A3B18A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-medium opacity-80">{dict.emailAddr} *</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="morten@voresfirma.dk"
                      className="w-full p-3 rounded-lg border border-current/10 bg-transparent text-sm focus:outline-hidden focus:ring-1 focus:ring-[#A3B18A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block font-medium opacity-80">{dict.companyName} *</label>
                    <input
                      required
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Copenhagen Furnitures ApS"
                      className="w-full p-3 rounded-lg border border-current/10 bg-transparent text-sm focus:outline-hidden focus:ring-1 focus:ring-[#A3B18A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-medium opacity-80">{dict.currentCrm}</label>
                    <input
                      type="text"
                      value={crm}
                      onChange={(e) => setCrm(e.target.value)}
                      placeholder="f.eks. HubSpot, Salesforce, ingen"
                      className="w-full p-3 rounded-lg border border-current/10 bg-transparent text-sm focus:outline-hidden focus:ring-1 focus:ring-[#A3B18A]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-medium opacity-80">{dict.extraDetails}</label>
                  <textarea
                    rows={2}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="f.eks. Vi vil gerne have automatiserede SMS påmindelser, når kunder anmoder om fragt..."
                    className="w-full p-3 rounded-lg border border-current/10 bg-transparent text-sm focus:outline-hidden focus:ring-1 focus:ring-[#A3B18A]"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 text-xs font-sans opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {language === 'da' ? 'Tilbage' : 'Back'}
                  </button>

                  <button
                    type="submit"
                    className={`px-6 py-3 rounded-xl transition-all duration-300 text-xs font-display flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 ${themeClasses.btnBg}`}
                  >
                    <Send className="w-4 h-4" />
                    {dict.submitBtn}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* COMPILING PREVIEW BANNER */}
          {isCompiling && (
            <motion.div
              key="compiling"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-10 md:py-16 text-center space-y-6 max-w-xl mx-auto"
            >
              {/* Spinning compiler wheel */}
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-current/10 border-t-[#A3B18A] animate-spin" />
                <Sparkles className="absolute w-6 h-6 text-[#A3B18A] animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-display font-medium text-lg leading-none animate-pulse">
                  {language === 'da' ? 'Kompilerer Bespoke AI Blueprint...' : 'Compiling Bespoke AI Blueprint...'}
                </h4>
                <p className="text-xs opacity-65 max-w-xs mx-auto font-sans leading-relaxed">
                  {language === 'da'
                    ? "Analyserer valg, tildeler logiske workflows, pinger CVR register og tilpasser til tjeklister..."
                    : "Analyzing industry constraints, matching visual node configurations, and constructing standard layouts..."
                  }
                </p>
              </div>

              {/* Dynamic console terminal log reader */}
              <div className="w-full bg-[#0F1210] border border-white/5 rounded-xl p-4 font-mono text-[10.5px] text-left text-[#FAF9F6]/90 space-y-2 max-h-56 overflow-y-auto shadow-inner">
                <div className="flex items-center gap-2 justify-between border-b border-white/5 pb-2 mb-2 text-white/40">
                  <span className="tracking-wide text-[9px] uppercase font-bold text-[#A3B18A]">BluePrint Terminal v1.11</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                </div>
                
                {logs.length === 0 && (
                  <div className="text-white/30 animate-pulse italic">
                    {language === 'da' ? '[idle] Afventer compiler bootstrap...' : '[idle] Waiting for compiler bootstrap...'}
                  </div>
                )}
                
                <AnimatePresence>
                  {logs.map((log, lIdx) => (
                    <motion.div 
                      key={lIdx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-1.5 leading-relaxed text-[#A3B18A]"
                    >
                      <span className="text-white/40 select-none">{`>`}</span>
                      <span>{log}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Beautiful complete compilation PDF simulation on screen! */}
          {step === 4 && isCompleted && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              
              {/* Completed visual badge banner */}
              <div className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl bg-[#A3B18A]/10 border border-[#A3B18A]/20 text-xs">
                <div className="p-3 bg-[#A3B18A] rounded-full text-[#0F1210]">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-display font-semibold text-sm text-current">
                    {language === 'da' ? 'Bespoke AI Audit & Roadmap Genereret!' : 'Bespoke AI Audit Generated Successfully!'}
                  </h4>
                  <p className="opacity-80 mt-0.5 leading-relaxed font-sans">
                    {language === 'da' 
                      ? `Tak, ${fullName}. Dit personlige integrationsoplæg for ${company} er færdigt og sendt til ${email}.`
                      : `Our automated engine has sent a high-fidelity diagnostic breakdown to your inbox at ${email}.`}
                  </p>
                </div>
              </div>

              {/* PDF Document Preview Box */}
              <div className="border border-current/10 rounded-xl p-5 sm:p-6 shadow-xs relative bg-current/[0.01]">
                <div className="absolute top-4 right-4 text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#A3B18A]/10 border border-[#A3B18A]/20 font-bold">
                  DOC-ID #DK-82210
                </div>

                <div className="flex items-center gap-2 mb-4 border-b pb-3 border-current/10">
                  <FileText className="w-5 h-5 text-[#A3B18A]" />
                  <div>
                    <h5 className="font-display font-semibold text-xs tracking-wide">
                      NORDIC SOLUTIONS AI — PRELIMINARY INTEGRATION STRATEGY
                    </h5>
                    <p className="text-[10px] font-mono opacity-55 uppercase">
                      Custom tailored for {company}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs font-sans leading-relaxed opacity-90">
                  
                  {/* Industry-specific advice section */}
                  <div>
                    <h6 className="font-bold text-[11px] uppercase tracking-wider text-[#A3B18A] font-mono mb-1">
                      1. BRANCHEANALYSE:
                    </h6>
                    <p>
                      {industry === 'professional' && (
                        language === 'da'
                          ? `Indenfor rådgivning og konsulentydelser forsvinder 40 % af den administrative tid i booking af kaffemøder og overførsel af leads fra emails og web-formularer til ${crm || 'crm'}. Vi foreslår en Voice Agent med email-tilkobling, som kan booke direkte i jeres kalendere.`
                          : `For custom agencies & consultation business, about 40% of standard clerk time is lost syncing lead pipelines in ${crm || 'your workspace'}. We outline automated webhooks linking email entries straight into CRM slots.`
                      )}
                      {industry === 'clinic' && (
                        language === 'da'
                          ? "Klinikker oplever store spidser i opkald om morgenen. Et automatiseret stemmesvar (Voice Agent) integreret til jeres patientjournaler kan reducere ventetiden med 75% og flytte telefonbooking væk fra receptionisterne."
                          : "Dental or physical clinics struggle with intense morning telephone rushes. Fully integrated Voice telephony directly updates patient calendars, removing 75% of administrative check-in stress."
                      )}
                      {industry === 'logistics' && (
                        language === 'da'
                          ? "I fragt, e-handel og produktion tabes many informationer om sporing og ordrestatus i indbakken. Integrerede AI agenter i jeres bagkatalog kan besvare leveringsspørgsmål på flyvende dansk og automatisk pinge fragtmanden."
                          : "For shipping, logistics, or trading ventures, manual CRM tracking updates consume critical hours. An automated voice or text query system fetches status metrics and notifies couriers instantly."
                      )}
                      {industry === 'saas' && (
                        language === 'da'
                          ? `Tech & Software virksomheder bør have realtids lead-analyse. Ved at opsætte en intelligent scraper, kan indkommende e-mails beriges via jeres ${crm || 'CRM'} med budgetvurdering og AI-scoring, så jeres Direct Sales-team kontaktes med det samme.`
                          : `SaaS firms need reactive speed. Automatic extraction parses budget variables from email text, and tags prospects inside ${crm || 'the database'} with custom scoring algorithms for instant sales follow-up.`
                      )}
                    </p>
                  </div>

                  {/* Core recommendation stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y py-3.5 my-3 border-current/10 font-mono text-[10px]">
                    <div>
                      <strong className="block text-[#A3B18A] uppercase mb-1">AUTOMATING IMPLEMENTATION:</strong>
                      <ul className="list-disc list-inside space-y-1 opacity-80">
                        <li>{language === 'da' ? 'Bespoke AI Voice-Agent (Simulering)' : 'Bespoke AI voice gateway'}</li>
                        <li>{language === 'da' ? `Automatiserede links til ${crm || 'CRM'}` : `Webhook protocols for ${crm || 'CRM'}`}</li>
                        <li>{language === 'da' ? 'SMS-beskeder til sælgere' : 'Instant corporate SMS notifications'}</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="block text-[#A3B18A] uppercase mb-1">SAVINGS & SPEEDUP MATRIX:</strong>
                      <ul className="list-disc list-inside space-y-1 opacity-80">
                        <li>{language === 'da' ? `Spild reduceret: ~${hoursSpent} timer ugentligt` : `Time saved: ~${hoursSpent} hours weekly`}</li>
                        <li>{language === 'da' ? 'Forventet CRM-fejlrate: 0%' : 'CRM entry error rate: ~0%'}</li>
                        <li>{language === 'da' ? 'Payback forløb: Under 6 mdr.' : 'Payback duration: < 6 months'}</li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>

              {/* Copenhagen digital meeting scheduler */}
              <div className="border-t pt-5 border-current/10">
                <div className="text-center max-w-lg mx-auto mb-4">
                  <h5 className="font-display font-semibold text-sm flex items-center justify-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#A3B18A]" />
                    {language === 'da' ? 'Trin 5: Book uforpligtende afklaringsmøde' : 'Step 5: Reserve your brief 20-min strategy review'}
                  </h5>
                  <p className="text-xs opacity-65 font-sans mt-1">
                    {language === 'da'
                      ? 'Vælg en ledig dag nedenfor til et kaffemøde i København Ø eller på Teams med vores lead-arkitekt.'
                      : 'Consult live with our automated calendar integration. Choose a slot below for a Teams call.'
                    }
                  </p>
                </div>

                {/* Calendar grid choices */}
                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                  {['Mandag d. 25. maj', 'Tirsdag d. 26. maj', 'Torsdag d. 28. maj'].map((day) => {
                    const isSelected = scheduledMeeting === day;
                    return (
                      <button
                        key={day}
                        onClick={() => handleBookMeeting(day)}
                        className={`p-3 rounded-lg border text-center font-sans text-[11px] transition-all duration-300 cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                          isSelected
                            ? 'bg-emerald-600 border-emerald-600 text-white font-semibold shadow-xs'
                            : 'bg-transparent hover:bg-current/10 border-current/10'
                        }`}
                      >
                        <PhoneCall className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'opacity-50'}`} />
                        <span>{day}</span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {scheduledMeeting && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 rounded-lg bg-emerald-600/10 text-emerald-500 text-center text-xs font-sans max-w-sm mx-auto border border-emerald-500/20"
                    >
                      {language === 'da'
                        ? `Aftale bekræftet! Vi ringer dig op d. ${scheduledMeeting.split(' d. ')[1]} kl 10:00.`
                        : `Reservation locked! We will ring you on ${scheduledMeeting} at 10:00 AM.`
                      }
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
