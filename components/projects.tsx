"use client"
import { ProjectWindow } from "./ProjectProp";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Project, allProjects } from "@/config/projects";
import { Reveal, SectionHeader } from "./reveal";
import { ArrowUpRight } from "./icons";

function ProjectShowcase({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-semibold">{project.title}</h2>

          {project.featured && (
            <span className="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-accent">
              Featured
            </span>
          )}
        </div>

        <ArrowUpRight className="transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>

      <div className="overflow-hidden rounded-3xl border border-border">
        <div className="relative aspect-[16/9]">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/30" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-500 group-hover:opacity-100">
            <div className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white backdrop-blur-xl">
              Open Case Study
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function CuriosityProject({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.article
      onClick={onClick}
      layout
      initial={{ opacity: 0, y: 15, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden rounded-2xl border border-border">
        <div className="relative aspect-square">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/35" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white backdrop-blur">
              Open
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <h3 className="font-medium">{project.title}</h3>

        <ArrowUpRight className="transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const mainProjects = allProjects.filter(
    (p) => p.category === "main"
  );

  const curiosityProjects = allProjects.filter(
    (p) => p.category === "curiosity"
  );

  const visibleProjects = showAll
    ? curiosityProjects
    : curiosityProjects.slice(0, 4);

  return (
    <section className="mx-auto max-w-content px-6 py-24">
      <SectionHeader
        id="projects"
        index="03"
        title="Things I've Built"
      />

      <div className="mt-16 space-y-24">
        {mainProjects.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.08}>
            <ProjectShowcase
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          </Reveal>
        ))}
      </div>

      <div className="mt-40 border-t pt-20">
        <h2 className="text-3xl font-semibold">
          Built out of Curiosity
        </h2>

        <p className="mt-2 text-muted">
          Weekend experiments and random ideas.
        </p>

        <motion.div
          layout
          transition={{
            layout: {
              duration: 0.45,
              type: "spring",
              stiffness: 180,
              damping: 22,
            },
          }}
          className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project) => (
                <CuriosityProject
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </AnimatePresence>
        </motion.div>

        {curiosityProjects.length > 4 && (
          <motion.div
            layout
            className="mt-10 flex justify-center"
          >
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-all hover:border-accent hover:text-accent"
            >
              {showAll
                ? "Show Less"
                : `Show All (${curiosityProjects.length})`}
            </button>
          </motion.div>
        )}

        <ProjectWindow
          open={!!selectedProject}
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}