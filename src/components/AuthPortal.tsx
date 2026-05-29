/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Check, 
  AlertCircle,
  Eye, 
  EyeOff, 
  LogOut, 
  Shield, 
  Cpu, 
  Activity, 
  TrendingUp, 
  Key,
  Globe,
  Headphones,
  CheckCircle2
} from 'lucide-react';
import { Language, Theme } from '../types';

interface AuthPortalProps {
  language: Language;
  theme: Theme;
  onBackToHome: () => void;
}

export function AuthPortal({ language, theme, onBackToHome }: AuthPortalProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Dashboard states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<{name: string, email: string} | null>(null);

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const strength = getPasswordStrength();

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Field validation
    if (!email) {
      setError(language === 'da' ? 'Venligst indtast din e-mailadresse.' : 'Please enter your email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(language === 'da' ? 'Ugyldig e-mailadresse format.' : 'Invalid email address format.');
      return;
    }
    if (!password) {
      setError(language === 'da' ? 'Venligst indtast din adgangskode.' : 'Please enter your password.');
      return;
    }
    if (activeTab === 'signup' && !name) {
      setError(language === 'da' ? 'Venligst udfyld dit navn.' : 'Please enter your name.');
      return;
    }
    if (activeTab === 'signup' && password.length < 6) {
      setError(language === 'da' ? 'Adgangskoden skal være mindst 6 tegn lang.' : 'Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    // Dynamic high-fidelity mock delay
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      
      const targetName = activeTab === 'signup' ? name : email.split('@')[0];
      setLoggedInUser({
        name: targetName.charAt(0).toUpperCase() + targetName.slice(1),
        email: email
      });

      setTimeout(() => {
        setIsLoggedIn(true);
        setIsSuccess(false);
      }, 1000);
    }, 1800);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setEmail('');
    setPassword('');
    setName('');
  };

  // Colors mapping for premium thematic visual cues
  const getThemeClasses = () => {
    switch (theme) {
      case 'sand':
        return {
          cardBg: 'bg-white border-[#E5DFD3] text-[#0F1210]',
          inputBg: 'bg-[#FAF9F6] border-[#E5DFD3] text-[#0F1210] focus:border-[#D97706]/70 focus:ring-1 focus:ring-[#D97706]/40',
          accentText: 'text-[#D97706]',
          accentBtn: 'bg-[#0F1210] text-[#FAF9F6] hover:bg-[#D97706] hover:text-white',
          secondaryBtn: 'border-[#E5DFD3] text-[#0F1210] hover:bg-[#FAF9F6]',
          badge: 'bg-[#FEF3C7] text-[#B45309] border-[#FAB319]/25',
          banner: 'bg-amber-50 border-amber-200/50 text-amber-800',
          divider: 'border-[#E5DFD3]'
        };
      case 'sage':
        return {
          cardBg: 'bg-[#121215]/90 border border-white/5 text-[#EFECE6]',
          inputBg: 'bg-[#16161C] border border-white/10 text-[#EFECE6] focus:border-[#FFA31A]/70 focus:ring-1 focus:ring-[#FFA31A]/40',
          accentText: 'text-[#FFA31A]',
          accentBtn: 'bg-[#FFA31A] text-[#0C0C0E] hover:bg-[#FFB74D]',
          secondaryBtn: 'border-white/10 text-[#EFECE6] hover:bg-white/5',
          badge: 'bg-[#16161C] text-[#FFA31A] border-[#FFA31A]/25',
          banner: 'bg-amber-500/10 border-amber-500/20 text-[#FFA31A]',
          divider: 'border-white/5'
        };
      case 'slate':
      default:
        return {
          cardBg: 'bg-[#0F1012]/90 border border-white/5 text-[#F2F0EC]',
          inputBg: 'bg-[#141517] border border-white/10 text-[#F2F0EC] focus:border-[#FAB319]/70 focus:ring-1 focus:ring-[#FAB319]/40',
          accentText: 'text-[#FAB319]',
          accentBtn: 'bg-[#FAB319] text-[#080809] hover:bg-[#FFC107]',
          secondaryBtn: 'border-white/10 text-[#F2F0EC] hover:bg-white/5',
          badge: 'bg-[#151619] text-[#FAB319] border-[#FAB319]/25',
          banner: 'bg-[#FAB319]/10 border-[#FAB319]/20 text-[#FAB319]',
          divider: 'border-white/5'
        };
    }
  };

  const tc = getThemeClasses();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 relative w-full flex flex-col min-h-[75vh]">
      
      {/* Absolute Decorative Halo */}
      <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-[0.04] ${
        theme === 'sand' ? 'bg-[#D97706]' : theme === 'sage' ? 'bg-[#FFA31A]' : 'bg-[#FAB319]'
      }`} />

      {/* Navigation & Action Header */}
      <div className="w-full flex justify-between items-center z-10 mb-8 pb-4 border-b border-current/[0.05]">
        <button 
          onClick={onBackToHome}
          className="group flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase transition-colors opacity-80 hover:opacity-100 cursor-pointer text-current"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-500" />
          <span>{language === 'da' ? 'Tilbage til forsiden' : 'Back to Home'}</span>
        </button>
        
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[10px] opacity-45 uppercase tracking-widest">
            {isLoggedIn ? 'Console Live Security v2.4' : 'Secure client authorization gateway'}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div 
            key="split-portal"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
          >
            {/* LEFT SPLIT PANEL: Vision, Branding & Telemetry Metrics */}
            <div className={`lg:col-span-5 p-8 rounded-3xl border flex flex-col justify-between relative overflow-hidden min-h-[420px] lg:min-h-[580px] ${
              theme === 'sand' 
                ? 'bg-[#FAF9F6] border-[#E5DFD3] text-[#0F1210]' 
                : 'bg-[#121215]/80 border-white/5 text-[#EFECE6]'
            }`}>
              
              {/* Background ambient lighting */}
              <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-amber-500/10 filter blur-3xl pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20 shadow-sm">
                    <Cpu className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider font-extrabold text-[#FAB319]">
                    Nordic Solutions AI
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight leading-[1.15]">
                    {language === 'da'
                      ? 'Den næste generation af nordiske kundesamtaler'
                      : 'The next generation of Nordic customer conversations'
                    }
                  </h3>
                  <p className="text-xs sm:text-sm opacity-75 leading-relaxed">
                    {language === 'da'
                      ? 'Log ind på administrationspanelet for at udrulle intelligente stemmeagenter, ændre workflows, og overvåge realtids-opkald direkte.'
                      : 'Sign in to access your administrative workspace, coordinate model templates, configure active webhooks, and buy custom local numbers.'
                    }
                  </p>
                </div>

                {/* Telemetry live status box */}
                <div className={`p-4 rounded-2xl border ${
                  theme === 'sand' ? 'bg-white border-[#E5DFD3]' : 'bg-neutral-950/40 border-white/5'
                } space-y-4`}>
                  <div className="flex items-center justify-between border-b border-current/[0.05] pb-2 text-[9px] font-mono opacity-50 uppercase">
                    <span>LIVE PIPELINE TELEMETRY</span>
                    <span className="flex items-center gap-1 text-emerald-500 font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      ONLINE
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] opacity-45 uppercase font-mono block">DK Accent Fidelity</span>
                      <span className="text-lg font-bold font-mono tracking-tight text-current">99.84%</span>
                    </div>
                    <div>
                      <span className="text-[10px] opacity-45 uppercase font-mono block">Median Ingress Latency</span>
                      <span className="text-lg font-bold font-mono tracking-tight text-current">&lt; 120ms</span>
                    </div>
                  </div>

                  {/* Speech bubble transcript */}
                  <div className="p-2 sm:p-3 rounded-xl bg-current/[0.02] border border-current/[0.04] flex items-center gap-2">
                    <Headphones className="w-4 h-4 shrink-0 text-amber-500 animate-pulse" />
                    <span className="font-mono text-[10px] italic opacity-85 truncate">
                      "Hej! Jeg ringer blot for at bekræfte din tilmeldte tid..."
                    </span>
                  </div>
                </div>

                {/* Benefit Points with Checkmarks */}
                <div className="space-y-3 pt-3">
                  {[
                    language === 'da' ? 'Ubegrænset fri adgang til 400+ neurale AI stemmer' : 'Unlimited developer access to 400+ neural voices',
                    language === 'da' ? 'Understøtter n8n, HubSpot & Twilio pipelines' : 'Robust n8n, HubSpot & Twilio workflow triggers',
                    language === 'da' ? 'Komplet GDPR-kompatibel datalagring i Danmark' : '100% GDPR-compliant data standards in Denmark'
                  ].map((value, checkIdx) => (
                    <div key={checkIdx} className="flex items-start gap-2.5 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="opacity-80">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer labels */}
              <div className="mt-8 pt-4 border-t border-current/[0.06] text-[10px] opacity-55 flex items-center justify-between font-mono">
                <span>SCANDINAVIAN MODERNISM</span>
                <span>COPENHAGEN, DK</span>
              </div>
            </div>

            {/* RIGHT SPLIT PANEL: Credentials Management & Authorization Portal */}
            <div className={`lg:col-span-7 p-6 sm:p-10 rounded-3xl border shadow-xl flex flex-col justify-between ${tc.cardBg}`}>
              <div>
                
                {/* Form header branding */}
                <div className="space-y-2 mb-6">
                  <h2 className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-current">
                    {activeTab === 'signin' 
                      ? (language === 'da' ? 'Log ind på AI konsol' : 'Log in to AI Console')
                      : (language === 'da' ? 'Opret ny kundekonto' : 'Register Customer Account')
                    }
                  </h2>
                  <p className="text-xs opacity-60">
                    {activeTab === 'signin' 
                      ? (language === 'da' ? 'Udfyld dit administrations-login for at få adgang' : 'Enter your credential assets for direct dashboard access.')
                      : (language === 'da' ? 'Begynd din gratis 14 dages sandkasseperiode med det samme' : 'Begin your complementary 14-day production sandbox experience in moments.')
                    }
                  </p>
                </div>

                {/* Tabs switcher selection */}
                <div className={`p-1 rounded-xl flex items-center gap-1 mb-6 bg-current/[0.04] border ${tc.divider}`}>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('signin'); setError(''); }}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all relative cursor-pointer ${
                      activeTab === 'signin' 
                        ? theme === 'sand' ? 'bg-[#0F1210] text-[#FAF9F6] shadow-sm' : 'bg-white/10 text-white shadow-sm'
                        : 'opacity-60 hover:opacity-100 text-current'
                    }`}
                  >
                    <span>{language === 'da' ? 'Eksisterende Medlem' : 'Sign In'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('signup'); setError(''); }}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all relative cursor-pointer ${
                      activeTab === 'signup' 
                        ? theme === 'sand' ? 'bg-[#0F1210] text-[#FAF9F6] shadow-sm' : 'bg-white/10 text-white shadow-sm'
                        : 'opacity-60 hover:opacity-100 text-current'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1">
                      {language === 'da' ? 'Ny Konto' : 'Register Workspace'}
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse animate-duration-1000" />
                    </span>
                  </button>
                </div>

                {/* Error panel handler */}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-start gap-2 text-xs"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Secure auth login portal inputs */}
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  
                  {/* Name field (for signup) */}
                  <AnimatePresence>
                    {activeTab === 'signup' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-[10px] font-mono uppercase tracking-wider opacity-60 mb-1.5">
                          {language === 'da' ? 'Fuldstændigt Navn' : 'Full Identity / Owner'}
                        </label>
                        <div className="relative font-sans text-xs">
                          <User className="absolute left-3 top-3 w-4 h-4 opacity-45" />
                          <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={language === 'da' ? 'f.eks. Magnus Nielsen' : 'e.g. Magnus Nielsen'}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl outline-hidden border ${tc.inputBg}`}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email field */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider opacity-60 mb-1.5">
                      {language === 'da' ? 'E-mailadresse' : 'Corporate Email Address'}
                    </label>
                    <div className="relative font-sans text-xs">
                      <Mail className="absolute left-3 top-3 w-4 h-4 opacity-45" />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="user@company.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl outline-hidden border ${tc.inputBg}`}
                      />
                    </div>
                  </div>

                  {/* Password input */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider opacity-60">
                        {language === 'da' ? 'Adgangskode' : 'Workspace Password'}
                      </label>
                      {activeTab === 'signin' && (
                        <button 
                          type="button" 
                          onClick={() => alert(language === 'da' ? 'Nulstilling sendt! Tjek din indbakke om få øjeblikke.' : 'Password reset instructions dispatched.')}
                          className="text-[9px] font-mono opacity-50 hover:opacity-100 hover:underline cursor-pointer"
                        >
                          {language === 'da' ? 'Nulstil kode?' : 'Forgot passcode?'}
                        </button>
                      )}
                    </div>
                    <div className="relative font-sans text-xs">
                      <Lock className="absolute left-3 top-3 w-4 h-4 opacity-45" />
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-10 py-2.5 rounded-xl outline-hidden border ${tc.inputBg}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* SignUp password indicators */}
                    {activeTab === 'signup' && password && (
                      <div className="space-y-1.5 pt-2">
                        <div className="flex justify-between text-[9px] font-mono uppercase opacity-55">
                          <span>{language === 'da' ? 'Skaleret Styrke:' : 'Complexity rating:'}</span>
                          <span>
                            {strength === 0 && (language === 'da' ? 'Svag' : 'Weak')}
                            {strength === 1 && (language === 'da' ? 'Middel' : 'Moderate')}
                            {strength === 2 && (language === 'da' ? 'Stærk' : 'Good')}
                            {strength >= 3 && (language === 'da' ? 'Uigennemtrængelig' : 'Bulletproof')}
                          </span>
                        </div>
                        <div className="flex gap-1 h-1 bg-current/[0.04] rounded-full overflow-hidden">
                          {Array.from({ length: 4 }).map((_, stepIdx) => (
                            <div 
                              key={stepIdx} 
                              className="flex-1 h-full rounded-full transition-all duration-300"
                              style={{
                                backgroundColor: stepIdx < strength 
                                  ? strength <= 1 ? '#EF4444' : strength <= 2 ? '#FAB319' : '#10B981'
                                  : 'rgba(255, 255, 255, 0.05)'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Authorization dynamic submit trigger */}
                  <button
                    type="submit"
                    disabled={loading || isSuccess}
                    className={`w-full mt-2 py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-[10px] sm:text-[11px] flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer ${tc.accentBtn}`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-1 text-current" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>{language === 'da' ? 'Dekrypterer licens...' : 'Authenticating...'}</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500 animate-bounce" />
                        <span>{language === 'da' ? 'Konsol ulåst!' : 'Console Unlocked!'}</span>
                      </>
                    ) : (
                      <>
                        <span>{activeTab === 'signin' ? (language === 'da' ? 'Åben AI administrationspanel' : 'Unlock Workspace Console') : (language === 'da' ? 'Opret Ny Licens' : 'Activate 14-day Sandbox')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className={`my-5 flex items-center justify-between text-[9px] font-mono uppercase opacity-30 ${tc.divider}`}>
                  <span className="w-1/4 border-b" />
                  <span>{language === 'da' ? 'Forenklet Log på' : 'Third-Party Keys'}</span>
                  <span className="w-1/4 border-b" />
                </div>

                {/* Third-party Oauth indicators */}
                <div className="grid grid-cols-3 gap-3">
                  {['Google', 'Microsoft', 'GitHub'].map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      onClick={() => alert(`Connect custom OAuth validation credentials via Settings layout.`)}
                      className={`py-2 px-3 border rounded-xl text-[9px] font-mono tracking-wide flex items-center justify-center gap-1 transition-all duration-300 hover:scale-[1.01] cursor-pointer ${tc.secondaryBtn}`}
                    >
                      <span className="opacity-85">{provider}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* GDPR-friendly standard */}
              <p className="text-[9px] opacity-40 text-center leading-relaxed mt-6 pt-4 border-t border-current/[0.04]">
                {language === 'da'
                  ? 'Ved at logge ind bekræfter du vores GDPR-kompatible danske databehandleraftale (DPA).'
                  : 'By authenticating, you confirm compliance with our GDPR-compliant Danish Data Processing Terms.'
                }
              </p>
            </div>

          </motion.div>
        ) : (
          /* HIGH VALUE INTERACTIVE CUSTOMER CONTROL CENTER DASHBOARD (When fully logged in!) */
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className={`w-full rounded-3xl border p-6 sm:p-10 shadow-2xl z-10 space-y-8 ${tc.cardBg}`}
          >
            {/* Control Center Upper Panel */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6 border-current/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 text-xl font-bold font-sans">
                  {loggedInUser?.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono py-0.5 px-2 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      LIVE
                    </span>
                    <span className="font-mono text-[9px] opacity-40">ID: N-938210</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-current mt-1">
                    {language === 'da' ? `Hej, ${loggedInUser?.name}` : `Welcome back, ${loggedInUser?.name}`}
                  </h3>
                </div>
              </div>

              {/* Action items logout */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 border rounded-xl text-xs font-mono tracking-wider flex items-center gap-2 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-500 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{language === 'da' ? 'Log Ud' : 'Sign Out'}</span>
              </button>
            </div>

            {/* Dashboard Quick Statistics Layout (Bento Grid Style) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-2xl border border-current/[0.05] bg-current/[0.01] space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[10px] font-mono uppercase tracking-wider">Voice Calls (Mtd)</span>
                  <Activity className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-2xl font-bold font-mono text-current">2,482</p>
                <span className="text-[9px] text-emerald-500 font-mono">+12.4% vs last week</span>
              </div>

              <div className="p-4 rounded-2xl border border-current/[0.05] bg-current/[0.01] space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[10px] font-mono uppercase tracking-wider">AI Accuracy</span>
                  <Cpu className="w-4 h-4 text-amber-500 animate-pulse" />
                </div>
                <p className="text-2xl font-bold font-mono text-current">99.84%</p>
                <span className="text-[9px] text-amber-500 font-mono">Danish acoustic model</span>
              </div>

              <div className="p-4 rounded-2xl border border-current/[0.05] bg-current/[0.01] space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[10px] font-mono uppercase tracking-wider">Reclaimed Capital</span>
                  <TrendingUp className="w-4 h-4 text-[#FAB319]" />
                </div>
                <p className="text-2xl font-bold font-mono text-current">€48,220</p>
                <span className="text-[9px] text-[#FAB319] font-mono">Calibrated via n8n</span>
              </div>

            </div>

            {/* Sandbox Credentials & Secret Token Simulator */}
            <div className={`p-5 rounded-2xl border border-current/10 ${tc.banner} space-y-4`}>
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-500" />
                <h4 className="font-display font-semibold text-xs tracking-wider uppercase">
                  {language === 'da' ? 'Personlige API og Webhook Miljø' : 'Bespoke Integration Credentials'}
                </h4>
              </div>
              <p className="text-xs opacity-80 leading-relaxed">
                {language === 'da'
                  ? 'Brug disse midlertidige sandkassetokener til at koble din lokale telefonlinje, Elevenlabs API eller CRM-automatiseringer op via vores web API-gateway.'
                  : 'Configure these testing tokens inside your workspace setup to hook up dynamic incoming voice webhooks, customer CRM nodes, and triggers.'
                }
              </p>

              <div className="bg-neutral-950 text-neutral-300 p-3.5 rounded-xl border border-white/5 font-mono text-xs flex items-center justify-between group">
                <span className="truncate pr-4 text-xs tracking-wider">ns_auth_live_d8193fjh92k1ld87s3j9a11m</span>
                <button 
                  onClick={() => alert(language === 'da' ? 'Kopieret til udklipsholder!' : 'Copied credentials secret!')} 
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-bold text-[9px] uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
                >
                  {language === 'da' ? 'Kopier' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Call to action to build on top */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-current/5">
              <span className="text-[11px] opacity-55 text-center sm:text-left">
                {language === 'da' ? 'Har du brug for hjælp til at indstille din profil?' : 'Need advanced consulting on specialized custom voice integrations?'}
              </span>
              
              <button
                onClick={onBackToHome}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-bold uppercase transition-transform hover:scale-[1.01] cursor-pointer"
              >
                {language === 'da' ? 'Udforsk Flere Løsninger' : 'Configure Custom Flow'}
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
