import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import ExperienceSection from "@/components/ExperienceSection";
import GallerySection from "@/components/GallerySection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-bg">
      <Header />
      <HeroSection />
      <PhilosophySection />
      <ExperienceSection />
      <GallerySection />
      <CtaSection />
      <Footer />
    </main>
  );
}
