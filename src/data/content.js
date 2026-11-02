export const LEARNING_TRACKS = [
  {
    "id": "ai-engineering",
    "title": "AI & LLM Systems Engineering",
    "badge": "CORE TRACK",
    "desc": "Under-the-hood mechanics of attention mechanisms, low-latency inference, context retrieval pipelines, model quantization, and autonomous multi-agent loops.",
    "readTime": "45 min total",
    "modulesCount": 4,
    "modules": [
      {
        "id": "llm-transformers",
        "title": "01. Attention Mechanisms & Transformer Runtime Math",
        "readTime": "12 min",
        "summary": "Mathematical breakdown of Scaled Dot-Product Attention, KV-caching, and GPU VRAM footprint formulas.",
        "sections": [
          {
            "heading": "1.1 The Scaled Dot-Product Attention Equation",
            "text": "At the core of all modern autoregressive architectures (LLaMA 3, Mistral, GPT-4) is the attention calculation:\n\nAttention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V\n\n- Q (Query): What token i is actively searching for across context.\n- K (Key): The indexing label of prior context tokens.\n- V (Value): The information vector to weight and inject.\n- sqrt(d_k): Normalizing scale factor preventing softmax gradient saturation."
          },
          {
            "heading": "1.2 KV Caching: Why Naive Inference is O(N^2)",
            "text": "During token generation, transformers output one token at a time. Re-computing K and V across all prior tokens on every forward step scales quadratically O(N^2). By caching past Key and Value matrices in GPU VRAM, each new step scales linearly O(N)."
          },
          {
            "heading": "1.3 Memory Footprint Calculation (VRAM Sizing Formula)",
            "text": "Total VRAM = Model Weights + KV Cache + Activation Memory\n\n- Weight Footprint (FP16): ~2 bytes * Parameter Count (LLaMA-7B -> 14 GB)\n- Weight Footprint (4-bit AWQ/GGUF): ~0.55 bytes * Parameter Count (LLaMA-7B -> 3.8 GB)\n- KV Cache per Token (FP16): Bytes/Token = 2 * 2 * n_layers * n_heads * d_head"
          }
        ]
      },
      {
        "id": "llm-rag-systems",
        "title": "02. Production RAG & Vector Space Engineering",
        "readTime": "10 min",
        "summary": "Dense vs sparse embedding search, Reciprocal Rank Fusion (RRF), chunk overlap heuristics, and chunk retrieval benchmarks.",
        "sections": [
          {
            "heading": "2.1 The Failure Modes of Naive RAG",
            "text": "1. Semantic Drift: High cosine similarity does not imply factual relevance.\n2. Context Window Splicing: Arbitrary chunk boundaries split interrelated functions.\n3. Lost in the Middle: LLMs prioritize tokens at the start and end of contexts, ignoring the middle 30%-70%."
          },
          {
            "heading": "2.2 Hybrid Retrieval Pipeline (BM25 + Dense + RRF)",
            "text": "Production RAG combines lexical token matching (BM25) with dense vector embeddings using Reciprocal Rank Fusion:\n\nRRF_Score(d) = SUM( 1 / (60 + rank(d)) )"
          }
        ]
      },
      {
        "id": "llm-quantization",
        "title": "03. Quantization Mechanics: GGUF, AWQ, and ExLlamaV2",
        "readTime": "11 min",
        "summary": "How weights are compressed from FP16 to INT4/INT8 without catastrophic perplexity loss.",
        "sections": [
          {
            "heading": "3.1 Linear Quantization Formula",
            "text": "q = clamp(round(w / S) + Z, q_min, q_max)\n\nWhere S is the Scale factor (w_max - w_min) / (q_max - q_min) and Z is the Zero-point."
          },
          {
            "heading": "3.2 Architectural Tradeoffs",
            "text": "- GGUF (llama.cpp): Optimal for CPU & Apple Silicon Unified RAM. Universal portability.\n- AWQ (Activation-Aware): Preserves top 1% salient activation channels for high concurrency on NVIDIA servers.\n- ExLlamaV2 (EXL2): Fast variable-bit quantization tailored for consumer RTX 3090/4090 GPUs."
          }
        ]
      },
      {
        "id": "llm-agents",
        "title": "04. Deterministic State Machines for Autonomous AI Agents",
        "readTime": "12 min",
        "summary": "Why ReAct loops get stuck in infinite recursion and how to build structured FSM agent runtimes.",
        "sections": [
          {
            "heading": "4.1 The Fragility of Unconstrained ReAct Loops",
            "text": "Unconstrained prompt loops frequently hallucinate argument schemas or get trapped in circular tool invocations."
          },
          {
            "heading": "4.2 Finite State Machine (FSM) Agent Architecture",
            "text": "Enforce deterministic states: PLANNING -> TOOL_DISPATCH -> VALIDATION -> CIRCUIT_BREAKER. Limit execution iterations strictly to prevent run-away latency and cost."
          }
        ]
      }
    ]
  },
  {
    "id": "systems-linux",
    "title": "Systems Architecture & Linux Internals",
    "badge": "CORE TRACK",
    "desc": "Low-level software mechanics: virtual memory management, POSIX syscalls, socket multiplexing (epoll), memory-mapped IO, and Linux kernel namespaces.",
    "readTime": "40 min total",
    "modulesCount": 3,
    "modules": [
      {
        "id": "linux-memory",
        "title": "01. Virtual Memory, Page Tables, and the MMU",
        "readTime": "14 min",
        "summary": "How operating systems translate virtual addresses to physical RAM, TLB caching, and page fault handling.",
        "sections": [
          {
            "heading": "1.1 The Virtual Memory Abstraction",
            "text": "User applications operate exclusively in virtual address space. The CPU Memory Management Unit (MMU) uses multi-level Page Tables (PML4/PML5 on x86-64) to resolve physical memory addresses."
          },
          {
            "heading": "1.2 The Page Fault (#PF) Lifecycle",
            "text": "1. Memory access triggers #PF interrupt.\n2. CPU switches to Ring 0 (Kernel space).\n3. Linux verifies vm_area_struct.\n4. Allocates physical frame, updates PTE, flushes TLB, and resumes execution."
          }
        ]
      },
      {
        "id": "linux-networking",
        "title": "02. Socket Multiplexing: From Select to Epoll and IO_Uring",
        "readTime": "15 min",
        "summary": "Why select/poll scale O(N) and how Linux epoll and modern io_uring achieve million-connection concurrency.",
        "sections": [
          {
            "heading": "2.1 The C10K Bottleneck",
            "text": "Traditional select() passes descriptor sets across user/kernel boundary every tick O(N). epoll stores sockets in a kernel red-black tree and ready-list queue, achieving O(1) notification."
          },
          {
            "heading": "2.2 io_uring: Zero-Syscall Ring Buffers",
            "text": "io_uring uses two lockless ring buffers (Submission Queue and Completion Queue) shared directly between user space and kernel space, eliminating syscall context switches."
          }
        ]
      },
      {
        "id": "linux-containers",
        "title": "03. Container Internals: Namespaces & Cgroups from Scratch",
        "readTime": "11 min",
        "summary": "Containers are not virtual machines. Building an isolated process using unshare and cgroups in pure Linux shell.",
        "sections": [
          {
            "heading": "3.1 The Two Pillars of Linux Isolation",
            "text": "Namespaces dictate what a process can SEE (PID, NET, MNT, UTS). Cgroups dictate what a process can USE (CPU quotas, RAM hard limits, Block IO throttles)."
          }
        ]
      }
    ]
  },
  {
    "id": "distributed-systems",
    "title": "High-Throughput Backend & Distributed Systems",
    "badge": "CORE TRACK",
    "desc": "Database indexing mechanics (B+ Trees vs LSM Trees), distributed consensus (Raft), caching topologies, and rate limiting algorithms.",
    "readTime": "35 min total",
    "modulesCount": 3,
    "modules": [
      {
        "id": "storage-engines",
        "title": "01. Storage Engine Mechanics: B+ Trees vs LSM Trees",
        "readTime": "12 min",
        "summary": "Why PostgreSQL uses B+ Trees for high read throughput while RocksDB and Cassandra use LSM Trees for high write throughput.",
        "sections": [
          {
            "heading": "1.1 Storage Architecture Comparison",
            "text": "- B+ Trees (Postgres, MySQL): In-place updates, O(log_B N) bounded lookups, optimized for NVMe SSD random reads.\n- LSM Trees (RocksDB, Cassandra): Sequential append-only WAL + MemTable, background compaction, optimized for massive write velocity."
          }
        ]
      },
      {
        "id": "distributed-consensus",
        "title": "02. The Raft Consensus Algorithm: Leader Election & Log Replication",
        "readTime": "13 min",
        "summary": "Deconstructing leader elections, randomized heartbeat timers, terms, and quorum replication in distributed clusters.",
        "sections": [
          {
            "heading": "2.1 Core Raft Invariants",
            "text": "1. Leader Election: Majority quorum Floor(N/2) + 1 required.\n2. Append-Only Log: Leaders never truncate their own committed logs.\n3. State Machine Safety: If a server applies a log entry to its state machine, no other server will apply a different log entry for that index."
          }
        ]
      },
      {
        "id": "rate-limiting",
        "title": "03. Token Bucket vs Leaky Bucket Rate Limiting Algorithms",
        "readTime": "10 min",
        "summary": "Designing distributed Redis-backed rate limiters that survive high-concurrency race conditions.",
        "sections": [
          {
            "heading": "3.1 Atomic Redis Token Bucket with Lua",
            "text": "Calculate tokens dynamically based on elapsed time without running cron jobs. Atomically inspect and decrement tokens inside a single Redis Lua script to avoid concurrency race conditions."
          }
        ]
      }
    ]
  }
];

export const CERTIFICATIONS_ROADMAP = [
  {
    "provider": "Harvard University (CS50)",
    "title": "CS50x: Introduction to Computer Science",
    "category": "Computer Science & Software Engineering",
    "cost": "100% Free Verified Certificate",
    "duration": "10–12 Weeks (Self-Paced)",
    "prerequisites": "Zero coding background required",
    "officialUrl": "https://cs50.harvard.edu/x/",
    "topics": [
      "C Memory & Pointers",
      "Data Structures (Tries, Hash Tables, Trees)",
      "Algorithms & Big O",
      "Python & Flask",
      "SQL Databases"
    ],
    "badgeType": "Harvard Online Verified Certificate of Completion",
    "guideSummary": "The gold standard intro to CS. Completing all 9 problem sets and the final project grants a verified digital certificate hosted directly on Harvard servers with zero fees."
  },
  {
    "provider": "Google Cloud Skills Boost",
    "title": "Generative AI Fundamentals Specialization",
    "category": "AI & Cloud Infrastructure",
    "cost": "100% Free Official Skill Badge",
    "duration": "4–6 Hours",
    "prerequisites": "Basic tech literacy",
    "officialUrl": "https://www.cloudskillsboost.google/course_templates/556",
    "topics": [
      "Intro to LLMs",
      "Diffusion Models",
      "Responsible AI Principles",
      "Attention Mechanisms on Vertex AI"
    ],
    "badgeType": "Google Cloud Digital Credential (Credly Verified)",
    "guideSummary": "Official Google Cloud skill badge sequence with interactive lab credits available. Validates knowledge on Vertex AI, transformer foundations, and model safety constraints."
  },
  {
    "provider": "AWS Skill Builder",
    "title": "AWS Cloud Essentials & Cloud Quest Practitioner",
    "category": "Cloud Engineering",
    "cost": "100% Free Digital Badges",
    "duration": "10–15 Hours",
    "prerequisites": "Foundational IT knowledge",
    "officialUrl": "https://skillbuilder.aws/",
    "topics": [
      "Compute (EC2, Lambda)",
      "Storage (S3, EBS)",
      "VPC Networking & Subnets",
      "IAM Security Policies",
      "CloudWatch"
    ],
    "badgeType": "Official AWS Digital Credential (Credly Verified)",
    "guideSummary": "Amazon Web Services provides game-based and interactive hands-on lab tracks that issue official AWS Digital Badges verifiable on LinkedIn and Credly at zero cost."
  },
  {
    "provider": "The Linux Foundation (edX)",
    "title": "Introduction to Linux (LFS101x)",
    "category": "Linux & Systems Engineering",
    "cost": "100% Free Course Track",
    "duration": "8–10 Weeks",
    "prerequisites": "None",
    "officialUrl": "https://www.edx.org/learn/linux/the-linux-foundation-introduction-to-linux",
    "topics": [
      "Bash Command Line Mastery",
      "Package Managers (apt, dnf)",
      "File System Hierarchy Standard",
      "User Management & Permissions",
      "Process Control"
    ],
    "badgeType": "Linux Foundation Direct Curriculum",
    "guideSummary": "Authored directly by the governing body of Linux and Git. Master practical terminal execution without proprietary paywalls."
  },
  {
    "provider": "DeepLearning.AI",
    "title": "Short Courses: Multi-Agent Systems & LLM Engineering",
    "category": "AI Agents & LLMOps",
    "cost": "100% Free Video & Code Labs",
    "duration": "2–3 Hours per Course",
    "prerequisites": "Python basics",
    "officialUrl": "https://www.deeplearning.ai/short-courses/",
    "topics": [
      "CrewAI Multi-Agent Systems",
      "LangGraph State Machines",
      "Vector Databases with Pinecone",
      "Quantization with HuggingFace"
    ],
    "badgeType": "DeepLearning.AI Completion Badge",
    "guideSummary": "Curated by Andrew Ng in collaboration with leading AI infrastructure companies (OpenAI, Anthropic, Meta). Hands-on Jupyter notebook environments included."
  },
  {
    "provider": "freeCodeCamp",
    "title": "Relational Database & Bash Certification",
    "category": "Databases & Terminal Systems",
    "cost": "100% Free Verified Certification",
    "duration": "300 Hours (Self-Paced)",
    "prerequisites": "None",
    "officialUrl": "https://www.freecodecamp.org/learn/relational-database/",
    "topics": [
      "PostgreSQL",
      "Advanced SQL Joins & Indices",
      "Bash Scripting Automation",
      "Git Version Control",
      "Nano & Terminal Workflows"
    ],
    "badgeType": "freeCodeCamp Verified Certification",
    "guideSummary": "A 100% interactive, hands-on Linux containerized curriculum running real PostgreSQL queries and bash test suites directly in VS Code containers."
  }
];
