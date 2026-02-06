"use client";

import { useRef, useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

type CloningStatus = "idle" | "cloning" | "cloned" | "starting" | "started" | "preview";

const STATUS_SEQUENCE: Array<{ status: CloningStatus; delay: number }> = [
    { status: "cloning", delay: 400 },
    { status: "cloned", delay: 1400 },
    { status: "starting", delay: 800 },
    { status: "started", delay: 800 },
    { status: "preview", delay: 600 },
] as const;

const terminalVariants = {
    idle: { x: "0%", y: "0%" },
    active: (isMobile: boolean) => ({
        x: isMobile ? "8%" : "20%",
        y: isMobile ? "-15%" : "-30%",
    }),
};

const browserVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
};

const springTransition = {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
};

export function TerminalBrowserPreviewBlock() {
    const terminalRef = useRef<HTMLDivElement>(null);
    const terminalInView = useInView(terminalRef, { amount: 0.8, margin: "40px 0px -40px 0px" });
    const [status, setStatus] = useState<CloningStatus>("idle");
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const sequenceIndexRef = useRef(0);
    const isMobile = useMobile();

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        if (!terminalInView) {
            timerRef.current = setTimeout(() => setStatus("idle"), 0);
            sequenceIndexRef.current = 0;
            return;
        }

        sequenceIndexRef.current = 0;

        const runSequence = () => {
            if (sequenceIndexRef.current >= STATUS_SEQUENCE.length) {
                return;
            }

            const { status: nextStatus, delay } = STATUS_SEQUENCE[sequenceIndexRef.current];
            sequenceIndexRef.current += 1;

            timerRef.current = setTimeout(() => {
                setStatus(nextStatus);
                if (sequenceIndexRef.current < STATUS_SEQUENCE.length) {
                    runSequence();
                }
            }, delay);
        };

        runSequence();

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            sequenceIndexRef.current = 0;
        };
    }, [terminalInView]);

    const isPreviewState = useMemo(
        () => status === "starting" || status === "started" || status === "preview",
        [status]
    );

    const terminalAnimation = useMemo(
        () => (isPreviewState ? terminalVariants.active(isMobile) : terminalVariants.idle),
        [isPreviewState, isMobile]
    );

    return (
        <div
            ref={terminalRef}
            className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center p-6 md:p-12 overflow-visible"
        >
            <motion.div
                animate={terminalAnimation}
                transition={springTransition}
                className="relative"
            >
                <CloningStatusIndicator status={status} />
                <TerminalWindow
                    command="npx codeforge clone repo"
                    output={[
                        "Cloning repository...",
                        "Resolving deltas: 100% (1234/1234), done.",
                        "Analyzing codebase...",
                        "Setting up AI agent...",
                        "✓ Repository cloned successfully",
                    ]}
                />
            </motion.div>

            <AnimatePresence>
                {status === "preview" && (
                    <BrowserPreview
                        title="Your AI Agent is Ready"
                        description="Start coding with AI-powered suggestions and automated code reviews."
                        button={{ text: "Get Started", href: "#" }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

const TerminalWindow = memo(function TerminalWindow({
    command,
    output,
}: {
    command: string;
    output: string[];
}) {
    return (
        <div className="w-full max-w-lg bg-card rounded-xl border border-border relative overflow-hidden">
            <div className="bg-muted px-4 py-3 flex items-center gap-2 border-b border-border">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
            </div>

            <div className="bg-background p-4 md:p-6 font-mono text-xs md:text-sm">
                <div className="space-y-1 text-foreground">
                    <div className="flex">
                        <span className="text-primary">$</span>
                        <span className="ml-2">{command}</span>
                    </div>
                    {output.map((line, index) => {
                        const parts = line.split("100%");
                        return (
                            <div key={index} className="text-muted-foreground">
                                {parts.length > 1 ? (
                                    <>
                                        {parts[0]}
                                        <span className="text-foreground font-semibold">100%</span>
                                        {parts[1]}
                                    </>
                                ) : (
                                    line
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

const BrowserPreview = memo(function BrowserPreview({
    title,
    description,
    button,
}: {
    title: string;
    description: string;
    button: { text: string; href: string };
}) {
    return (
        <motion.div
            variants={browserVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ ...springTransition, delay: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-8 w-full max-w-xs md:max-w-md bg-card rounded-xl border border-border overflow-hidden z-20"
        >
            <div className="bg-muted px-3 py-2 md:px-4 md:py-2.5 flex items-center gap-2 border-b border-border">
                <div className="flex gap-1.5 md:gap-2">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500" />
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500" />
                </div>
            </div>

            <div className="bg-radial from-primary/10 to-background h-40 md:h-56 p-4 md:p-8 flex flex-col items-center justify-center">
                <div className="text-center space-y-2 md:space-y-3">
                    <h3 className="text-xl font-semibold text-balance tracking-tighter text-center text-foreground leading-tight">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground text-balance font-normal leading-relaxed">{description}</p>
                    <div className="flex items-center justify-center gap-2 md:gap-3 pt-1 md:pt-2">
                        <Button
                            className={cn(
                                "text-xs font-medium px-4 py-2 rounded-full",
                                "bg-primary hover:bg-primary/90 text-primary-foreground"
                            )}
                        >
                            {button.text}
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

function CloningStatusIndicator({ status }: { status: CloningStatus }) {
    const isVisible = useMemo(() => status !== "idle", [status]);
    const isLoading = useMemo(() => status === "cloning" || status === "starting", [status]);

    const statusText = useMemo(() => {
        switch (status) {
            case "cloning":
                return "Cloning";
            case "cloned":
                return "Cloned";
            case "starting":
                return "Starting Preview";
            case "started":
            case "preview":
                return "Started Preview";
            default:
                return "";
        }
    }, [status]);

    const animationKey = useMemo(() => (status === "preview" ? "started" : status), [status]);

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    key={animationKey}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center z-10"
                >
                    <Button
                        size="sm"
                        className={cn(
                            "flex w-fit h-10 items-center gap-2 rounded-full pl-2 pr-4! text-sm font-medium",
                            "bg-card text-card-foreground border border-border",
                            "shadow-lg hover:bg-accent"
                        )}
                    >
                        <div className="size-4 flex items-center justify-center shrink-0">
                            {isLoading ? (
                                <Loader2 className="size-4 animate-spin text-foreground" />
                            ) : (
                                <div className="size-4 bg-foreground rounded-full flex items-center justify-center">
                                    <Check className="size-3 text-background stroke-2" />
                                </div>
                            )}
                        </div>
                        <span className="text-sm font-medium whitespace-nowrap">
                            {statusText}
                        </span>
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
