/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  TrendingDown, 
  Hourglass, 
  ShieldCheck, 
  HelpCircle, 
  Percent, 
  Settings2, 
  Sparkles, 
  ChevronRight,
  UserCheck,
  TrendingUp,
  Receipt
} from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../translations';

interface RoiCalculatorProps {
  language: Language;
  theme: Theme;
}

export function RoiCalculator({ language, theme }: RoiCalculatorProps) {
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
          svgLineOld: '#D97706',
          svgLineNew: '#10B981',
          chartFillOld: 'rgba(217,119,6,0.06)',
          chartFillNew: 'rgba(16,185,129,0.06)',
          dotColor: '#D97706',
          boxBg: 'bg-[#FAF9F6]',
          mutedText: 'text-neutral-500'
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
          svgLineOld: '#FFA31A',
          svgLineNew: '#10B981',
          chartFillOld: 'rgba(255,163,26,0.07)',
          chartFillNew: 'rgba(16,185,129,0.08)',
          dotColor: '#FFA31A',
          boxBg: 'bg-[#16161C]',
          mutedText: 'text-neutral-400'
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
          svgLineOld: '#FAB319',
          svgLineNew: '#10B981',
          chartFillOld: 'rgba(250,179,25,0.08)',
          chartFillNew: 'rgba(16,185,129,0.08)',
          dotColor: '#FAB319',
          boxBg: 'bg-[#151619]',
          mutedText: 'text-[#8E8F94]'
        };
    }
  };

  const tc = getThemeColors();

  // Config state
  const [employees, setEmployees] = useState<number>(12);
  const [avgWage, setAvgWage] = useState<number>(38000); // gennemsnitlig DKK mindsteløn/måned for kontor
  const [manualHours, setManualHours] = useState<number>(8); // hours spent per week per employee on chores
  const [automationPotential, setAutomationPotential] = useState<number>(70); // adjustable from 30% to 95%
  const [customBudget, setCustomBudget] = useState(false);
  const [setupFee, setSetupFee] = useState<number>(35000);
  const [monthlyOpex, setMonthlyOpex] = useState<number>(3500);
  
  // Interactive selected year on the chart (1 to 5)
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(5);
  const [showExplanation, setShowExplanation] = useState(false);

  // Constants
  const WEEKS_PER_YEAR = 46; // excluding danish vacation (6 uger)
  const HOURLY_OVERHEAD_FACTOR = 1.25; // danish pension (AM-bidrag, ATP, social costs, etc)

  // Calculations
  const calculatedHourlyRate = (avgWage * 12) / (52 * 37) * HOURLY_OVERHEAD_FACTOR;
  
  // Hours lost in total yearly
  const totalHoursWastedYearly = employees * manualHours * WEEKS_PER_YEAR;
  
  // Financial loss yearly
  const financialLossYearly = totalHoursWastedYearly * calculatedHourlyRate;
  
  // Savings after automation
  const efficiencyDecimal = automationPotential / 100;
  const hoursReclaimedYearly = Math.round(totalHoursWastedYearly * efficiencyDecimal);
  const moneySavedYearly = Math.round(financialLossYearly * efficiencyDecimal);
  
  // Payback estimation
  const monthlySavings = moneySavedYearly / 12;
  const paybackPeriodMonths = Math.max(1, Math.round((setupFee / Math.max(1, monthlySavings - monthlyOpex)) * 10) / 10);

  // Calculate equivalent FTEs (Full Time Equivalents) saved
  const FTE_hours_yearly = 37 * WEEKS_PER_YEAR; // 37 hours/week typical danish contract
  const fteSaved = (hoursReclaimedYearly / FTE_hours_yearly).toFixed(1);

  // Generate coordinates for SVG chart dynamically
  const years = [1, 2, 3, 4, 5];
  const oldTrendpoints = years.map(y => financialLossYearly * y);
  
  // Automated cumulative cost including startup and opex
  const aiTrendpoints = years.map(y => {
    const aiCost = setupFee + (monthlyOpex * 12 * y);
    const unautomatedBuffer = (financialLossYearly * (1 - efficiencyDecimal)) * y;
    return aiCost + unautomatedBuffer;
  });

  // Calculate coordinates for SVG box of aspect 420x180
  const maxCost = Math.max(...oldTrendpoints) * 1.05;
  const scaleX = (val: number) => (val / 5) * 330 + 45;
  const scaleY = (val: number) => 155 - (val / Math.max(1, maxCost)) * 130;

  // Generate smooth SVG paths
  const oldPointsStr = years.map((y, idx) => `${scaleX(y)},${scaleY(oldTrendpoints[idx])}`).join(' ');
  const areaPointsOld = `45,155 ${oldPointsStr} 375,155`;
  
  const aiPointsStr = years.map((y, idx) => `${scaleX(y)},${scaleY(aiTrendpoints[idx])}`).join(' ');
  const areaPointsNew = `45,155 ${aiPointsStr} 375,155`;

  // Year metadata for current active selection (either hovered or selected)
  const activeYear = hoveredYear !== null ? hoveredYear : selectedYear;
  const activeIdx = activeYear - 1;
  const activeManualCost = oldTrendpoints[activeIdx];
  const activeAICost = aiTrendpoints[activeIdx];
  const activeNetSavings = activeManualCost - activeAICost;
  const activePercentSaved = Math.round((activeNetSavings / activeManualCost) * 100);

  const dict = translations[language];

  return (
    <div id="roi-analysis-calculator-v2" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Inputs side - 5 columns */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`p-1 px-1.5 rounded-lg border ${tc.badge}`}>
                <BarChart3 className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">
                {language === 'da' ? 'Simuler din gevinst i realtid' : 'Real-time ROI simulation'}
              </span>
            </div>
            <h3 className="text-2xl font-display font-medium tracking-tight">
              {dict.calcHeading}
            </h3>
            <p className="text-sm opacity-70 mt-1 font-sans">
              {dict.calcSub}
            </p>
          </div>

          <div className="space-y-5">
            {/* Range employee counts */}
            <div className="space-y-2 p-4 rounded-xl bg-current/[0.012] border border-current/[0.03]">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="font-medium opacity-80 flex items-center gap-1.5">
                  <UserCheck className={`w-3.5 h-3.5 ${tc.accent}`} />
                  {dict.employeesCount}
                </span>
                <span className="font-mono font-bold px-2 py-0.5 rounded text-xs" style={{ backgroundColor: theme === 'sand' ? '#FEF3C7' : 'rgba(250,179,25,0.1)', color: theme === 'sand' ? '#B45309' : undefined }}>
                  {employees}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={employees}
                onChange={(e) => setEmployees(parseInt(e.target.value))}
                className={`w-full ${tc.sliderFill} bg-gray-200 dark:bg-neutral-800 h-1 rounded-lg appearance-none cursor-pointer`}
              />
              <div className="flex justify-between text-[9px] font-mono opacity-50">
                <span>1 medarbejder</span>
                <span>100 medarbejdere</span>
              </div>
            </div>

            {/* Range Monthly Salary */}
            <div className="space-y-2 p-4 rounded-xl bg-current/[0.012] border border-current/[0.03]">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="font-medium opacity-80 flex items-center gap-1.5">
                  <Receipt className={`w-3.5 h-3.5 ${tc.accent}`} />
                  {dict.avgSalary}
                </span>
                <span className="font-mono font-bold px-2 py-0.5 rounded text-xs" style={{ backgroundColor: theme === 'sand' ? '#FEF3C7' : 'rgba(250,179,25,0.1)', color: theme === 'sand' ? '#B45309' : undefined }}>
                  {avgWage.toLocaleString(language === 'da' ? 'da-DK' : 'en-US')} kr.
                </span>
              </div>
              <input
                type="range"
                min="20000"
                max="90000"
                step="1000"
                value={avgWage}
                onChange={(e) => setAvgWage(parseInt(e.target.value))}
                className={`w-full ${tc.sliderFill} bg-gray-200 dark:bg-neutral-800 h-1 rounded-lg appearance-none cursor-pointer`}
              />
              <div className="flex justify-between text-[9px] font-mono opacity-50">
                <span>20.000 kr.</span>
                <span>90.000 kr.</span>
              </div>
            </div>

            {/* Range Hours Lost Weekly per employee */}
            <div className="space-y-2 p-4 rounded-xl bg-current/[0.012] border border-current/[0.03]">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="font-medium opacity-80 flex items-center gap-1.5">
                  <Hourglass className={`w-3.5 h-3.5 ${tc.accent}`} />
                  {dict.hoursLost}
                </span>
                <span className="font-mono font-bold px-2 py-0.5 rounded text-xs" style={{ backgroundColor: theme === 'sand' ? '#FEF3C7' : 'rgba(250,179,25,0.1)', color: theme === 'sand' ? '#B45309' : undefined }}>
                  {manualHours} t/uge
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={manualHours}
                onChange={(e) => setManualHours(parseInt(e.target.value))}
                className={`w-full ${tc.sliderFill} bg-gray-200 dark:bg-neutral-800 h-1 rounded-lg appearance-none cursor-pointer`}
              />
              <div className="flex justify-between text-[9px] font-mono opacity-50">
                <span>2 timer</span>
                <span>30 timer</span>
              </div>
            </div>

            {/* AI SYSTEM ADJUSTMENT CARD */}
            <div className="p-4 rounded-xl bg-current/[0.012] border border-current/[0.03] space-y-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCustomBudget(!customBudget)}
                  className={`flex items-center gap-1.5 text-xs hover:opacity-100 opacity-80 font-medium cursor-pointer ${tc.accent}`}
                >
                  <Settings2 className="w-4 h-4 shrink-0 transition-transform group-hover:rotate-45" />
                  <span>{language === 'da' ? 'Indstil AI Budget & Effektivitet' : 'Tune AI Budget & Efficiency'}</span>
                  <ChevronRight className={`w-3 h-3 transition-transform ${customBudget ? 'rotate-90' : ''}`} />
                </button>
                <span className="text-[10px] font-mono bg-emerald-500/15 text-emerald-500 px-1.5 py-0.5 rounded font-bold">
                  {automationPotential}% Eff.
                </span>
              </div>

              <AnimatePresence initial={false}>
                {customBudget && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 pt-2 overflow-hidden border-t border-current/[0.05]"
                  >
                    {/* Automation Potential Slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="opacity-75">{language === 'da' ? 'Automatiserings-potentiale' : 'Automation Performance Target'}</span>
                        <span className="font-mono font-semibold">{automationPotential}%</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="95"
                        value={automationPotential}
                        onChange={(e) => setAutomationPotential(parseInt(e.target.value))}
                        className="w-full accent-[#10B981] bg-gray-200 dark:bg-neutral-800 h-1 rounded appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Setup Fee Slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="opacity-75">{language === 'da' ? 'Engangs setup omkostning' : 'One-time AI Setup Cost'}</span>
                        <span className="font-mono font-semibold">{setupFee.toLocaleString()} DKK</span>
                      </div>
                      <input
                        type="range"
                        min="10000"
                        max="150000"
                        step="5000"
                        value={setupFee}
                        onChange={(e) => setSetupFee(parseInt(e.target.value))}
                        className="w-full accent-amber-500 bg-gray-200 dark:bg-neutral-800 h-1 rounded appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Monthly OPEX Slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="opacity-75">{language === 'da' ? 'Månedlig licens/drift' : 'Monthly AI SaaS Cost'}</span>
                        <span className="font-mono font-semibold">{monthlyOpex.toLocaleString()} DKK</span>
                      </div>
                      <input
                        type="range"
                        min="1000"
                        max="15000"
                        step="500"
                        value={monthlyOpex}
                        onChange={(e) => setMonthlyOpex(parseInt(e.target.value))}
                        className="w-full accent-amber-500 bg-gray-200 dark:bg-neutral-800 h-1 rounded appearance-none cursor-pointer"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Danish calculation offset parameters */}
        <div className="p-3.5 rounded-xl bg-current/[0.015] border border-current/[0.04] text-xs font-sans">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className={`flex items-center gap-1.5 hover:underline font-medium text-[11px] cursor-pointer ${tc.accent}`}
          >
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            {language === 'da' ? 'Se beregningsgrundlag & faste satser' : 'See wage metrics & social overhead policy'}
          </button>
          
          {showExplanation && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2 text-[10px] leading-relaxed opacity-75 font-mono"
            >
              {language === 'da'
                ? "Beregningen tager højde for 12,5% feriepenge, faste overhead-tillæg (atp, AM-bidrag, pension) på i alt 25% oveni grundlønnen. Forretningen opererer med 46 aktive uger om året."
                : "Includes standard Danish mandatory pension, AM-contributions, social cost weights (additional 25%), and 6 weeks standard vacation (46 active labor weeks per annum)."
              }
            </motion.p>
          )}
        </div>
      </div>

      {/* Outputs & Live Chart visualization side - 7 columns */}
      <div className={`lg:col-span-7 flex flex-col justify-between p-6 rounded-2xl border shadow-md space-y-6 ${tc.cardBg}`}>
        
        {/* Metric stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Yearly loss */}
          <div className="p-3 rounded-xl bg-red-500/[0.03] border border-red-500/10 hover:border-red-500/20 transition-all duration-300">
            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-tight block">
              {dict.yearlyLoss}
            </span>
            <span className="text-sm sm:text-base font-mono font-bold text-red-500 mt-0.5 block">
              {Math.round(financialLossYearly).toLocaleString(language === 'da' ? 'da-DK' : 'en-US')} kr.
            </span>
            <span className="text-[8px] text-neutral-500 font-sans block mt-0.5 italic">
              {language === 'da' ? 'Manuelt spild' : 'Manual waste'}
            </span>
          </div>

          {/* Expected savings */}
          <div className="p-3 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/10 hover:border-emerald-500/20 transition-all duration-300">
            <span className="text-[9px] font-mono text-emerald-800 dark:text-emerald-400 uppercase tracking-tight block">
              {dict.yearlySavings}
            </span>
            <span className="text-sm sm:text-base font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
              {moneySavedYearly.toLocaleString(language === 'da' ? 'da-DK' : 'en-US')} kr.
            </span>
            <span className="text-[8px] text-emerald-600 font-sans block mt-0.5 font-medium flex items-center gap-0.5">
              <ShieldCheck className="w-2.5 h-2.5 text-emerald-500" />
              {automationPotential}% {language === 'da' ? 'besvarelse' : 'automated'}
            </span>
          </div>

          {/* Reclaimed hours */}
          <div className="p-3 rounded-xl bg-amber-500/[0.03] border border-amber-500/10 hover:border-amber-500/20 transition-all duration-300">
            <span className="text-[9px] font-mono text-amber-850 dark:text-amber-300 uppercase tracking-tight block">
              {dict.hoursReclaimed}
            </span>
            <span className="text-sm sm:text-base font-mono font-bold text-amber-700 dark:text-amber-300 mt-0.5 block">
              {hoursReclaimedYearly.toLocaleString(language === 'da' ? 'da-DK' : 'en-US')} <span className="text-[9px] font-sans font-normal opacity-70">t/år</span>
            </span>
            <span className="text-[8px] text-amber-600 font-sans block mt-0.5">
              ≈ {fteSaved} {language === 'da' ? 'fuldtidsst. (FTE)' : 'FTE value back'}
            </span>
          </div>

          {/* Payback period */}
          <div className="p-3 rounded-xl bg-current/[0.015] border border-current/[0.04] hover:border-current/[0.08] transition-all duration-300">
            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-tight block">
              {dict.paybackPeriod}
            </span>
            <span className="text-sm sm:text-base font-mono font-bold text-neutral-900 dark:text-neutral-100 mt-0.5 block">
              {paybackPeriodMonths > 0 && isFinite(paybackPeriodMonths) ? paybackPeriodMonths : 1.2} {dict.monthsText}
            </span>
            <span className="text-[8px] text-neutral-500 font-sans block mt-0.5">
              {language === 'da' ? 'Tilbagebetaling' : 'Break-even rate'}
            </span>
          </div>
        </div>

        {/* Dynamic visual vector chart representing cost savings curve - HIGHLY INTERACTIVE */}
        <div className="border border-current/[0.04] rounded-xl p-4 bg-current/[0.004] dark:bg-neutral-950/20 flex flex-col justify-between relative group">
          
          {/* Header of chart with active metadata info */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center text-[11px] font-sans px-1 mb-2.5 gap-2 border-b border-current/[0.03] pb-2">
            <span className="flex items-center gap-1.5 font-medium opacity-80 text-neutral-700 dark:text-neutral-300">
              <BarChart3 className={`w-4 h-4 ${tc.accent}`} />
              {language === 'da' ? 'Interaktiv Gevinstkurve' : 'Interactive Projections & Break-even'}
            </span>
            <span className={`text-[9px] font-mono uppercase tracking-wide opacity-85 px-1.5 py-0.5 rounded border border-current/[0.06] ${tc.badge}`}>
              * {language === 'da' ? 'Klik på et år' : 'Click/Hover any year'}
            </span>
          </div>

          {/* Custom vector SVG representation of area charts */}
          <div className="w-full h-[180px] relative mt-1 select-none">
            <svg viewBox="0 0 420 180" className="w-full h-full overflow-visible">
              
              {/* Gridlines */}
              <line x1="45" y1="25" x2="375" y2="25" stroke="currentColor" className="opacity-[0.05]" strokeDasharray="3,3" />
              <line x1="45" y1="90" x2="375" y2="90" stroke="currentColor" className="opacity-[0.05]" strokeDasharray="3,3" />
              <line x1="45" y1="155" x2="375" y2="155" stroke="currentColor" className="opacity-[0.15]" />

              {/* Old manual cost trend path shading */}
              <polygon points={areaPointsOld} fill="rgba(239, 68, 68, 0.05)" className="transition-all duration-300" />
              <path
                d={`M 45,155 ` + oldPointsStr}
                fill="none"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="4,2"
                className="transition-all duration-300"
              />

              {/* AI intelligent solution cost trend path shading */}
              <polygon points={areaPointsNew} fill="rgba(16, 185, 129, 0.08)" className="transition-all duration-300" />
              <path
                d={`M 45,155 ` + aiPointsStr}
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                className="transition-all duration-300"
              />

              {/* Render dynamic background highlights for selected/hovered Year */}
              <line 
                x1={scaleX(activeYear)} 
                y1="25" 
                x2={scaleX(activeYear)} 
                y2="155" 
                stroke="currentColor" 
                className="opacity-15 dark:opacity-10 stroke-[2px]" 
                strokeDasharray="2,2" 
              />

              {/* SVG vertical hover hitboxes for Year 1 to 5 to trigger instant interactive update */}
              {years.map((y) => (
                <rect
                  key={`hitbox-${y}`}
                  x={(y / 5) * 330 + 15}
                  y="15"
                  width="50"
                  height="145"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredYear(y)}
                  onMouseLeave={() => setHoveredYear(null)}
                  onClick={() => setSelectedYear(y)}
                />
              ))}

              {/* Interactive nodes along the Year paths */}
              {years.map((y, idx) => {
                const isSelected = activeYear === y;
                return (
                  <g key={`nodes-${y}`} className="pointer-events-none">
                    {/* Manual Cost Node */}
                    <circle 
                      cx={scaleX(y)} 
                      cy={scaleY(oldTrendpoints[idx])} 
                      r={isSelected ? "5.5" : "3.5"} 
                      fill="#EF4444" 
                      className="transition-all duration-300"
                    />
                    
                    {/* AI Cost Node */}
                    <circle 
                      cx={scaleX(y)} 
                      cy={scaleY(aiTrendpoints[idx])} 
                      r={isSelected ? "6.5" : "4.5"} 
                      fill="#10B981" 
                      className="transition-all duration-300"
                      stroke="white"
                      strokeWidth={isSelected ? "1.5" : "0"}
                    />
                  </g>
                );
              })}

              {/* Axis Labels */}
              {/* Year labels with specific theme fills */}
              <text x="45" y="168" fill="currentColor" className="opacity-40" fontSize="8" fontFamily="sans-serif" textAnchor="middle">År 0</text>
              <text x={scaleX(1)} y="168" fill="currentColor" className={activeYear === 1 ? `font-bold transition-colors ${tc.accent}` : "opacity-40"} fontSize="8" fontFamily="sans-serif" textAnchor="middle">År 1</text>
              <text x={scaleX(2)} y="168" fill="currentColor" className={activeYear === 2 ? `font-bold transition-colors ${tc.accent}` : "opacity-40"} fontSize="8" fontFamily="sans-serif" textAnchor="middle">År 2</text>
              <text x={scaleX(3)} y="168" fill="currentColor" className={activeYear === 3 ? `font-bold transition-colors ${tc.accent}` : "opacity-40"} fontSize="8" fontFamily="sans-serif" textAnchor="middle">År 3</text>
              <text x={scaleX(4)} y="168" fill="currentColor" className={activeYear === 4 ? `font-bold transition-colors ${tc.accent}` : "opacity-40"} fontSize="8" fontFamily="sans-serif" textAnchor="middle">År 4</text>
              <text x={scaleX(5)} y="168" fill="currentColor" className={activeYear === 5 ? `font-bold transition-colors ${tc.accent}` : "opacity-40"} fontSize="8" fontFamily="sans-serif" textAnchor="middle">År 5</text>

              {/* Dynamic Coordinate readouts on Left axis */}
              <text x="38" y="28" fill="currentColor" className="opacity-30" fontSize="8" fontFamily="sans-serif" textAnchor="end">
                {(maxCost / 1000).toFixed(0)}k kr.
              </text>
              <text x="38" y="158" fill="currentColor" className="opacity-30" fontSize="8" fontFamily="sans-serif" textAnchor="end">0 kr</text>
            </svg>

            {/* Float visual labels legend block */}
            <div className="absolute top-12 right-4 text-[9px] font-mono space-y-1.5 bg-white/70 dark:bg-neutral-900/80 p-2 rounded-lg border border-current/[0.05] shadow-xs pointer-events-none">
              <div className="flex items-center gap-1.5 text-red-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 block"></span>
                <span>{language === 'da' ? 'Manuel opgaveløsning' : 'Manual Costs'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 block"></span>
                <span>{language === 'da' ? 'Med Nordic Solutions AI' : 'Bespoke AI Suite'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE BREAKDOWN CARD EXPLAINING SELECTED YEAR POINT */}
        <motion.div 
          layoutId="yearBreakdownCard"
          className="p-4 rounded-xl border border-current/[0.05] bg-current/[0.008] space-y-3 shadow-inner"
        >
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-1" style={{ color: theme === 'sand' ? '#B45309' : undefined }}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              {language === 'da' ? `Akkumuleret oversigt efter år ${activeYear}` : `Accumulated analysis after Year ${activeYear}`}
            </h4>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-mono font-bold">
              {language === 'da' ? `${activePercentSaved}% sparet` : `${activePercentSaved}% saved`}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 pt-1 text-xs">
            {/* Column 1: Manual cumulative */}
            <div>
              <span className="text-[9px] block text-neutral-400 font-mono tracking-tight uppercase">
                {language === 'da' ? 'Manuelle total' : 'Manual Total'}
              </span>
              <span className="font-mono font-medium opacity-80 mt-1 block">
                {Math.round(activeManualCost).toLocaleString()} kr.
              </span>
            </div>

            {/* Column 2: AI investment cumulative */}
            <div>
              <span className="text-[9px] block text-neutral-400 font-mono tracking-tight uppercase">
                {language === 'da' ? 'AI Totalomkostn.' : 'AI Total Cost'}
              </span>
              <span className="font-mono font-medium opacity-80 mt-1 block text-emerald-600 dark:text-emerald-400">
                {Math.round(activeAICost).toLocaleString()} kr.
              </span>
            </div>

            {/* Column 3: Net Profit Savings */}
            <div>
              <span className="text-[9px] block text-amber-500 font-mono tracking-tight uppercase">
                {language === 'da' ? 'Samlet Gevinst' : 'Net Savings'}
              </span>
              <span className="font-mono font-bold text-neutral-900 dark:text-white mt-1 block text-sm">
                {Math.round(activeNetSavings).toLocaleString()} kr.
              </span>
            </div>
          </div>
          <p className="text-[10px] text-neutral-400 pt-1 border-t border-current/[0.03] leading-relaxed font-sans italic">
            {language === 'da' 
              ? `* Ved at investere i Nordic Solutions AI har du efter ${activeYear} år opnået en ubestridt nettogevinst på over ${Math.round(activeNetSavings).toLocaleString()} kr.` 
              : `* By choosing Nordic Solutions AI, your cumulative net balance is ${Math.round(activeNetSavings).toLocaleString()} DKK in direct profit over ${activeYear} years.`
            }
          </p>
        </motion.div>

      </div>
    </div>
  );
}
