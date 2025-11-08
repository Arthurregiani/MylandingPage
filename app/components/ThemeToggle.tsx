"use client";

import { LuMoon, LuSun } from "react-icons/lu";
import { Button } from "@/app/components/ui/button";
import { useTheme } from "@/app/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "solarized-light";

  return (
    <Button
      type="button"
      size="sm"
      variant="secondary"
      onClick={toggleTheme}
      aria-pressed={isLight}
      aria-label="Toggle Solarized theme"
      className="w-full border border-[color:var(--color-border-soft)] px-4 text-xs uppercase tracking-[0.3em] backdrop-blur-xl"
    >
      {isLight ? (
        <>
          <LuMoon className="text-base" />
          <span>Dark</span>
        </>
      ) : (
        <>
          <LuSun className="text-base" />
          <span>Light</span>
        </>
      )}
    </Button>
  );
}
