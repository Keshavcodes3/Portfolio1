/* ==========================================================================
 *  YOUR PORTFOLIO — SINGLE SOURCE OF TRUTH
 * ==========================================================================
 *  Everything visible on the site is driven by this one file.
 *  Edit the values below and the whole site updates. Look for  // TODO  marks.
 *  Nothing else in the codebase needs to be touched for normal content edits.
 * ========================================================================== */

export type Project = {
  title: string;
  /** the story / the "why" behind it — 1–2 sentences, this is what makes it human */
  blurb: string;
  /** the problem it solved or the thing you learned */
  story?: string;
  stack: string[];
  year: string;
  links: { live?: string; source?: string };
  /** mark your favourite — gets a highlighted card */
  featured?: boolean;
};

export type Job = {
  company: string;
  role: string;
  period: string;
  blurb: string;
  url?: string;
};

export type Post = {
  title: string;
  summary: string;
  date: string; // e.g. "Mar 2026"
  url: string;
  readingTime?: string;
};

export const site = {
  /* ---------------------------------------------------------------- */
  /*  IDENTITY                                                         */
  /* ---------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /* Identity                                                                   */
  /* -------------------------------------------------------------------------- */

  name: "Keshavv",

  profileImages: [
    "/profile.jpg",
    "/profile2.png",
  ],

  initials: "K",

  role: " Full Stack Developer who integrates GenAI",

  location: "India",

  timezone: "Asia/Kolkata",

  email: "Keshavcodes4@gmail.com",

  greeting: "Hey, I'm Keshav.",

  tagline:
    "Driven by curiosity. I love learning new technologies and building products that genuinely excite me—from AI experiments to full-stack systems.",
  about: [
    "Hey, I'm Keshav. I enjoy building software, exploring new technologies, and turning ideas into products that people can actually use.",

    "Most of my time goes into full-stack development with React, Node.js, TypeScript, and AI. I love learning by building—from weekend experiments to larger projects that solve real problems.",

    "Lately I've been diving into Agentic AI, LangChain, LangGraph, LLMs, and backend system design. If something feels interesting, I'll probably end up building it.",

    "For me, programming is about continuous learning. Every project teaches me something new, and that's what keeps me excited to build the next one."
  ],

  tldr: [
    "Learning relentlessly.",
    "Building whatever sparks my curiosity.",
    "Exploring AI, backend, and full-stack.",
    "Growing one project at a time."
  ],
  /* ---------------------------------------------------------------- */
  /*  STATUS — the little "now" widget                                */
  /* ---------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /* Current                                                                    */
  /* -------------------------------------------------------------------------- */

  status: {
    available: true,

    availableText: "Open to internships, freelance & collaborations",

    nowLearning:
      "Agentic AI • Distributed Systems • Kubernetes • DevOps • LLM Engineering",

    nowBuilding:
      "peerY — An AI-powered platform helping developers learn, collaborate, discover projects, and find teammates.",

    nowListening:
      "Lo-fi • Deep Focus • Brown Noise",
  },

  /* -------------------------------------------------------------------------- */
  /* Socials                                                                    */
  /* -------------------------------------------------------------------------- */

  socials: {
    github: "https://github.com/keshavcodes3",

    twitter: "https://x.com/Keshavdotdev",

    linkedin: "https://linkedin.com/in/Keshav-chetri",

    email: "mailto:Keshavcodes4@gmail.com",

    instagram: "https://www.instagram.com/keshavdotdev",
    resume: "",

    discord: "",

    medium: "",
  },
  /* -------------------------------------------------------------------------- */
  /* Experience                                                                 */
  /* -------------------------------------------------------------------------- */

  experience: [
    {
      company: "Independent",

      role: "AI & Full Stack Engineer",

      period: "2025 — Present",

      blurb:
        "Designing and building AI-native products from scratch. I work across the entire stack—from modern frontend experiences and scalable backend systems to agentic AI workflows, real-time infrastructure, authentication, and cloud deployment. Every project is an opportunity to solve real problems and push my engineering skills further.",

      url: "",
    },
  ] as Job[],

  /* -------------------------------------------------------------------------- */
  /* Projects                                                                   */
  /* -------------------------------------------------------------------------- */

  projects: [
    {
      title: "peerY",

      blurb:
        "An AI-powered platform helping developers discover projects, find teammates, collaborate, learn together, and grow with intelligent mentorship.",

      story:
        "peerY started from a problem I experienced myself—learning to code alone. Finding teammates, mentors, and meaningful projects shouldn't be harder than learning itself. So I began building an ecosystem where AI helps developers connect, collaborate, and accelerate their learning journey.\n\nBuilt with React, Node.js, Express, MongoDB, Socket.io, LangChain, LangGraph, and modern AI infrastructure, peerY combines social collaboration, intelligent recommendations, AI mentoring, project discovery, and real-time communication into one seamless platform.\n\n*Built for developers • Powered by AI • Designed to scale.*",

      stack: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
        "TypeScript",
        "LangChain",
        "LangGraph",
        "JWT",
        "Cloudinary",
      ],

      year: "2026",

      links: {
        live: "",
        source: "https://github.com/keshavcodes3/peerY",
      },

      featured: true,
    },
    {
      title: "StoryBook AI",

      blurb:
        "An AI-powered creative platform that transforms imagination into beautiful stories and poetry.",

      story:
        "StoryBook AI is built for creators, dreamers, and writers who want to turn ideas into words. It features an AI Writer for long-form content, AI Muse—your personal AI companion for brainstorming and creativity—and a Discover section where users can explore community-generated poems and stories.",

      stack: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "TypeScript",
        "OpenAI",
        "Tailwind CSS",
      ],

      year: "2026",

      links: {
        live: "https://story-book-ai-eta.vercel.app",
        source: "https://github.com/Keshavcodes3/storybook.ai",
      },

      featured: true,
    },

    {
      title: "AI Chat Arena",

      blurb:
        "Compare responses from multiple AI models side by side with an intelligent judge that evaluates quality and recommends the best answer.",

      story:
        "Built to explore prompt engineering, model comparison, and evaluation workflows. Users receive answers from multiple LLMs simultaneously while an AI judge analyzes reasoning, accuracy, and overall quality before recommending the strongest response.",

      stack: [
        "React",
        "Node.js",
        "LangGraph",
        "OpenAI",
        "Gemini",
        "MistralAi",
        "Tailwind CSS",
      ],

      year: "2026",

      links: {
        live: "",
        source: "https://github.com/Keshavcodes3/battleArena",
      },
    },
    {
      title: "SyncSpace",

      blurb:
        "A production-ready project management platform inspired by Trello, built with the MERN stack.",

      story:
        "SyncSpace is a full-fledged collaborative workspace featuring boards, lists, cards, drag-and-drop task management, authentication, workspaces, activity tracking, and scalable backend architecture. The project focuses on building real-world collaboration features with clean system design and production-ready APIs.",

      stack: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "TypeScript",
        "JWT",
        "Tailwind CSS",
      ],

      year: "2025",

      links: {
        live: "",
        source: "https://github.com/Keshavcodes3/SyncSpace",
      },
    },
    {
      title: "Snitch",

      blurb:
        "A full-stack e-commerce platform with modern shopping, payments, and admin management.",

      story:
        "Snitch is a complete MERN-based e-commerce application featuring authentication, product catalog, cart, wishlist, secure checkout, order management, admin dashboard, image uploads, and scalable backend architecture. Built to mirror production-level e-commerce workflows and best practices.",

      stack: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Redux Toolkit",
        "JWT",
        "Cloudinary",
        "Tailwind CSS",
      ],

      year: "2026",

      links: {
        live: "",
        source: "https://github.com/Keshavcodes3/Snitch",
      },
    },
  ] as Project[],

  /* -------------------------------------------------------------------------- */
  /* Skills                                                                     */
  /* -------------------------------------------------------------------------- */

  skills: [
    // Languages
    "C",
    "TypeScript",
    "JavaScript",
    "Python",
    "C++",

    // Frontend
    "React",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "shadcn/ui",

    // Backend
    "Node.js",
    "Express.js",
    "REST APIs",
    "Socket.io",
    "JWT",
    "Prisma",

    // AI
    "LangChain",
    "LangGraph",
    "OpenAI",
    "Google Gemini",
    "Claude",
    "Agentic AI",
    "AI Agents",
    "RAG",
    "Prompt Engineering",
    "MCP",

    // Databases
    "MongoDB",
    "PostgreSQL",
    "Supabase",
    "Firebase",
    "Redis",

    // DevOps
    "Docker",
    "Linux",
    "GitHub Actions",
    "Vercel",
    "Railway",
    "Render",
    "Nginx",

    // Tools
    "Git",
    "GitHub",
    "Postman",
    "Figma",
    "Cloudinary",
  ],
  /* ---------------------------------------------------------------- */
  /*  WRITING  (set [] to hide the section entirely)                  */
  /* ---------------------------------------------------------------- */
  writing: [] as Post[],

  /* ---------------------------------------------------------------- */
  /*  GITHUB — used for the contribution-style graph + stats           */
  /* ---------------------------------------------------------------- */
  github: {
    username: "KeshavCodes3",
    contributionsLastYear: "400+",
  },

  /* ---------------------------------------------------------------- */
  /*  FOOTER                                                          */
  /* ---------------------------------------------------------------- */
  footerNote: "Built with ❤️ and hardwork "
} as const;

export type Site = typeof site;
