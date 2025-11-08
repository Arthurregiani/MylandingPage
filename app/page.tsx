import About from "@/app/components/About";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import Projects from "@/app/components/Projects";
import TechStack from "@/app/components/TechStack";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div
          className="mx-auto h-full w-full max-w-6xl"
          style={{
            background:
              "radial-gradient(circle at center, var(--page-radial-color) 0%, transparent var(--page-radial-fade))",
          }}
        />
      </div>
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
