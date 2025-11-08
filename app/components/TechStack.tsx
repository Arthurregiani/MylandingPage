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
import { solarizedAccents } from "@/lib/palette";

const stackItems = [
  {
    name: "Java",
    icon: SiOpenjdk,
    detail: "Microservices, Spring, integrações assíncronas",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    detail: "Tipagem rigorosa em APIs e front-ends modernos",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    detail: "Prototipação ágil e dinamismo em interfaces",
  },
  {
    name: "React",
    icon: SiReact,
    detail: "Componentes declarativos e UX responsiva",
  },
  {
    name: "React Native",
    icon: SiReact,
    detail: "Apps mobile alinhados ao backend",
  },
  {
    name: "Node.js (Express)",
    icon: SiNodedotjs,
    detail: "APIs leves e pipelines de integração",
  },
  {
    name: "TypeORM",
    icon: SiTypeorm,
    detail: "Modelagem consistente em bancos relacionais",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    detail: "Consultas performáticas e dados confiáveis",
  },
  {
    name: "Django / DRF",
    icon: SiDjango,
    detail: "Backends sólidos e admin pronto para produção",
  },
  {
    name: "Docker",
    icon: SiDocker,
    detail: "Ambientes reprodutíveis e pipelines CI/CD",
  },
  {
    name: "Git",
    icon: SiGit,
    detail: "Fluxos colaborativos e release controlada",
  },
  {
    name: "Linux",
    icon: SiLinux,
    detail: "Infraestrutura, scripts e troubleshooting",
  },
  {
    name: "Kotlin / Android",
    icon: SiKotlin,
    detail: "Integrações nativas com serviços backend",
  },
  {
    name: "Firebase",
    icon: SiFirebase,
    detail: "MVPs com auth, push e storage gerenciados",
  },
];

export default function TechStack() {
  return (
    <section className="mx-auto mt-24 w-full max-w-6xl px-4 sm:px-10 lg:px-16">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.4em] text-[#93a1a1]">Stack</p>
        <h2 className="mt-2 text-3xl font-semibold text-[#eee8d5] sm:text-4xl">  Ferramentas que sustentam meus sistemas</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stackItems.map((item, index) => {
          const Icon = item.icon;
          const accent = solarizedAccents[index % solarizedAccents.length];
          return (
            <motion.div
              key={item.name + index}
              className="group flex items-center gap-4 rounded-3xl border bg-[#073642]/50 p-4 text-[#839496] shadow-lg backdrop-blur-2xl transition"
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
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#002b36]/60 text-2xl shadow-inner shadow-black/30 transition group-hover:scale-105"
                style={{
                  color: accent,
                  boxShadow: `inset 0 0 20px ${accent}25`,
                }}
              >
                <Icon />
              </div>
              <div>
                <p className="text-lg font-semibold text-[#eee8d5]">{item.name}</p>
                <p className="text-sm text-[#93a1a1]">{item.detail}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
