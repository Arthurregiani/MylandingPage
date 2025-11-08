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
    icon: "/solarized-icon.svg",
    shortcut: "/solarized-icon.svg",
    apple: "/solarized-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="solarized-dark">
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
