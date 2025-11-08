"use client";

import { motion } from "framer-motion";
import {
  SiDocker,
  SiDjango,
  SiFirebase,
  SiGit,
  SiJavascript,
  SiKotlin,
  SiLinux,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiReact,
  SiTypeorm,
  SiTypescript,
} from "react-icons/si";
import { useAccentPalette } from "@/app/hooks/useAccentPalette";
import { useLanguage } from "@/app/components/LanguageProvider";
import { useCopy } from "@/app/hooks/useCopy";

const stackItems = [
  {
    name: "Java",
    icon: SiOpenjdk,
    detail: {
      pt: "Microservices, Spring, integrações assíncronas",
      en: "Microservices, Spring, async integrations",
    },
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    detail: {
      pt: "Tipagem rigorosa em APIs e front-ends modernos",
      en: "Strict typing for APIs and modern front-ends",
    },
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    detail: {
      pt: "Prototipação ágil e dinamismo em interfaces",
      en: "Rapid prototyping and interface dynamism",
    },
  },
  {
    name: "React",
    icon: SiReact,
    detail: {
      pt: "Componentes declarativos e UX responsiva",
      en: "Declarative components and responsive UX",
    },
  },
  {
    name: "React Native",
    icon: SiReact,
    detail: {
      pt: "Apps mobile alinhados ao backend",
      en: "Mobile apps aligned with backend contracts",
    },
  },
  {
    name: "Node.js (Express)",
    icon: SiNodedotjs,
    detail: {
      pt: "APIs leves e pipelines de integração",
      en: "Lightweight APIs and integration pipelines",
    },
  },
  {
    name: "TypeORM",
    icon: SiTypeorm,
    detail: {
      pt: "Modelagem consistente em bancos relacionais",
      en: "Consistent modeling in relational databases",
    },
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    detail: {
      pt: "Consultas performáticas e dados confiáveis",
      en: "Performant queries and reliable data",
    },
  },
  {
    name: "Django / DRF",
    icon: SiDjango,
    detail: {
      pt: "Backends sólidos e admin pronto para produção",
      en: "Solid backends and production-ready admin",
    },
  },
  {
    name: "Docker",
    icon: SiDocker,
    detail: {
      pt: "Ambientes reprodutíveis e pipelines CI/CD",
      en: "Reproducible environments and CI/CD pipelines",
    },
  },
  {
    name: "Git",
    icon: SiGit,
    detail: {
      pt: "Fluxos colaborativos e release controlada",
      en: "Collaborative flows and controlled releases",
    },
  },
  {
    name: "Linux",
    icon: SiLinux,
    detail: {
      pt: "Infraestrutura, scripts e troubleshooting",
      en: "Infrastructure, scripting, and troubleshooting",
    },
  },
  {
    name: "Kotlin / Android",
    icon: SiKotlin,
    detail: {
      pt: "Integrações nativas com serviços backend",
      en: "Native integrations with backend services",
    },
  },
  {
    name: "Firebase",
    icon: SiFirebase,
    detail: {
      pt: "MVPs com auth, push e storage gerenciados",
      en: "MVPs with managed auth, push, and storage",
    },
  },
];

export default function TechStack() {
  const accents = useAccentPalette();
  const { language } = useLanguage();
  const { techStack } = useCopy();
  return (
    <section className="mx-auto mt-24 w-full max-w-6xl px-4 sm:px-10 lg:px-16">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.4em] text-[var(--color-muted)]">{techStack.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold text-[var(--color-heading)] sm:text-4xl">{techStack.title}</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stackItems.map((item, index) => {
          const Icon = item.icon;
          const accent = accents[index % accents.length];
          return (
            <motion.div
              key={item.name + index}
              className="group flex items-center gap-4 rounded-3xl border bg-[color:rgb(var(--color-surface-rgb))/0.5] p-4 text-[var(--color-text)] shadow-lg backdrop-blur-2xl transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.04, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              style={{
                borderColor: `${accent}40`,
                boxShadow: `0 20px 45px ${accent}22`,
              }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:rgb(var(--color-background-rgb))/0.6] text-2xl shadow-inner shadow-black/30 transition group-hover:scale-105"
                style={{
                  color: accent,
                  boxShadow: `inset 0 0 20px ${accent}25`,
                }}
              >
                <Icon />
              </div>
              <div>
                <p className="text-lg font-semibold text-[var(--color-heading)]">{item.name}</p>
                <p className="text-sm text-[var(--color-muted)]">{item.detail[language]}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
