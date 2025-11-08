"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCopy } from "@/app/hooks/useCopy";

export default function Footer() {
  const { footer } = useCopy();
  return (
    <motion.footer
      className="mx-auto mt-20 w-full max-w-6xl px-4 pb-12 text-[var(--color-muted)] sm:px-10 lg:px-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="rounded-[28px] border border-[color:var(--color-border-soft)] bg-[color:rgb(var(--color-surface-rgb))/0.4] p-6 text-sm backdrop-blur-3xl">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.4em] text-[var(--color-heading)]">
          <span>{footer.tagline}</span>
        </div>
        <div className="mt-4 flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-6">
          <Link
            href="https://www.linkedin.com/in/arthur-jos%C3%A9-regiani-a8ba0320b"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--link-color)] transition hover:text-[var(--link-hover)]"
          >
            LinkedIn
          </Link>
          <a
            href="mailto:arthurregiani@gmail.com"
            className="text-[var(--link-color)] transition hover:text-[var(--link-hover)]"
          >
            arthurregiani@gmail.com
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
