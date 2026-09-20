import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectShowcase from "./components/ProjectShowcase";
import WhyDifferent from "./components/WhyDifferent";
import HowIWork from "./components/HowIWork";
import CTASection from "./components/CTASection";
import ContentSection from "./components/ContentSection";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <WhyDifferent />
        <HowIWork />
        <ProjectShowcase />
        <ContentSection />
      </main>
      <CTASection />
    </div>
  );
}

export default App;
