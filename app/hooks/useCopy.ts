"use client";

import { translations } from "@/app/content/copy";
import { useLanguage } from "@/app/components/LanguageProvider";

export function useCopy() {
  const { language } = useLanguage();
  return translations[language];
}
