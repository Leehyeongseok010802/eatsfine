"use client";

import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-accent overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="relative z-10 text-center px-4">
        <motion.h2 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-[13vw] font-serif font-medium italic leading-none text-bg tracking-tight mix-blend-multiply"
        >
          RESERVE
          <br />
          <span className="not-italic font-normal">YOUR TABLE</span>
        </motion.h2>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-12"
        >
          <button className="cursor-hover group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-bg px-12 py-6 text-lg font-bold uppercase tracking-widest text-accent transition-transform hover:scale-105">
            <span className="relative z-10 font-serif">Book Now</span>
            <div className="absolute inset-0 -z-10 bg-white opacity-0 transition-opacity group-hover:opacity-10" />
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-0 w-full text-center">
        <p className="text-bg/60 font-serif text-sm uppercase tracking-widest">
          Limited Availability • Seoul, Korea
        </p>
      </div>
    </section>
  );
}
