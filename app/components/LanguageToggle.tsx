"use client";

import { Button } from "@/app/components/ui/button";
import { useLanguage } from "@/app/components/LanguageProvider";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const isEnglish = language === "en";

  return (
    <Button
      type="button"
      size="sm"
      variant="secondary"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      aria-pressed={isEnglish}
      className="w-full border border-[color:var(--color-border-soft)] px-4 text-xs uppercase tracking-[0.35em]"
    >
      {isEnglish ? "EN" : "PT"}
    </Button>
  );
}
