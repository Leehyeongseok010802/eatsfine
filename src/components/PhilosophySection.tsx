import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-bg-elevated">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-20 px-[10vw]">
          <div className="flex h-[80vh] w-[60vw] flex-col justify-center gap-8 shrink-0">
            <h2 className="text-[9vw] font-serif font-medium italic leading-none text-white tracking-tight">
              OUR <span className="text-accent not-italic font-normal">PHILOSOPHY</span>
            </h2>
            <p className="max-w-xl text-2xl font-light text-white/60 font-serif">
              We believe that dining is not just about food, but about the entire experience. From the moment you step in, to the last bite.
            </p>
          </div>

          <motion.div
            style={{ rotate }}
            className="relative h-[60vh] w-[40vw] shrink-0 overflow-hidden rounded-3xl bg-gray-800 self-center"
          >
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop"
              alt="Philosophy 1"
              className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>

          <div className="flex h-[80vh] w-[60vw] flex-col justify-center gap-8 shrink-0">
            <h2 className="text-[9vw] font-serif font-medium italic leading-none text-white tracking-tight">
              CRAFTED <span className="text-accent not-italic font-normal">MOMENTS</span>
            </h2>
            <p className="max-w-xl text-2xl font-light text-white/60 font-serif">
              Every detail is meticulously curated to ensure your time with us is unforgettable.
            </p>
          </div>

          <motion.div
            style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -5]) }}
            className="relative h-[60vh] w-[40vw] shrink-0 overflow-hidden rounded-3xl bg-gray-800 self-center"
          >
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop"
              alt="Philosophy 2"
              className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
