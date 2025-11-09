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
    "Profile landing page.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
        {/* Favicons para compatibilidade ampla across browsers */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Keep SVG as high-quality mask-icon for browsers that support it */}
        <link rel="mask-icon" href="/favicon.svg" color="#268bd2" />
        <meta name="theme-color" content="#002b36" />
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
