import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Marquee from "./Marquee";

interface HeroSectionProps {
  onNavigate?: (page: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full overflow-hidden bg-bg">
      <motion.div style={{ y, scale, opacity }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop"
          alt="Fine Dining"
          className="h-full w-full object-cover brightness-50"
        />
      </motion.div>

      <div className="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[13vw] font-medium italic leading-[0.85] tracking-tight text-white mix-blend-difference md:text-[11vw]"
        >
          EATSFINE
          <br />
          <span className="text-accent not-italic font-normal">DINING</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <p className="max-w-md text-lg font-light text-white/80 md:text-xl font-serif italic tracking-wide">
            Experience the art of fine dining.
            <br /> Reserve your perfect table.
          </p>
          <button 
            onClick={() => onNavigate?.("reserve")}
            className="cursor-hover group relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-3 backdrop-blur-sm transition-all hover:bg-accent hover:border-accent"
          >
            <span className="relative z-10 text-sm font-medium uppercase tracking-widest text-white group-hover:text-black">
              Reserve Now
            </span>
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-full z-20">
        <Marquee text=" • FINE DINING • RESERVATION • EXPERIENCE • TASTE • " speed={30} />
      </div>
    </section>
  );
}
