import About from "@/app/components/About";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import Projects from "@/app/components/Projects";
import TechStack from "@/app/components/TechStack";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#002b36] text-[#839496]">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="mx-auto h-full w-full max-w-6xl bg-[radial-gradient(circle_at_center,_rgba(42,161,152,0.12),_transparent_60%)]" />
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
