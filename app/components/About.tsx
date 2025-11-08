"use client";

import { motion } from "framer-motion";
import { useAccentPalette } from "@/app/hooks/useAccentPalette";
import { useCopy } from "@/app/hooks/useCopy";

export default function About() {
  const accents = useAccentPalette();
  const { about } = useCopy();
  return (
    <section className="relative mx-auto mt-20 w-full max-w-5xl px-4 sm:px-10 lg:px-16">
      <motion.div
        className="space-y-5 rounded-[32px] border border-[color:var(--color-border-soft)] bg-[color:rgb(var(--color-surface-rgb))/0.4] p-8 text-[var(--color-text)] shadow-2xl backdrop-blur-3xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-lg leading-relaxed">{about.body}</p>
        <div className="flex flex-wrap items-center gap-2 text-sm uppercase tracking-[0.3em] text-[color:rgb(var(--color-muted-rgb))/0.8]">
          {about.mantra.map((word, index) => {
            const accent = accents[index % accents.length];
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
                {index < about.mantra.length - 1 && <span className="opacity-70">→</span>}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
