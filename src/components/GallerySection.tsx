import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const images = [
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80",
  "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
  "https://images.unsplash.com/photo-1482275548304-a58859dc31b7?w=800&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
];

export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  return (
    <section ref={containerRef} className="py-32 bg-bg overflow-hidden">
      <div className="mb-20 px-4 text-center">
        <h2 className="text-[9vw] font-serif font-medium italic text-white tracking-tight leading-none">
          VISUAL <span className="text-accent not-italic font-normal">FEAST</span>
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        <motion.div style={{ x: x1 }} className="flex gap-8 w-[150vw]">
          {images.slice(0, 3).map((src, i) => (
            <div key={i} className="w-[40vw] aspect-video rounded-2xl overflow-hidden shrink-0">
              <img src={src} alt={`Gallery ${i}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          ))}
        </motion.div>
        <motion.div style={{ x: x2 }} className="flex gap-8 w-[150vw] ml-[-20vw]">
          {images.slice(3, 6).map((src, i) => (
            <div key={i} className="w-[40vw] aspect-video rounded-2xl overflow-hidden shrink-0">
              <img src={src} alt={`Gallery ${i + 3}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
