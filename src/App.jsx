import { useState } from 'react'
import './index.css'

/* ─── QUIZ DATA ───────────────────────────────────────── */
const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    track: 'AI & Agentic Systems',
    question: 'In LangGraph, what is the primary role of a "node" within a StateGraph?',
    options: [
      { id: 'a', text: 'A persistent database table that stores agent memory.' },
      { id: 'b', text: 'A Python function that reads from and writes to the shared agent state.' },
      { id: 'c', text: 'A routing rule that defines conditional branching logic only.' },
      { id: 'd', text: 'A remote API endpoint called by the orchestrator.' },
    ],
    correct: 'b',
  },
  {
    id: 'q2',
    track: 'Edge Architectures',
    question: 'Which Next.js 15 feature enables you to stream UI incrementally from the server before the full page is ready?',
    options: [
      { id: 'a', text: 'getServerSideProps with incremental revalidation.' },
      { id: 'b', text: 'React Suspense boundaries paired with async Server Components.' },
      { id: 'c', text: 'The new "use edge" directive placed at the top of any component.' },
      { id: 'd', text: 'API Routes returning ReadableStream objects.' },
    ],
    correct: 'b',
  },
  {
    id: 'q3',
    track: 'Serverless Infrastructure',
    question: 'What is the key architectural difference between Supabase and Neon in serverless Postgres deployments?',
    options: [
      { id: 'a', text: 'Supabase uses MySQL under the hood; Neon is pure Postgres.' },
      { id: 'b', text: 'Neon offers storage-compute separation with branch-per-PR; Supabase bundles Auth, Storage, and Realtime alongside Postgres.' },
      { id: 'c', text: 'They are functionally identical — just different pricing tiers.' },
      { id: 'd', text: 'Supabase is edge-only; Neon runs exclusively in a single region.' },
    ],
    correct: 'b',
  },
]

/* ─── COURSE TRACKS DATA ──────────────────────────────── */
const TRACKS = [
  {
    id: 'ai-agentic',
    accentColor: '#00F0FF',
    accentBg: 'rgba(0,240,255,0.06)',
    accentBorder: 'rgba(0,240,255,0.18)',
    iconPath: 'M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M12 18a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2 2 2 0 0 1-2-2v0a2 2 0 0 1 2-2z M2 12a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z M16 12a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z',
    status: 'LIVE NOW',
    title: 'AI & Agentic Systems',
    subtitle: 'LangGraph · LangChain · OpenAI',
    description: 'Engineer production-grade autonomous agents with stateful multi-step reasoning. Master LangGraph StateGraph, tool-calling loops, human-in-the-loop checkpoints, and multi-agent supervisor patterns.',
    tags: ['LangGraph', 'StateGraph', 'Tool Calling', 'RAG Pipelines', 'Agent Memory'],
    tagVariant: 'badge-cyan',
    modules: 14,
    hours: 38,
    level: 'Advanced',
  },
  {
    id: 'edge-arch',
    accentColor: '#9D4EDD',
    accentBg: 'rgba(157,78,221,0.06)',
    accentBorder: 'rgba(157,78,221,0.18)',
    iconPath: 'M13 2 3 14 12 14 11 22 21 10 12 10 13 2',
    status: 'TRENDING',
    title: 'Edge Architectures',
    subtitle: 'Next.js 15 · Bun · Cloudflare',
    description: 'Build sub-50ms globally distributed apps using Next.js 15 App Router, React Server Components, streaming SSR, and Bun native TypeScript runtime at the edge layer.',
    tags: ['Next.js 15', 'Bun Runtime', 'RSC', 'Streaming SSR', 'Edge Functions'],
    tagVariant: 'badge-amethyst',
    modules: 12,
    hours: 31,
    level: 'Intermediate',
  },
  {
    id: 'serverless-infra',
    accentColor: '#00FF80',
    accentBg: 'rgba(0,255,128,0.05)',
    accentBorder: 'rgba(0,255,128,0.15)',
    iconPath: 'M3 5v14 M21 5v14 M3 12h18',
    status: 'NEW BATCH',
    title: 'Serverless Infrastructure',
    subtitle: 'Supabase · Neon · Drizzle ORM',
    description: 'Design zero-ops data layers with branching Postgres databases, realtime subscriptions, row-level security, and type-safe query builders that scale from prototype to production overnight.',
    tags: ['Supabase', 'Neon Postgres', 'Drizzle ORM', 'RLS Policies', 'Realtime'],
    tagVariant: 'badge-green',
    modules: 10,
    hours: 26,
    level: 'Intermediate',
  },
]

/* ─── STATS ───────────────────────────────────────────── */
const STATS = [
  { value: '2,400+', label: 'Active Builders' },
  { value: '36', label: 'Protocol Modules' },
  { value: '95%', label: 'Completion Rate' },
  { value: '4.9/5', label: 'Builder Rating' },
]

/* ─── MAIN APP ────────────────────────────────────────── */
export default function App() {
  const [activeNav, setActiveNav] = useState('curriculum')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [currentQ, setCurrentQ] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)

  const [certName, setCertName] = useState('')
  const [certIssued, setCertIssued] = useState(false)

  const totalQ = QUIZ_QUESTIONS.length
  const question = QUIZ_QUESTIONS[currentQ]

  const handleOptionSelect = (optId) => {
    if (!submitted) setSelectedOption(optId)
  }

  const handleSubmitAnswer = () => {
    if (!selectedOption) return
    if (selectedOption === question.correct) setScore((s) => s + 1)
    setSubmitted(true)
  }

  const handleNextQuestion = () => {
    if (currentQ + 1 >= totalQ) {
      setQuizComplete(true)
    } else {
      setCurrentQ((q) => q + 1)
      setSelectedOption(null)
      setSubmitted(false)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQ(0)
    setSelectedOption(null)
    setSubmitted(false)
    setScore(0)
    setQuizComplete(false)
    setCertIssued(false)
    setCertName('')
  }

  const optionStyle = (optId) => {
    if (!submitted) {
      return selectedOption === optId
        ? { border: '1px solid rgba(0,240,255,0.5)', background: 'rgba(0,240,255,0.07)', color: 'white' }
        : { border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.7)' }
    }
    if (optId === question.correct) return { border: '1px solid rgba(0,255,128,0.5)', background: 'rgba(0,255,128,0.08)', color: '#00FF80' }
    if (optId === selectedOption) return { border: '1px solid rgba(255,80,80,0.5)', background: 'rgba(255,80,80,0.08)', color: '#FF5050' }
    return { border: '1px solid rgba(255,255,255,0.05)', background: 'transparent', color: 'rgba(255,255,255,0.3)' }
  }

  const scrollTo = (id) => {
    setActiveNav(id)
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const navLinks = [
    { id: 'curriculum', label: '// Curriculum' },
    { id: 'tracks', label: '// Tracks' },
    { id: 'quiz', label: '// Quiz' },
    { id: 'certificate', label: '// Certificate' },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#05070B' }}>

      {/* ─── NAV ──────────────────────────────────────────── */}
      <header className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Brand */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#00F0FF' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#00F0FF' }} />
              </span>
              <span className="font-mono font-bold tracking-widest glow-text-cyan hidden sm:block" style={{ color: '#00F0FF', fontSize: '0.65rem', letterSpacing: '0.12em' }}>
                THE BUILDER PROTOCOL
              </span>
              <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>//</span>
              <span className="font-mono font-semibold tracking-widest" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.65rem' }}>
                LEARN
              </span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`nav-${link.id}`}
                  onClick={() => scrollTo(link.id)}
                  className={`nav-link ${activeNav === link.id ? 'active' : ''}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2">
              <button id="nav-verify-cert" onClick={() => scrollTo('certificate')} className="btn-amethyst" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                Verify Certificate
              </button>
              <button id="nav-student-portal" onClick={() => scrollTo('curriculum')} className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                Student Portal
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="md:hidden p-2 rounded-md"
              style={{ color: 'rgba(255,255,255,0.6)' }}
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex flex-col gap-1 mb-3">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`nav-link text-left px-2 ${activeNav === link.id ? 'active' : ''}`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => scrollTo('certificate')} className="btn-amethyst flex-1 justify-center" style={{ fontSize: '0.75rem' }}>Verify Cert</button>
                <button onClick={() => scrollTo('curriculum')} className="btn-primary flex-1 justify-center" style={{ fontSize: '0.75rem' }}>Portal</button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section
        id="curriculum"
        className="relative grid-bg hero-gradient-overlay pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundSize: '64px 64px' }}
      >
        <div className="scan-line" />

        {/* Corner brackets */}
        <div className="absolute top-16 left-6 w-14 h-14 pointer-events-none" style={{ opacity: 0.25, borderTop: '1px solid #00F0FF', borderLeft: '1px solid #00F0FF' }} />
        <div className="absolute top-16 right-6 w-14 h-14 pointer-events-none" style={{ opacity: 0.25, borderTop: '1px solid #9D4EDD', borderRight: '1px solid #9D4EDD' }} />
        <div className="absolute bottom-6 left-6 w-14 h-14 pointer-events-none" style={{ opacity: 0.2, borderBottom: '1px solid #00F0FF', borderLeft: '1px solid #00F0FF' }} />
        <div className="absolute bottom-6 right-6 w-14 h-14 pointer-events-none" style={{ opacity: 0.2, borderBottom: '1px solid #9D4EDD', borderRight: '1px solid #9D4EDD' }} />

        <div className="max-w-7xl mx-auto relative">

          {/* Status badge */}
          <div className="flex justify-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.2)' }}>
              <span className="animate-pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: '#00F0FF' }} />
              <span className="label-mono" style={{ color: '#00F0FF' }}>Protocol v2.0 // Open Enrollment</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-6 animate-fade-in-up-delay-1">
            <h1 className="display-xl mb-5">
              <span className="block text-white">Master Modern</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #00F0FF 0%, #9D4EDD 55%, #00FF80 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Engineering Protocols
              </span>
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(139,158,199,0.85)' }}>
              A structured, project-first curriculum for builders shipping AI agents, edge deployments, and
              serverless data layers — from mental model to production pull request.
            </p>
          </div>

          {/* Tech sub-caption */}
          <div className="flex justify-center mb-10 animate-fade-in-up-delay-2">
            <div className="font-mono text-xs tracking-widest flex flex-wrap justify-center items-center gap-x-3 gap-y-1" style={{ color: 'rgba(255,255,255,0.22)' }}>
              {['LangGraph', 'Next.js 15', 'Bun', 'Supabase', 'Neon'].map((t, i, arr) => (
                <span key={t} className="flex items-center gap-3">
                  {t}
                  {i < arr.length - 1 && <span style={{ color: 'rgba(0,240,255,0.25)' }}>·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 animate-fade-in-up-delay-2">
            <button id="hero-explore-curriculum" onClick={() => scrollTo('tracks')} className="btn-primary w-full sm:w-auto justify-center" style={{ padding: '0.875rem 2.25rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Explore Curriculum
            </button>
            <button id="hero-verify-certificate" onClick={() => scrollTo('certificate')} className="btn-secondary w-full sm:w-auto justify-center" style={{ padding: '0.875rem 2.25rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
              </svg>
              Verify Certificate
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up-delay-3">
            {STATS.map((s) => (
              <div key={s.label} className="text-center py-4 px-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="font-extrabold mb-0.5" style={{ color: '#00F0FF', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
                  {s.value}
                </div>
                <div className="label-mono" style={{ color: 'rgba(139,158,199,0.65)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COURSE TRACKS ─────────────────────────────────── */}
      <section id="tracks" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <div className="section-header mb-12">
            <span className="label-mono" style={{ color: 'rgba(0,240,255,0.7)' }}>// 001</span>
            <h2 className="display-md text-white">Core Tracks</h2>
            <div className="section-header-line" />
            <span className="label-mono hidden sm:block" style={{ color: 'rgba(255,255,255,0.2)' }}>TRENDING_PROTOCOLS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRACKS.map((track) => (
              <article
                key={track.id}
                id={`track-${track.id}`}
                className="card-base group relative flex flex-col overflow-hidden"
                style={{ padding: 0, cursor: 'default' }}
              >
                {/* Accent top line */}
                <div className="h-[2px] w-full transition-opacity duration-300" style={{ background: track.accentColor, opacity: 0.75 }} />

                <div className="flex flex-col flex-1 p-6">
                  {/* Icon + status */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: track.accentBg, border: `1px solid ${track.accentBorder}`, color: track.accentColor }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        {track.id === 'ai-agentic' && (
                          <>
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
                          </>
                        )}
                        {track.id === 'edge-arch' && <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />}
                        {track.id === 'serverless-infra' && (
                          <>
                            <ellipse cx="12" cy="5" rx="9" ry="3" />
                            <path d="M3 5v5c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                            <path d="M3 10v5c0 1.66 4 3 9 3s9-1.34 9-3v-5" />
                            <path d="M3 15v4c0 1.66 4 3 9 3s9-1.34 9-3v-4" />
                          </>
                        )}
                      </svg>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: `${track.accentColor}12`, border: `1px solid ${track.accentColor}30` }}>
                      <span className="animate-pulse-dot w-1.5 h-1.5 rounded-full" style={{ background: track.accentColor }} />
                      <span className="tag-mono" style={{ color: track.accentColor, fontSize: '0.55rem' }}>{track.status}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg leading-tight mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.01em' }}>
                    {track.title}
                  </h3>
                  <p className="label-mono mb-4" style={{ color: track.accentColor, opacity: 0.7 }}>{track.subtitle}</p>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'rgba(139,158,199,0.8)' }}>
                    {track.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {track.tags.map((tag) => (
                      <span key={tag} className={`badge ${track.tagVariant}`}>{tag}</span>
                    ))}
                  </div>

                  <div className="divider mb-4" />

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="label-mono" style={{ color: 'rgba(139,158,199,0.55)' }}>{track.modules} modules</span>
                      <span className="label-mono" style={{ color: 'rgba(139,158,199,0.55)' }}>{track.hours}h content</span>
                    </div>
                    <span className="badge badge-slate">{track.level}</span>
                  </div>

                  {/* Hover CTA */}
                  <button
                    id={`enroll-${track.id}`}
                    className="mt-4 w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
                    style={{
                      background: `${track.accentColor}12`,
                      border: `1px solid ${track.accentColor}30`,
                      color: track.accentColor,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      opacity: 0,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0' }}
                  >
                    Enroll in Track →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="divider-cyan" />
      </div>

      {/* ─── QUIZ ──────────────────────────────────────────── */}
      <section id="quiz" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          <div className="section-header mb-10">
            <span className="label-mono" style={{ color: 'rgba(0,240,255,0.7)' }}>// 002</span>
            <h2 className="display-md text-white">Protocol Quiz</h2>
            <div className="section-header-line" />
          </div>

          <div className="masthead-section" style={{ padding: 0 }}>
            <div className="scan-line" />

            {/* Progress bar */}
            <div className="h-1 w-full rounded-t-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div
                className="h-full transition-all duration-700 ease-out"
                style={{
                  width: quizComplete ? '100%' : `${((currentQ + (submitted ? 1 : 0)) / totalQ) * 100}%`,
                  background: 'linear-gradient(90deg, #00F0FF, #9D4EDD)',
                }}
              />
            </div>

            <div className="p-6 sm:p-8">
              {!quizComplete ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`badge ${currentQ === 0 ? 'badge-cyan' : currentQ === 1 ? 'badge-amethyst' : 'badge-green'}`}>
                      {QUIZ_QUESTIONS[currentQ].track}
                    </span>
                    <span className="label-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>{currentQ + 1} / {totalQ}</span>
                  </div>

                  <p className="text-base sm:text-lg font-semibold leading-relaxed mb-7" style={{ color: 'rgba(255,255,255,0.9)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {QUIZ_QUESTIONS[currentQ].question}
                  </p>

                  <div className="flex flex-col gap-3 mb-7">
                    {QUIZ_QUESTIONS[currentQ].options.map((opt) => (
                      <button
                        key={opt.id}
                        id={`quiz-option-${opt.id}`}
                        onClick={() => handleOptionSelect(opt.id)}
                        disabled={submitted}
                        className="w-full flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-200"
                        style={{
                          ...optionStyle(opt.id),
                          cursor: submitted ? 'default' : 'pointer',
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold mt-0.5"
                          style={{
                            background: submitted && opt.id === question.correct
                              ? 'rgba(0,255,128,0.2)'
                              : submitted && opt.id === selectedOption
                              ? 'rgba(255,80,80,0.2)'
                              : selectedOption === opt.id
                              ? 'rgba(0,240,255,0.15)'
                              : 'rgba(255,255,255,0.06)',
                          }}
                        >
                          {opt.id.toUpperCase()}
                        </span>
                        <span className="text-sm leading-relaxed flex-1">{opt.text}</span>
                        {submitted && opt.id === question.correct && (
                          <svg className="flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00FF80" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                        {submitted && opt.id === selectedOption && opt.id !== question.correct && (
                          <svg className="flex-shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF5050" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>

                  {submitted && (
                    <div
                      className="flex items-center gap-3 p-4 rounded-xl mb-6"
                      style={{
                        background: selectedOption === question.correct ? 'rgba(0,255,128,0.07)' : 'rgba(255,80,80,0.07)',
                        border: `1px solid ${selectedOption === question.correct ? 'rgba(0,255,128,0.22)' : 'rgba(255,80,80,0.22)'}`,
                      }}
                    >
                      {selectedOption === question.correct ? (
                        <>
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00FF80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                          <span className="text-sm font-semibold" style={{ color: '#00FF80' }}>Correct! Solid protocol knowledge.</span>
                        </>
                      ) : (
                        <>
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FF5050" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                          <span className="text-sm font-semibold" style={{ color: '#FF5050' }}>Not quite — the correct answer is highlighted above.</span>
                        </>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="label-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      Score: {score} / {currentQ + (submitted ? 1 : 0)}
                    </span>
                    {!submitted ? (
                      <button
                        id="quiz-submit-answer"
                        onClick={handleSubmitAnswer}
                        disabled={!selectedOption}
                        className="btn-primary"
                        style={{ fontSize: '0.875rem', padding: '0.625rem 1.5rem', opacity: selectedOption ? 1 : 0.4, cursor: selectedOption ? 'pointer' : 'default' }}
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        id="quiz-next-question"
                        onClick={handleNextQuestion}
                        className="btn-primary"
                        style={{ fontSize: '0.875rem', padding: '0.625rem 1.5rem' }}
                      >
                        {currentQ + 1 >= totalQ ? 'See Results →' : 'Next Question →'}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* RESULTS */
                <div className="text-center py-4">
                  <div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                    style={{
                      background: score >= totalQ * 0.7 ? 'rgba(0,255,128,0.09)' : 'rgba(157,78,221,0.09)',
                      border: `2px solid ${score >= totalQ * 0.7 ? 'rgba(0,255,128,0.4)' : 'rgba(157,78,221,0.4)'}`,
                    }}
                  >
                    {score >= totalQ * 0.7 ? (
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00FF80" strokeWidth="2">
                        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                    ) : (
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#9D4EDD" strokeWidth="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="display-md text-white mb-2">
                    {score === totalQ ? 'Perfect Score!' : score >= totalQ * 0.7 ? 'Protocol Certified' : 'Keep Building'}
                  </h3>
                  <p className="text-base mb-2" style={{ color: 'rgba(139,158,199,0.8)' }}>
                    You answered <span className="font-bold" style={{ color: '#00F0FF' }}>{score} of {totalQ}</span> correctly.
                  </p>
                  <p className="text-sm mb-8" style={{ color: 'rgba(139,158,199,0.5)' }}>
                    {score >= totalQ * 0.7
                      ? 'You qualify for a Builder Protocol completion certificate.'
                      : 'Review the track materials and retake the quiz to qualify for certification.'}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button id="quiz-restart" onClick={handleRestartQuiz} className="btn-secondary" style={{ fontSize: '0.875rem', padding: '0.625rem 1.5rem' }}>
                      Retake Quiz
                    </button>
                    {score >= totalQ * 0.7 && (
                      <button id="quiz-go-to-cert" onClick={() => scrollTo('certificate')} className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.625rem 1.5rem' }}>
                        Generate Certificate →
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="divider-cyan" />
      </div>

      {/* ─── CERTIFICATE ───────────────────────────────────── */}
      <section id="certificate" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">

          <div className="section-header mb-10">
            <span className="label-mono" style={{ color: 'rgba(0,240,255,0.7)' }}>// 003</span>
            <h2 className="display-md text-white">Certificate</h2>
            <div className="section-header-line" />
          </div>

          {!certIssued ? (
            <div className="relative rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(157,78,221,0.2)' }}>
              <div className="h-[1px] w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(157,78,221,0.6), transparent)' }} />

              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(157,78,221,0.12)', border: '1px solid rgba(157,78,221,0.25)', color: '#9D4EDD' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Issue Completion Certificate</h3>
                    <p className="label-mono" style={{ color: 'rgba(139,158,199,0.55)' }}>Builder Protocol Academy // v2.0</p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(139,158,199,0.7)' }}>
                  Complete the Protocol Quiz with a passing score (≥ 70%) to generate your verifiable Builder Protocol
                  completion certificate. Enter your full name exactly as it should appear on the certificate.
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="cert-name-input" className="label-mono block mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      Full Name
                    </label>
                    <input
                      id="cert-name-input"
                      type="text"
                      className="input-field"
                      placeholder="e.g. Afsal Ahmed"
                      value={certName}
                      onChange={(e) => setCertName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && certName.trim() && setCertIssued(true)}
                    />
                  </div>
                  <button
                    id="issue-certificate-btn"
                    onClick={() => certName.trim() && setCertIssued(true)}
                    disabled={!certName.trim()}
                    className="btn-amethyst w-full justify-center"
                    style={{ padding: '0.75rem', fontSize: '0.875rem', opacity: certName.trim() ? 1 : 0.4, cursor: certName.trim() ? 'pointer' : 'default' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                    Generate Certificate
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* CERTIFICATE DISPLAY */
            <div
              id="certificate-display"
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0D1120 0%, #111827 50%, #0D1120 100%)',
                border: '1px solid rgba(0,240,255,0.22)',
                boxShadow: '0 0 60px rgba(0,240,255,0.07), 0 0 120px rgba(157,78,221,0.05)',
              }}
            >
              <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #00F0FF 30%, #9D4EDD 70%, transparent)' }} />

              {/* Corner ornaments */}
              <div className="absolute top-4 left-4 w-8 h-8" style={{ opacity: 0.4, borderTop: '1px solid #00F0FF', borderLeft: '1px solid #00F0FF' }} />
              <div className="absolute top-4 right-4 w-8 h-8" style={{ opacity: 0.4, borderTop: '1px solid #9D4EDD', borderRight: '1px solid #9D4EDD' }} />
              <div className="absolute bottom-4 left-4 w-8 h-8" style={{ opacity: 0.4, borderBottom: '1px solid #00F0FF', borderLeft: '1px solid #00F0FF' }} />
              <div className="absolute bottom-4 right-4 w-8 h-8" style={{ opacity: 0.4, borderBottom: '1px solid #9D4EDD', borderRight: '1px solid #9D4EDD' }} />

              <div className="px-8 py-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.2)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00F0FF' }} />
                  <span className="label-mono" style={{ color: '#00F0FF' }}>CERTIFICATE OF COMPLETION</span>
                </div>

                <p className="label-mono mb-3" style={{ color: 'rgba(139,158,199,0.45)' }}>This certifies that</p>

                <h2
                  className="font-extrabold mb-4"
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                    background: 'linear-gradient(135deg, #00F0FF 0%, #9D4EDD 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}
                >
                  {certName}
                </h2>

                <p className="label-mono mb-2" style={{ color: 'rgba(139,158,199,0.45)' }}>has successfully completed</p>
                <p className="font-bold text-xl text-white mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  The Builder Protocol Academy — Core Tracks
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <span className="badge badge-cyan">AI &amp; Agentic Systems</span>
                  <span className="badge badge-amethyst">Edge Architectures</span>
                  <span className="badge badge-green">Serverless Infrastructure</span>
                </div>

                <div className="divider mb-6" />

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs" style={{ color: 'rgba(139,158,199,0.4)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em' }}>
                  <span>ISSUED: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span className="hidden sm:block" style={{ color: 'rgba(0,240,255,0.25)' }}>·</span>
                  <span>learn.thebuilderprotocol.me</span>
                  <span className="hidden sm:block" style={{ color: 'rgba(0,240,255,0.25)' }}>·</span>
                  <span>PROTOCOL v2.0</span>
                </div>
              </div>

              <div className="h-[1px] w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(157,78,221,0.4), transparent)' }} />
            </div>
          )}

          {certIssued && (
            <div className="flex justify-center mt-6">
              <button
                id="reset-certificate"
                onClick={() => { setCertIssued(false); setCertName('') }}
                className="btn-secondary"
                style={{ fontSize: '0.875rem', padding: '0.625rem 1.5rem' }}
              >
                Issue Another Certificate
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────── */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 mt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: '#00F0FF' }} />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#00F0FF' }} />
            </span>
            <span className="font-mono font-bold tracking-widest" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.62rem' }}>
              THE BUILDER PROTOCOL // LEARN
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {['Curriculum', 'Tracks', 'Quiz', 'Certificate'].map((link) => (
              <a key={link} href="#" className="footer-link" style={{ fontSize: '0.75rem' }}>{link}</a>
            ))}
            <a href="https://thebuilderprotocol.me" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: '0.75rem', color: 'rgba(0,240,255,0.5)' }}>
              thebuilderprotocol.me ↗
            </a>
          </nav>

          <p className="label-mono" style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.6rem' }}>
            © {new Date().getFullYear()} The Builder Protocol
          </p>
        </div>
      </footer>
    </div>
  )
}
