"use client";

import { motion } from "framer-motion";

export default function Marquee({ text, speed = 20 }: { text: string; speed?: number }) {
  return (
    <div className="relative w-full overflow-hidden bg-accent py-4 flex items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-bg text-[18px] md:text-[24px] font-bold uppercase tracking-widest px-8">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
