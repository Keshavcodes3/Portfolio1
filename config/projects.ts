
export interface Project {
    id: string;

    category: "main" | "curiosity";

    title: string;
    year: string;

    featured?: boolean;

    thumbnail: string;

    media: {
        type: "image" | "video";
        url: string;
    }[];

    blurb: string;
    story: string;

    stack: string[];

    links: {
        live?: string;
        source?: string;
    };
}

export const allProjects: Project[] = [
    // ==========================
    // Things I've Built
    // ==========================

    {
        id: "peery",
        category: "main",

        title: "peerY",
        year: "2026",

        featured: true,

        thumbnail: "/ProjectAssets/peerY.png",

        media: [],

        blurb:
            "AI-powered platform helping developers find teammates, collaborate, learn together, and build real projects.",

        story:
            "peerY started from a problem I experienced myself—learning to code alone. Finding teammates, mentors, and meaningful projects shouldn't be harder than learning itself. The platform combines AI mentorship, project discovery, collaboration, GitHub-based contributions, and real-time communication into one ecosystem for developers.\n\nA special thanks to Anurag for helping me shape several ideas and providing valuable guidance throughout the development of the platform.",

        stack: [
            "React",
            "TypeScript",
            "Node.js",
            "Express",
            "MongoDB",
            "Socket.io",
            "LangChain",
            "LangGraph",
            "JWT",
            "Cloudinary",
        ],

        links: {
            live: "",
            source: "https://github.com/Keshavcodes3/peerY",
        },
    },

    {
        id: "storybook-ai",
        category: "main",

        title: "StoryBook AI",
        year: "2026",

        featured: false,

        thumbnail: "/ProjectAssets/sbook.png",

        media: [],

        blurb:
            "AI-powered creative platform that transforms imagination into stories and poetry.",

        story:
            "Create stories, poems and long-form content with AI Writer, AI Muse and a community Discover feed.",

        stack: [
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "OpenAI",
            "Tailwind CSS",
        ],

        links: {
            live: "https://story-book-ai-eta.vercel.app",
            source: "https://github.com/Keshavcodes3/StoryBook.ai",
        },
    },

    {
        id: "nexa-ai",
        category: "main",

        title: "NexaAI",
        year: "2026",

        featured: false,

        thumbnail: "/ProjectAssets/nexaAi.png",

        media: [],

        blurb:
            "Modern AI workspace for chatting, writing, researching and boosting productivity.",

        story:
            "A clean AI workspace bringing together multiple AI tools into one experience while exploring prompt engineering, productivity workflows and modern interface design.",

        stack: [
            "React",
            "TypeScript",
            "Node.js",
            "Express",
            "MongoDB",
            "OpenAI",
            "Tailwind CSS",
        ],

        links: {
            live: "",
            source: "https://github.com/Keshavcodes3/NexaAI",
        },
    },

    // ==========================
    // Built Out of Curiosity
    // ==========================

    {
        id: "ai-chat-arena",
        category: "curiosity",

        title: "AI Chat Arena",
        year: "2026",

        thumbnail: "/ProjectAssets/battleArema.png",

        media: [],

        blurb:
            "Compare multiple AI models side-by-side with an AI judge.",

        story:
            "Experiment exploring prompt engineering, evaluation workflows and reasoning comparison across multiple LLMs.",

        stack: [
            "React",
            "LangGraph",
            "OpenAI",
            "Gemini",
            "MistralAI",
        ],

        links: {
            live: "",
            source: "https://github.com/Keshavcodes3/BattleArena",
        },
    },

    {
        id: "cozypair",
        category: "curiosity",

        title: "CozySpace",
        year: "2026",

        thumbnail: "/ProjectAssets/cozySpace.png",

        media: [],

        blurb:
            "Backend for a real-time collaborative workspace and shared productivity platform featuring synchronized study environments, audio streaming sync, and low-latency chat.",

        story:
            "Focused on authentication, PostgreSQL, Drizzle ORM, real-time synchronization, timers and scalable backend architecture.",

        stack: [
            "Node.js",
            "Express",
            "PostgreSQL",
            "Drizzle ORM",
            "Socket.io",
            "TypeScript",
        ],

        links: {
            live: "",
            source: "https://github.com/Keshavcodes3/CozyPair",
        },
    },

    {
        id: "founderhq",
        category: "curiosity",

        title: "FounderHQ",
        year: "2026",

        thumbnail: "/ProjectAssets/founderHQ.png",

        media: [],

        blurb:
            "Workspace for founders to manage ideas, teams and startup execution.",

        story:
            "An experimental project exploring startup management, founder workflows and collaborative productivity.",

        stack: [
            "React",
            "TypeScript",
            "Node.js",
            "MongoDB",
        ],

        links: {
            live: "",
            source: "https://github.com/Keshavcodes3/FounderHQ",
        },
    },

    {
        id: "skillquest",
        category: "curiosity",

        title: "SkillQuest",
        year: "2026",

        thumbnail: "/ProjectAssets/skillQuests.png",

        media: [],

        blurb:
            "Gamified platform for learning and tracking new skills.",

        story:
            "Built to explore learning systems, streaks, achievements and habit-forming experiences.",

        stack: [
            "React",
            "TypeScript",
            "Node.js",
            "MongoDB",
        ],

        links: {
            live: "",
            source: "https://github.com/Keshavcodes3/SkillQuest",
        },
    },



    {
        id: "snitch",
        category: "curiosity",

        title: "Snitch",
        year: "2026",

        thumbnail: "/ProjectAssets/comingSoon.jpg",

        media: [],

        blurb:
            "Production-grade MERN e-commerce platform with payments and admin dashboard.",

        story:
            "Complete shopping experience with authentication, checkout, orders, wishlist, admin panel and scalable backend.",

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

        links: {
            live: "",
            source: "https://github.com/Keshavcodes3/Snitch",
        },
    },



];