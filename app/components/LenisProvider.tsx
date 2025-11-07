"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export default function LenisProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.12,
    });

    const frame = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);

    return () => {
      lenis.destroy();
    };
  }, []);

  return children;
}
