import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  PhoneCall, 
  MessageSquare, 
  CalendarDays, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  Bot,
  Zap
} from 'lucide-react';

interface SpecializedService {
  id: string;
  icon: React.ComponentType<any>;
  titleDa: string;
  titleEn: string;
  taglineDa: string;
  taglineEn: string;
  descDa: string;
  descEn: string;
  statNumber: string;
  statLabelDa: string;
  statLabelEn: string;
  featuresDa: string[];
  featuresEn: string[];
}

const specializedServices: SpecializedService[] = [
  {
    id: "receptionist",
    icon: PhoneCall,
    titleDa: "AI Receptionist",
    titleEn: "AI Phone Receptionist",
    taglineDa: "Frontline telefonsupport i særklasse",
    taglineEn: "Flawless frontdesk call management",
    descDa: "En intelligent stemmeagent, der besvarer opkald under 1 sekund. Den håndterer høflige hilsner, forstår dialekter, svarer på hyppige spørgsmål og screener kunders behov inden de viderestilles.",
    descEn: "A conversational speech agent answering frontline corporate lines under 1s. Empathetic and professional, it fields calls, handles dialect cues, captures intent, and forwards hot leads.",
    statNumber: "0 sek",
    statLabelDa: "Ventetid for dine kunder",
    statLabelEn: "Wait time in queue",
    featuresDa: [
      "Simultan samtalehåndtering (100+ opkald samtidigt)",
      "Automatisk CPR- & kunde-id validering",
      "Kombineret med viderestilling af nødsituationer til vagthavende",
      "Direkte synkronisering med HubSpot og e-conomic"
    ],
    featuresEn: [
      "Concurrently fields over 100+ lines in parallel",
      "Automatic Danish CVR or contact verification",
      "Intelligent hot-lead or emergency triage",
      "Fully compliant GDPR recording archives"
    ]
  },
  {
    id: "chatbots",
    icon: MessageSquare,
    titleDa: "AI Chatbots (Live Chat)",
    titleEn: "Omnichannel AI Chatbots",
    taglineDa: "Øjeblikkelig support på alle platforme",
    taglineEn: "Instant conversational website help",
    descDa: "Glem stive og regelbaserede chat-widgets. Vores AI-chatbøtter drives af avancerede sprogmodeller, der læser jeres vidensbase og lukker spørgsmål på hjemmesiden, e-mail eller SMS 24 timer i døgnet.",
    descEn: "Upgrade legacy rigid chat widgets to conversational giants. Trained securely on your internal company guides, these bots answer customers, trigger automated drafts, and write contact cards.",
    statNumber: "95%",
    statLabelDa: "Sager løst uden sekretær",
    statLabelEn: "Inquiries resolved autonomously",
    featuresDa: [
      "Trænet udelukkende på jeres interne PDF-rapporter, weblinks & vidensbase",
      "Registrerer automatisk kunden som lead i jeres pipeline",
      "Flersproget understøttelse (Dansk, Svensk & Engelsk)",
      "Viderestiller til live-agenter, hvis problemet er komplekst"
    ],
    featuresEn: [
      "Trained on your secure PDF guides, sites & workspace nodes",
      "Launches micro-webhook deal insertions into CRMs",
      "Natively supports Danish, Swedish, and English speech layers",
      "Handoff protocols for transferring complex tasks to live staff"
    ]
  },
  {
    id: "booking",
    icon: CalendarDays,
    titleDa: "AI Bookingsystemer",
    titleEn: "AI Booking & Schedulers",
    taglineDa: "Fuldautomatisk kalenderstyring",
    taglineEn: "Autonomous slot matching calendars",
    descDa: "Fjern tidsspild med e-mail-pingpong for at finde et mødetidspunkt. Vores AI parrer direkte ledige tider i jeres medarbejderes Outlook eller Google-kalendere med kundens ønsker på sekunder.",
    descEn: "End email scheduling loops for good. This AI checks real-time availability in your agents' Outlook or Google Calendars, books direct slots, handles reminders, and processes rescheduling requests.",
    statNumber: "-80%",
    statLabelDa: "Færre udeblivelser (No-Shows)",
    statLabelEn: "Reduction in client no-shows",
    featuresDa: [
      "Send automatiske bekræftende SMS'er og e-mails",
      "Interaktiv sprog-drevet ombooking og aflysnings-flows",
      "Beskytter medarbejdere mod uønskede bookinger vha. lead-screening",
      "Direkte integration med Zoom, Teams og fysiske mødelokaler"
    ],
    featuresEn: [
      "Transactional automated SMS alerts & reminder notifications",
      "Interactive conversational rescheduling & cancellations",
      "Pre-qualification of attendees prior to securing slots",
      "Direct sync and buffers set across dual-office calendar maps"
    ]
  }
];

interface Props {
  language: 'da' | 'en';
  theme: 'sand' | 'slate' | 'sage';
  onBookClick: () => void;
}

export function SpecializedAgents({ language, theme, onBookClick }: Props) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const isDa = language === 'da';

  // Theme color maps matching parent
  const getColors = () => {
    switch (theme) {
      case 'sand':
        return {
          cardBg: 'bg-white border-[#E5DFD3] text-[#0F1210]',
          bgGradient: 'from-[#FAF9F6] to-white',
          accent: 'text-[#D97706]',
          badge: 'bg-[#FEF3C7] text-[#B45309] border-[#FAB319]/25',
          btn: 'bg-[#0F1210] hover:bg-[#FAB319] hover:text-[#0F1210] text-[#FAF9F6]'
        };
      case 'sage':
        return {
          cardBg: 'bg-[#121215] border-white/5 text-[#EFECE6]',
          bgGradient: 'from-[#0C0C0E] to-[#121215]',
          accent: 'text-[#FFA31A]',
          badge: 'bg-[#16161C] text-[#FFA31A] border-[#FFA31A]/25',
          btn: 'bg-[#FAF8F5] hover:bg-[#FFA31A] text-[#0C0C0E]'
        };
      case 'slate':
      default:
        return {
          cardBg: 'bg-[#0F1012] border-white/5 text-[#F2F0EC]',
          bgGradient: 'from-[#080809] to-[#0F1012]',
          accent: 'text-[#FAB319]',
          badge: 'bg-[#151619] text-[#FAB319] border-[#FAB319]/25',
          btn: 'bg-[#FAB319] hover:bg-[#FFC107] text-[#080809]'
        };
    }
  };

  const c = getColors();

  return (
    <section id="specialist-agents" className="relative z-10 py-16 sm:py-28 border-t border-current/[0.05] overflow-hidden">
      {/* Decorative ambient visual anchor */}
      <div className="absolute top-[20%] left-[5%] w-72 h-72 rounded-full bg-[#FAB319]/5 blur-[120px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl space-y-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-medium tracking-wide uppercase ${c.badge}`}>
              <Sparkles className="w-3.5 h-3.5" />
              {isDa ? "Specialiserede AI-Moduler" : "Specialist AI Modality"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium tracking-tight">
              {isDa ? "Udvid teamet med dedikerede AI-agenter" : "Scale your pipeline with targeted AI agents"}
            </h2>
            <p className="text-xs sm:text-sm opacity-75 leading-relaxed font-sans">
              {isDa 
                ? "Vi designer og idriftsætter specialiserede agenter, der løser én bunden opgave med absolut præcision til tiden, hver gang."
                : "Meet our family of high-conviction cognitive agents — built to automate transactional, customer friction nodes around the clock."}
            </p>
          </div>

          <div className="font-mono text-[10px] opacity-40 uppercase tracking-widest hidden lg:block text-right">
            <span>⬤ 24/7/365 SECURE PIPELINES</span>
            <span className="block mt-1">NATIVE NORDIC INTERACTION HANDLERS</span>
          </div>
        </div>

        {/* 3-Column bespoke bento design container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {specializedServices.map((service, index) => {
            const IconComponent = service.icon;
            const title = isDa ? service.titleDa : service.titleEn;
            const tagline = isDa ? service.taglineDa : service.taglineEn;
            const desc = isDa ? service.descDa : service.descEn;
            const statLabel = isDa ? service.statLabelDa : service.statLabelEn;
            const features = isDa ? service.featuresDa : service.featuresEn;

            return (
              <motion.div
                key={service.id}
                onMouseEnter={() => setHoveredCardId(service.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`p-6 sm:p-8 rounded-3xl border ${c.cardBg} flex flex-col justify-between transition-all duration-500 group relative overflow-hidden shadow-xs hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]`}
              >
                {/* Visual border accent glowing line */}
                <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#FAB319]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="space-y-6">
                  {/* Top segment with Icon and Stats Metric */}
                  <div className="flex items-center justify-between pb-4 border-b border-current/[0.04]">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-[#FAB319]/10 text-[#FAB319] transition-transform duration-500 group-hover:scale-105`}>
                      <IconComponent className="w-5.5 h-5.5" />
                    </div>

                    {/* Highly polished bento stat */}
                    <div className="text-right">
                      <div className="text-2xl font-display font-bold text-current tracking-tight line-none">{service.statNumber}</div>
                      <span className="text-[9px] font-mono uppercase tracking-wider opacity-50 block">{statLabel}</span>
                    </div>
                  </div>

                  {/* Text descriptions */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FAB319] font-medium">{tagline}</span>
                    <h3 className="text-xl font-display font-medium text-current tracking-tight">{title}</h3>
                    <p className="text-xs leading-relaxed opacity-75 font-sans pt-1">
                      {desc}
                    </p>
                  </div>

                  {/* Built-in high contrast lists */}
                  <div className="pt-2 space-y-2.5">
                    {features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="opacity-80 leading-tight font-sans text-[11px]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro Action Button CTA */}
                <div className="pt-8 mt-6 border-t border-current/[0.04]">
                  <button
                    onClick={onBookClick}
                    className={`w-full py-3 rounded-xl font-display text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${c.btn}`}
                  >
                    <Zap className="w-4 h-4" />
                    {isDa ? "Integrer dette modul" : "Integrate This Module"}
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
