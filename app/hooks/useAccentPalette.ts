"use client";

import { useTheme } from "@/app/components/ThemeProvider";
import { solarizedAccentsDark, solarizedAccentsLight } from "@/lib/palette";

export function useAccentPalette() {
  const { theme } = useTheme();
  return theme === "solarized-light"
    ? solarizedAccentsLight
    : solarizedAccentsDark;
}
