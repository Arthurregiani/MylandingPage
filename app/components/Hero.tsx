"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { solarizedAccents } from "@/lib/palette";

const MotionImage = motion(Image);

const heroStats = [
  {
    label: "Foco atual",
    value: "Arquitetura de Soluções & Cloud AWS",
    accent: solarizedAccents[4],
  },
  {
    label: "Stack aplicada",
    value: "Java · Node · React Native",
    accent: solarizedAccents[3],
  },
  {
    label: "Mindset",
    value: "Construir · Observar · Evoluir",
    accent: solarizedAccents[6],
  },
];

export default function Hero() {
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
        accent: solarizedAccents[index % solarizedAccents.length],
      })),
    [],
  );
  const codeSnippets = ["async()", "<cloud/>", "lambda{}", "IaC.apply", "trace()", "devops()", "matrix++", "docker run", "kubectl", "git push"];
  const trailLines = [
    { top: "18%", left: "5%", duration: 12, delay: 0 },
    { top: "42%", left: "25%", duration: 9, delay: 1.4 },
    { top: "66%", left: "55%", duration: 11, delay: 0.7 },
    { top: "30%", left: "72%", duration: 10, delay: 2 },
  ];

  const shapes = [
    {
      id: "orb-1",
      src: "/bg-shapes/orb-1.svg",
      className:
        "top-[-60px] right-[10%] w-72 opacity-70 blur-3xl sm:top-[-80px]",
      style: shapeOne,
      width: 512,
      height: 512,
    },
    {
      id: "orb-2",
      src: "/bg-shapes/orb-2.svg",
      className:
        "left-[5%] bottom-[10%] w-64 opacity-70 blur-2xl sm:w-80",
      style: shapeTwo,
      width: 512,
      height: 512,
    },
    {
      id: "grid",
      src: "/bg-shapes/grid.svg",
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
      className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-28 text-[#eee8d5] sm:px-10 lg:px-16"
    >
      <motion.div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(38,139,210,0.25),_transparent_55%)]"
        style={{ y: parallaxOffset }}
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
            className="absolute block h-px w-44 bg-gradient-to-r from-transparent via-[#d33682]/60 to-[#b58900]/80 blur-[0.5px]"
            style={{ top: trail.top, left: trail.left }}
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
          key={shape.id}
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
        <span className="w-fit rounded-full border border-[#d33682]/30 bg-[#d33682]/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-[#cb4b16]">
          Arthur José Regiani · Backend Developer
        </span>

        <div className="space-y-6">
          <motion.h1
            className="text-4xl font-semibold leading-tight text-[#eee8d5] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            Backend Developer | Learning Solution Architecture & Cloud Design
          </motion.h1>

          <motion.p
              className="text-lg text-[#93a1a1] sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
          >
            Construo produtos que fazem sentido. Se não fizer, eu refaço até fazer.
          </motion.p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="#projetos">Ver Projetos</Link>
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
              LinkedIn
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
              className="rounded-3xl border border-white/5 bg-[#073642]/40 p-5 backdrop-blur-3xl"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-[#93a1a1]">
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
