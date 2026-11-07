import { useState, useEffect, useRef, useCallback } from 'react'
import './index.css'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COURSE MODULES — DevOps & Scale Track
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const MODULES = [
  {
    id: 0,
    title: 'Core Mental Models',
    subtitle: 'The Restaurant Analogy: Understanding Servers, Traffic, and Bottlenecks from Scratch',
    duration: '45 min',
    lessons: 6,
    status: 'available',
    progress: 100,
    topics: [
      'Why "scaling" is just managing a busy restaurant',
      'Servers as kitchen stations — CPU, memory, and I/O explained simply',
      'What happens when 10,000 people order at once',
      'The queue, the waiter, and the chef — request lifecycle demystified',
      'Reading a basic architecture diagram like a floor plan',
      'Mental model: Throughput vs. Latency vs. Availability',
    ],
  },
  {
    id: 1,
    title: 'The Crash Anatomy',
    subtitle: 'Distributed Tracing & System Latency',
    duration: '1.5 hrs',
    lessons: 8,
    status: 'available',
    progress: 60,
    topics: [
      'What "distributed" actually means — following a request across services',
      'Tracing a single API call through 5 microservices',
      'Jaeger & OpenTelemetry — your detective toolkit',
      'Reading flame graphs without the PhD',
      'P50 vs P99 latency — why averages lie',
      'Identifying the slow service in a chain',
      'Structured logging that actually helps during an outage',
      'Lab: Trace a simulated production incident step-by-step',
    ],
  },
  {
    id: 2,
    title: 'Traffic Control',
    subtitle: 'Load Balancing & Reverse Proxies',
    duration: '2 hrs',
    lessons: 10,
    status: 'available',
    progress: 25,
    topics: [
      'Why one server can\'t handle everything — the case for load balancers',
      'Round-robin, least connections, and IP hash strategies',
      'NGINX as a reverse proxy — the gateway pattern',
      'Health checks — how load balancers know a server is dead',
      'Sticky sessions vs. stateless architecture',
      'TLS termination and why it matters',
      'Rate limiting at the edge — protecting your services',
      'Geographic routing and CDN integration',
      'Blue-green deployments through traffic splitting',
      'Lab: Configure NGINX to distribute traffic across 3 backends',
    ],
  },
  {
    id: 3,
    title: 'Resource Bottlenecks',
    subtitle: 'Connection Pools & Thread Starvation',
    duration: '1.5 hrs',
    lessons: 7,
    status: 'locked',
    progress: 0,
    topics: [
      'Database connections are expensive — why pooling exists',
      'Configuring PgBouncer for PostgreSQL connection management',
      'Thread pools explained — what happens when all workers are busy',
      'The deadly embrace: deadlocks in concurrent systems',
      'Memory leaks that slowly kill your production servers',
      'Monitoring resource exhaustion before the crash',
      'Lab: Simulate and fix a connection pool exhaustion scenario',
    ],
  },
  {
    id: 4,
    title: 'High Availability',
    subtitle: 'Circuit Breakers & Graceful Degradation',
    duration: '2 hrs',
    lessons: 9,
    status: 'locked',
    progress: 0,
    topics: [
      'The circuit breaker pattern — why Netflix invented it',
      'Open, half-open, closed states explained with real examples',
      'Implementing circuit breakers with resilience4j',
      'Bulkhead pattern — isolating failures to prevent cascading crashes',
      'Retry strategies: exponential backoff and jitter',
      'Graceful degradation — serving partial results beats serving errors',
      'Feature flags as a safety net during incidents',
      'Health endpoints and readiness probes in Kubernetes',
      'Final Lab: Build a resilient service that survives the CODE RED simulator',
    ],
  },
]

const NAV_LINKS = [
  { id: 'hero', label: 'Overview' },
  { id: 'syllabus', label: 'Syllabus' },
  { id: 'about', label: 'About' },
]

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HOOKS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* Scroll-triggered reveal */
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}

/* Active section tracker for nav highlighting */
function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sectionIds])

  return active
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SVG ICON COMPONENTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ChevronDown({ className = '', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function LockIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  )
}

function ExternalLink({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function MenuIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="15" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

/* Brand mark */
function BrandMark({ size = 28 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '7px',
        background: '#4F46E5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <line x1="12" y1="22" x2="12" y2="15.5" />
        <polyline points="22 8.5 12 15.5 2 8.5" />
      </svg>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   REVEAL WRAPPER — scroll-triggered entrance
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, isVisible] = useReveal(0.1)

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROGRESS CIRCLE COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ProgressCircle({ progress, size = 40, strokeWidth = 3 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  if (progress === 0) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `${strokeWidth}px solid #E5E7EB`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: '#D1D5DB',
        }}
      >
        <LockIcon size={14} />
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#4F46E5"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {progress === 100 ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <span style={{ fontSize: '0.5625rem', fontWeight: 700, color: '#4F46E5', letterSpacing: '-0.02em' }}>
            {progress}%
          </span>
        )}
      </div>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STATUS PILL
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function StatusPill({ status, progress }) {
  if (progress === 100) {
    return (
      <span style={{
        fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
        color: '#059669', background: '#ECFDF5', padding: '0.1875rem 0.5rem', borderRadius: '9999px',
        border: '1px solid #D1FAE5',
      }}>
        Complete
      </span>
    )
  }
  if (status === 'available' && progress > 0) {
    return (
      <span style={{
        fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
        color: '#4F46E5', background: '#EEF2FF', padding: '0.1875rem 0.5rem', borderRadius: '9999px',
        border: '1px solid #E0E7FF',
      }}>
        In Progress
      </span>
    )
  }
  if (status === 'locked') {
    return (
      <span style={{
        fontSize: '0.5625rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
        color: '#9CA3AF', background: '#F9FAFB', padding: '0.1875rem 0.5rem', borderRadius: '9999px',
        border: '1px solid #E5E7EB',
      }}>
        Locked
      </span>
    )
  }
  return null
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MODULE ACCORDION ITEM
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ModuleItem({ module, isOpen, onToggle }) {
  const isLocked = module.status === 'locked'
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        borderBottom: '1px solid #E5E7EB',
        background: hovered && !isLocked ? '#FAFBFF' : 'transparent',
        transition: 'background 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header row */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          textAlign: 'left',
          padding: '1.5rem 0.5rem',
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
          fontFamily: 'inherit',
        }}
        aria-expanded={isOpen}
      >
        <ProgressCircle progress={module.progress} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.25rem' }}>
            <span style={{
              fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: isLocked ? '#9CA3AF' : '#4F46E5',
            }}>
              Module {module.id}
            </span>
            <StatusPill status={module.status} progress={module.progress} />
          </div>
          <h3
            style={{
              fontSize: 'clamp(0.9375rem, 1.8vw, 1.125rem)',
              fontWeight: 650,
              letterSpacing: '-0.02em',
              color: isLocked ? '#C4C9D4' : '#111827',
              lineHeight: 1.35,
              marginBottom: '0.1875rem',
            }}
          >
            {module.title}
          </h3>
          <p
            style={{
              fontSize: '0.8125rem',
              color: isLocked ? '#D1D5DB' : '#6B7280',
              lineHeight: 1.5,
              maxWidth: '36rem',
            }}
          >
            {module.subtitle}
          </p>
        </div>

        {/* Desktop meta */}
        <div className="hidden sm:flex" style={{ alignItems: 'center', gap: '1.25rem', flexShrink: 0, marginRight: '0.25rem' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 500, color: '#9CA3AF', letterSpacing: '0.02em' }}>
              {module.lessons} lessons
            </span>
            <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 500, color: '#D1D5DB' }}>
              {module.duration}
            </span>
          </div>
        </div>

        <div
          style={{
            flexShrink: 0,
            color: isLocked ? '#E5E7EB' : '#9CA3AF',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.15s ease',
          }}
        >
          <ChevronDown size={18} />
        </div>
      </button>

      {/* Expanded topic list */}
      {isOpen && (
        <div
          style={{
            paddingBottom: '2rem',
            paddingLeft: 'clamp(1rem, 4vw, 4.25rem)',
            paddingRight: '0.5rem',
            animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {isLocked ? (
            <div
              style={{
                background: '#F9FAFB',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                padding: '2rem 1.5rem',
                textAlign: 'center',
              }}
            >
              <div style={{ color: '#D1D5DB', marginBottom: '0.625rem' }}>
                <LockIcon size={28} />
              </div>
              <p style={{ fontSize: '0.875rem', color: '#9CA3AF', fontWeight: 500 }}>
                Complete the previous modules to unlock this content.
              </p>
            </div>
          ) : (
            <div
              style={{
                background: '#F9FAFB',
                borderRadius: '14px',
                border: '1px solid #E5E7EB',
                padding: '1.5rem 1.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#4F46E5',
                }}>
                  What you'll learn
                </span>
                {/* Mobile meta fallback */}
                <span className="sm:hidden" style={{ fontSize: '0.6875rem', color: '#9CA3AF' }}>
                  {module.lessons} lessons · {module.duration}
                </span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {module.topics.map((topic, i) => {
                  const completed = i < Math.ceil(module.topics.length * (module.progress / 100))
                  return (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        fontSize: '0.8125rem',
                        lineHeight: 1.65,
                        color: completed ? '#374151' : '#6B7280',
                        padding: '0.5rem 0',
                        borderBottom: i < module.topics.length - 1 ? '1px solid #F3F4F6' : 'none',
                      }}
                    >
                      <span
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          border: completed ? 'none' : '1.5px solid #D1D5DB',
                          background: completed ? '#4F46E5' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: '3px',
                          flexShrink: 0,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {completed && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      <span style={{ fontWeight: completed ? 500 : 400 }}>{topic}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN APPLICATION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function App() {
  const [openModuleId, setOpenModuleId] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.id))

  const toggleModule = (id) => {
    setOpenModuleId((prev) => (prev === id ? null : id))
  }

  const scrollTo = useCallback((id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const offset = 72
      const y = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }, [])

  const totalLessons = MODULES.reduce((sum, m) => sum + m.lessons, 0)
  const completedModules = MODULES.filter((m) => m.progress === 100).length
  const overallProgress = Math.round(
    MODULES.reduce((sum, m) => sum + m.progress, 0) / MODULES.length
  )

  /* Close mobile menu on resize */
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileMenuOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>

      {/* ━━━━━━━━━━━━ NAVIGATION ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <div
          style={{
            maxWidth: '72rem',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '3.75rem',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <BrandMark size={28} />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#111827', letterSpacing: '-0.01em' }}>
                The Builder Protocol
              </span>
              <span style={{ fontSize: '0.6875rem', fontWeight: 500, color: '#D1D5DB' }}>
                /
              </span>
              <span style={{ fontSize: '0.6875rem', fontWeight: 500, color: '#9CA3AF' }}>
                learn
              </span>
            </div>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '0.25rem' }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  padding: '0.375rem 0.75rem',
                  fontSize: '0.8125rem',
                  fontWeight: activeSection === link.id ? 600 : 450,
                  color: activeSection === link.id ? '#4F46E5' : '#6B7280',
                  background: activeSection === link.id ? '#EEF2FF' : 'transparent',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'inherit',
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '0.75rem' }}>
            <a
              href="https://thebuilderprotocol.me"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.4375rem 1rem',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'white',
                background: '#4F46E5',
                borderRadius: '8px',
                border: 'none',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(79, 70, 229, 0.2)',
              }}
            >
              Open Workspace
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen((o) => !o)}
            style={{
              padding: '0.375rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#6B7280',
              borderRadius: '6px',
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div
            className="md:hidden"
            style={{
              padding: '0.75rem 1.5rem 1rem',
              borderTop: '1px solid #F3F4F6',
              animation: 'fadeIn 0.2s ease forwards',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.75rem' }}>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: activeSection === link.id ? 600 : 450,
                    color: activeSection === link.id ? '#4F46E5' : '#374151',
                    background: activeSection === link.id ? '#EEF2FF' : 'transparent',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                    transition: 'all 0.1s ease',
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <a
              href="https://thebuilderprotocol.me"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.375rem',
                padding: '0.625rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'white',
                background: '#4F46E5',
                borderRadius: '10px',
                border: 'none',
                textDecoration: 'none',
              }}
            >
              Open Workspace
              <ExternalLink size={13} />
            </a>
          </div>
        )}
      </header>

      {/* ━━━━━━━━━━━━ HERO SECTION ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="hero"
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: 'clamp(3rem, 8vw, 6rem) 1.5rem clamp(2.5rem, 6vw, 5rem)',
        }}
      >
        <div style={{ maxWidth: '44rem' }}>
          {/* Kicker */}
          <Reveal>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.3125rem 0.875rem',
                background: '#EEF2FF',
                borderRadius: '9999px',
                border: '1px solid #E0E7FF',
                marginBottom: '1.5rem',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4F46E5' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4F46E5' }}>
                DevOps &amp; Scale Track
              </span>
            </span>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.08}>
            <h1
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
                fontWeight: 750,
                letterSpacing: '-0.04em',
                lineHeight: 1.08,
                color: '#111827',
                marginBottom: '1.5rem',
              }}
            >
              Master the Architecture{' '}
              <br className="hidden sm:block" />
              of Scale.
            </h1>
          </Reveal>

          {/* Sub-headline */}
          <Reveal delay={0.16}>
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.1875rem)',
                lineHeight: 1.75,
                color: '#6B7280',
                maxWidth: '38rem',
                marginBottom: '2.5rem',
              }}
            >
              Acquire the core systems intelligence required to solve the CODE RED simulator
              outbreak—no prior DevOps experience required.
            </p>
          </Reveal>

          {/* Stats bar */}
          <Reveal delay={0.24}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 'clamp(1rem, 3vw, 2rem)',
                paddingTop: '1.75rem',
                borderTop: '1px solid #E5E7EB',
              }}
            >
              {[
                { value: '5', label: 'modules' },
                { value: String(totalLessons), label: 'lessons' },
                { value: '7.5', label: 'hours' },
              ].map((s, i) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 3vw, 2rem)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 750, color: '#111827', letterSpacing: '-0.03em' }}>{s.value}</span>
                    <span style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>{s.label}</span>
                  </div>
                  {i < 2 && <div style={{ width: '1px', height: '24px', background: '#E5E7EB' }} />}
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '1px', height: '24px', background: '#E5E7EB' }} />
                <span style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>
                  Beginner → Advanced
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━━━━━━━━━━ SYLLABUS TRACKER ━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="syllabus"
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '0 1.5rem 5rem',
        }}
      >
        {/* Section header */}
        <Reveal>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '0.25rem',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid #E5E7EB',
            }}
          >
            <div>
              <span style={{
                display: 'block',
                fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#4F46E5', marginBottom: '0.375rem',
              }}>
                Course Syllabus
              </span>
              <h2 style={{
                fontSize: 'clamp(1.375rem, 3vw, 1.875rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: '#111827',
                lineHeight: 1.2,
              }}>
                Interactive Learning Path
              </h2>
            </div>
            <div className="hidden sm:flex" style={{ alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#9CA3AF' }}>
                {completedModules} of {MODULES.length} complete
              </span>
              <div style={{ width: '100px', height: '4px', borderRadius: '9999px', background: '#F3F4F6', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${overallProgress}%`,
                    height: '100%',
                    borderRadius: '9999px',
                    background: '#4F46E5',
                    transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4F46E5', minWidth: '28px' }}>
                {overallProgress}%
              </span>
            </div>
          </div>
        </Reveal>

        {/* Module list */}
        <div>
          {MODULES.map((module) => (
            <ModuleItem
              key={module.id}
              module={module}
              isOpen={openModuleId === module.id}
              onToggle={() => toggleModule(module.id)}
            />
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━ FOUNDER PROFILE GRID ━━━━━━━━━━━━━━━━ */}
      <section
        id="about"
        style={{
          borderTop: '1px solid #E5E7EB',
          borderBottom: '1px solid #E5E7EB',
          background: '#F9FAFB',
        }}
      >
        <div
          style={{
            maxWidth: '72rem',
            margin: '0 auto',
            padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              alignItems: 'start',
            }}
          >
            {/* Founder card */}
            <Reveal>
              <div>
                <span style={{
                  display: 'block', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#4F46E5', marginBottom: '1.75rem',
                }}>
                  Your Instructor
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #4F46E5, #818CF8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      flexShrink: 0,
                    }}
                  >
                    AA
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.125rem', fontWeight: 700, color: '#111827',
                      letterSpacing: '-0.02em', lineHeight: 1.3,
                    }}>
                      Afsal Ahmed
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: '#6B7280' }}>
                      Founder, The Builder Protocol
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: '#4B5563' }}>
                  Systems engineer turned educator. I believe deeply that the most transformative
                  technical knowledge should never sit behind a paywall — it should be free,
                  rigorous, and beautifully structured. Every lesson in this track is designed
                  to build genuine understanding, not just familiarity.
                </p>
              </div>
            </Reveal>

            {/* Mission statement */}
            <Reveal delay={0.1}>
              <div>
                <span style={{
                  display: 'block', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#4F46E5', marginBottom: '1.75rem',
                }}>
                  The Mission
                </span>

                <h3 style={{
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#111827',
                  lineHeight: 1.35,
                  marginBottom: '1rem',
                }}>
                  The Builder Protocol<br />Research Journal
                </h3>

                <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: '#4B5563', marginBottom: '1.5rem' }}>
                  An open-access publication dedicated to demystifying the architecture of modern
                  software systems. We distill production-grade patterns — distributed tracing,
                  traffic management, resource optimization, fault tolerance — into clear,
                  structured curricula that anyone can follow from first principles.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {['Open Access', 'Research-Grade', 'First Principles', 'Production Patterns'].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                        color: '#4F46E5', background: 'white', padding: '0.25rem 0.625rem',
                        borderRadius: '6px', border: '1px solid #E0E7FF',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Track overview stats */}
            <Reveal delay={0.2}>
              <div>
                <span style={{
                  display: 'block', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#4F46E5', marginBottom: '1.75rem',
                }}>
                  Track Overview
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {[
                    { label: 'Total Modules', value: '5', detail: 'Beginner to advanced progression' },
                    { label: 'Hands-On Labs', value: '3', detail: 'Simulated production environments' },
                    { label: 'Completion Rate', value: '95%', detail: 'Learners who finish the track' },
                    { label: 'Prerequisites', value: 'None', detail: 'Start from absolute zero' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.875rem 1rem',
                        background: 'white',
                        borderRadius: '10px',
                        border: '1px solid #E5E7EB',
                        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#E0E7FF'
                        e.currentTarget.style.boxShadow = '0 1px 4px rgba(79, 70, 229, 0.06)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#E5E7EB'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#111827', lineHeight: 1.3 }}>
                          {stat.label}
                        </p>
                        <p style={{ fontSize: '0.6875rem', color: '#9CA3AF', lineHeight: 1.4 }}>
                          {stat.detail}
                        </p>
                      </div>
                      <span style={{ fontSize: '1.125rem', fontWeight: 750, color: '#4F46E5', letterSpacing: '-0.02em' }}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━ CALL TO ACTION ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: 'clamp(3.5rem, 7vw, 6rem) 1.5rem',
          textAlign: 'center',
        }}
      >
        <Reveal>
          <div style={{ maxWidth: '32rem', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 750,
                letterSpacing: '-0.03em',
                color: '#111827',
                lineHeight: 1.2,
                marginBottom: '0.875rem',
              }}
            >
              Ready to start building?
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#6B7280', marginBottom: '2rem' }}>
              Jump into the interactive workspace and begin your journey from fundamentals
              to production-grade systems architecture.
            </p>
            <a
              href="https://thebuilderprotocol.me"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.875rem 2rem',
                background: '#4F46E5',
                color: 'white',
                fontSize: '0.9375rem',
                fontWeight: 650,
                borderRadius: '10px',
                border: 'none',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 1px 3px rgba(79, 70, 229, 0.3), 0 4px 14px rgba(79, 70, 229, 0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#4338CA'
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(79, 70, 229, 0.4), 0 8px 28px rgba(79, 70, 229, 0.25)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#4F46E5'
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(79, 70, 229, 0.3), 0 4px 14px rgba(79, 70, 229, 0.15)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Open Interactive Workspace
              <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ━━━━━━━━━━━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer style={{ borderTop: '1px solid #E5E7EB' }}>
        <div
          style={{
            maxWidth: '72rem',
            margin: '0 auto',
            padding: '1.75rem 1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BrandMark size={20} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9CA3AF' }}>
              The Builder Protocol
            </span>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  fontSize: '0.8125rem',
                  color: '#9CA3AF',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.15s ease',
                  fontFamily: 'inherit',
                  padding: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#4F46E5' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#9CA3AF' }}
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://thebuilderprotocol.me"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.8125rem',
                color: '#4F46E5',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'opacity 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              Main Site
              <ExternalLink size={11} />
            </a>
          </nav>

          <p style={{ fontSize: '0.6875rem', color: '#D1D5DB' }}>
            © {new Date().getFullYear()} The Builder Protocol. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
