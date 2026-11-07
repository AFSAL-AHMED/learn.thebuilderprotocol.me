import { useState, useEffect } from 'react'
import './index.css'


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

/* ─── ADMIN CREDENTIALS ───────────────────────────────── */
const ADMIN_CREDENTIALS = {
  username: 'afsal',
  password: 'itsmeadmin',
}

/* ─── INITIAL TECH DROPS (COLUMN 1: PUBLISH KNOWLEDGE) ── */
const INITIAL_TECH_DROPS = [
  {
    id: 'drop-1',
    title: 'Distributed Agent Swarms with LangGraph & Redis Pub/Sub',
    category: 'AI & Agentic',
    techStack: 'LangGraph · Redis Streams · Python 3.12 · FastAPI',
    authorName: 'Sarah Lin',
    authorHandle: '@sarah_ai',
    authorAvatar: 'SL',
    timeAgo: '2h ago',
    upvotes: 142,
    userUpvoted: false,
    description: 'A production blueprint for orchestrating 20+ autonomous agents with state checkpoints stored in Redis. Includes dynamic worker delegation, loop-break timeouts, and fault-tolerant failovers.',
    deepDive: `// Protocol Architecture:
1. Supervisor Agent receives user prompt, decomposes into subtasks via LangGraph StateGraph.
2. Worker Nodes subscribe to consumer groups on Redis Streams ("agent:tasks:stream").
3. State checkpointer serializes snapshots to Redis with 24h TTL for instant recovery.
4. Human-in-the-loop interrupts suspend graph state before high-privilege tool calls.`,
    tags: ['LangGraph', 'Redis', 'Multi-Agent', 'Checkpointer'],
    link: 'https://github.com/thebuilderprotocol/agent-swarms-redis',
  },
  {
    id: 'drop-2',
    title: 'Zero-Cold-Start In-Memory Vector Search with Rust & WASM',
    category: 'Edge & WASM',
    techStack: 'Rust · WebAssembly · Cloudflare Workers · HNSW',
    authorName: 'Vikram Joshi',
    authorHandle: '@vikram_systems',
    authorAvatar: 'VJ',
    timeAgo: '5h ago',
    upvotes: 98,
    userUpvoted: false,
    description: 'Embedded an HNSW vector index directly inside Cloudflare Workers using Rust compiled to WASM. Delivers sub-8ms latency for 50,000 document embeddings without external vector DB latency.',
    deepDive: `// Benchmark & Setup:
- Compiled hnsw-rs to wasm32-unknown-unknown with lto = "fat" and opt-level = 3.
- In-memory footprint: ~18MB for 50k 384-dim embeddings.
- Cache pre-warmed from Cloudflare KV during worker boot lifecycle.
- Query p99 latency: 7.2ms vs 120ms typical cloud vector DB HTTP lookups.`,
    tags: ['Rust', 'WASM', 'HNSW', 'Cloudflare', 'VectorSearch'],
    link: 'https://github.com/thebuilderprotocol/edge-wasm-vectors',
  },
  {
    id: 'drop-3',
    title: 'Autonomous Smart Contract Security Auditor on Claude 3.5 Sonnet',
    category: 'Security & Web3',
    techStack: 'TypeScript · AST Parser · Claude 3.5 · Foundry',
    authorName: 'Elena Rostova',
    authorHandle: '@elena_sec',
    authorAvatar: 'ER',
    timeAgo: '1d ago',
    upvotes: 215,
    userUpvoted: false,
    description: 'A verification pipeline that extracts execution graphs from Solidity ASTs, runs symbolic taint analysis, and feeds suspicious reentrancy or authorization flows to Claude with formal invariants.',
    deepDive: `// Verification Pipeline:
- AST Parsing: Slither + tree-sitter Solidity compiler bindings.
- Invariant Prompting: Injects protocol state invariants into Claude system context.
- Fuzzing Validation: Generates Foundry test files (.t.sol) to prove whether the exploit is executable.`,
    tags: ['Solidity', 'Security', 'Claude API', 'Foundry', 'AST'],
    link: 'https://github.com/thebuilderprotocol/solidity-claude-auditor',
  },
]

/* ─── INITIAL KNOWLEDGE REQUESTS (COLUMN 2: REQUEST KNOWLEDGE) ── */
const INITIAL_REQUESTS = [
  {
    id: 'req-1',
    domain: 'High-Performance Systems',
    targetTech: 'Zig · Low-Latency · SIMD · Memory Arenas',
    title: 'Building Deterministic Low-Latency Order Books in Zig',
    requesterName: 'Dan K.',
    requesterHandle: '@dan_fintech',
    requesterAvatar: 'DK',
    timeAgo: '3h ago',
    bountyVotes: 248,
    userRequested: false,
    difficulty: 'Hardcore',
    status: 'IN REVIEW',
    statusBadge: 'badge-amethyst',
    description: 'Looking for a comprehensive breakdown on creating a lock-free limit order book in Zig. Need ring buffer memory layout, cache-line alignment, and SIMD price-level matching with zero runtime allocations.',
    urgency: 'High Demand',
    contributorStatus: '2 builders drafting protocol guide',
  },
  {
    id: 'req-2',
    domain: 'AI Infra & LLMOps',
    targetTech: 'vLLM · DeepSeek R1 · Ray Clusters · FP8',
    title: 'Self-Hosting DeepSeek R1 671B on Multi-Node Kubernetes with vLLM',
    requesterName: 'Kai Vance',
    requesterHandle: '@kai_ai',
    requesterAvatar: 'KV',
    timeAgo: '5h ago',
    bountyVotes: 389,
    userRequested: false,
    difficulty: 'Advanced',
    status: 'OPEN BOUNTY',
    statusBadge: 'badge-cyan',
    description: 'Detailed tutorial wanted on configuring tensor & pipeline parallelism across 8x H100 GPU nodes for DeepSeek R1. Need real YAML configs for Ray, vLLM continuous batching, and RoCE v2 network tuning.',
    urgency: 'Extreme Demand',
    contributorStatus: 'Seeking verified instructor',
  },
  {
    id: 'req-3',
    domain: 'Cloud Native & Service Mesh',
    targetTech: 'Envoy Proxy · Rust Proxy-Wasm · Istio',
    title: 'Writing Custom WebAssembly Filter Plugins for Envoy & Istio',
    requesterName: 'Marcus T.',
    requesterHandle: '@marcus_devops',
    requesterAvatar: 'MT',
    timeAgo: '1d ago',
    bountyVotes: 164,
    userRequested: false,
    difficulty: 'Intermediate',
    status: 'LOOKING FOR AUTHOR',
    statusBadge: 'badge-green',
    description: 'A practical, end-to-end guide on building high-performance rate-limiting and JWT claims enrichment filters in Rust that compile to WASM and hot-reload in Envoy without restarting pods.',
    urgency: 'Moderate Demand',
    contributorStatus: 'Open for community submission',
  },
]

/* ─── STACK OVERFLOW FALLBACK DATA & DECODER ──────────── */
const decodeHtmlEntities = (str) => {
  if (!str) return ''
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&mdash;/g, '—')
}

const FALLBACK_SO_QUESTIONS = [
  {
    question_id: 71706064,
    title: 'React 18: Hydration failed because the initial UI does not match what was rendered on the server',
    score: 341,
    link: 'https://stackoverflow.com/questions/71706064/react-18-hydration-failed-because-the-initial-ui-does-not-match-what-was-render',
    answer_count: 70,
    is_answered: true,
    tags: ['reactjs', 'next.js', 'ssr', 'hydration'],
    owner: { display_name: 'auser', link: 'https://stackoverflow.com/users/12345/auser' },
    creation_date: 1648719200,
  },
  {
    question_id: 55151041,
    title: 'Window is not defined in Next.js React app',
    score: 331,
    link: 'https://stackoverflow.com/questions/55151041/window-is-not-defined-in-next-js-react-app',
    answer_count: 30,
    is_answered: true,
    tags: ['javascript', 'reactjs', 'next.js', 'server-side-rendering'],
    owner: { display_name: 'Leon Gaban', link: 'https://stackoverflow.com/users/209939/leon-gaban' },
    creation_date: 1552504800,
  },
  {
    question_id: 76085811,
    title: 'How to stream OpenAI responses in LangChain using Python FastAPI',
    score: 189,
    link: 'https://stackoverflow.com/questions/76085811/how-to-stream-openai-responses-in-langchain',
    answer_count: 14,
    is_answered: true,
    tags: ['python', 'langchain', 'openai-api', 'fastapi', 'streaming'],
    owner: { display_name: 'AI_Architect', link: 'https://stackoverflow.com/users/8912/ai-architect' },
    creation_date: 1682245000,
  },
  {
    question_id: 68181283,
    title: 'Supabase Row Level Security (RLS) policies with foreign key relations',
    score: 215,
    link: 'https://stackoverflow.com/questions/68181283/supabase-row-level-security-policies',
    answer_count: 19,
    is_answered: true,
    tags: ['postgresql', 'supabase', 'row-level-security', 'sql'],
    owner: { display_name: 'PostgresWizard', link: 'https://stackoverflow.com/users/45120/postgres-wizard' },
    creation_date: 1624971200,
  },
  {
    question_id: 77123901,
    title: 'How to compile Rust to WebAssembly with zero memory allocation in Cloudflare Workers',
    score: 174,
    link: 'https://stackoverflow.com/questions/77123901/rust-wasm-cloudflare-workers-zero-allocation',
    answer_count: 11,
    is_answered: true,
    tags: ['rust', 'webassembly', 'cloudflare-workers', 'wasm-bindgen'],
    owner: { display_name: 'KernelRust', link: 'https://stackoverflow.com/users/99104/kernelrust' },
    creation_date: 1694901200,
  },
]

/* ─── MAIN APP ────────────────────────────────────────── */
export default function App() {
  const [activeNav, setActiveNav] = useState('curriculum')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  // ─── COMMUNITY EXCHANGE STATE ──────────────────────────
  const [techDrops, setTechDrops] = useState(() => {
    try {
      const saved = localStorage.getItem('tbp_tech_drops')
      return saved ? JSON.parse(saved) : INITIAL_TECH_DROPS
    } catch {
      return INITIAL_TECH_DROPS
    }
  })

  const [knowledgeRequests, setKnowledgeRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('tbp_knowledge_requests')
      return saved ? JSON.parse(saved) : INITIAL_REQUESTS
    } catch {
      return INITIAL_REQUESTS
    }
  })

  const [exchangeSearch, setExchangeSearch] = useState('')
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL')
  const [activeDifficultyFilter, setActiveDifficultyFilter] = useState('ALL')
  const [showPublishForm, setShowPublishForm] = useState(false)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [expandedDropId, setExpandedDropId] = useState(null)
  const [claimedRequestIds, setClaimedRequestIds] = useState([])
  const [toast, setToast] = useState({ message: '', visible: false, type: 'cyan' })

  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('tbp_admin_session') === 'afsal_authenticated'
    } catch {
      return false
    }
  })
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [adminInputUser, setAdminInputUser] = useState('')
  const [adminInputPass, setAdminInputPass] = useState('')
  const [adminError, setAdminError] = useState('')

  const handleAdminLogin = (e) => {
    e.preventDefault()
    setAdminError('')
    if (
      adminInputUser.trim() === ADMIN_CREDENTIALS.username &&
      adminInputPass === ADMIN_CREDENTIALS.password
    ) {
      setIsAdmin(true)
      try {
        localStorage.setItem('tbp_admin_session', 'afsal_authenticated')
      } catch (err) {
        console.warn('Storage sync error', err)
      }
      setShowAdminModal(false)
      setAdminInputUser('')
      setAdminInputPass('')
      triggerToast('Welcome Afsal. Admin Command Mode Active.', 'green')
    } else {
      setAdminError('Invalid credentials. Access denied.')
    }
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
    try {
      localStorage.removeItem('tbp_admin_session')
    } catch (err) {
      console.warn('Storage sync error', err)
    }
    triggerToast('Logged out of Admin Mode', 'cyan')
  }

  const handleDeleteDrop = (id, title) => {
    if (!window.confirm(`[ADMIN] Delete Tech Drop: "${title}"?\nThis action cannot be undone.`)) return
    setTechDrops((prev) => prev.filter((d) => d.id !== id))
    triggerToast('Tech Drop purged by Admin', 'warning')
  }

  const handleDeleteRequest = (id, title) => {
    if (!window.confirm(`[ADMIN] Delete Knowledge Request: "${title}"?\nThis action cannot be undone.`)) return
    setKnowledgeRequests((prev) => prev.filter((r) => r.id !== id))
    triggerToast('Knowledge Request purged by Admin', 'warning')
  }

  const handleResetBoard = () => {
    if (!window.confirm('[ADMIN] Reset all community drops and requests back to default seeds?')) return
    setTechDrops(INITIAL_TECH_DROPS)
    setKnowledgeRequests(INITIAL_REQUESTS)
    try {
      localStorage.removeItem('tbp_tech_drops')
      localStorage.removeItem('tbp_knowledge_requests')
    } catch (err) {
      console.warn(err)
    }
    triggerToast('Community board reset to factory seeds', 'cyan')
  }

  // Form states
  const [newDrop, setNewDrop] = useState({
    title: '',
    category: 'AI & Agentic',
    techStack: '',
    authorName: '',
    authorHandle: '',
    description: '',
    deepDive: '',
    tags: '',
    link: '',
  })

  const [newRequest, setNewRequest] = useState({
    title: '',
    domain: 'AI Infra & Systems',
    targetTech: '',
    requesterName: '',
    requesterHandle: '',
    difficulty: 'Advanced',
    description: '',
  })

  const triggerToast = (message, type = 'cyan') => {
    setToast({ message, visible: true, type })
    setTimeout(() => {
      setToast({ message: '', visible: false, type: 'cyan' })
    }, 3500)
  }

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tbp_tech_drops', JSON.stringify(techDrops))
    } catch (e) {
      console.warn('Storage sync error', e)
    }
  }, [techDrops])

  useEffect(() => {
    try {
      localStorage.setItem('tbp_knowledge_requests', JSON.stringify(knowledgeRequests))
    } catch (e) {
      console.warn('Storage sync error', e)
    }
  }, [knowledgeRequests])

  // ─── STACK OVERFLOW API STATE ──────────────────────────
  const [exchangeMode, setExchangeMode] = useState('columns') // 'columns' | 'stackoverflow'
  const [soTag, setSoTag] = useState('next.js')
  const [soQuery, setSoQuery] = useState('')
  const [soQuestions, setSoQuestions] = useState(FALLBACK_SO_QUESTIONS)
  const [soLoading, setSoLoading] = useState(false)
  const [soError, setSoError] = useState(null)

  const fetchStackOverflowQuestions = async (tag, query = '') => {
    setSoLoading(true)
    setSoError(null)
    try {
      const qParam = query.trim() ? `&q=${encodeURIComponent(query.trim())}` : ''
      const tagParam = tag.trim() ? `&tagged=${encodeURIComponent(tag.trim())}` : ''
      const url = `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=votes&site=stackoverflow&pagesize=8${tagParam}${qParam}`

      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP error ${res.status}`)
      const data = await res.json()
      if (data && data.items && data.items.length > 0) {
        setSoQuestions(data.items)
      } else {
        setSoQuestions([])
      }
    } catch (err) {
      console.warn('Stack Exchange API request failed, using local cache:', err)
      const filteredFallback = FALLBACK_SO_QUESTIONS.filter((q) => {
        if (!tag && !query) return true
        const matchTag = tag ? q.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())) : true
        const matchQ = query ? q.title.toLowerCase().includes(query.toLowerCase()) : true
        return matchTag && matchQ
      })
      setSoQuestions(filteredFallback.length > 0 ? filteredFallback : FALLBACK_SO_QUESTIONS)
      setSoError('Live network limit reached — displaying verified protocol Q&A')
    } finally {
      setSoLoading(false)
    }
  }

  useEffect(() => {
    if (exchangeMode === 'stackoverflow') {
      fetchStackOverflowQuestions(soTag, soQuery)
    }
  }, [exchangeMode, soTag])

  const handleSearchSO = (e) => {
    e.preventDefault()
    fetchStackOverflowQuestions(soTag, soQuery)
  }

  const handleOpenStackOverflowForTech = (techQuery) => {
    setExchangeMode('stackoverflow')
    setSoQuery(techQuery)
    const lower = techQuery.toLowerCase()
    const normalizedTag = lower.includes('lang') ? 'langchain'
      : lower.includes('rust') ? 'rust'
      : lower.includes('supabase') ? 'supabase'
      : lower.includes('bun') ? 'bun'
      : lower.includes('next') ? 'next.js' : ''
    if (normalizedTag) setSoTag(normalizedTag)
    fetchStackOverflowQuestions(normalizedTag, techQuery)
    scrollTo('exchange')
    triggerToast(`Querying Stack Exchange API for "${techQuery}"...`, 'amethyst')
  }

  const handleUpvoteDrop = (id) => {
    setTechDrops((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const isUpvoted = d.userUpvoted
          return {
            ...d,
            upvotes: isUpvoted ? d.upvotes - 1 : d.upvotes + 1,
            userUpvoted: !isUpvoted,
          }
        }
        return d
      })
    )
    triggerToast('Tech Drop endorsed // Reputation recorded', 'cyan')
  }

  const handleUpvoteRequest = (id) => {
    setKnowledgeRequests((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const isRequested = r.userRequested
          return {
            ...r,
            bountyVotes: isRequested ? r.bountyVotes - 1 : r.bountyVotes + 1,
            userRequested: !isRequested,
          }
        }
        return r
      })
    )
    triggerToast('+1 Added to Content Request Demand Queue', 'amethyst')
  }

  const handleClaimRequest = (id, title) => {
    if (claimedRequestIds.includes(id)) return
    setClaimedRequestIds((prev) => [...prev, id])
    setKnowledgeRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'CLAIMED BY YOU',
              statusBadge: 'badge-green',
              contributorStatus: 'Draft in progress by you',
            }
          : r
      )
    )
    triggerToast(`Topic Claimed: "${title.slice(0, 28)}..." // Outline registered`, 'green')
  }

  const handlePublishSubmit = (e) => {
    e.preventDefault()
    if (!newDrop.title.trim() || !newDrop.techStack.trim() || !newDrop.description.trim()) {
      triggerToast('Please complete title, tech stack, and description.', 'warning')
      return
    }

    const tagList = newDrop.tags
      ? newDrop.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : newDrop.techStack.split('·').map((t) => t.trim()).filter(Boolean)

    const createdDrop = {
      id: `drop-${Date.now()}`,
      title: newDrop.title.trim(),
      category: newDrop.category || 'AI & Agentic',
      techStack: newDrop.techStack.trim(),
      authorName: newDrop.authorName.trim() || 'Anonymous Builder',
      authorHandle: newDrop.authorHandle.trim()
        ? (newDrop.authorHandle.startsWith('@') ? newDrop.authorHandle : `@${newDrop.authorHandle}`)
        : '@builder',
      authorAvatar: (newDrop.authorName.trim() || 'AB').slice(0, 2).toUpperCase(),
      timeAgo: 'Just now',
      upvotes: 1,
      userUpvoted: true,
      description: newDrop.description.trim(),
      deepDive: newDrop.deepDive.trim() || `// Published by ${newDrop.authorName || 'Builder'}\nArchitecture verified on Protocol v2.0.`,
      tags: tagList.length > 0 ? tagList : ['CustomStack', 'BuilderProtocol'],
      link: newDrop.link.trim() || '',
    }

    setTechDrops((prev) => [createdDrop, ...prev])
    setNewDrop({
      title: '',
      category: 'AI & Agentic',
      techStack: '',
      authorName: '',
      authorHandle: '',
      description: '',
      deepDive: '',
      tags: '',
      link: '',
    })
    setShowPublishForm(false)
    triggerToast('Tech Drop successfully published to the Protocol Network!', 'cyan')
  }

  const handleRequestSubmit = (e) => {
    e.preventDefault()
    if (!newRequest.title.trim() || !newRequest.targetTech.trim() || !newRequest.description.trim()) {
      triggerToast('Please complete title, target tech, and description.', 'warning')
      return
    }

    const createdReq = {
      id: `req-${Date.now()}`,
      domain: newRequest.domain || 'AI Infra & Systems',
      targetTech: newRequest.targetTech.trim(),
      title: newRequest.title.trim(),
      requesterName: newRequest.requesterName.trim() || 'Learner Builder',
      requesterHandle: newRequest.requesterHandle.trim()
        ? (newRequest.requesterHandle.startsWith('@') ? newRequest.requesterHandle : `@${newRequest.requesterHandle}`)
        : '@learner',
      requesterAvatar: (newRequest.requesterName.trim() || 'LB').slice(0, 2).toUpperCase(),
      timeAgo: 'Just now',
      bountyVotes: 1,
      userRequested: true,
      difficulty: newRequest.difficulty || 'Advanced',
      status: 'OPEN BOUNTY',
      statusBadge: 'badge-cyan',
      description: newRequest.description.trim(),
      urgency: 'New Request',
      contributorStatus: 'Broadcast to network instructors',
    }

    setKnowledgeRequests((prev) => [createdReq, ...prev])
    setNewRequest({
      title: '',
      domain: 'AI Infra & Systems',
      targetTech: '',
      requesterName: '',
      requesterHandle: '',
      difficulty: 'Advanced',
      description: '',
    })
    setShowRequestForm(false)
    triggerToast('Knowledge Request broadcasted to the Builder Protocol community!', 'amethyst')
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
    { id: 'exchange', label: '// Exchange' },
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
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold" style={{ background: 'rgba(0,255,128,0.12)', border: '1px solid rgba(0,255,128,0.3)', color: '#00FF80' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00FF80' }} />
                    ADMIN: AFSAL
                  </span>
                  <button
                    onClick={handleResetBoard}
                    title="Reset Board to Default Seeds"
                    className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all cursor-pointer"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}
                  >
                    Reset Seeds
                  </button>
                  <button
                    onClick={handleAdminLogout}
                    className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all cursor-pointer"
                    style={{ background: 'rgba(255,80,80,0.12)', border: '1px solid rgba(255,80,80,0.3)', color: '#FF6B6B' }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAdminModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.65)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Admin
                </button>
              )}
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
                {isAdmin ? (
                  <button onClick={handleAdminLogout} className="btn-secondary flex-1 justify-center" style={{ fontSize: '0.75rem', color: '#FF6B6B' }}>Logout Admin</button>
                ) : (
                  <button onClick={() => { setMobileMenuOpen(false); setShowAdminModal(true) }} className="btn-secondary flex-1 justify-center" style={{ fontSize: '0.75rem' }}>Admin</button>
                )}
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
            <button id="hero-join-exchange" onClick={() => scrollTo('exchange')} className="btn-secondary w-full sm:w-auto justify-center" style={{ padding: '0.875rem 2.25rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Join Exchange
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

      {/* ─── COMMUNITY PROTOCOL EXCHANGE (2 COLUMNS) ──────── */}
      <section id="exchange" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="section-header mb-6">
            <span className="label-mono" style={{ color: 'rgba(0,240,255,0.7)' }}>// 002</span>
            <h2 className="display-md text-white">Community Knowledge Exchange</h2>
            <div className="section-header-line" />
            <span className="label-mono hidden sm:block" style={{ color: 'rgba(255,255,255,0.2)' }}>DECENTRALIZED_KNOWLEDGE_BASE</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <p className="text-sm sm:text-base max-w-2xl" style={{ color: 'rgba(139,158,199,0.85)' }}>
              A peer-to-peer engineering exchange. Builders who master new tech can publish architectures &amp; stacks, while engineers looking to level up can request on-demand guides from the community.
            </p>

            {/* Quick Live Network Stats */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.2)' }}>
                <span className="w-2 h-2 rounded-full" style={{ background: '#00F0FF' }} />
                <span className="font-mono" style={{ color: '#00F0FF' }}>{techDrops.length} Drops Published</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(157,78,221,0.06)', border: '1px solid rgba(157,78,221,0.2)' }}>
                <span className="w-2 h-2 rounded-full" style={{ background: '#9D4EDD' }} />
                <span className="font-mono" style={{ color: '#9D4EDD' }}>{knowledgeRequests.length} Requests Open</span>
              </div>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 rounded-xl w-fit" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setExchangeMode('columns')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-200 cursor-pointer"
              style={{
                background: exchangeMode === 'columns' ? 'rgba(0,240,255,0.15)' : 'transparent',
                border: `1px solid ${exchangeMode === 'columns' ? 'rgba(0,240,255,0.4)' : 'transparent'}`,
                color: exchangeMode === 'columns' ? '#00F0FF' : 'rgba(255,255,255,0.6)',
              }}
            >
              <span>👥</span>
              <span>Protocol Exchange (2 Columns)</span>
            </button>

            <button
              onClick={() => {
                setExchangeMode('stackoverflow')
                if (soQuestions.length === 0 || soQuestions === FALLBACK_SO_QUESTIONS) {
                  fetchStackOverflowQuestions(soTag, soQuery)
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-200 cursor-pointer"
              style={{
                background: exchangeMode === 'stackoverflow' ? 'rgba(244,128,36,0.15)' : 'transparent',
                border: `1px solid ${exchangeMode === 'stackoverflow' ? 'rgba(244,128,36,0.5)' : 'transparent'}`,
                color: exchangeMode === 'stackoverflow' ? '#F48024' : 'rgba(255,255,255,0.6)',
              }}
            >
              <span>⚡</span>
              <span>Stack Overflow Live Intel (Official API)</span>
            </button>
          </div>

          {/* ════ STACK OVERFLOW LIVE INTEL VIEW ═══════════════ */}
          {exchangeMode === 'stackoverflow' && (
            <div className="flex flex-col rounded-2xl overflow-hidden mb-12 animate-fade-in-up" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(244,128,36,0.25)' }}>
              <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, #F48024, rgba(244,128,36,0.3))' }} />

              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(244,128,36,0.12)', border: '1px solid rgba(244,128,36,0.3)', color: '#F48024' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.986 21.865v-6.408h2.134V24H2.98v-8.543h2.134v6.408h13.872zM6.911 17.595h9.992v-2.134H6.911v2.134zm.276-5.112 9.71 2.338.483-2.078-9.71-2.338-.483 2.078zm1.536-4.832 8.784 4.793.996-1.89-8.784-4.793-.996 1.89zm3.504-4.52 7.218 6.94 1.488-1.54-7.218-6.94-1.488 1.54zM16.598 0l-1.864 1.05 5.568 9.878 1.864-1.05L16.598 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="tag-mono" style={{ color: '#F48024' }}>LIVE INTEGRATION // STACK EXCHANGE API v2.3</span>
                        <span className="badge badge-cyan" style={{ fontSize: '0.55rem' }}>OFFICIAL API</span>
                      </div>
                      <h3 className="text-white font-bold text-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Stack Overflow Developer Intelligence
                      </h3>
                    </div>
                  </div>

                  <span className="label-mono" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>
                    CC BY-SA 4.0 ATTRIBUTION COMPLIANT
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(139,158,199,0.85)' }}>
                  Live developer Q&amp;A queried directly from the official Stack Exchange API. Search real-world debugging solutions, top-voted answers, and syntax fixes across frameworks.
                </p>

                {/* Search & Tag Bar */}
                <form onSubmit={handleSearchSO} className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={soQuery}
                      onChange={(e) => setSoQuery(e.target.value)}
                      placeholder="Search Stack Overflow questions, errors, or methods (e.g. hydration failed, stream openai, rls policy)..."
                      className="input-field pl-10"
                      style={{ width: '100%', fontSize: '0.85rem' }}
                    />
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(244,128,36,0.7)" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    disabled={soLoading}
                    className="px-5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    style={{
                      background: '#F48024',
                      color: '#05070B',
                      opacity: soLoading ? 0.7 : 1,
                    }}
                  >
                    {soLoading ? 'Fetching API...' : 'Search Stack Overflow →'}
                  </button>
                </form>

                {/* Quick Tech Tag Filters */}
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  <span className="label-mono" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Protocol Stacks:</span>
                  {[
                    { label: 'Next.js 15', tag: 'next.js' },
                    { label: 'LangChain & AI', tag: 'langchain' },
                    { label: 'Supabase', tag: 'supabase' },
                    { label: 'Rust & WASM', tag: 'rust' },
                    { label: 'Bun Runtime', tag: 'bun' },
                    { label: 'Cloudflare', tag: 'cloudflare-workers' },
                    { label: 'Docker / K8s', tag: 'docker' },
                  ].map((t) => (
                    <button
                      key={t.tag}
                      onClick={() => {
                        setSoTag(t.tag)
                        setSoQuery('')
                        fetchStackOverflowQuestions(t.tag, '')
                      }}
                      className="px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200 cursor-pointer"
                      style={{
                        background: soTag === t.tag && !soQuery ? 'rgba(244,128,36,0.2)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${soTag === t.tag && !soQuery ? 'rgba(244,128,36,0.5)' : 'rgba(255,255,255,0.06)'}`,
                        color: soTag === t.tag && !soQuery ? '#F48024' : 'rgba(255,255,255,0.6)',
                      }}
                    >
                      #{t.label}
                    </button>
                  ))}
                </div>

                {/* Error Notice */}
                {soError && (
                  <div className="p-3.5 rounded-xl mb-6 flex items-center gap-3 text-xs font-mono" style={{ background: 'rgba(244,128,36,0.08)', border: '1px solid rgba(244,128,36,0.25)', color: '#F48024' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{soError}</span>
                  </div>
                )}

                {/* Questions Grid */}
                {soLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="p-5 rounded-xl animate-pulse" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="h-4 w-3/4 rounded mb-3" style={{ background: 'rgba(255,255,255,0.08)' }} />
                        <div className="h-3 w-1/2 rounded mb-4" style={{ background: 'rgba(255,255,255,0.05)' }} />
                        <div className="h-3 w-1/4 rounded" style={{ background: 'rgba(244,128,36,0.1)' }} />
                      </div>
                    ))}
                  </div>
                ) : soQuestions.length === 0 ? (
                  <div className="text-center py-12 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>No Stack Overflow discussions found matching your query.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {soQuestions.map((q) => (
                      <article
                        key={q.question_id}
                        className="p-5 rounded-xl flex flex-col justify-between transition-all duration-200 group"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <div>
                          {/* Metrics row */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <span
                                className="px-2 py-0.5 rounded text-xs font-mono font-bold"
                                style={{
                                  background: 'rgba(244,128,36,0.12)',
                                  border: '1px solid rgba(244,128,36,0.3)',
                                  color: '#F48024',
                                }}
                              >
                                ▲ {q.score} votes
                              </span>
                              <span
                                className="px-2 py-0.5 rounded text-xs font-mono font-semibold"
                                style={{
                                  background: q.is_answered ? 'rgba(0,255,128,0.1)' : 'rgba(255,255,255,0.04)',
                                  border: `1px solid ${q.is_answered ? 'rgba(0,255,128,0.3)' : 'rgba(255,255,255,0.08)'}`,
                                  color: q.is_answered ? '#00FF80' : 'rgba(255,255,255,0.6)',
                                }}
                              >
                                {q.is_answered ? `✓ ${q.answer_count} answers` : `${q.answer_count} answers`}
                              </span>
                            </div>

                            {q.owner && (
                              <a
                                href={q.owner.link || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-[11px] truncate max-w-[130px]"
                                style={{ color: 'rgba(139,158,199,0.6)' }}
                              >
                                by {q.owner.display_name}
                              </a>
                            )}
                          </div>

                          {/* Question Title */}
                          <a
                            href={q.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-white font-bold text-sm sm:text-base leading-snug mb-3 group-hover:text-[#F48024] transition-colors"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          >
                            {decodeHtmlEntities(q.title)}
                          </a>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {(q.tags || []).slice(0, 4).map((tag) => (
                              <span key={tag} className="badge badge-slate" style={{ fontSize: '0.6rem' }}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Link to Stack Overflow */}
                        <div className="pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                          <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                            ID: {q.question_id}
                          </span>
                          <a
                            href={q.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-xs font-semibold"
                            style={{ color: '#F48024' }}
                          >
                            <span>Open on Stack Overflow</span>
                            <span>↗</span>
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {/* Legal & Attribution Footer */}
                <div className="mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(139,158,199,0.5)' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#F48024' }} />
                    <span>Data provided by Stack Exchange API v2.3</span>
                  </div>
                  <div className="text-center sm:text-right">
                    <span>Content licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">CC BY-SA 4.0</a> with author attribution.</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ─── 2 COLUMNS GRID (Active when exchangeMode === 'columns') ─── */}
          {exchangeMode === 'columns' && (
            <>
              {/* Universal Search Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={exchangeSearch}
                    onChange={(e) => setExchangeSearch(e.target.value)}
                    placeholder="Search stacks or requested tech (e.g. LangGraph, Rust, WASM, Zig, DeepSeek, Envoy)..."
                    className="input-field pl-10"
                    style={{ width: '100%', fontSize: '0.85rem' }}
                  />
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                {exchangeSearch && (
                  <button
                    onClick={() => setExchangeSearch('')}
                    className="btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                  >
                    Clear Search
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* ════ COLUMN 1: PUBLISH KNOWLEDGE & TECH STACKS ═══ */}
            <div className="flex flex-col rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(0,240,255,0.18)' }}>
              {/* Column Top Accent Line */}
              <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, #00F0FF, rgba(0,240,255,0.2))' }} />

              <div className="p-6">
                {/* Column Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.25)', color: '#00F0FF' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                        <path d="M12 12v9" />
                        <path d="m16 16-4-4-4 4" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="tag-mono" style={{ color: '#00F0FF' }}>COLUMN 01 // KNOWLEDGE DROPS</span>
                      </div>
                      <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Publish Tech &amp; Stacks
                      </h3>
                    </div>
                  </div>

                  <button
                    id="toggle-publish-form-btn"
                    onClick={() => {
                      setShowPublishForm((v) => !v)
                      setShowRequestForm(false)
                    }}
                    className="btn-primary"
                    style={{ fontSize: '0.75rem', padding: '0.5rem 0.875rem' }}
                  >
                    {showPublishForm ? '✕ Close Form' : '+ Publish Stack'}
                  </button>
                </div>

                <p className="text-xs sm:text-sm mb-6 leading-relaxed" style={{ color: 'rgba(139,158,199,0.7)' }}>
                  Have you built something new or mastered an advanced architecture? Publish your tech stack, benchmarks, and knowledge breakdown to establish your protocol reputation.
                </p>

                {/* Inline Collapsible Publish Form */}
                {showPublishForm && (
                  <form
                    onSubmit={handlePublishSubmit}
                    className="mb-8 p-5 rounded-xl animate-fade-in-up"
                    style={{ background: 'rgba(0,240,255,0.03)', border: '1px solid rgba(0,240,255,0.25)' }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="label-mono font-bold" style={{ color: '#00F0FF' }}>// NEW PROTOCOL KNOWLEDGE DROP</span>
                      <span className="label-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>Instant Publish</span>
                    </div>

                    <div className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="label-mono block mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Afsal Ahmed"
                            value={newDrop.authorName}
                            onChange={(e) => setNewDrop({ ...newDrop, authorName: e.target.value })}
                            className="input-field"
                            style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                          />
                        </div>
                        <div>
                          <label className="label-mono block mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Handle / Tag</label>
                          <input
                            type="text"
                            placeholder="e.g. @afsal_dev"
                            value={newDrop.authorHandle}
                            onChange={(e) => setNewDrop({ ...newDrop, authorHandle: e.target.value })}
                            className="input-field"
                            style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="label-mono block mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Tech Stack / Tooling</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Bun 1.2 · Elysia · Drizzle · Neon"
                            value={newDrop.techStack}
                            onChange={(e) => setNewDrop({ ...newDrop, techStack: e.target.value })}
                            className="input-field"
                            style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                          />
                        </div>
                        <div>
                          <label className="label-mono block mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Category</label>
                          <select
                            value={newDrop.category}
                            onChange={(e) => setNewDrop({ ...newDrop, category: e.target.value })}
                            className="input-field"
                            style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem', background: '#0D1120', color: 'white' }}
                          >
                            <option value="AI & Agentic">AI &amp; Agentic</option>
                            <option value="Edge & WASM">Edge &amp; WASM</option>
                            <option value="Security & Web3">Security &amp; Web3</option>
                            <option value="Distributed Infra">Distributed Infra</option>
                            <option value="Low-Level & Systems">Low-Level &amp; Systems</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="label-mono block mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Drop Title / Breakthrough</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sub-10ms Global State Synchronization with CRDTs on Cloudflare"
                          value={newDrop.title}
                          onChange={(e) => setNewDrop({ ...newDrop, title: e.target.value })}
                          className="input-field"
                          style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                        />
                      </div>

                      <div>
                        <label className="label-mono block mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Knowledge Summary &amp; Takeaways</label>
                        <textarea
                          rows="3"
                          required
                          placeholder="Explain what problem this solves, how you engineered it, key bottlenecks overcome, and trade-offs..."
                          value={newDrop.description}
                          onChange={(e) => setNewDrop({ ...newDrop, description: e.target.value })}
                          className="input-field"
                          style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem', resize: 'vertical' }}
                        />
                      </div>

                      <div>
                        <label className="label-mono block mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Architecture Blueprint / Code Snippet (Optional)</label>
                        <textarea
                          rows="3"
                          placeholder="// Paste architecture flow, config, or pseudo-code..."
                          value={newDrop.deepDive}
                          onChange={(e) => setNewDrop({ ...newDrop, deepDive: e.target.value })}
                          className="input-field font-mono"
                          style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem', resize: 'vertical' }}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="label-mono block mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>GitHub / Spec URL (Optional)</label>
                          <input
                            type="url"
                            placeholder="https://github.com/..."
                            value={newDrop.link}
                            onChange={(e) => setNewDrop({ ...newDrop, link: e.target.value })}
                            className="input-field"
                            style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                          />
                        </div>
                        <div>
                          <label className="label-mono block mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Tags (Comma-separated)</label>
                          <input
                            type="text"
                            placeholder="Bun, Edge, CRDT, Drizzle"
                            value={newDrop.tags}
                            onChange={(e) => setNewDrop({ ...newDrop, tags: e.target.value })}
                            className="input-field"
                            style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setShowPublishForm(false)}
                          className="btn-secondary"
                          style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn-primary"
                          style={{ fontSize: '0.75rem', padding: '0.5rem 1.25rem' }}
                        >
                          Publish to Protocol Feed →
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Filter tags for Drops */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {['ALL', 'AI & Agentic', 'Edge & WASM', 'Security & Web3'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategoryFilter(cat)}
                      className="px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200"
                      style={{
                        background: activeCategoryFilter === cat ? 'rgba(0,240,255,0.15)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${activeCategoryFilter === cat ? 'rgba(0,240,255,0.4)' : 'rgba(255,255,255,0.06)'}`,
                        color: activeCategoryFilter === cat ? '#00F0FF' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Published Drops Feed */}
                <div className="space-y-4">
                  {techDrops
                    .filter((d) => {
                      const matchesCategory = activeCategoryFilter === 'ALL' || d.category === activeCategoryFilter
                      const matchesSearch =
                        !exchangeSearch ||
                        d.title.toLowerCase().includes(exchangeSearch.toLowerCase()) ||
                        d.techStack.toLowerCase().includes(exchangeSearch.toLowerCase()) ||
                        d.description.toLowerCase().includes(exchangeSearch.toLowerCase())
                      return matchesCategory && matchesSearch
                    })
                    .map((drop) => {
                      const isExpanded = expandedDropId === drop.id
                      return (
                        <div
                          key={drop.id}
                          className="p-5 rounded-xl transition-all duration-200"
                          style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.06)',
                          }}
                        >
                          {/* Header row: Author + Meta */}
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(157,78,221,0.2))',
                                  border: '1px solid rgba(0,240,255,0.3)',
                                  color: '#00F0FF',
                                }}
                              >
                                {drop.authorAvatar}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-white font-semibold text-xs leading-none">{drop.authorName}</span>
                                  <span className="font-mono text-[10px]" style={{ color: 'rgba(0,240,255,0.8)' }}>{drop.authorHandle}</span>
                                </div>
                                <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{drop.timeAgo}</span>
                              </div>
                            </div>

                            <span className="badge badge-cyan" style={{ fontSize: '0.6rem' }}>
                              {drop.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h4 className="text-white font-bold text-base mb-1.5 leading-snug" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {drop.title}
                          </h4>

                          {/* Tech Stack Banner */}
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md mb-3" style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.15)' }}>
                            <span className="font-mono text-xs font-semibold" style={{ color: '#00F0FF' }}>
                              ⚡ {drop.techStack}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: 'rgba(139,158,199,0.85)' }}>
                            {drop.description}
                          </p>

                          {/* Deep Dive Accordion */}
                          {drop.deepDive && (
                            <div className="mb-4">
                              <button
                                onClick={() => setExpandedDropId(isExpanded ? null : drop.id)}
                                className="inline-flex items-center gap-1.5 font-mono text-xs transition-colors"
                                style={{ color: isExpanded ? '#00F0FF' : 'rgba(0,240,255,0.7)' }}
                              >
                                <span>{isExpanded ? '▼ Hide Architecture Blueprint' : '▶ View Architecture Blueprint & Code'}</span>
                              </button>

                              {isExpanded && (
                                <pre
                                  className="mt-2.5 p-3.5 rounded-lg overflow-x-auto font-mono text-xs leading-relaxed"
                                  style={{
                                    background: '#090D18',
                                    border: '1px solid rgba(0,240,255,0.2)',
                                    color: '#A5F3FC',
                                    whiteSpace: 'pre-wrap',
                                  }}
                                >
                                  {drop.deepDive}
                                </pre>
                              )}
                            </div>
                          )}

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {drop.tags.map((tag) => (
                              <span key={tag} className="badge badge-slate" style={{ fontSize: '0.6rem' }}>
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <div className="divider mb-3" />

                          {/* Footer Actions */}
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => handleUpvoteDrop(drop.id)}
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all"
                              style={{
                                background: drop.userUpvoted ? 'rgba(0,240,255,0.18)' : 'rgba(255,255,255,0.04)',
                                border: `1px solid ${drop.userUpvoted ? 'rgba(0,240,255,0.5)' : 'rgba(255,255,255,0.08)'}`,
                                color: drop.userUpvoted ? '#00F0FF' : 'rgba(255,255,255,0.7)',
                              }}
                            >
                              <span>▲</span>
                              <span>{drop.upvotes} {drop.userUpvoted ? 'Endorsed' : 'Endorse Stack'}</span>
                            </button>

                            <div className="flex items-center gap-2">
                              {isAdmin && (
                                <button
                                  onClick={() => handleDeleteDrop(drop.id, drop.title)}
                                  className="px-2 py-1 rounded text-xs font-mono font-semibold transition-all cursor-pointer"
                                  style={{ background: 'rgba(255,80,80,0.15)', border: '1px solid rgba(255,80,80,0.35)', color: '#FF6B6B' }}
                                  title="Delete Drop as Admin"
                                >
                                  Purge ✕
                                </button>
                              )}
                              {drop.link && (
                                <a
                                  href={drop.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 font-mono text-xs transition-opacity hover:opacity-100"
                                  style={{ color: 'rgba(0,240,255,0.75)' }}
                                >
                                  <span>Repo / Spec</span>
                                  <span>↗</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>

            {/* ════ COLUMN 2: REQUEST TECHNICAL KNOWLEDGE ═══════ */}
            <div className="flex flex-col rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(157,78,221,0.2)' }}>
              {/* Column Top Accent Line */}
              <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, #9D4EDD, rgba(157,78,221,0.2))' }} />

              <div className="p-6">
                {/* Column Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(157,78,221,0.12)', border: '1px solid rgba(157,78,221,0.28)', color: '#9D4EDD' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="tag-mono" style={{ color: '#9D4EDD' }}>COLUMN 02 // DEMAND QUEUE</span>
                      </div>
                      <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Request Technical Knowledge
                      </h3>
                    </div>
                  </div>

                  <button
                    id="toggle-request-form-btn"
                    onClick={() => {
                      setShowRequestForm((v) => !v)
                      setShowPublishForm(false)
                    }}
                    className="btn-amethyst"
                    style={{ fontSize: '0.75rem', padding: '0.5rem 0.875rem' }}
                  >
                    {showRequestForm ? '✕ Close Form' : '+ Request Topic'}
                  </button>
                </div>

                <p className="text-xs sm:text-sm mb-6 leading-relaxed" style={{ color: 'rgba(139,158,199,0.7)' }}>
                  Looking to learn a complex domain, niche framework, or low-level protocol? Post a request. The community and protocol architects create tutorials and deep dives based on builder demand.
                </p>

                {/* Inline Collapsible Request Form */}
                {showRequestForm && (
                  <form
                    onSubmit={handleRequestSubmit}
                    className="mb-8 p-5 rounded-xl animate-fade-in-up"
                    style={{ background: 'rgba(157,78,221,0.03)', border: '1px solid rgba(157,78,221,0.28)' }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="label-mono font-bold" style={{ color: '#9D4EDD' }}>// POST KNOWLEDGE BOUNTY / REQUEST</span>
                      <span className="label-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>Community Demand</span>
                    </div>

                    <div className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="label-mono block mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Elena Rostova"
                            value={newRequest.requesterName}
                            onChange={(e) => setNewRequest({ ...newRequest, requesterName: e.target.value })}
                            className="input-field"
                            style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                          />
                        </div>
                        <div>
                          <label className="label-mono block mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Handle / Tag</label>
                          <input
                            type="text"
                            placeholder="e.g. @elena_dev"
                            value={newRequest.requesterHandle}
                            onChange={(e) => setNewRequest({ ...newRequest, requesterHandle: e.target.value })}
                            className="input-field"
                            style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="label-mono block mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Target Technology / Protocol</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. CUDA Kernels for FlashAttention"
                            value={newRequest.targetTech}
                            onChange={(e) => setNewRequest({ ...newRequest, targetTech: e.target.value })}
                            className="input-field"
                            style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                          />
                        </div>
                        <div>
                          <label className="label-mono block mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Depth / Level</label>
                          <select
                            value={newRequest.difficulty}
                            onChange={(e) => setNewRequest({ ...newRequest, difficulty: e.target.value })}
                            className="input-field"
                            style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem', background: '#0D1120', color: 'white' }}
                          >
                            <option value="Hardcore">Hardcore</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Beginner">Beginner</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="label-mono block mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Topic Title / What do you want to learn?</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Step-by-step masterclass on writing custom Triton kernels and profiling on H100s"
                          value={newRequest.title}
                          onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                          className="input-field"
                          style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                        />
                      </div>

                      <div>
                        <label className="label-mono block mb-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>Detailed Problem Description &amp; Use Case</label>
                        <textarea
                          rows="3"
                          required
                          placeholder="What specific roadblocks are you hitting? What concepts should the author explain? (e.g. memory tiling, thread sync, benchmark comparisons)..."
                          value={newRequest.description}
                          onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                          className="input-field"
                          style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem', resize: 'vertical' }}
                        />
                      </div>

                      <div className="flex gap-2 justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setShowRequestForm(false)}
                          className="btn-secondary"
                          style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn-amethyst"
                          style={{ fontSize: '0.75rem', padding: '0.5rem 1.25rem' }}
                        >
                          Broadcast Request to Community →
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Filter tags for Requests */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {['ALL', 'Hardcore', 'Advanced', 'Intermediate'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setActiveDifficultyFilter(diff)}
                      className="px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200"
                      style={{
                        background: activeDifficultyFilter === diff ? 'rgba(157,78,221,0.2)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${activeDifficultyFilter === diff ? 'rgba(157,78,221,0.5)' : 'rgba(255,255,255,0.06)'}`,
                        color: activeDifficultyFilter === diff ? '#9D4EDD' : 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {diff}
                    </button>
                  ))}
                </div>

                {/* Requested Topics Feed */}
                <div className="space-y-4">
                  {knowledgeRequests
                    .filter((r) => {
                      const matchesDiff = activeDifficultyFilter === 'ALL' || r.difficulty === activeDifficultyFilter
                      const matchesSearch =
                        !exchangeSearch ||
                        r.title.toLowerCase().includes(exchangeSearch.toLowerCase()) ||
                        r.targetTech.toLowerCase().includes(exchangeSearch.toLowerCase()) ||
                        r.description.toLowerCase().includes(exchangeSearch.toLowerCase())
                      return matchesDiff && matchesSearch
                    })
                    .map((req) => {
                      const isClaimedByMe = claimedRequestIds.includes(req.id)
                      return (
                        <div
                          key={req.id}
                          className="p-5 rounded-xl transition-all duration-200"
                          style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.06)',
                          }}
                        >
                          {/* Top row */}
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-semibold" style={{ color: '#9D4EDD' }}>
                                {req.requesterHandle}
                              </span>
                              <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>· {req.timeAgo}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <span
                                className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase"
                                style={{
                                  background: req.difficulty === 'Hardcore' ? 'rgba(255,80,80,0.15)' : 'rgba(157,78,221,0.15)',
                                  color: req.difficulty === 'Hardcore' ? '#FF6B6B' : '#C084FC',
                                  border: `1px solid ${req.difficulty === 'Hardcore' ? 'rgba(255,80,80,0.3)' : 'rgba(157,78,221,0.3)'}`,
                                }}
                              >
                                {req.difficulty}
                              </span>
                              <span className={`badge ${req.statusBadge}`} style={{ fontSize: '0.6rem' }}>
                                {req.status}
                              </span>
                            </div>
                          </div>

                          {/* Title */}
                          <h4 className="text-white font-bold text-base mb-1.5 leading-snug" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {req.title}
                          </h4>

                          {/* Target Tech */}
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md mb-3" style={{ background: 'rgba(157,78,221,0.06)', border: '1px solid rgba(157,78,221,0.2)' }}>
                            <span className="font-mono text-xs font-semibold" style={{ color: '#C084FC' }}>
                              🎯 Target Tech: {req.targetTech}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: 'rgba(139,158,199,0.85)' }}>
                            {req.description}
                          </p>

                          {/* Community Status note */}
                          <div className="flex items-center gap-2 mb-4 text-xs font-mono" style={{ color: 'rgba(139,158,199,0.55)' }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: req.status === 'CLAIMED BY YOU' ? '#00FF80' : '#9D4EDD' }} />
                            <span>Status: {req.contributorStatus}</span>
                          </div>

                          <div className="divider mb-3" />

                          {/* Footer Actions */}
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleUpvoteRequest(req.id)}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all"
                                style={{
                                  background: req.userRequested ? 'rgba(157,78,221,0.2)' : 'rgba(255,255,255,0.04)',
                                  border: `1px solid ${req.userRequested ? 'rgba(157,78,221,0.55)' : 'rgba(255,255,255,0.08)'}`,
                                  color: req.userRequested ? '#C084FC' : 'rgba(255,255,255,0.7)',
                                }}
                              >
                                <span>🔥</span>
                                <span>{req.bountyVotes} {req.userRequested ? 'Demanded' : '+1 Request'}</span>
                              </button>
                              {isAdmin && (
                                <button
                                  onClick={() => handleDeleteRequest(req.id, req.title)}
                                  className="px-2 py-1 rounded text-xs font-mono font-semibold transition-all cursor-pointer"
                                  style={{ background: 'rgba(255,80,80,0.15)', border: '1px solid rgba(255,80,80,0.35)', color: '#FF6B6B' }}
                                  title="Delete Request as Admin"
                                >
                                  Purge ✕
                                </button>
                              )}
                            </div>

                            <button
                              onClick={() => handleClaimRequest(req.id, req.title)}
                              disabled={isClaimedByMe}
                              className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all"
                              style={{
                                background: isClaimedByMe ? 'rgba(0,255,128,0.1)' : 'rgba(157,78,221,0.1)',
                                border: `1px solid ${isClaimedByMe ? 'rgba(0,255,128,0.3)' : 'rgba(157,78,221,0.25)'}`,
                                color: isClaimedByMe ? '#00FF80' : '#C084FC',
                                cursor: isClaimedByMe ? 'default' : 'pointer',
                              }}
                            >
                              {isClaimedByMe ? '✓ Assigned to You' : 'I Can Teach This →'}
                            </button>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

        </div>
      </section>

      {/* Toast Notification */}
      {toast.visible && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl animate-fade-in-up"
          style={{
            background: '#0D1120',
            border: `1px solid ${toast.type === 'green' ? '#00FF80' : toast.type === 'amethyst' ? '#9D4EDD' : '#00F0FF'}`,
            boxShadow: `0 10px 40px rgba(0,0,0,0.8), 0 0 20px ${toast.type === 'green' ? 'rgba(0,255,128,0.2)' : toast.type === 'amethyst' ? 'rgba(157,78,221,0.2)' : 'rgba(0,240,255,0.2)'}`,
          }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: toast.type === 'green' ? '#00FF80' : toast.type === 'amethyst' ? '#9D4EDD' : '#00F0FF' }} />
          <span className="font-mono text-xs text-white tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* ─── FOOTER SPACER ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="divider-cyan" />
      </div>

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
            {[
              { id: 'curriculum', label: 'Curriculum' },
              { id: 'tracks', label: 'Tracks' },
              { id: 'exchange', label: 'Exchange' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="footer-link bg-transparent border-0 cursor-pointer"
                style={{ fontSize: '0.75rem' }}
              >
                {link.label}
              </button>
            ))}
            <a href="https://thebuilderprotocol.me" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ fontSize: '0.75rem', color: 'rgba(0,240,255,0.5)' }}>
              thebuilderprotocol.me ↗
            </a>
            <button
              onClick={() => {
                if (isAdmin) {
                  handleAdminLogout()
                } else {
                  setShowAdminModal(true)
                }
              }}
              className="footer-link bg-transparent border-0 cursor-pointer"
              style={{ fontSize: '0.75rem', color: isAdmin ? '#00FF80' : 'rgba(255,255,255,0.3)' }}
            >
              {isAdmin ? '// Admin: Afsal (Active)' : '// Admin Login'}
            </button>
          </nav>

          <p className="label-mono" style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.6rem' }}>
            © {new Date().getFullYear()} The Builder Protocol
          </p>
        </div>
      </footer>

      {/* ─── ADMIN LOGIN MODAL ──────────────────────────────── */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(5,7,11,0.85)', backdropFilter: 'blur(12px)' }}>
          <div
            className="w-full max-w-md p-6 rounded-2xl relative animate-fade-in-up"
            style={{
              background: '#0D1120',
              border: '1px solid rgba(0,240,255,0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(0,240,255,0.15)',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => { setShowAdminModal(false); setAdminError('') }}
              className="absolute top-4 right-4 text-xs font-mono p-1 rounded transition-colors"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ background: '#00F0FF' }} />
              <span className="label-mono" style={{ color: '#00F0FF' }}>ADMIN COMMAND ACCESS</span>
            </div>
            <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Authenticate Protocol Root
            </h3>
            <p className="text-xs leading-relaxed mb-5" style={{ color: 'rgba(139,158,199,0.7)' }}>
              Sign in to manage and purge community drops, review queue entries, or reset seed state.
            </p>

            {adminError && (
              <div className="p-3 rounded-lg mb-4 text-xs font-mono" style={{ background: 'rgba(255,80,80,0.12)', border: '1px solid rgba(255,80,80,0.3)', color: '#FF6B6B' }}>
                ⚠ {adminError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="label-mono block mb-1.5" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem' }}>
                  ADMIN USERNAME
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="afsal"
                  value={adminInputUser}
                  onChange={(e) => setAdminInputUser(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.875rem' }}
                />
              </div>

              <div>
                <label className="label-mono block mb-1.5" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem' }}>
                  PASSWORD
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={adminInputPass}
                  onChange={(e) => setAdminInputPass(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.875rem' }}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setShowAdminModal(false); setAdminError('') }}
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ fontSize: '0.75rem', padding: '0.5rem 1.25rem' }}
                >
                  Verify Access →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
