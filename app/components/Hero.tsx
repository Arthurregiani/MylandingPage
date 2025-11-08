"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { useTheme } from "@/app/components/ThemeProvider";
import { useAccentPalette } from "@/app/hooks/useAccentPalette";
import { useCopy } from "@/app/hooks/useCopy";

const MotionImage = motion(Image);

export default function Hero() {
  const { theme } = useTheme();
  const copy = useCopy();
  const heroCopy = copy.hero;
  const isLight = theme === "solarized-light";
  const accents = useAccentPalette();
  const heroStats = useMemo(
    () =>
      heroCopy.stats.map((stat) => ({
        ...stat,
        accent: accents[stat.accentIndex % accents.length],
      })),
    [accents, heroCopy.stats],
  );
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxOffset = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const shapeOne = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const shapeTwo = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const shapeThree = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const codeColumns = useMemo(
    () =>
      Array.from({ length: 11 }, (_, index) => ({
        left: `${(index / 10) * 100}%`,
        delay: index * 0.35,
        accent: accents[index % accents.length],
      })),
    [accents],
  );
  const codeSnippets = ["async()", "<cloud/>", "lambda{}", "IaC.apply", "trace()", "devops()", "matrix++", "docker run", "kubectl", "git push"];
  const trailLines = [
    { top: "18%", left: "5%", duration: 12, delay: 0 },
    { top: "42%", left: "25%", duration: 9, delay: 1.4 },
    { top: "66%", left: "55%", duration: 11, delay: 0.7 },
    { top: "30%", left: "72%", duration: 10, delay: 2 },
  ];

  const shapeSources = isLight
    ? {
        orb1: "/bg-shapes/orb-1-light.svg",
        orb2: "/bg-shapes/orb-2-light.svg",
        grid: "/bg-shapes/grid-light.svg",
      }
    : {
        orb1: "/bg-shapes/orb-1.svg",
        orb2: "/bg-shapes/orb-2.svg",
        grid: "/bg-shapes/grid.svg",
      };

  const shapes = [
    {
      id: "orb-1",
      src: shapeSources.orb1,
      className:
        "top-[-60px] right-[10%] w-72 opacity-70 blur-3xl sm:top-[-80px]",
      style: shapeOne,
      width: 512,
      height: 512,
    },
    {
      id: "orb-2",
      src: shapeSources.orb2,
      className:
        "left-[5%] bottom-[10%] w-64 opacity-70 blur-2xl sm:w-80",
      style: shapeTwo,
      width: 512,
      height: 512,
    },
    {
      id: "grid",
      src: shapeSources.grid,
      className:
        "left-1/2 top-1/2 w-[580px] -translate-x-1/2 -translate-y-1/2 opacity-70",
      style: shapeThree,
      width: 720,
      height: 720,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-28 text-[var(--color-heading)] sm:px-10 lg:px-16"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          y: parallaxOffset,
          background:
            "radial-gradient(circle at top, var(--hero-radial-color) 0%, transparent var(--hero-radial-fade))",
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        {codeColumns.map((column) => (
          <motion.div
            key={`code-column-${column.left}`}
            className="pointer-events-none absolute top-[-120%] flex flex-col text-[10px] font-mono uppercase tracking-[0.35em]"
            style={{ left: column.left }}
            initial={{ y: "-120%" }}
            animate={{ y: "120%" }}
            transition={{ repeat: Infinity, repeatType: "loop", duration: 14, delay: column.delay, ease: "linear" }}
          >
            {codeSnippets.map((snippet, index) => (
              <span
                key={`${snippet}-${index}`}
                className="py-1"
                style={{
                  color: index % 2 === 0 ? `${column.accent}66` : "rgba(255,255,255,0.12)",
                }}
              >
                {snippet}
              </span>
            ))}
          </motion.div>
        ))}
        {trailLines.map((trail, index) => (
          <motion.span
            key={`trail-${index}`}
            className="absolute block h-px w-44 blur-[0.5px]"
            style={{
              top: trail.top,
              left: trail.left,
              background:
                "linear-gradient(90deg, transparent, var(--accent-trail-mid), var(--accent-trail-end))",
            }}
            initial={{ x: "-10%" }}
            animate={{ x: "110%" }}
            transition={{ repeat: Infinity, repeatType: "loop", duration: trail.duration, delay: trail.delay, ease: "linear" }}
          />
        ))}
      </div>

      {shapes.map((shape) => (
        <MotionImage
          alt="decorative shape"
          src={shape.src}
          key={`${shape.id}-${theme}`}
          className={`pointer-events-none absolute -z-10 ${shape.className}`}
          style={{ y: shape.style }}
          width={shape.width}
          height={shape.height}
          priority={shape.id === "grid"}
        />
      ))}

      <motion.div
        className="mx-auto flex w-full max-w-4xl flex-col gap-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span
          className="w-fit rounded-full border px-5 py-1.5 text-sm uppercase tracking-[0.45em] sm:text-base"
          style={{
            borderColor: "var(--hero-badge-border)",
            backgroundColor: "var(--hero-badge-bg)",
            color: "var(--hero-badge-text)",
          }}
        >
          {heroCopy.badge}
        </span>

        <div className="space-y-6">
          <motion.h1
            className="text-4xl font-semibold leading-tight text-[var(--color-heading)] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            {heroCopy.title}
          </motion.h1>

          <motion.p
              className="text-lg text-[var(--color-muted)] sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
          >
            {heroCopy.subtitle}
          </motion.p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg" variant="cta">
            <Link href="#projetos">{heroCopy.ctaPrimary}</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="backdrop-blur-2xl"
            asChild
          >
            <Link
              href="https://www.linkedin.com/in/arthur-jos%C3%A9-regiani-a8ba0320b"
              target="_blank"
              rel="noreferrer"
            >
              {heroCopy.ctaSecondary}
            </Link>
          </Button>
        </div>

        <motion.div
          className="grid gap-4 sm:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
        >
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-[color:var(--color-border-soft)] bg-[color:rgb(var(--color-surface-rgb))/0.4] p-5 backdrop-blur-3xl"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
                {stat.label}
              </span>
              <p
                className="mt-2 text-2xl font-semibold"
                style={{ color: stat.accent }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
