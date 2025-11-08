"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { solarizedAccents } from "@/lib/palette";

interface Project {
  title: string;
  summary: string;
  description: string;
  githubUrl?: string;
  route?: string;
  stack: string[];
}

const projects: Project[] = [
  {
    title: "CoffeeHub",
    summary:
      "App mobile e API completa para rastreabilidade e gestão para cafeicultura.",
    description:
      "CoffeeHub nasceu para conectar o produtor ao consumidor com transparência. Combinei React Native 0.80 + React 19 no front e Django 5 + DRF no backend, com PostgreSQL e Docker para provisionar ambientes reproduzíveis. O resultado é um ecossistema que acompanha todo processo de cultivo dos cafés.",
    githubUrl: undefined,
    route: "Rota dedicada em breve",
    stack: ["React Native", "React 19", "Django 5", "DRF", "PostgreSQL", "Docker"],
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projetos" className="mx-auto mt-24 w-full max-w-6xl px-4 sm:px-10 lg:px-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-[#93a1a1]">Projetos</p>
          <h2 className="mt-2 text-3xl font-semibold text-[#eee8d5] sm:text-4xl">Produtos que contam histórias</h2>
        </div>
        <p className="max-w-md text-sm text-[#93a1a1]">
          Cada projeto nasce com foco em propósito, telemetria e feedback contínuo. CoffeeHub é o primeiro de uma série em construção.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            className="flex h-full flex-col rounded-[30px] border border-white/5 bg-[#073642]/40 p-6 text-[#839496] shadow-lg backdrop-blur-3xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-semibold text-[#eee8d5]">{project.title}</h3>
              <p className="text-sm text-[#93a1a1]">{project.summary}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech, techIndex) => {
                const accent = solarizedAccents[(index + techIndex) % solarizedAccents.length];
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
                    Repositório GitHub
                  </a>
                ) : (
                  <>Repositório GitHub</>
                )}
              </Button>
              <Button variant="secondary" onClick={() => setActiveProject(project)}>
                Ver Mais
              </Button>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#002b36]/95 p-8 text-[#839496] shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-[#93a1a1]">Projeto</p>
                  <h3 className="mt-2 text-3xl font-semibold text-[#eee8d5]">
                    {activeProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="text-sm uppercase tracking-[0.3em] text-[#93a1a1] transition hover:text-[#eee8d5]"
                >
                  Fechar
                </button>
              </div>
              <p className="mt-6 text-lg leading-relaxed text-[#b4c2c2]">
                {activeProject.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {activeProject.stack.map((tech, techIndex) => {
                  const accent = solarizedAccents[(techIndex + 2) % solarizedAccents.length];
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
                <p className="mt-6 text-sm text-[#93a1a1]">
                  {activeProject.route.startsWith("http") ? (
                    <>
                      Repositório: {" "}
                      <a
                        href={activeProject.route}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#2aa198] underline underline-offset-4 hover:text-[#2aa198]/80"
                      >
                        {activeProject.route}
                      </a>
                    </>
                  ) : (
                    <>
                      {" "}
                      <span className="text-[#2aa198]">{activeProject.route}</span>
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
