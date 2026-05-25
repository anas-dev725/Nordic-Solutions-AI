/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Sparkles, Database, Send, Play, RefreshCw, CheckCircle2, 
  ArrowRight, Landmark, Building2, TrendingUp, HelpCircle, FileText
} from 'lucide-react';
import { Language, CRMLead, WorkflowNode, Theme } from '../types';
import { translations } from '../translations';

interface CRMWorkflowBuilderProps {
  language: Language;
  theme: Theme;
}

const INITIAL_NODES: WorkflowNode[] = [
  { id: '1', titleDa: 'E-mail modtaget (Trigger)', titleEn: 'Email Received (Trigger)', status: 'idle', type: 'trigger', icon: 'Mail', duration: 1000 },
  { id: '2', titleDa: 'AI Databerigelse', titleEn: 'AI Lead Enrichment', status: 'idle', type: 'ai', icon: 'Sparkles', duration: 1500 },
  { id: '3', titleDa: 'Opdater CRM Pipeline', titleEn: 'Update CRM Pipeline', status: 'idle', type: 'condition', icon: 'Database', duration: 1000 },
  { id: '4', titleDa: 'Send Auto-Notifikation', titleEn: 'Dispatch Auto Alerts', status: 'idle', type: 'action', icon: 'Send', duration: 1000 },
];

const MOCK_MESSAGES_DA = [
  "Hej, jeg søger sparring til et nyt voice-agent projekt for vores 20 sælgere. Vores budget er ca. 50.000 kr. Mvh Morten fra Copenhagen Furnitures, tlf: +45 31920192",
  "Hej Nordic Solutions! Vi kæmper med manuel datatastning i HubSpot i Århus logistik. Kan I bygge en AI bridge? Budget: 120.000 dkk. Vh Anna, tlf +45 28491022",
  "Goddag, jeg vil gerne høre om jeres CRM integrationer. Ring mig op på +45 98112233. Mvh Lars, CPH Dental."
];

const MOCK_MESSAGES_EN = [
  "Hello, looking to automate phone booking lines for our clinics. Standard HubSpot CRM. Budget is 75,000 DKK. Best, Morten from Copenhagen Furnitures. Tel: +45 31920192",
  "Hi guys, can we integrate a voice AI into Salesforce to log call transcripts? Budget around 150,000 DKK. Cheers, Anna. Tel: +45 28491022",
  "Hello, interested in booking a workshop. Please call +45 98112233. Lars, CPH Dental."
];

const STAGE_LEAD_CARDS: CRMLead[] = [
  {
    id: 'l-1',
    name: 'Klaus Winther',
    company: 'Odense Logistics',
    stage: 'lead',
    value: 45000,
    score: 82,
    phone: '+45 40129210',
    summaryDa: 'Søger automatisering af lagerrapportering.',
    summaryEn: 'Looking to automate inventory log sheets.'
  },
  {
    id: 'l-2',
    name: 'Sofia Poulsen',
    company: 'Vesterbro Design',
    stage: 'contacted',
    value: 85000,
    score: 91,
    phone: '+45 22910212',
    summaryDa: 'Forespørgsel på stemmesvar til e-handel.',
    summaryEn: 'Inquiry for AI voice checkout.'
  },
  {
    id: 'l-3',
    name: 'Henrik Nørgaard',
    company: 'Aalborg Shipping',
    stage: 'analyzed',
    value: 120000,
    score: 95,
    phone: '+45 30441299',
    summaryDa: 'Vil have integreret talekort direkte i Salesforce.',
    summaryEn: 'Requesting direct Salesforce telephony logging integrations.'
  }
];

export function CRMWorkflowBuilder({ language, theme }: CRMWorkflowBuilderProps) {
  const [nodes, setNodes] = useState<WorkflowNode[]>(INITIAL_NODES);
  const [pipelineLeads, setPipelineLeads] = useState<CRMLead[]>(STAGE_LEAD_CARDS);

  const getThemeColors = () => {
    switch (theme) {
      case 'sand':
        return {
          badge: 'bg-[#FEF3C7] text-[#B45309] border-[#FAB319]/40',
          innerBg: 'bg-[#FAF9F6] border-[#E5DFD3] text-neutral-850',
          nodeActive: 'bg-[#FEF3C7]/40 border-[#FAB319] shadow-xxs',
          nodeIdle: 'bg-white border-[#E5DFD3] text-[#0F1210]',
          nodeTextActive: 'text-[#B45309]',
          nodeTextCompleted: 'text-emerald-800',
          btnPrimary: 'bg-[#0F1210] hover:bg-[#FAB319] hover:text-[#0F1210] text-[#FAF9F6]',
          cardBg: 'bg-white border-[#E5DFD3] text-[#0F1210]',
          accent: 'text-[#D97706]',
          badgeDb: 'bg-[#FAF9F6] border-[#E5DFD3] text-[#0F1210]',
          aiBanner: 'bg-[#FEF3C7]/60 border-[#FAB319]/35 text-neutral-800',
          kColBg: 'bg-[#FAF9F6] border-[#E5DFD3]',
          kCardBg: 'bg-white border-[#E5DFD3]',
          swapText: 'text-[#D97706]',
          lineColor: '#D97706'
        };
      case 'sage':
        return {
          badge: 'bg-[#FFA31A]/10 text-[#FFA31A] border-[#FFA31A]/35',
          innerBg: 'bg-[#16161C] border-white/5 text-[#EFECE6]',
          nodeActive: 'bg-[#FFA31A]/15 border-[#FFA31A]/30 text-[#FFA31A]',
          nodeIdle: 'bg-[#121215] border-white/5 text-[#EFECE6]',
          nodeTextActive: 'text-[#FFA31A]',
          nodeTextCompleted: 'text-[#EFECE6]',
          btnPrimary: 'bg-[#FFA31A] hover:bg-orange-500 text-black',
          cardBg: 'bg-[#121215] border-white/5 text-[#EFECE6]',
          accent: 'text-[#FFA31A]',
          badgeDb: 'bg-[#16161C] border-white/5 text-[#EFECE6]',
          aiBanner: 'bg-[#FFA31A]/20 border-[#FFA31A]/30 text-[#FFA31A]',
          kColBg: 'bg-[#16161C] border-white/5 text-[#EFECE6]',
          kCardBg: 'bg-[#121215] border-white/5 text-[#EFECE6]',
          swapText: 'text-[#FFA31A]',
          lineColor: '#FFA31A'
        };
      case 'slate':
      default:
        return {
          badge: 'bg-[#FAB319]/10 text-[#FAB319] border-[#FAB319]/35',
          innerBg: 'bg-[#151619] border border-white/5 text-[#F2F0EC]',
          nodeActive: 'bg-[#FAB319]/15 border-[#FAB319]/30 text-[#FAB319]',
          nodeIdle: 'bg-[#0F1012] border border-white/5 text-[#F2F0EC]',
          nodeTextActive: 'text-[#FAB319]',
          nodeTextCompleted: 'text-[#F2F0EC]',
          btnPrimary: 'bg-[#FAB319] hover:bg-[#FFC107] text-[#080809]',
          cardBg: 'bg-[#0F1012] border border-white/5 text-[#F2F0EC]',
          accent: 'text-[#FAB319]',
          badgeDb: 'bg-[#151619] border border-white/5 text-[#F2F0EC]',
          aiBanner: 'bg-[#FAB319]/25 border-[#FAB319]/30 text-[#FAB319]',
          kColBg: 'bg-[#151619] border border-white/5 text-[#F2F0EC]',
          kCardBg: 'bg-[#0F1012] border border-white/5 text-[#F2F0EC]',
          swapText: 'text-[#FAB319]',
          lineColor: '#FAB319'
        };
    }
  };

  const tc = getThemeColors();
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState<number>(-1);
  const [currentPayload, setCurrentPayload] = useState<string>('');
  const [aiAnalysisResult, setAiAnalysisResult] = useState<{
    company?: string;
    budget?: string;
    score?: number;
    phone?: string;
    name?: string;
  } | null>(null);

  useEffect(() => {
    // Pick an initial payload
    setCurrentPayload(language === 'da' ? MOCK_MESSAGES_DA[0] : MOCK_MESSAGES_EN[0]);
  }, [language]);

  const handleNextMessage = () => {
    const list = language === 'da' ? MOCK_MESSAGES_DA : MOCK_MESSAGES_EN;
    const currentIdx = list.indexOf(currentPayload);
    const nextIdx = (currentIdx + 1) % list.length;
    setCurrentPayload(list[nextIdx]);
    setNodes(INITIAL_NODES.map(n => ({ ...n, status: 'idle' })));
    setAiAnalysisResult(null);
    setSimStep(-1);
  };

  const runSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setNodes(INITIAL_NODES.map(n => ({ ...n, status: 'idle' })));
    setAiAnalysisResult(null);

    // Node 1: Trigger
    setSimStep(0);
    setNodes(prev => prev.map((n, i) => i === 0 ? { ...n, status: 'active' } : n));
    await sleep(1500);
    setNodes(prev => prev.map((n, i) => i === 0 ? { ...n, status: 'completed' } : n));

    // Node 2: AI Berigelse
    setSimStep(1);
    setNodes(prev => prev.map((n, i) => i === 1 ? { ...n, status: 'active' } : n));
    await sleep(2000);
    
    // Parse simulated output from payload
    const parsedInfo = parseSimulatedInput(currentPayload);
    setAiAnalysisResult(parsedInfo);
    setNodes(prev => prev.map((n, i) => i === 1 ? { ...n, status: 'completed' } : n));

    // Node 3: Database / CRM Move
    setSimStep(2);
    setNodes(prev => prev.map((n, i) => i === 2 ? { ...n, status: 'active' } : n));
    await sleep(1800);

    // Instantly add the newly enriched mock lead directly into our visual CRM board!
    const newLead: CRMLead = {
      id: `l-${Date.now()}`,
      name: parsedInfo.name || 'Morten Jespersen',
      company: parsedInfo.company || 'Copenhagen Furnitures',
      stage: 'analyzed',
      value: parseInt(parsedInfo.budget?.replace(/[^0-9]/g, '') || '50000'),
      score: parsedInfo.score || 88,
      phone: parsedInfo.phone || '+45 31920192',
      summaryDa: `Søger AI løsning. Estimeret budget: ${parsedInfo.budget}.`,
      summaryEn: `AI Enriched opportunity. Budget: ${parsedInfo.budget}.`
    };

    setPipelineLeads(prev => [newLead, ...prev]);
    setNodes(prev => prev.map((n, i) => i === 2 ? { ...n, status: 'completed' } : n));

    // Node 4: Send Autonotification
    setSimStep(3);
    setNodes(prev => prev.map((n, i) => i === 3 ? { ...n, status: 'active' } : n));
    await sleep(1500);
    setNodes(prev => prev.map((n, i) => i === 3 ? { ...n, status: 'completed' } : n));

    setSimStep(4);
    setIsSimulating(false);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Primitive parser mock for visual demo
  const parseSimulatedInput = (text: string) => {
    if (text.includes('Copenhagen Furnitures') || text.includes('furniture')) {
      return {
        name: 'Morten Poulsen',
        company: 'Copenhagen Furnitures',
        budget: '50.000 DKK_CURR',
        score: 95,
        phone: '+45 31 92 01 92'
      };
    } else if (text.includes('Århus') || text.includes('logistik') || text.includes('Salesforce')) {
      return {
        name: 'Anna Schmidt',
        company: 'Aarhus Cargo Logistics',
        budget: '120.000 DKK_CURR',
        score: 92,
        phone: '+45 28 49 10 22'
      };
    } else {
      return {
        name: 'Lars Nyström',
        company: 'CPH Dental Clinic',
        budget: '75.000 DKK_CURR',
        score: 87,
        phone: '+45 98 11 22 33'
      };
    }
  };

  const getStageLeads = (stage: 'lead' | 'contacted' | 'analyzed' | 'scheduled') => {
    return pipelineLeads.filter(l => l.stage === stage);
  };

  return (
    <div id="crm-simulation-playground" className="w-full flex flex-col space-y-8">
      
      {/* Visual Workspace Node Graph Mapping */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Node diagram list - 5 columns */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${tc.badge}`}>
                Workflow Builder
              </span>
              <button
                onClick={handleNextMessage}
                disabled={isSimulating}
                className={`text-xs font-mono hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50 disabled:no-underline ${tc.swapText}`}
              >
                {language === 'da' ? 'Skift testbesked' : 'Swap Input Sample'}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Input display mimicking live API triggers */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                  {language === 'da' ? 'INDGÅENDE KUNDEHENVENDELSE (MOCK WEBHOOK)' : 'INBOUND INQUIRY (SIMULATED WEBHOOK)'}
                </span>
              </div>
              <p className="font-sans text-xs italic opacity-85 leading-relaxed text-neutral-800 dark:text-neutral-200">
                "{currentPayload}"
              </p>
            </div>

            {/* Nodes Chain Link list */}
            <div className="space-y-3 relative">
              {/* Connector timeline line */}
              <div className="absolute left-[26px] top-6 bottom-6 w-0.5 bg-gray-200 dark:bg-neutral-800/80 -z-10"></div>

              {nodes.map((node, i) => {
                const isNodeActive = node.status === 'active';
                const isNodeCompleted = node.status === 'completed';
                
                return (
                  <motion.div
                    key={node.id}
                    animate={{ x: isNodeActive ? [0, 4, 0] : 0 }}
                    transition={{ repeat: isNodeActive ? Infinity : 0, duration: 1.5 }}
                    className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 ${
                      isNodeActive 
                        ? tc.nodeActive
                        : isNodeCompleted
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        : tc.nodeIdle
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isNodeActive 
                        ? 'bg-current text-current font-bold' 
                        : isNodeCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-150 dark:bg-neutral-800 text-neutral-500'
                    }`} style={{ color: isNodeActive ? tc.lineColor : undefined }}>
                      {node.type === 'trigger' && <Mail className="w-4 h-4" />}
                      {node.type === 'ai' && <Sparkles className="w-4 h-4" />}
                      {node.type === 'condition' && <Database className="w-4 h-4" />}
                      {node.type === 'action' && <Send className="w-4 h-4" />}
                    </div>

                    <div className="flex-1">
                      <h4 className="font-medium text-xs font-sans">
                        {language === 'da' ? node.titleDa : node.titleEn}
                      </h4>
                      <p className="text-[10px] font-mono opacity-60">
                        {isNodeActive ? 'PROCESS_COMPILING' : isNodeCompleted ? 'SYNCHRONIZED_SUCCESS' : 'IDLE_WAIT'}
                      </p>
                    </div>

                    <div className="shrink-0">
                      {isNodeActive && <RefreshCw className="w-4 h-4 animate-spin" style={{ color: tc.lineColor }} />}
                      {isNodeCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {!isNodeActive && !isNodeCompleted && <span className="w-4 h-4 rounded-full border border-gray-300 dark:border-neutral-700 block"></span>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className={`w-full font-display py-3.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 group shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${tc.btnPrimary}`}
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{language === 'da' ? translations.da.simulatingTitle : translations.en.simulatingTitle}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                  <span>{language === 'da' ? translations.da.runWorkflow : translations.en.runWorkflow}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Visual CRM Interactive Kanban pipeline - 7 columns */}
        <div className={`lg:col-span-7 flex flex-col justify-between p-5 rounded-2xl border shadow-md ${tc.cardBg}`}>
          
          <div className="w-full">
            <div className="flex items-center justify-between border-b pb-2.5 mb-4 border-current/[0.08]">
              <h3 className="font-display font-medium text-sm flex items-center gap-2">
                <Database className={`w-4 h-4 ${tc.accent}`} />
                {language === 'da' ? translations.da.crmPipeTitle : translations.en.crmPipeTitle}
              </h3>
              <span className={`text-[10px] font-mono border px-2.5 py-1 rounded ${tc.badgeDb}`}>
                ACTIVE_DATABASE
              </span>
            </div>

            {/* AI Live enrichment results banner (rendered during Node 2 execution or after) */}
            <AnimatePresence>
              {aiAnalysisResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mb-4 p-3 rounded-xl border text-xs overflow-hidden ${tc.aiBanner}`}
                >
                  <p className="font-mono text-[9px] uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    AI DATA EXTRACTION ENGINE REAL-TIME COMPLETED:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] text-neutral-700 dark:text-neutral-300">
                    <div>
                      <span className="opacity-50">CONTACT:</span> <strong className="font-sans font-medium block text-neutral-950 dark:text-neutral-100">{aiAnalysisResult.name}</strong>
                    </div>
                    <div>
                      <span className="opacity-50">COMPANY:</span> <strong className="font-sans font-medium block text-neutral-950 dark:text-neutral-100">{aiAnalysisResult.company}</strong>
                    </div>
                    <div>
                      <span className="opacity-50">BUDGET:</span> <span className="font-bold text-emerald-600 block">{aiAnalysisResult.budget}</span>
                    </div>
                    <div>
                      <span className="opacity-50">AI SCORE:</span> <span className="font-bold text-amber-600 block">{aiAnalysisResult.score}/100</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Kanban Columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Columns list */}
              {(['lead', 'contacted', 'analyzed', 'scheduled'] as const).map((colStage) => {
                const stageLeads = getStageLeads(colStage);
                const colTitle = language === 'da' 
                  ? colStage === 'lead' ? 'Leads' : colStage === 'contacted' ? 'Kontaktet' : colStage === 'analyzed' ? 'Beriget' : 'Møde'
                  : colStage === 'lead' ? 'New Leads' : colStage === 'contacted' ? 'Contacted' : colStage === 'analyzed' ? 'Enriched' : 'Scheduled';

                return (
                  <div key={colStage} className={`space-y-3 p-2 py-3 rounded-xl border flex flex-col min-h-[180px] ${tc.kColBg}`}>
                    <div className="flex items-center justify-between px-1 mb-1 border-b border-current/[0.08] pb-1">
                      <span className="text-[10px] font-sans font-medium tracking-tight uppercase opacity-70 truncate">
                        {colTitle}
                      </span>
                      <span className="text-[9px] font-mono font-bold bg-neutral-200 dark:bg-neutral-800/80 px-1 rounded">
                        {stageLeads.length}
                      </span>
                    </div>

                    <div className="space-y-2 flex-grow overflow-y-auto">
                      <AnimatePresence>
                        {stageLeads.map((leadCard) => (
                          <motion.div
                            key={leadCard.id}
                            initial={{ scale: 0.9, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className={`border p-2.5 rounded-lg shadow-xxs font-sans text-xs flex flex-col justify-between space-y-2 ${tc.kCardBg}`}
                          >
                            <div>
                              <h5 className="font-medium text-[11px] truncate text-neutral-950 dark:text-neutral-100">{leadCard.name}</h5>
                              <p className="text-[9px] opacity-60 truncate font-mono">{leadCard.company}</p>
                            </div>

                            <p className="text-[9px] opacity-75 line-clamp-2 italic leading-normal text-neutral-600 dark:text-neutral-400">
                              {language === 'da' ? leadCard.summaryDa : leadCard.summaryEn}
                            </p>

                             <div className="flex items-center justify-between border-t border-current/10 pt-1.5">
                              <span className="text-[9px] font-mono font-bold text-emerald-600">
                                {leadCard.value.toLocaleString(language === 'da' ? 'da-DK' : 'en-US')} kr.
                              </span>
                              <span className="text-[9px] font-mono font-bold bg-amber-50 dark:bg-amber-950/30 text-amber-700 px-1 rounded" style={{ backgroundColor: theme === 'sand' ? '#FEF3C7' : undefined, color: theme === 'sand' ? '#B45309' : undefined }}>
                                AI: {leadCard.score}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Running explanation status */}
          <div className="mt-4 pt-3 border-t border-current/10 text-[10px] sm:text-xs font-sans opacity-70 flex justify-between items-center text-neutral-600 dark:text-neutral-400">
            <span>
              {isSimulating 
                ? (language === 'da' ? translations.da.nodesActiveText : translations.en.nodesActiveText)
                : (language === 'da' ? 'Klar til simulering. Klik på Kør Test Workflow.' : 'Ready for simulation. Click run button to evaluate pipeline integration.')
              }
            </span>
            <span className="font-mono font-semibold">CRM_VITE_V1.1</span>
          </div>

        </div>

      </div>
    </div>
  );
}
