"use client";

import { motion } from "framer-motion";
import { site } from "@/config/site";
import { Reveal, SectionHeader } from "./reveal";
import { GitHubIcon, ArrowUpRight } from "./icons";

const WEEKS = 53;
const DAYS = 7;

/**
 * Deterministic, decorative contribution grid (no hydration mismatch, no API
 * key needed). To show REAL data, swap `level()` for values fetched from the
 * GitHub GraphQL API in a server component.
 */
function level(week: number, day: number) {
  const seed = (week * 31 + day * 17 + 7) % 97;
  const wave = Math.sin(week / 6) * 1.5 + 2;
  const v = (seed % 5) * 0.4 + wave;
  return Math.max(0, Math.min(4, Math.round(v % 5)));
}

const SHADES = [
  "bg-fg/[0.06]",
  "bg-accent/25",
  "bg-accent/45",
  "bg-accent/70",
  "bg-accent",
];

export function GitHubGraph() {
  if (!site.github.username) return null;
  const profile = `https://github.com/${site.github.username}`;

  return (
    <section className="mx-auto w-full max-w-content px-6 py-16">
      <SectionHeader id="github" index="05" title="in code" />

      <Reveal>
        <div className="rounded-2xl border bg-surface/30 p-5">
          <div className="mb-4 flex items-center justify-between">
            <a
              href={profile}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
            >
              <GitHubIcon className="h-4 w-4" />
              @{site.github.username}
              <ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <span className="font-mono text-xs text-muted">
              {site.github.contributionsLastYear.toLocaleString()} contributions
            </span>
          </div>

          <div className="overflow-x-auto pb-1">
            <div className="flex gap-[3px]">
              {Array.from({ length: WEEKS }).map((_, w) => (
                <div key={w} className="flex flex-col gap-[3px]">
                  {Array.from({ length: DAYS }).map((_, d) => {
                    const lvl = level(w, d);
                    return (
                      <motion.span
                        key={d}
                        initial={{ opacity: 0, scale: 0.4 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (w * DAYS + d) * 0.0012, duration: 0.2 }}
                        className={`h-[11px] w-[11px] flex-none rounded-[2px] ${SHADES[lvl]}`}
                        title={`${lvl} contributions`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] text-faint">
            less
            {SHADES.map((s, i) => (
              <span key={i} className={`h-[10px] w-[10px] rounded-[2px] ${s}`} />
            ))}
            more
          </div>
        </div>
      </Reveal>
    </section>
  );
}
