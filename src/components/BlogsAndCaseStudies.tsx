import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  User, 
  Tag, 
  ExternalLink, 
  CheckCircle2, 
  Shield, 
  TrendingUp, 
  Award, 
  Sparkles,
  Zap,
  Building
} from 'lucide-react';

interface Article {
  id: string;
  type: 'casestudy' | 'blog';
  titleDa: string;
  titleEn: string;
  excerptDa: string;
  excerptEn: string;
  categoryDa: string;
  categoryEn: string;
  date: string;
  readTimeDa: string;
  readTimeEn: string;
  author: string;
  company?: string;
  metric?: string;
  metricLabelDa?: string;
  metricLabelEn?: string;
  contentDa: string[];
  contentEn: string[];
}

const articles: Article[] = [
  {
    id: "odense-logistics",
    type: "casestudy",
    titleDa: "Hvordan Odense Logistics ApS automatiserede 94% af udefra kommende fakturaer",
    titleEn: "How Odense Logistics ApS automated 94% of inbound freight invoices",
    excerptDa: "En dybdegående gennemgang af, hvordan en mellemstor fynsk logistikvirksomhed fjernede administrativt tidsspild og bogføringsfejl ved hjælp af skræddersyede AI-agenter.",
    excerptEn: "A comprehensive teardown of how a mid-sized Danish logistics agency eliminated database errors and manual entries using customized AI pipelines.",
    categoryDa: "Case Study // Logistik",
    categoryEn: "Case Study // Logistics",
    date: "2026-05-18",
    readTimeDa: "5 min læsning",
    readTimeEn: "5 min read",
    author: "Mads Poulsen, CTO",
    company: "Odense Logistics ApS",
    metric: "94%",
    metricLabelDa: "Automatisk bogført uden fejl",
    metricLabelEn: "Auto-posted with zero errors",
    contentDa: [
      "Odense Logistics ApS håndterer ugentligt over 1.200 fragtdokumenter, fortoldningsblanketter og underleverandør-fakturaer. Tidligere brugte administrationsteamet over 24 timer om ugen på manuelt at indtaste bilag, tjekke priser i Excel-ark og godkende dem i e-conomic.",
      "Vores løsning var at udvikle en asynkron asynkron AI-workflow-pipeline. Den lytter på fællesindbakken, udpakker automatisk PDF-filer, foretager intelligent OCR-match og validerer priser direkte mod igangværende indkøbsordrer på varelageret.",
      "Hvis priserne stemmer på øreniveau, poster AI'en automatisk fakturaen til godkendelse i e-conomic, arkiverer filen på en krypteret server og sender en færdig statusopdatering i Slack. Ved uoverensstemmelse sendes sagen til manuel godkendelse hos en medarbejder.",
      "Resultatet har været revolutionerende: Manuelt arbejde røg ned med 94%, behandlingshastigheden gik fra 4 dage til 40 sekunder, og teamet kan nu fokusere på strategisk udvikling i stedet for trivielt papirarbejde."
    ],
    contentEn: [
      "Odense Logistics ApS manages over 1,200 transit manifests, customs declarations, and sub-contractor invoices weekly. Previously, the administrative back-office spent more than 24 hours a week manually entering invoices, validating currency weights, and matching numbers inside e-conomic.",
      "We engineered a custom asynchronous cognitive workflow pipeline. This engine monitors the company's shared accounts payable email, extracts incoming PDF files, parses the tables, and runs a line-by-line comparison with historical pricing contracts in the cloud.",
      "If the values correlate perfectly, the agent post-balances the ledger inside e-conomic, structures the compliance receipt on their secure storage network, and pushes a complete confirmation digest into Slack. If a pricing anomaly is found, it selectively tickets a manager.",
      "The architectural intervention was a complete success: manually processed invoices decreased by 94%, lead processing latency dropped from 4 business days to 40 seconds, and the accounting department is now redeployed into strategic growth."
    ]
  },
  {
    id: "aarhus-clinic",
    type: "casestudy",
    titleDa: "Aarhus Clinic Hub frigjorde 42 timer om ugen med en AI Receptionist",
    titleEn: "Aarhus Clinic Hub reclaimed 42 hours weekly with custom AI Receptionist",
    excerptDa: "Hvordan en travl privatklinik i Midtjylland overførte alle indgående telefonopkald og tidsbestillinger til en flersproget og høflig AI Stemmeagent.",
    excerptEn: "How a high-traffic private medical clinic migrated front-desk phone queues to a cognitive, highly empathetic phone receptionist.",
    categoryDa: "Case Study // Sundhed",
    categoryEn: "Case Study // Healthcare",
    date: "2026-04-30",
    readTimeDa: "4 min læsning",
    readTimeEn: "4 min read",
    author: "Dr. Lene Jespersen",
    company: "Aarhus Clinic Hub",
    metric: "42t",
    metricLabelDa: "Ugentlige arbejdstimer frigjort",
    metricLabelEn: "Weekly employee hours saved",
    contentDa: [
      "Privatklinikken Aarhus Clinic Hub oplevede konstante forstyrrelser fra telefonopkald, når sygeplejersker og lægesekretærer forsøgte at behandle patienter. Over 60% af opkaldene omhandlede simple spørgsmål om åbningstider, adresse eller tidsbestilling.",
      "Vi designede en høflig AI Stemmeagent skræddersyet til klinikkens behov. Voice Agenten hilser og besvarer opkaldene øjeblikkeligt, forstår udtale og humør, tjekker klinikkens faglige kalender og booker ledige tider baseret på patientens præferencer.",
      "Den personlige datasikkerhed (GDPR) er fuldstændig sikret: Systemet anmoder høfligt om CPR-nummer og parrer det sikkert via krypteret API-opslag, mens samtalerne logges og gemmes i overensstemmelse med sundhedsloven.",
      "Siden premieren besvarer AI'en over 95% af opkaldene uden menneskelig hjælp, og telefontiden for sekretærerne er faldet til under 5%, hvilket har givet mere ro og bedre patientpleje på klinikken."
    ],
    contentEn: [
      "Aarhus Clinic Hub faced a constant influx of front-desk phone inquiries, interrupting staff during patient procedures. Over 60% of these inbound phone calls was dedicated to routine matters: clinic hours, address directions, or basic rescheduling queries.",
      "We deployed a compassionate, customized AI voice receptionist. Trained specifically on medical administrative terminology, the voice agent fields calls with conversational elegance, checks doctor slots in real-time, and writes bookings into scheduling tools.",
      "The pipeline is constructed with exceptional data isolation adhering to EU GDPR standards: patient files are accessed with secure authentication, logging only structural metadata on a local network database.",
      "Aarhus Clinic Hub now enjoys zero phone queue times for clients. The AI fields over 95% of incoming calls with absolute accuracy, reducing administrative task fatigue and allowing nurses to focus entirely on patients."
    ]
  },
  {
    id: "vesterbro-design",
    type: "casestudy",
    titleDa: "Automationskæde øgede lead-konvertering med 180% for Vesterbro.Design",
    titleEn: "Automation chain increased lead conversion by 180% at Vesterbro.Design",
    excerptDa: "Et kig under motorhjelmen på et københavnsk designbureau, der automatiserede deres prisoverslag og lead-kvalificering baseret på AI-skrabning.",
    excerptEn: "An inside look at how a Copenhagen-based creative agency automated custom quoting and lead classification using OpenAI pipelines.",
    categoryDa: "Case Study // Kreativ",
    categoryEn: "Case Study // Creative",
    date: "2026-03-12",
    readTimeDa: "3 min læsning",
    readTimeEn: "3 min read",
    author: "Søren Hald, Bureauchef",
    company: "Vesterbro.Design",
    metric: "+180%",
    metricLabelDa: "Stigning i lukning af aftaler",
    metricLabelEn: "Increase in deal close rates",
    contentDa: [
      "Vesterbro.Design modtog dagligt snesevis af løse forespørgsler om designbistand, men mistede ofte kunder til hurtigere konkurrenter, fordi det tog op til tre dage at udarbejde kvalificerede prisoverslag manuelt.",
      "Vi implementerede en kognitiv automationskæde. Når en potentiel kunde sender en besked, slår systemet med det samme virksomheden og deres nuværende website op, analyserer deres brand og udarbejder et fuldt specificeret, forhåndsgodkendt estimat på 4 minutter.",
      "Kunden modtager en personlig, smukt opsat PDF-mail med direkte mulighed for at booke et opstartsmøde. Sælgerne adviseres øjeblikkeligt via mobilsms med en detaljeret AI-brieffing om kundens forretning.",
      "Reaktionstiden faldt radikalt, og lead-konverteringen eksploderede med 180% inden for de første to måneder efter det arkitektoniske skifte."
    ],
    contentEn: [
      "Vesterbro.Design received numerous inbound project proposals every day but often lost promising contracts to faster competing agencies because drafting realistic design quotes manually took up to three business days.",
      "We implemented a cognitive sales automation pipeline. When a lead submits a brief, the system queries the customer's active website, summarizes their branding identity, and calculates a highly optimized project estimate in 4 minutes.",
      "The client instantly receives a beautiful, highly customized PDF quotation and a calendar Link to finalize work, while top design lead directors receive a structured briefing summary.",
      "By narrowing response lag times to minutes, conversion ratios jumped by 180% during the initial sixty days following deployment."
    ]
  },
  {
    id: "dialect-telephony",
    type: "blog",
    titleDa: "AI og danske dialekter: Hvordan vi sikrer at din stemmeagent forstår Jysk",
    titleEn: "AI & Danish Dialects: How our voice agents master regional speech patterns",
    excerptDa: "Dansk talesprog er spækket med nuancer og dialekter. Læs her, hvordan vores stemmemodeller trænes til at forstå alt fra jysk til fynsk og københavnsk.",
    excerptEn: "The Danish conversational landscape is filled with subtle phonetics. Read how our acoustic models adapt to diverse local dialects.",
    categoryDa: "Insights // Sprogteknologi",
    categoryEn: "Insights // Speech Technology",
    date: "2026-05-15",
    readTimeDa: "4 min læsning",
    readTimeEn: "4 min read",
    author: "Sarah Lind, AI Researcher",
    contentDa: [
      "Danmark er måske lille, men de vokale forskelle er markante. Mange udenlandske standardsystemer fejler totalt, når de møder jyske dialekter, fynsk eller hurtigt københavnsk.",
      "Hos Nordics Solutions arbejder vi med avanceret akustisk fintuning. Vi parrer Whisper-baserede transskriberingsmotorer med unikke dialekt-ordbøger og semantiske tolkere, der forstår hensigten bag ordene, uanset udtalen.",
      "Det handler ikke kun om at fange de præcise tekstbites. Det handler om kontekstforståelse. AI'en genkender faglige udtryk, synonymer og indskudte sætninger i realtid, hvilket reducerer tøven under opkaldet.",
      "Sikkerheden er også i højsædet: Ingen data overføres til uregulerede amerikanske servere uden for EU, hvilket sikrer 100% lokal overensstemmelse med europæiske retningslinjer."
    ],
    contentEn: [
      "Denmark is geographically compact, but its acoustic diversity is rich and complicated. Off-the-shelf voice integrations often fail when exposed to deep Jutlandic, Funen, or rapid urban Copenhagen slang.",
      "We address this through advanced acoustic fine-tuning. Our team pairs state-of-the-art transcription models with custom localization vocabularies and intent parsers that process semantics rather than just literal string sequences.",
      "It is not merely a matter of spelling. It is about cognitive context. The agent understands industry jargon, pauses, and rhetorical colloquialisms instantly, lowering overall latency and speech hesitation.",
      "Moreover, data security remains a core architecture priority: call logs are secured and parsed strictly within sovereign European data centers to uphold perfect GDPR trust."
    ]
  },
  {
    id: "gdpr-compliance-workflows",
    type: "blog",
    titleDa: "Hvorfor Zapier kan bringe din GDPR-overholdelse i fare (og hvad du skal gøre)",
    titleEn: "Why Zapier could be a GDPR liability (and how to fix it)",
    excerptDa: "Simple webværktøjer er nemme, men de kan være en tidsbombe for datasikkerheden. Lær hvorfor skræddersyet infrastruktur er sikrere.",
    excerptEn: "No-code bridges are easy to set up, but they create unmonitored data trails. Learn how bespoke, structured infrastructure guarantees compliance.",
    categoryDa: "Insights // Datasikkerhed",
    categoryEn: "Insights // Security",
    date: "2026-04-10",
    readTimeDa: "3 min læsning",
    readTimeEn: "3 min read",
    author: "Jonas Krogh, Compliance Lead",
    contentDa: [
      "Rigtigt mange danske virksomheder forbinder deres systemer via eksterne no-code platforme uden at tænke på, hvor eller hvordan data gemmes og transmitteres.",
      "Når følsomme kundedata, e-mails og telefonnumre sendes gennem udenlandske tredjeparts-servere, opstår der hurtigt brud på GDPR-lovgivningen og EU's strenge databeskyttelsesregler.",
      "Løsningen er at bygge skræddersyede, lukkede automationskæder (f.eks. ved hjælp af selv-hostede n8n-instanser, krypterede webhooks og dedikerede databaser), der kører på europæiske vpc-servere.",
      "Det beskytter ikke blot dine kunder, men sikrer dig mod svimlende bøder og giver dig fuldt herredømme over jeres datastrømme."
    ],
    contentEn: [
      "Countless modern businesses connect internal workflows via third-party no-code bridges without mapping exactly where sensitive corporate files are routed and buffered.",
      "When personal email logs, payroll records, and telephone data are pushed through unvetted international server centers, organizations risk massive compliance liabilities under EU data regulations.",
      "The secure alternative is implementing sovereign, self-contained automation pipelines (e.g., self-hosted n8n instances on European cloud nodes with direct end-to-end webhook validation).",
      "This pattern shields sensitive corporate assets, prevents database vulnerabilities, and ensures your infrastructure stands up to rigorous security audits."
    ]
  }
];

interface Props {
  language: 'da' | 'en';
  theme: 'sand' | 'slate' | 'sage';
  onBackToHome: () => void;
  onGoToRoadmap: () => void;
}

export function BlogsAndCaseStudies({ language, theme, onBackToHome, onGoToRoadmap }: Props) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'casestudy' | 'blog'>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const isDa = language === 'da';
  const c = getThemeColorClasses(theme);

  const filteredArticles = articles.filter(a => activeFilter === 'all' || a.type === activeFilter);
  const selectedArticle = articles.find(a => a.id === selectedArticleId);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 min-h-screen">
      {/* Dynamic Header */}
      <AnimatePresence mode="wait">
        {!selectedArticleId ? (
          <motion.div
            key="list-header"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 mb-12"
          >
            {/* Nav Back Link */}
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 opacity-65 hover:opacity-100 transition-opacity font-mono text-[10px] tracking-widest uppercase cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {isDa ? "Tilbage til forsiden" : "Back to showcase"}
            </button>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-current/10 pb-8">
              <div className="space-y-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-medium tracking-wide uppercase ${isDa ? "bg-[#FAB319]/10 text-[#FAB319]" : "bg-[#FAB319]/10 text-[#FAB319]"} border border-current/[0.05]`}>
                  <BookOpen className="w-3 h-3" />
                  {isDa ? "Kloge ord & Resultater" : "Knowledge & Milestones"}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight">
                  {isDa ? "Indsigter & Kundehistorier" : "Insights & Case Studies"}
                </h1>
                <p className="text-xs sm:text-sm opacity-70 font-sans max-w-xl">
                  {isDa 
                    ? "Dyk ned i vores dybdegående tekniske artikler og virkelige resultater med implementering af AI-agenter i danske virksomheder."
                    : "Explore deep-dives, strategic architectural guidelines, and peer-validated automation achievements from modern Nordic teams."}
                </p>
              </div>

              {/* Filters Tabs */}
              <div className="flex gap-2 p-1 rounded-xl bg-current/[0.02] border border-current/[0.05] self-start md:self-end text-xs shrink-0 select-none">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                    activeFilter === 'all' 
                      ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-bold' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {isDa ? "Alle" : "All"}
                </button>
                <button
                  onClick={() => setActiveFilter('casestudy')}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                    activeFilter === 'casestudy' 
                      ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-bold' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {isDa ? "Cases" : "Case Studies"}
                </button>
                <button
                  onClick={() => setActiveFilter('blog')}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                    activeFilter === 'blog' 
                      ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-bold' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {isDa ? "Blog" : "Blog"}
                </button>
              </div>
            </div>

            {/* Grid of cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {filteredArticles.map((article, index) => {
                const title = isDa ? article.titleDa : article.titleEn;
                const excerpt = isDa ? article.excerptDa : article.excerptEn;
                const category = isDa ? article.categoryDa : article.categoryEn;
                const readTime = isDa ? article.readTimeDa : article.readTimeEn;

                return (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className={`p-6 sm:p-8 rounded-2xl border ${c.card} flex flex-col justify-between group transition-all duration-300 hover:translate-y-[-4px] hover:border-[#FAB319]/40 relative overflow-hidden`}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FAB319]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-mono opacity-50">
                        <span className="uppercase tracking-widest text-[#FAB319] font-bold">{category}</span>
                        <span>{article.date}</span>
                      </div>

                      <h3 className="font-display font-medium text-lg leading-snug text-current group-hover:text-[#FAB319] transition-colors line-clamp-2">
                        {title}
                      </h3>

                      <p className="text-xs opacity-75 leading-relaxed line-clamp-3 font-sans">
                        {excerpt}
                      </p>
                    </div>

                    <div className="pt-6 border-t mt-6 border-current/[0.05] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono opacity-50">
                        <Clock className="w-3 h-3" />
                        <span>{readTime}</span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedArticleId(article.id);
                          window.scrollTo({ top: 0, behavior: 'instant' });
                        }}
                        className="text-xs font-mono font-bold uppercase tracking-wider text-[#FAB319] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {isDa ? "Læs Artikel" : "Read Article"}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="article-detail"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-8"
          >
            {/* Breadcrumb nav */}
            <button
              onClick={() => setSelectedArticleId(null)}
              className="inline-flex items-center gap-1.5 opacity-65 hover:opacity-100 transition-opacity font-mono text-[10px] tracking-widest uppercase cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              {isDa ? "Tilbage til oversigten" : "Back to articles"}
            </button>

            {/* Full article details layout */}
            {selectedArticle && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left primary body text column */}
                <div className="lg:col-span-8 space-y-8">
                  <div className="space-y-4 border-b border-current/10 pb-8">
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="text-[#FAB319] font-bold uppercase tracking-widest">
                        {isDa ? selectedArticle.categoryDa : selectedArticle.categoryEn}
                      </span>
                      <span className="opacity-30">•</span>
                      <span className="opacity-50">{selectedArticle.date}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight text-current leading-tight">
                      {isDa ? selectedArticle.titleDa : selectedArticle.titleEn}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs opacity-60">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{selectedArticle.author}</span>
                      </div>
                      <span className="opacity-30">•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{isDa ? selectedArticle.readTimeDa : selectedArticle.readTimeEn}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Paragraphs */}
                  <div className="space-y-6 text-sm sm:text-base leading-relaxed opacity-90 font-sans">
                    {(isDa ? selectedArticle.contentDa : selectedArticle.contentEn).map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Callout box */}
                  <div className="p-6 rounded-2xl bg-[#FAB319]/5 border border-[#FAB319]/20 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="space-y-1">
                      <h4 className="font-display font-semibold text-sm">
                        {isDa ? "Skal vi bygge noget lignende for dig?" : "Looking for similar operational gains?"}
                      </h4>
                      <p className="text-xs opacity-75">
                        {isDa 
                          ? "Få en komplet driftsgennemgang og et uforpligtende prisoverslag på under 24 timer."
                          : "Get an architecture audit and dedicated integration proposal within 24 hours."}
                      </p>
                    </div>

                    <button
                      onClick={onGoToRoadmap}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#FAB319] hover:bg-[#FFC107] text-[#080809] font-mono text-[10px] uppercase tracking-widest font-bold transition-all shadow-md shrink-0 cursor-pointer"
                    >
                      {isDa ? "Book nu" : "Launch Proposal"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right metadata / case study sidebar column */}
                <div className="lg:col-span-4 space-y-6">
                  {selectedArticle.type === 'casestudy' && (
                    <div className={`p-6 rounded-2xl border ${c.card} space-y-6`}>
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#FAB319] font-bold pb-3 border-b border-current/10">
                        <Award className="w-4 h-4" />
                        {isDa ? "RESULTAT MATRIX" : "PERFORMANCE METRICS"}
                      </div>

                      {/* Giant metric display */}
                      <div className="space-y-1">
                        <div className="text-5xl font-display font-bold text-current">{selectedArticle.metric}</div>
                        <p className="text-xs font-mono font-medium uppercase tracking-wide opacity-80 text-[#FAB319]">
                          {isDa ? selectedArticle.metricLabelDa : selectedArticle.metricLabelEn}
                        </p>
                      </div>

                      {/* Bullet points info */}
                      <div className="space-y-4 pt-3 text-xs">
                        <div className="space-y-1">
                          <span className="block opacity-40 font-mono text-[9px] uppercase tracking-widest">{isDa ? "KLIENT" : "PARTNER"}</span>
                          <span className="font-semibold block text-current">{selectedArticle.company}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="block opacity-40 font-mono text-[9px] uppercase tracking-widest">{isDa ? "INTEGRATIONS PERIODE" : "SETUP DURATION"}</span>
                          <span className="font-semibold block text-current">2 - 3 uger</span>
                        </div>
                        <div className="space-y-1">
                          <span className="block opacity-40 font-mono text-[9px] uppercase tracking-widest">{isDa ? "SIKKERHEDS STANDARD" : "SECURITY STANDARD"}</span>
                          <span className="font-semibold block text-current">EU GDPR Local Host</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={`p-6 rounded-2xl border ${c.card} space-y-4`}>
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#FAB319] font-bold pb-2 border-b border-current/10">
                      <Shield className="w-4 h-4" />
                      {isDa ? "Vores Garantier" : "Our Guarantees"}
                    </div>
                    <ul className="text-xs space-y-2.5 opacity-80 list-disc list-inside">
                      {isDa ? (
                        <>
                          <li>Krypteret dataoverførsel</li>
                          <li>Nul data-lagring i USA</li>
                          <li>Fast scope & Prisgaranti</li>
                          <li>1-til-1 dansk support</li>
                        </>
                      ) : (
                        <>
                          <li>Sovereign data hosting</li>
                          <li>Zero pipeline logs retained</li>
                          <li>Fixed budgetary pricing</li>
                          <li>1-on-1 dedicated engineer</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getThemeColorClasses(theme: 'sand' | 'slate' | 'sage') {
  switch (theme) {
    case 'sand':
      return {
        card: "bg-white border-[#E5DFD3] text-[#0F1210] shadow-sm",
        buttonPrimary: "bg-[#0F1210] hover:bg-[#718259] text-white"
      };
    case 'sage':
      return {
        card: "bg-[#17251C] border-[#A3B18A]/10 text-[#EBEFEB] shadow-md",
        buttonPrimary: "bg-[#A3B18A] hover:bg-[#A3B18A]/95 text-[#101913]"
      };
    case 'slate':
    default:
      return {
        card: "bg-[#141715]/40 border-white/5 text-[#F2F0EC] shadow-md",
        buttonPrimary: "bg-[#A3B18A] hover:bg-[#A3B18A]/91 text-[#0F1210]"
      };
  }
}
