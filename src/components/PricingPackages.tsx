/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Check, Flame, HelpCircle, ArrowRight, ShieldCheck, Asterisk, Sparkles } from 'lucide-react';
import { Language, Theme } from '../types';

interface PricingPackagesProps {
  language: Language;
  theme: Theme;
  onSelectPlan: (planName: string) => void;
}

export function PricingPackages({ language, theme, onSelectPlan }: PricingPackagesProps) {
  const isDa = language === 'da';

  // Plans details tailored for modern Danish AI Automation Bureau
  const plans = [
    {
      id: "pilot",
      name: isDa ? "AI Grundlag / Pilot" : "AI Foundation / Pilot",
      tagline: isDa ? "Til mindre klinikker & kontorer" : "For smaller clinics & boutique offices",
      price: "18.500",
      setup: isDa ? "Engangs opsætningsgebyr" : "One-time setup fee",
      monthly: isDa ? "1.800 kr. / md." : "1,800 DKK / mo.",
      monthlyDesc: isDa ? "Inkluderer drift & API monitoring" : "Includes standard SLA & API upkeep",
      features: isDa ? [
        "1 skræddersyet AI Stemmeagent (Standard)",
        "Automatisk viderestilling af opkald",
        "Op til 250 AI-samtaler pr. måned",
        "Simpel CRM integration (HubSpot/Sheets)",
        "E-mail support indenfor 48 timer",
        "Fuld GDPR-sikkerheds compliance"
      ] : [
        "1 custom AI Voice Agent (Standard voice)",
        "Automated call-routing triggers",
        "Up to 250 voice dispatches per month",
        "Light CRM sync (HubSpot/Google Sheets)",
        "Email support within 48 business hours",
        "Full GDPR compliance & secure transit"
      ],
      popular: false,
      cta: isDa ? "Bestil AI Pilot" : "Order Pilot Phase"
    },
    {
      id: "core",
      name: isDa ? "Core Solution / Aktiv" : "Core System / Active",
      tagline: isDa ? "Vores mest populære integration" : "Our peak value scaling integration",
      price: "42.000",
      setup: isDa ? "Engangs opsætningsgebyr" : "One-time setup fee",
      monthly: isDa ? "3.200 kr. / md." : "3,200 DKK / mo.",
      monthlyDesc: isDa ? "Inkluderer prioritets SLA & løbende optimering" : "Priority SLA & live conversational tuning",
      features: isDa ? [
        "Ubegrænsede AI Voice Assistenter",
        "Avanceret stemme-synthesis (Premium dansk tone)",
        "Op til 1.200 AI-samtaler pr. måned",
        "Bespoke HubSpot / Salesforce integration",
        "Automatisk data-berigelse med CVR-opslag",
        "Telefon og slack-support indenfor 4 timer",
        "Ugentlige ydelsesrapporter via mail"
      ] : [
        "Unlimited custom voice assistants",
        "Premium natural voice synthesis (Danish/English)",
        "Up to 1,200 secure conversational sessions/mo",
        "Tailored HubSpot & Salesforce bi-directional sync",
        "Auto lead-enrichment with Danish CVR queries",
        "Phone & Slack developer channels (4h response)",
        "Weekly performance logs & analytics"
      ],
      popular: true,
      cta: isDa ? "Vælg Core Solution" : "Adopt Core Solution"
    },
    {
      id: "enterprise",
      name: isDa ? "Ubegrænset / Skræddersyet" : "Unlimited / Enterprise Support",
      tagline: isDa ? "Forstærkede workflows & 24/7 SLA" : "High scale flows & round-the-clock SLA",
      price: "75.000+",
      setup: isDa ? "Udregnes efter opgave" : "Custom blueprint scoping",
      monthly: isDa ? "Fra 6.500 kr. / md." : "From 6,500 DKK / mo.",
      monthlyDesc: isDa ? "Fuld 24/7 support & ubegrænset drift" : "24/7 production monitoring & infinite runs",
      features: isDa ? [
        "Skræddersyede AI Stemme- gateaway-værktøjer",
        "Infrastruktur i eget cloud system (On-Prem / Private Cloud)",
        "Ubegrænsede AI-samtaler & workflows",
        "Custom APIs og komplekse databaser (ERP, SAP)",
        "24/7 dedikeret vagt-ingeniør og SLA",
        "Kvartalsvise workshops i København",
        "NDA & dedikeret IP-adresse"
      ] : [
        "Sovereign custom voice gateway routing",
        "Private cloud hosting cluster (On-Prem options)",
        "Infinite background operations & volume",
        "Deep enterprise integrations (ERP, SAP, API)",
        "24/7 dedicated engineering pager & strict SLA",
        "Quarterly diagnostic workshops in Copenhagen",
        "Comprehensive NDAs & dedicated secure VPN IP"
      ],
      popular: false,
      cta: isDa ? "Kontakt os om Enterprise" : "Contact Enterprise Scoping"
    }
  ];

  return (
    <div id="pricing-packages-v2" className="space-y-12">
      {/* Intro section */}
      <div className="text-center max-w-2xl mx-auto">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase ${
          theme === 'sand' 
            ? 'bg-[#FEF3C7] text-[#B45309] border border-[#FAB319]/25' 
            : 'bg-[#151619] text-[#FAB319] border border-[#FAB319]/25'
        }`}>
          <Asterisk className="w-3 h-3 text-amber-500 animate-spin-slow" />
          {isDa ? 'Gennemskuelige AI Investeringer' : 'Transparent AI Investments'}
        </span>
        <h2 className="text-2xl sm:text-4xl font-display font-medium mt-3 tracking-tight leading-tight">
          {isDa ? 'Investeringsmodeller & pakker' : 'Our Scalable Packaging & Plans'}
        </h2>
        <p className={`text-xs sm:text-sm mt-2 opacity-75 ${
          theme === 'sand' ? 'text-[#555B56]' : 'text-neutral-450'
        }`}>
          {isDa
            ? 'Uanset om du søger en fokuseret pilotfase eller fuld infrastrukturel procesrevidering, har vi en model skræddersyet til at fjerne administrative led.'
            : 'Whether starting small with vocal tasks or scaling custom enterprise workflows, select an investment target calibrated to your agency goals.'}
        </p>
      </div>

      {/* Pricing cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => {
          const isSelectedThemeDark = theme !== 'sand';
          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className={`relative rounded-3xl p-6 sm:p-8 border flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'border-[#FAB319]/60 dark:border-[#FAB319]/45 shadow-[0_20px_45px_rgba(250,179,25,0.08)] bg-gradient-to-b from-[#FAB319]/[0.02] to-[#FAB319]/[0.05]'
                  : 'border-current/[0.06] bg-current/[0.005] hover:border-current/15'
              }`}
            >
              {/* Highlight ribbon for Core Solution */}
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#D97706] dark:bg-[#FAB319] text-white dark:text-[#080809] font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  <Flame className="w-3 h-3 text-amber-500 animate-pulse fill-amber-500" />
                  {isDa ? "MEST POPULÆR" : "RECOMMENDED"}
                </div>
              )}

              {/* Title & Description */}
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-40">
                    {isDa ? "NORDIC_PLAN" : "SYSTEMS_TIER"} // {plan.id.toUpperCase()}
                  </span>
                  <h3 className="text-lg sm:text-xl font-display font-semibold tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-[11px] opacity-70 leading-relaxed min-h-[1.5rem]">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="py-4 border-y border-current/[0.04]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-mono font-bold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs font-mono opacity-80">kr. / setup</span>
                  </div>
                  <div className="mt-1 text-xs opacity-70 flex flex-col gap-0.5 leading-tight font-sans">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-450">{plan.monthly}</span>
                    <span className="text-[10px] opacity-50">{plan.monthlyDesc}</span>
                  </div>
                </div>

                {/* Checklist features */}
                <ul className="space-y-2.5 pt-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <span className="mt-0.5 shrink-0 rounded bg-[#FAB319]/10 text-[#D97706] dark:text-[#FAB319] p-0.5">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span className="opacity-85 font-sans leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-3.5 rounded-xl text-xs font-display font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-1 px-4 cursor-pointer ${
                    plan.popular
                      ? 'bg-[#D97706] dark:bg-[#FAB319] text-white dark:text-[#080809] hover:opacity-90 border border-transparent'
                      : 'bg-current/[0.03] border border-current/[0.08] hover:border-current/30 text-current hover:bg-[#FAB319]/10'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="text-center mt-2.5">
                  <span className="text-[9px] font-mono opacity-40 block tracking-wider uppercase">
                    🔒 GDPR SIKRET & OVERHOVEDET
                  </span>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Bottom informational disclaimer bar */}
      <div className="p-4 rounded-2xl bg-[#FAB319]/[0.03] border border-[#FAB319]/15 flex flex-col sm:flex-row items-center justify-between text-xs gap-3 font-sans">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="opacity-80 font-medium">
            {isDa 
              ? "Søger I en skræddersyet løsning eller en Proof of Concept for jeres API\'er?" 
              : "Seeking a specific trial project or a technical integration assessment?"}
          </span>
        </div>
        <button
          onClick={() => onSelectPlan('Custom Scope Assessment')}
          className="text-xs hover:underline cursor-pointer font-bold text-[#D97706] dark:text-[#FAB319] shrink-0"
        >
          {isDa ? 'Få et uforpligtende prisoverslag →' : 'Get custom audit scoping →'}
        </button>
      </div>
    </div>
  );
}
