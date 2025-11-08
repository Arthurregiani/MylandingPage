"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { useAccentPalette } from "@/app/hooks/useAccentPalette";
import { useCopy } from "@/app/hooks/useCopy";

interface Project {
  title: string;
  summary: string;
  description: string;
  githubUrl?: string;
  route?: string;
  stack: string[];
}

export default function Projects() {
  const accents = useAccentPalette();
  const { projects: projectsCopy } = useCopy();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const projectItems = projectsCopy.items as Project[];

  return (
    <section id="projetos" className="mx-auto mt-24 w-full max-w-6xl px-4 sm:px-10 lg:px-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-muted)]">{projectsCopy.eyebrow}</p>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--color-heading)] sm:text-4xl">{projectsCopy.title}</h2>
        </div>
        <p className="max-w-md text-sm text-[var(--color-muted)]">{projectsCopy.intro}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projectItems.map((project, index) => (
          <motion.article
            key={project.title}
            className="flex h-full flex-col rounded-[30px] border border-[color:var(--color-border-soft)] bg-[color:rgb(var(--color-surface-rgb))/0.4] p-6 text-[var(--color-text)] shadow-lg backdrop-blur-3xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold text-[var(--color-heading)]">{project.title}</h3>
              <p className="text-sm text-[var(--color-muted)]">{project.summary}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech, techIndex) => {
                const accent = accents[(index + techIndex) % accents.length];
                return (
                  <span
                    key={tech}
                    className="rounded-full border px-3 py-1 text-xs uppercase tracking-widest"
                    style={{
                      borderColor: `${accent}55`,
                      backgroundColor: `${accent}14`,
                      color: accent,
                    }}
                  >
                    {tech}
                  </span>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                variant="outline"
                asChild={Boolean(project.githubUrl)}
                disabled={!project.githubUrl}
                className={!project.githubUrl ? "opacity-60" : undefined}
              >
                {project.githubUrl ? (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    {projectsCopy.githubButton}
                  </a>
                ) : (
                  <>{projectsCopy.githubButton}</>
                )}
              </Button>
              <Button variant="secondary" onClick={() => setActiveProject(project)}>
                {projectsCopy.viewButton}
              </Button>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-lg"
            style={{ backgroundColor: "var(--scrim-color)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="w-full max-w-2xl rounded-[32px] border border-[color:var(--color-border-strong)] bg-[color:var(--color-overlay-95)] p-8 text-[var(--color-text)] shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-muted)]">{projectsCopy.modalEyebrow}</p>
                  <h3 className="mt-2 text-3xl font-semibold text-[var(--color-heading)]">
                    {activeProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)] transition hover:text-[var(--color-heading)]"
                >
                  {projectsCopy.modalClose}
                </button>
              </div>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-body-strong)]">
                {activeProject.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {activeProject.stack.map((tech, techIndex) => {
                  const accent = accents[(techIndex + 2) % accents.length];
                  return (
                    <span
                      key={`${activeProject.title}-${tech}`}
                      className="rounded-full border px-3 py-1 text-xs uppercase tracking-widest"
                      style={{
                        borderColor: `${accent}55`,
                        backgroundColor: `${accent}14`,
                        color: accent,
                      }}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
              {activeProject.route && (
                <p className="mt-6 text-sm text-[var(--color-muted)]">
                  {activeProject.route.startsWith("http") ? (
                    <>
                      {projectsCopy.repositoryLabel}{" "}
                      <a
                        href={activeProject.route}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--link-color)] underline underline-offset-4 hover:text-[var(--link-hover)]"
                      >
                        {activeProject.route}
                      </a>
                    </>
                  ) : (
                    <>
                      {" "}
                      <span className="text-[var(--link-color)]">{activeProject.route}</span>
                    </>
                  )}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
