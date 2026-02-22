import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";


// Sections will be added one by one
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen ation-300 gaptransition-colors dark:bg-black bg-zinc-50">
        <Navbar />

        {/* ── Sections load here as we build them ── */}
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
