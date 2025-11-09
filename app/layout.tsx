import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LenisProvider from "@/app/components/LenisProvider";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import ThemeToggle from "@/app/components/ThemeToggle";
import { LanguageProvider } from "@/app/components/LanguageProvider";
import LanguageToggle from "@/app/components/LanguageToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arthur José Regiani",
  description:
    "Landing page pessoal.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="solarized-dark">
      <head>
        {/* Link direto para favicon como fallback para garantir carregamento em todos os navegadores */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        {/* Apple devices prefer PNG but SVG can be used as a compact fallback */}
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[var(--color-background)] text-[var(--color-text)] antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <LenisProvider>
              <div className="fixed right-4 top-4 z-50 flex flex-col gap-2 sm:right-8 sm:top-8">
                <ThemeToggle />
                <LanguageToggle />
              </div>
              {children}
            </LenisProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
