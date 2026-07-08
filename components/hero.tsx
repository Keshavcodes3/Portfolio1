"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/config/site";
import { Socials } from "./socials";
import { RotateCw } from "lucide-react";
import { HeroGreeting } from "./HeroGreeting";



export function Hero() {
 
  const [imgIndex, setImgIndex] = useState(0);

  const handleNextImage = () => {
    const nextIndex = (imgIndex + 1) % site.profileImages.length;
    setImgIndex(nextIndex);
    window.dispatchEvent(new CustomEvent("profileImageChanged", { detail: nextIndex }));
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6"
    >
      {/* backdrop */}
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-accent/5 blur-[160px]" />

      <div className="mx-auto w-full max-w-content pt-20">
        <HeroGreeting/>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-28 w-28 shrink-0 sm:h-32 sm:w-32 group"
          >
            <img
              src={site.profileImages[imgIndex]}
              alt="Profile"
              className="h-full w-full rounded-2xl object-cover border border-border shadow-xl transition-all"
            />
            <button
              onClick={handleNextImage}
              className="absolute -right-3 -top-3 rounded-full border border-border bg-surface p-1.5 text-muted transition-all hover:text-fg hover:scale-110 sm:opacity-100 opacity-0 group-hover:opacity-100"
              aria-label="Switch profile image"
            >
              <RotateCw size={15} strokeWidth={2} />
            </button>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fg to-muted">
              {site.name}.
            </span>
            <br />
            <span className="text-xl font-medium text-muted sm:text-2xl">{site.role}.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-accent/20"
          >
            see my work
          </a>
          <Socials />
        </motion.div>


        {/* status / "now" pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid gap-3 sm:grid-cols-3"
        >
          {site.status.available && (
            <div className="flex items-center gap-2 rounded-2xl border bg-surface/30 px-4 py-3 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-muted">{site.status.availableText}</span>
            </div>
          )}
          <NowPill label="building" value={site.status.nowBuilding} />
          <NowPill label="learning" value={site.status.nowLearning} />
        </motion.div>
      </div>
    </section>
  );
}



function NowPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-surface/30 px-4 py-3 text-sm">
      <span className="font-mono text-xs uppercase tracking-wider text-faint">
        {label}
      </span>
      <p className="mt-0.5 line-clamp-2 text-muted" title={value}>
        {value}
      </p>
    </div>
  );
}
