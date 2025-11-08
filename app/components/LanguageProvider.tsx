"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Language } from "@/lib/i18n";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const STORAGE_KEY = "preferred-language";

function resolveInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "pt";
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored === "pt" || stored === "en") {
      return stored;
    }
  } catch {
    // ignore storage issues
  }

  if (typeof navigator !== "undefined") {
    const userLang = navigator.language?.toLowerCase();
    if (userLang.startsWith("en")) return "en";
    return "pt";
  }

  return "pt";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => resolveInitialLanguage());

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore write failures
    }
  }, [language]);

  const setLanguage = useCallback((value: Language) => {
    setLanguageState(value);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === "pt" ? "en" : "pt"));
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
    }),
    [language, setLanguage, toggleLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
