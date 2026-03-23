import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import ExperienceSection from "@/components/ExperienceSection";
import GallerySection from "@/components/GallerySection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <main className="bg-bg">
        <Header />
        <HeroSection />
        <PhilosophySection />
        <ExperienceSection />
        <GallerySection />
        <CtaSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
