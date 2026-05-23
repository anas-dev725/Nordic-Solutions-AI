import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Coffee,
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  ArrowRight,
  User,
  Mail,
  Building,
  Terminal,
  FileText
} from 'lucide-react';

interface Props {
  language: 'da' | 'en';
  theme: 'sand' | 'slate' | 'sage';
}

interface CalendarDay {
  dateString: string; // YYYY-MM-DD
  dayNameDa: string;
  dayNameEn: string;
  dayNumber: number;
  monthNameDa: string;
  monthNameEn: string;
}

export function MeetingScheduler({ language, theme }: Props) {
  const isDa = language === 'da';
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [meetingType, setMeetingType] = useState<'teams' | 'copenhagen'>('teams');
  
  // Client details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedDetails, setConfirmedDetails] = useState<any>(null);

  const [days, setDays] = useState<CalendarDay[]>([]);

  // Pre-generate next 6 available weekdays (skipping Sunday)
  useEffect(() => {
    const list: CalendarDay[] = [];
    let current = new Date();
    current.setDate(current.getDate() + 1); // Start tomorrow

    const daysDa = ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"];
    const daysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsDa = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
    const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    while (list.length < 6) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0) { // Skip Sundays
        const yyyy = current.getFullYear();
        const mm = String(current.getMonth() + 1).padStart(2, '0');
        const dd = String(current.getDate()).padStart(2, '0');
        
        list.push({
          dateString: `${yyyy}-${mm}-${dd}`,
          dayNameDa: daysDa[dayOfWeek],
          dayNameEn: daysEn[dayOfWeek],
          dayNumber: current.getDate(),
          monthNameDa: monthsDa[current.getMonth()],
          monthNameEn: monthsEn[current.getMonth()]
        });
      }
      current.setDate(current.getDate() + 1);
    }

    setDays(list);
    setSelectedDay(list[0].dateString);
    setSelectedTime('10:00');
  }, []);

  const times = ["09:00", "10:30", "13:00", "14:30", "16:00"];

  const handleBookMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);

    // Simulate database booking write pipeline with timeout
    setTimeout(() => {
      const selectedDayObj = days.find(d => d.dateString === selectedDay);
      const formattedDate = selectedDayObj 
        ? `${selectedDayObj.dayNameDa} d. ${selectedDayObj.dayNumber}. ${selectedDayObj.monthNameDa}`
        : selectedDay;
      const formattedDateEn = selectedDayObj 
        ? `${selectedDayObj.dayNameEn}, ${selectedDayObj.monthNameEn} ${selectedDayObj.dayNumber}`
        : selectedDay;

      const details = {
        name,
        email,
        company,
        date: isDa ? formattedDate : formattedDateEn,
        time: selectedTime,
        type: meetingType,
        notes
      };

      // Persist locally
      localStorage.setItem('nordic_active_meeting', JSON.stringify(details));

      setConfirmedDetails(details);
      setIsSubmitting(false);
      setBookingConfirmed(true);
    }, 1200);
  };

  const getThemeColors = () => {
    switch (theme) {
      case 'sand':
        return {
          cardBg: 'bg-white border-[#E5DFD3] text-[#0F1210]',
          activeDay: 'bg-[#0F1210] text-[#FAF9F6] border-[#0F1210]',
          inactiveDay: 'bg-[#FAF9F6] border-[#E5DFD3] text-current hover:border-neutral-400',
          btn: 'bg-[#0F1210] hover:bg-[#FAB319] hover:text-[#0F1210] text-white',
          input: 'bg-[#FAF9F6] border-[#E5DFD3] text-[#0F1210] focus:border-[#0F1210]'
        };
      case 'sage':
        return {
          cardBg: 'bg-[#121215] border-white/5 text-[#EFECE6]',
          activeDay: 'bg-[#FFA31A] text-[#0C0C0E] border-[#FFA31A]',
          inactiveDay: 'bg-[#16161C] border-white/5 text-current hover:bg-[#1C1C24]',
          btn: 'bg-[#FAF8F5] hover:bg-[#FFA31A] text-[#0C0C0E]',
          input: 'bg-[#16161C] border-white/5 text-white focus:border-[#FFA31A]'
        };
      case 'slate':
      default:
        return {
          cardBg: 'bg-[#0F1012] border-white/5 text-[#F2F0EC]',
          activeDay: 'bg-[#FAB319] text-[#080809] border-[#FAB319]',
          inactiveDay: 'bg-[#151619] border-white/5 text-current hover:bg-[#1E2023]',
          btn: 'bg-[#FAB319] hover:bg-[#FFC107] text-[#080809]',
          input: 'bg-[#151619] border-white/5 text-white focus:border-[#FAB319]'
        };
    }
  };

  const c = getThemeColors();

  return (
    <div id="scheduler" className={`p-6 sm:p-10 rounded-3xl border ${c.cardBg} relative overflow-hidden transition-all duration-300`}>
      {/* Visual background pattern glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-radial from-[#FAB319]/5 to-transparent filter blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!bookingConfirmed ? (
          <motion.div
            key="scheduler-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Header info */}
            <div className="space-y-2 border-b border-current/[0.04] pb-6">
              <span className="text-[9px] font-mono tracking-widest text-[#FAB319] uppercase font-bold block">
                {isDa ? "Direkte Kalenderaftale" : "Instant Calendar Slot"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-current">
                {isDa ? "Book en 30-min Driftsrevision" : "Book Your 30-Minute Workflow Audit"}
              </h3>
              <p className="text-xs sm:text-sm opacity-70 leading-relaxed font-sans max-w-2xl">
                {isDa 
                  ? "Vælg din foretrukne dag og tidspunkt direkte nedenfor. Vi runder af med en konkret roadmap-plan for din virksomheds automationer."
                  : "Pick an available date and direct time-slot from our active calendar roster below to configure your technical footprint."}
              </p>
            </div>

            <form onSubmit={handleBookMeeting} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Date & Time Picker */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Day selector label */}
                <div className="space-y-3">
                  <label className="text-[10px] font-mono uppercase tracking-widest opacity-60 block">
                    {isDa ? "1. Vælg Dato (Hverdage)" : "1. Select Available Date"}
                  </label>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                    {days.map((day) => {
                      const isActive = selectedDay === day.dateString;
                      return (
                        <button
                          key={day.dateString}
                          type="button"
                          onClick={() => setSelectedDay(day.dateString)}
                          className={`p-3.5 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer border text-center ${
                            isActive ? c.activeDay : c.inactiveDay
                          }`}
                        >
                          <span className="text-[10px] uppercase font-mono tracking-wider opacity-60">
                            {isDa ? day.dayNameDa : day.dayNameEn}
                          </span>
                          <span className="text-lg font-display font-bold my-0.5">{day.dayNumber}</span>
                          <span className="text-[9px] font-mono tracking-tighter opacity-60">
                            {isDa ? day.monthNameDa : day.monthNameEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time picker list */}
                <div className="space-y-3">
                  <label className="text-[10px] font-mono uppercase tracking-widest opacity-60 block">
                    {isDa ? "2. Vælg Ledigt Tidspunkt (Copenhagen Time)" : "2. Select Time (Copenhagen Local Time)"}
                  </label>

                  <div className="flex flex-wrap gap-2.5">
                    {times.map((time) => {
                      const isActive = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`px-5 py-3 rounded-xl font-mono text-sm border font-medium transition-all cursor-pointer ${
                            isActive ? c.activeDay : c.inactiveDay
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Meeting types */}
                <div className="space-y-3">
                  <label className="text-[10px] font-mono uppercase tracking-widest opacity-60 block">
                    {isDa ? "3. Vælg Mødekanal" : "3. Choose Preferred Channel"}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMeetingType('teams')}
                      className={`p-4 rounded-xl border flex items-center gap-3 text-left transition-all cursor-pointer ${
                        meetingType === 'teams' ? 'border-[#FAB319] bg-[#FAB319]/5' : 'border-current/[0.05] hover:bg-current/[0.01]'
                      }`}
                    >
                      <Video className="w-5 h-5 text-[#FAB319]" />
                      <div>
                        <span className="block font-medium text-xs">Microsoft Teams / Google Meet</span>
                        <span className="block text-[10px] opacity-60">{isDa ? "Online videolink" : "Direct video invitation"}</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMeetingType('copenhagen')}
                      className={`p-4 rounded-xl border flex items-center gap-3 text-left transition-all cursor-pointer ${
                        meetingType === 'copenhagen' ? 'border-[#FAB319] bg-[#FAB319]/5' : 'border-current/[0.05] hover:bg-current/[0.01]'
                      }`}
                    >
                      <Coffee className="w-5 h-5 text-[#FAB319]" />
                      <div>
                        <span className="block font-medium text-xs">{isDa ? "Fysisk Kaffemøde i kbh" : "Physical Coffee in Copenhagen"}</span>
                        <span className="block text-[10px] opacity-60">{isDa ? "Vesterbrogade 12 office" : "Our offices at Vesterbro"}</span>
                      </div>
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Contact Details Input */}
              <div className="lg:col-span-5 space-y-5 border-t lg:border-t-0 lg:border-l border-current/[0.04] pt-6 lg:pt-0 lg:pl-8">
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 block">
                  {isDa ? "4. Dine Kontaktoplysninger" : "4. Contact Details"}
                </span>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono tracking-wider opacity-60 block uppercase">{isDa ? "Fulde navn *" : "Full Name *"}</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 opacity-40" />
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="f.eks. Mads Poulsen"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl text-xs border focus:outline-hidden ${c.input}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono tracking-wider opacity-60 block uppercase">{isDa ? "E-mailadresse *" : "Email Address *"}</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 opacity-40" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="mads@firma.dk"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl text-xs border focus:outline-hidden ${c.input}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono tracking-wider opacity-60 block uppercase">{isDa ? "Virksomhed" : "Company Name"}</label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-3.5 w-4 h-4 opacity-40" />
                      <input 
                        type="text" 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="f.eks. Odense Logistics ApS"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl text-xs border focus:outline-hidden ${c.input}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono tracking-wider opacity-60 block uppercase">{isDa ? "Særlige ønsker eller udfordring" : "Special Requests"}</label>
                    <textarea 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={isDa ? "Hvad er jeres primære manuelle flaskehals?" : "What is your main manual friction node?"}
                      rows={2}
                      className={`w-full px-4 py-3 rounded-xl text-xs border focus:outline-hidden resize-none ${c.input}`}
                    />
                  </div>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !name || !email}
                    className={`w-full py-4 rounded-xl font-display text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all duration-300 ${
                      (!name || !email) ? 'opacity-40 cursor-not-allowed' : ''
                    } ${c.btn}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                        {isDa ? "Sikrer ledigt slot..." : "Securing calendar slot..."}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {isDa ? "Bekræft og Book Møde" : "Schedule Meeting"}
                      </span>
                    )}
                  </button>
                </div>
              </div>

            </form>
          </motion.div>
        ) : (
          <motion.div
            key="scheduler-confirmation"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 max-w-lg mx-auto space-y-6"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-medium tracking-wide uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
                <Sparkles className="w-3.5 h-3.5" />
                {isDa ? "Møde Reserveret" : "Meeting Secured"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-current">
                {isDa ? "Din tid er sikret!" : "You are completely booked!"}
              </h3>
              <p className="text-xs sm:text-sm opacity-75 font-sans leading-relaxed">
                {isDa 
                  ? "Tusind tak for interessen. Vi har låst dit ledige slot og sendt en officiel kalenderinvitation med videolink og forberedelsesnoter til din mail."
                  : "Thank you for selecting us. We have secured your calendar slot and propagated a standard confirmation ticket directly to your email address."}
              </p>
            </div>

            {/* Structured Receipt style summary */}
            {confirmedDetails && (
              <div className="p-5 rounded-2xl border border-current/[0.08] bg-current/[0.01] text-left space-y-3.5 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-current/[0.04] pb-2 text-[9px] opacity-40 uppercase tracking-widest">
                  <span>MEETING SLIP RECEIPT</span>
                  <span>ID: NRD-{Math.floor(Math.random() * 89999 + 10000)}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-current/[0.04]">
                    <span className="opacity-50">{isDa ? "Dato" : "Selected Date"}</span>
                    <span className="font-semibold">{confirmedDetails.date}</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-current/[0.04]">
                    <span className="opacity-50">{isDa ? "Tidspunkt" : "Selected Time"}</span>
                    <span className="font-semibold">{confirmedDetails.time} (CET)</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-current/[0.04]">
                    <span className="opacity-50">{isDa ? "Mødetype" : "Meeting Style"}</span>
                    <span className="font-semibold uppercase tracking-wider text-[#FAB319]">
                      {confirmedDetails.type === 'teams' ? "Teams Online Video" : "In-Person Copenhagen Workspace"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="opacity-50">{isDa ? "Modtager" : "Attendee"}</span>
                    <span className="font-semibold">{confirmedDetails.name}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 select-none">
              <button
                type="button"
                onClick={() => {
                  // Book another meeting resets state
                  setBookingConfirmed(false);
                  setName('');
                  setEmail('');
                  setCompany('');
                  setNotes('');
                }}
                className="px-5 py-2.5 rounded-xl font-mono text-[10px] uppercase tracking-widest border border-current/[0.08] hover:bg-current/[0.02] text-current cursor-pointer"
              >
                {isDa ? "Book nyt slot" : "Schedule Another Slot"}
              </button>

              <a 
                href="https://calendar.google.com" 
                target="_blank" 
                rel="noreferrer"
                className={`px-5 py-2.5 rounded-xl font-mono text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${c.btn}`}
              >
                <span>Google Calendar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
