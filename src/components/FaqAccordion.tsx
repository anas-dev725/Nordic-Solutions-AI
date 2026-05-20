/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, ArrowUpRight, MessageSquare, ShieldAlert } from 'lucide-react';
import { Language, Theme } from '../types';

interface FaqAccordionProps {
  language: Language;
  theme: Theme;
}

export function FaqAccordion({ language, theme }: FaqAccordionProps) {
  const isDa = language === 'da';
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: isDa 
        ? "Hvordan håndterer jeres AI stemmeagenter GDPR og dansk telefonsikkerhed?" 
        : "How do your voice agents handle GDPR and local European privacy standards?",
      a: isDa 
        ? "Sikkerhed er vores øverste prioritet. Al samtaledata sendes over krypterede TLS 1.3-forbindelser, og personfølsomme oplysninger (såsom CPR-numre) maskeres øjeblikkeligt før de rammer loggen. Vi lagrer udelukkende samtaler på EU-baserede cloud-servere (København/Frankfurt) i fuld overensstemmelse med GDPR."
        : "Privacy is built into our core operations. All call routing uses TLS 1.3 encryption, and sensitive inputs like personal identifiers are immediately masked to maintain data sovereignty. Systems operate securely in local European regions (Frankfurt & Copenhagen) in total alignment with standard GDPR norms."
    },
    {
      q: isDa 
        ? "Taler jeres voice agents flydende dansk uden forsinkelse (latency)?" 
        : "Do your voice agents speak natural Danish with low call latency?",
      a: isDa 
        ? "Ja, absolut. Vi anvender state-of-the-art stemmemodeller, der er finjusteret til lokale dialekter, sprogtoner og det typiske skandinaviske taletempo. Ved at køre vores talegateway på lynhurtig infrastruktur i København, har vi minimeret svartiden (latency) til under 1,1 sekunder, hvilket gør, at samtalerne føles fuldstændig naturlige."
        : "Yes, flawlessly. We use high-fidelity neural speech synthesis trained specifically on Danish conversational cadences and local registers. By running stateful voice edge gateways on cloud systems, latency response timing is kept under 1.1s, creating comfortable, human-like voice sessions."
    },
    {
      q: isDa 
        ? "Hvilke CRM systemer og databaser kan I integrere stemme- og mail-agenterne med?" 
        : "Which CRM frameworks and databases can you integrate agents with?",
      a: isDa 
        ? "Vi bygger direkte integrationer til alle førende CRM-platforme: primært HubSpot, Salesforce, Pipedrive, Zoho og Microsoft Dynamics. Hvis du benytter et specialbygget internt branchesystem, bygger vi blot en custom API-bro med sikre webhooks til at overføre data."
        : "We build native bi-directional workflows bridging leading CRMs: HubSpot, Salesforce, Pipedrive, Zoho, and MS Dynamics. For bespoke, industry-specific in-house systems, we establish robust, hardened custom JSON APIs with secure webhooks to route data directly."
    },
    {
      q: isDa 
        ? "Hvor lang tid tager opsætningen og træningen af en intelligent agent?" 
        : "How long is the onboarding and deployment process for custom agents?",
      a: isDa 
        ? "For de fleste mindre og mellemstore virksomheder (fx klinikker eller mindre konsulenthuse) leverer vi en fuldt funktionel pilot-løsning indenfor 10-14 dage. Komplekse enterprise-workflows, der kræver dybe ERP-integrationer, tager typisk 4-6 uger inklusiv grundig QA-testning."
        : "For average-sized firms or localized clinical desks, physical deployment takes roughly 10-14 business days. High-volume enterprise integrations requiring secure ERP hooks or intricate transactional mapping typically finalize within 4-6 calendar weeks, including extensive verification phases."
    },
    {
      q: isDa 
        ? "Ejer min virksomhed IP-rettighederne og dataene for de agenter, I bygger?" 
        : "Does our enterprise retain IP rights and data ownership for custom builds?",
      a: isDa 
        ? "Ja. Alt data uddraget under samtaler og alle specialbyggede prompts og system-integrationer tilhører udelukkende din virksomhed. Vi leverer løsninger, der kører på åbne API-systemer, hvilket sikrer, at I ikke bliver bundet af lukkede proprietære økosystemer."
        : "Absolutely. All extracted conversational metadata, customized prompting guidelines, and integration adapters remain the exclusive intellectual property of your enterprise. We engineer on open API models, preventing proprietary technology lock-in."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq-section-v2" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Title block side */}
      <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
        <div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase ${
            theme === 'sand' 
              ? 'bg-[#E5EAD8] text-[#556641] border border-[#A3B18A]/30' 
              : 'bg-[#1A1E1B] text-[#A3B18A] border border-[#A3B18A]/20'
          }`}>
            <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
            {isDa ? 'Ofte Stillede Spørgsmål' : 'Frequently Asked Questions'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-medium mt-3 tracking-tight leading-tight">
            {isDa ? 'Svar på jeres tekniske spørgsmål' : 'Answering your technical inquiries'}
          </h2>
          <p className={`text-xs sm:text-sm mt-2 opacity-75 ${
            theme === 'sand' ? 'text-[#555B56]' : 'text-neutral-450'
          }`}>
            {isDa
              ? 'Vi forstår, at integration af AI i kritiske kundevendte processer kræver dyb tillid. Her er svar på de vigtigste overvejelser om driftsikkerhed og GDPR.'
              : 'Deploying background automation systems in direct contact with clients demands strict confidence and trust. Here are key guidelines on security and operation.'}
          </p>
        </div>

        {/* Mini Trust Block */}
        <div className="p-4 rounded-2xl bg-current/[0.012] border border-current/[0.04] space-y-2.5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-[11px] font-mono tracking-wide uppercase font-bold">GDPR COMPLIANCE AUDIT CERTIFIED</span>
          </div>
          <p className="text-[10px] opacity-70 leading-relaxed font-sans">
            {isDa
              ? "Vores infrastruktur og datatransit overholder samtlige krav fra det danske Datatilsyn og de europæiske GDPR-rammer. Vi foretager løbende eksterne sårbarhedsscanninger."
              : "All system adapters are continuously audited to meet European Data Protection Board (EDPB) laws and regional guidelines in Copenhagen, Denmark."}
          </p>
        </div>
      </div>

      {/* Accordion list side */}
      <div className="lg:col-span-7 space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className={`border-b border-current/[0.06] pb-4 transition-all duration-300 ${
                isOpen ? 'bg-current/[0.005] px-4 rounded-2xl border-current/[0.1] pt-4' : 'hover:bg-current/[0.002] hover:px-2 rounded-lg'
              }`}
            >
              <button
                onClick={() => handleToggle(index)}
                className="w-full flex items-center justify-between gap-4 text-left py-2.5 font-display font-medium text-sm sm:text-base text-current cursor-pointer group"
              >
                <span className="group-hover:opacity-100 opacity-90 transition-opacity leading-tight pr-4">
                  {faq.q}
                </span>
                <span className={`shrink-0 p-1 rounded-full bg-current/[0.02] border border-current/[0.05] group-hover:scale-110 transition-transform ${
                  isOpen ? 'text-[#718259] dark:text-[#A3B18A] bg-[#718259]/10' : 'text-current opacity-60'
                }`}>
                  {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pr-4 pb-3 pt-2 text-xs sm:text-sm leading-relaxed opacity-75 font-sans">
                      <p>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
