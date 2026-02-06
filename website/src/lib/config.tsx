import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export const Highlight = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <span
            className={cn(
                "bg-radial from-gradient-primary to-gradient-secondary/40 bg-clip-text text-transparent",
                className,
            )}
        >
            {children}
        </span>
    );
};

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
    name: "KubeClaw",
    description: "Kubernetes-native orchestration for OpenClaw AI agents. Scale, secure, and manage your agent infrastructure.",
    cta: "Get Started",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://jianan1104.github.io/kubeclaw",
    keywords: [
        "Kubernetes",
        "OpenClaw",
        "AI Agent",
        "DevOps",
        "Container Orchestration",
        "Cloud Native",
    ],
    links: {
        email: "jianan1104@github.io",
        twitter: "https://twitter.com/openclaw",
        discord: "https://discord.com/invite/clawd",
        github: "https://github.com/jianan1104/kubeclaw",
        instagram: "",
    },
    nav: {
        links: [
            {
                id: 1,
                name: "Features",
                href: "#features",
                submenu: [
                    { id: 1, icon: <Icons.code className="size-4 text-muted-foreground" />, name: "Secure Sandboxing", href: "#features", description: "Isolated container execution", image: "/instant-integration.png" },
                    { id: 2, icon: <Icons.code className="size-4 text-muted-foreground" />, name: "Auto-Scaling", href: "#features", description: "Scale 1 to 1000+ nodes", image: "/instant-integration.png" },
                    { id: 3, icon: <Icons.code className="size-4 text-muted-foreground" />, name: "Self-Healing", href: "#features", description: "Kubernetes auto-restarts", image: "/instant-integration.png" },
                ]
            },
            { id: 2, name: "How It Works", href: "#workflow" },
            { id: 3, name: "FAQ", href: "#faq" },
            { id: 4, name: "Docs", href: "https://github.com/jianan1104/kubeclaw#readme" },
            { id: 5, name: "GitHub", href: "https://github.com/jianan1104/kubeclaw" },
        ],
    },
    hero: {
        badgeIcon: <Icons.stackedIcons className="size-4" />,
        badge: "Kubernetes-native AI Agent Infrastructure",
        title: "Scale your OpenClaw agents from 1 to 1,000+",
        description:
            "KubeClaw brings enterprise-grade orchestration to OpenClaw. Secure sandboxing, auto-scaling, and self-healing for your AI agent fleet.",
        cta: {
            primary: {
                text: "⭐ Star on GitHub",
                href: "https://github.com/jianan1104/kubeclaw",
            },
        },
    },
    demoSection: {
        title: "Deploy. Scale. Relax.",
        description:
            "Get your AI agent infrastructure running in minutes with KubeClaw",
        items: [
            {
                id: 1,
                title: "One-Command Setup",
                content:
                    "Clone the repo and run ./kubeclaw.sh init. Answer a few questions, and your cluster is ready.",
                image:
                    "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2070&auto=format&fit=crop",
            },
            {
                id: 2,
                title: "Secure Sandbox",
                content:
                    "Every agent task runs in an isolated container. No more worrying about rm -rf / accidents on your host.",
                image:
                    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop",
            },
            {
                id: 3,
                title: "Scale Instantly",
                content:
                    "Scale from 1 to 1,000+ worker nodes with a single command. Let Kubernetes handle the orchestration.",
                image:
                    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070&auto=format&fit=crop",
            },
            {
                id: 4,
                title: "Self-Healing",
                content:
                    "If a node crashes, Kubernetes automatically restarts it. Your agent infrastructure is always available.",
                image:
                    "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2070&auto=format&fit=crop",
            },
        ],
    },
    companyShowcase: {
        companyLogos: [
            {
                id: 1,
                name: "Kubernetes",
                logo: (
                    <svg width="110" height="31" viewBox="0 0 110 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:fill-white fill-black">
                        <text x="10" y="22" fontSize="18" fontWeight="bold">☸️ Kubernetes</text>
                    </svg>
                ),
            },
            {
                id: 2,
                name: "OpenClaw",
                logo: (
                    <svg width="110" height="31" viewBox="0 0 110 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:fill-white fill-black">
                        <text x="10" y="22" fontSize="18" fontWeight="bold">🦞 OpenClaw</text>
                    </svg>
                ),
            },
            {
                id: 3,
                name: "Docker",
                logo: (
                    <svg width="110" height="31" viewBox="0 0 110 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:fill-white fill-black">
                        <text x="10" y="22" fontSize="18" fontWeight="bold">🐳 Docker</text>
                    </svg>
                ),
            },
            {
                id: 4,
                name: "Node.js",
                logo: (
                    <svg width="110" height="31" viewBox="0 0 110 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:fill-white fill-black">
                        <text x="10" y="22" fontSize="18" fontWeight="bold">⬢ Node.js</text>
                    </svg>
                ),
            },
            {
                id: 5,
                name: "Python",
                logo: (
                    <svg width="110" height="31" viewBox="0 0 110 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:fill-white fill-black">
                        <text x="10" y="22" fontSize="18" fontWeight="bold">🐍 Python</text>
                    </svg>
                ),
            },
            {
                id: 6,
                name: "Helm",
                logo: (
                    <svg width="110" height="31" viewBox="0 0 110 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:fill-white fill-black">
                        <text x="10" y="22" fontSize="18" fontWeight="bold">⎈ Helm</text>
                    </svg>
                ),
            },
        ],
    },
    workflowSection: {
        badge: {
            icon: <Icons.terminal className="size-4 text-muted-foreground" />,
            text: "Quick Start",
        },
        title: (<>Deploy AI agents on {" "}<Highlight>Kubernetes</Highlight></>),
        description: "KubeClaw turns OpenClaw nodes into cloud-native, auto-scaling, self-healing microservices running on any Kubernetes cluster.",
        sections: {
            title: "From personal AI to enterprise infrastructure",
            description: "Transform your OpenClaw setup from a single-node experiment to a production-grade, scalable agent fleet.",
            ctaButton: {
                text: "View on GitHub",
                href: "https://github.com/jianan1104/kubeclaw",
            },
            blocks: [
                {
                    id: 1,
                    icon: <Icons.terminal className="size-4 text-muted-foreground" />,
                    title: "Clone and run the CLI",
                    description: "git clone the repo, run ./kubeclaw.sh init, and your Kubernetes cluster is configured with OpenClaw nodes in minutes.",
                },
                {
                    id: 2,
                    icon: <Icons.shock className="size-4 text-muted-foreground" />,
                    title: "Scale with one command",
                    description: "Need more power? Run ./kubeclaw.sh scale 20 to deploy 20 worker nodes. Kubernetes handles load balancing automatically.",
                },
            ],
        }
    },
    workflowConnectSection: {
        title: "Pre-baked environments. Zero config.",
        description: "The KubeClaw Docker image comes with Python, Node.js, Git, and 50+ dev tools pre-installed. Your agents are ready to code on day one.",
        ctaButton: {
            text: "View Dockerfile",
            href: "https://github.com/jianan1104/kubeclaw/blob/main/Dockerfile",
        },
        blocks: [
            {
                id: 1,
                icon: <Icons.magicClick className="size-4 text-muted-foreground" />,
                title: "Python + Data Science Stack",
                description: "numpy, pandas, scikit-learn, requests, beautifulsoup4 – all pre-installed and ready to use.",
            },
            {
                id: 2,
                icon: <Icons.magicStar className="size-4 text-muted-foreground" />,
                title: "Node.js + Modern Tooling",
                description: "TypeScript, tsx, pnpm, yarn, pm2 – build and run any JavaScript project without setup.",
            },
        ],
    },
    featureSection: {
        badge: {
            icon: <Icons.globe className="size-4 text-muted-foreground" />,
            text: "Enterprise Ready",
        },
        title: (<>Stop babysitting servers.{" "}<Highlight>Start building AI.</Highlight></>),
        description: "KubeClaw handles infrastructure so you can focus on what matters: building intelligent agents that solve real problems.",
        sections: {
            title: "Built for teams that move fast",
            description: "From solo hackers to 100+ person engineering teams. KubeClaw scales with your ambition.",
            ctaButton: {
                text: "Get Started",
                href: "https://github.com/jianan1104/kubeclaw#quick-start",
            },
            blocks: [
                {
                    id: 1,
                    icon: <Icons.puzzle className="size-4 text-muted-foreground" />,
                    title: "Works on any Kubernetes cluster",
                    description: "EKS, GKE, AKS, or your homelab k3s setup. If it runs Kubernetes, it runs KubeClaw.",
                },
                {
                    id: 2,
                    icon: <Icons.globe className="size-4 text-muted-foreground" />,
                    title: "Active open-source community",
                    description: "Join developers worldwide who are building the future of AI agent infrastructure.",
                },
            ],
        }
    },
    connectSection: {
        badge: {
            icon: <Icons.terminal className="size-4 text-muted-foreground" />,
            text: "Architecture",
        },
        title: (<>Secure. Scalable.{" "}<Highlight>Self-healing.</Highlight></>),
        description: "Enterprise-grade infrastructure for your AI agents",
        step1: {
            title: "Container Isolation",
            description: "Each node runs in its own container with cgroups and namespaces. Your host is completely protected from agent activities.",
        },
        step2: {
            title: "Resource Limits",
            description: "Set CPU and memory limits per node. Prevent runaway processes from consuming your entire cluster.",
        },
        step3: {
            title: "Secret Management",
            description: "Gateway tokens are stored as Kubernetes Secrets, never exposed in environment variables or logs.",
        },
    },
    testimonialSection: {
        badge: {
            icon: (
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-muted-foreground"
                >
                    <path
                        d="M4 4C3.44772 4 3 4.44772 3 5V7C3 7.55228 3.44772 8 4 8H5V10C5 10.5523 5.44772 11 6 11H7C7.55228 11 8 10.5523 8 10V5C8 4.44772 7.55228 4 7 4H4Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M11 4C10.4477 4 10 4.44772 10 5V7C10 7.55228 10.4477 8 11 8H12V10C12 10.5523 12.4477 11 13 11H14C14.5523 11 15 10.5523 15 10V5C15 4.44772 14.5523 4 14 4H11Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
            text: "Community",
        },
        title: (<>Built by the <Highlight>OpenClaw</Highlight> community</>),
        description: "Developers worldwide are using KubeClaw to scale their AI agent infrastructure.",
        testimonials: [
            {
                id: "1",
                name: "DevOps Engineer",
                role: "Cloud Infrastructure Team",
                img: "https://randomuser.me/api/portraits/men/91.jpg",
                description: (
                    <p>
                        Finally, a way to run OpenClaw agents without worrying about them
                        breaking my production environment.
                        <Highlight> Container isolation is a game-changer.</Highlight>
                    </p>
                ),
            },
            {
                id: "2",
                name: "AI Startup Founder",
                role: "Building the future",
                img: "https://randomuser.me/api/portraits/women/12.jpg",
                description: (
                    <p>
                        We went from 1 agent to 50 in under an hour.
                        <Highlight> KubeClaw scales beautifully.</Highlight>
                        Perfect for our growing agent fleet.
                    </p>
                ),
            },
            {
                id: "3",
                name: "Platform Engineer",
                role: "FinTech Company",
                img: "https://randomuser.me/api/portraits/men/45.jpg",
                description: (
                    <p>
                        The pre-baked Docker image with Python and Node.js
                        saved us days of configuration work.
                        <Highlight> Just deploy and go.</Highlight>
                    </p>
                ),
            },
            {
                id: "4",
                name: "Homelab Enthusiast",
                role: "Self-hosted everything",
                img: "https://randomuser.me/api/portraits/women/83.jpg",
                description: (
                    <p>
                        Running KubeClaw on my k3s cluster at home.
                        <Highlight> Works perfectly on Raspberry Pi!</Highlight>
                        Love the low resource footprint.
                    </p>
                ),
            },
            {
                id: "5",
                name: "Security Researcher",
                role: "Red Team Lead",
                img: "https://randomuser.me/api/portraits/men/1.jpg",
                description: (
                    <p>
                        Container sandboxing means I can let agents run
                        untrusted code without risking my infrastructure.
                        <Highlight> Proper isolation at last.</Highlight>
                    </p>
                ),
            },
            {
                id: "6",
                name: "Open Source Contributor",
                role: "OpenClaw Maintainer",
                img: "https://randomuser.me/api/portraits/women/5.jpg",
                description: (
                    <p>
                        KubeClaw fills a critical gap in the OpenClaw ecosystem.
                        <Highlight> Enterprise-ready orchestration</Highlight>
                        for everyone.
                    </p>
                ),
            },
        ],
    },
    pricing: {
        title: "100% Free & Open Source",
        description:
            "KubeClaw is Apache-2.0 licensed. No hidden costs, no enterprise tier. Just powerful infrastructure for everyone.",
        pricingItems: [
            {
                name: "Community",
                href: "https://github.com/jianan1104/kubeclaw",
                price: "$0",
                period: "forever",
                yearlyPrice: "$0",
                features: [
                    "Unlimited nodes",
                    "Full Docker image",
                    "Kubernetes manifests",
                    "CLI tool included",
                    "Community support",
                    "Apache-2.0 license",
                ],
                description: "Everything you need to get started",
                buttonText: "Clone on GitHub",
                buttonColor: "bg-primary text-primary-foreground",
                isPopular: true,
            },
            {
                name: "Self-Hosted",
                href: "https://github.com/jianan1104/kubeclaw#quick-start",
                price: "$0",
                period: "forever",
                yearlyPrice: "$0",
                features: [
                    "Run on your own cluster",
                    "Full control",
                    "No vendor lock-in",
                    "Customize everything",
                ],
                description: "Your cluster, your rules",
                buttonText: "Get Started",
                buttonColor: "bg-secondary text-white",
                isPopular: false,
            },
            {
                name: "Enterprise",
                href: "mailto:jianan1104@github.io",
                price: "Contact",
                period: "",
                yearlyPrice: "",
                features: [
                    "Priority support",
                    "Custom integrations",
                    "SLA guarantees",
                    "Dedicated assistance",
                ],
                description: "For teams that need extra help",
                buttonText: "Contact Us",
                buttonColor: "bg-accent text-primary",
                isPopular: false,
            },
        ],
    },
    faqSection: {
        title: "Frequently Asked Questions",
        description:
            "Everything you need to know about KubeClaw. Can't find what you're looking for? Open an issue on GitHub!",
        faQitems: [
            {
                id: 1,
                question: "What is KubeClaw?",
                answer:
                    "KubeClaw is an open-source orchestration layer that runs OpenClaw nodes as Kubernetes pods. It provides secure sandboxing, auto-scaling, and self-healing for your AI agent infrastructure.",
            },
            {
                id: 2,
                question: "Do I need Kubernetes experience?",
                answer:
                    "Basic familiarity helps, but the kubeclaw.sh CLI handles most complexity. If you can run kubectl commands, you can use KubeClaw.",
            },
            {
                id: 3,
                question: "What's included in the Docker image?",
                answer:
                    "Python 3.11+, Node.js 20, Bun, TypeScript, Git, and 50+ development tools. Everything an AI agent needs to write and execute code.",
            },
            {
                id: 4,
                question: "Can I run this on my homelab?",
                answer:
                    "Absolutely! KubeClaw works on k3s, microk8s, and any standard Kubernetes distribution. Many users run it on Raspberry Pi clusters.",
            },
            {
                id: 5,
                question: "How do I scale to more nodes?",
                answer:
                    "Run ./kubeclaw.sh scale N where N is the number of nodes you want, or use kubectl scale deployment kubeclaw-node --replicas=N.",
            },
            {
                id: 6,
                question: "Is this officially supported by OpenClaw?",
                answer:
                    "KubeClaw is a community project built on top of OpenClaw. It's designed to work seamlessly with the official OpenClaw Gateway.",
            },
        ],
    },
    ctaSection: {
        id: "cta",
        title: "Ready to scale your AI agents?",
        backgroundImage: "/agent-cta-background.png",
        button: {
            text: "⭐ Star on GitHub",
            href: "https://github.com/jianan1104/kubeclaw",
        },
        subtext: "Join the growing community of developers building scalable AI agent infrastructure with KubeClaw.",
    },
    footerLinks: [
        {
            title: "Project",
            links: [
                { id: 1, title: "GitHub", url: "https://github.com/jianan1104/kubeclaw" },
                { id: 2, title: "Documentation", url: "https://github.com/jianan1104/kubeclaw#readme" },
                { id: 3, title: "Issues", url: "https://github.com/jianan1104/kubeclaw/issues" },
                { id: 4, title: "Releases", url: "https://github.com/jianan1104/kubeclaw/releases" },
            ],
        },
        {
            title: "OpenClaw",
            links: [
                { id: 5, title: "Website", url: "https://openclaw.ai" },
                { id: 6, title: "Documentation", url: "https://docs.openclaw.ai" },
                { id: 7, title: "Discord", url: "https://discord.com/invite/clawd" },
                { id: 8, title: "GitHub", url: "https://github.com/openclaw/openclaw" },
            ],
        },
        {
            title: "Community",
            links: [
                { id: 9, title: "Contribute", url: "https://github.com/jianan1104/kubeclaw/blob/main/README.md#contributing" },
                { id: 10, title: "Report Bug", url: "https://github.com/jianan1104/kubeclaw/issues/new" },
                { id: 11, title: "Feature Request", url: "https://github.com/jianan1104/kubeclaw/issues/new" },
            ],
        },
    ],
};

export type SiteConfig = typeof siteConfig;
