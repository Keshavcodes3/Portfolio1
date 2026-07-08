import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Project } from "@/config/projects";
import { ArrowUpRight, GitHubIcon } from "./icons";

interface ProjectWindowProps {
    open: boolean;
    project: Project | null;
    onClose: () => void;
}

export function ProjectWindow({
    open,
    project,
    onClose,
}: ProjectWindowProps) {
    // 1. Fetch current theme state directly out of localStorage safely on render
    const [theme, setTheme] = useState<string>("dark");

    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = "hidden";

        // Read active theme value from storage (fallback to 'dark' if unassigned)
        const activeTheme = localStorage.getItem("theme") || "dark";
        setTheme(activeTheme);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/40 dark:bg-black/70 backdrop-blur-md dark:backdrop-blur-xl"
                    />

                    {/* Modal Container Wrapper - Appends active theme class down locally */}
                    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4 selection:bg-zinc-200 dark:selection:bg-zinc-800 text-current ${theme === "dark" ? "dark" : ""}`}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.97, y: 12 }}
                            transition={{ type: "spring", stiffness: 260, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-2xl dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50 shadow-black/10 dark:shadow-black/80"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between border-b border-zinc-100 bg-zinc-50/50 p-5 backdrop-blur-sm dark:border-white/5 dark:bg-zinc-900/20">
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2.5">
                                        <h2 className="text-lg font-medium tracking-tight text-zinc-950 dark:text-white">
                                            {project.title}
                                        </h2>
                                        {project.featured && (
                                            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    <p className="max-w-md text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                                        {project.blurb}
                                    </p>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 text-zinc-400 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-600 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-white"
                                >
                                    <span className="text-[10px] font-light">✕</span>
                                </button>
                            </div>

                            {/* Main Content Area */}
                            <div className="overflow-y-auto p-5 space-y-6 scrollbar-none">
                                {/* Browser Preview Layout */}
                                <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 dark:border-white/5 dark:bg-zinc-900/40">
                                    <div className="flex items-center justify-between border-b border-zinc-200 px-3 py-2 dark:border-white/5">
                                        <div className="flex items-center gap-1.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 transition-colors group-hover:bg-red-500/60" />
                                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 transition-colors group-hover:bg-yellow-500/60" />
                                            <div className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 transition-colors group-hover:bg-green-500/60" />
                                        </div>
                                        <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 tracking-tight">
                                            {project.title.toLowerCase().replace(/\s+/g, "")}.dev
                                        </span>
                                        <div className="w-9" />
                                    </div>

                                    <div className="overflow-hidden">
                                        <img
                                            src={project.thumbnail}
                                            alt={project.title}
                                            className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                                        />
                                    </div>
                                </div>

                                {/* Project Description */}
                                <div className="space-y-1.5">
                                    <h3 className="text-[10px] font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                                        Overview
                                    </h3>
                                    <p className="whitespace-pre-line text-xs leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal">
                                        {project.story}
                                    </p>
                                </div>

                                {/* Tech Stack Tags */}
                                <div className="space-y-2">
                                    <h3 className="text-[10px] font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                                        Built With
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-mono text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-white/5 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-white/10 dark:hover:text-zinc-200"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA Links */}
                                <div className="flex items-center gap-3 pt-2">
                                    {project.links.live && (
                                        <a
                                            href={project.links.live}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group inline-flex h-8 items-center gap-1 rounded-md bg-zinc-950 px-3.5 text-xs font-medium text-white transition-all duration-200 hover:bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white hover:shadow-lg dark:hover:shadow-white/5"
                                        >
                                            Launch App
                                            <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </a>
                                    )}

                                    {project.links.source && (
                                        <a
                                            href={project.links.source}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 bg-transparent px-3.5 text-xs font-medium text-zinc-600 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:bg-white/5 dark:hover:text-zinc-100"
                                        >
                                            <GitHubIcon className="h-3.5 w-3.5" />
                                            Codebase
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}