"use client";

import { motion } from "framer-motion";
import { solarizedAccents } from "@/lib/palette";

const mantra = ["Ideias", "Código", "Café", "Deploy", "Repetir"];

export default function About() {
  return (
    <section className="relative mx-auto mt-20 w-full max-w-5xl px-4 sm:px-10 lg:px-16">
      <motion.div
        className="space-y-5 rounded-[32px] border border-white/5 bg-[#073642]/40 p-8 text-[#839496] shadow-2xl backdrop-blur-3xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-lg leading-relaxed">
          Sou um profissional em constante aprendizado, atualmente iniciando minha trajetória como Arquiteto de Soluções. Tenho experiência em desenvolvimento backend, infraestrutura em nuvem (AWS) e integração de sistemas, e venho direcionando minha carreira para projetar soluções escaláveis, seguras e sustentáveis.
        </p>
        <div className="flex flex-wrap items-center gap-2 text-sm uppercase tracking-[0.3em] text-[#93a1a1]/80">
          {mantra.map((word, index) => {
            const accent = solarizedAccents[index % solarizedAccents.length];
            return (
              <div key={word} className="flex items-center gap-2">
                <span
                  className="rounded-full border px-3 py-1"
                  style={{
                    borderColor: `${accent}60`,
                    backgroundColor: `${accent}26`,
                    color: accent,
                  }}
                >
                  {word}
                </span>
                {index < mantra.length - 1 && <span className="opacity-70">→</span>}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
