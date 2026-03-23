"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "DISCOVER",
    desc: "Find the perfect ambiance for your evening.",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "SELECT",
    desc: "Choose your exact table from our layout.",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "SAVOR",
    desc: "Immerse yourself in culinary excellence.",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
  },
];

const hoverShapes = [
  "12rem 12rem 1rem 1rem", // Arch
  "1rem 1rem 12rem 12rem", // Inverted Arch
  "12rem 1rem 12rem 1rem", // Leaf
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative py-32 bg-bg">
      <div className="container mx-auto px-4">
        {experiences.map((exp, i) => {
          const y = useTransform(scrollYProgress, [0, 1], [0, (i + 1) * -50]);
          return (
            <div key={i} className="flex flex-col md:flex-row items-center justify-between py-20 border-b border-white/10 last:border-none">
              <div className="md:w-1/2">
                <motion.h3
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-[11vw] md:text-[7vw] font-serif font-medium italic text-white leading-none tracking-tight"
                >
                  {exp.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mt-4 text-xl font-light text-white/60 max-w-sm font-serif"
                >
                  {exp.desc}
                </motion.p>
              </div>
              <motion.div style={{ y }} className="md:w-1/3 mt-10 md:mt-0">
                <motion.div
                  className="overflow-hidden aspect-[4/5] w-full bg-gray-900"
                  initial={{ borderRadius: "1rem" }}
                  whileHover={{ 
                    borderRadius: hoverShapes[i % hoverShapes.length],
                    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
                  }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.img
                    whileHover={{ 
                      scale: 1.15,
                      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
                    }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    src={exp.img}
                    alt={exp.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
