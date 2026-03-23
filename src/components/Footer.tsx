import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-bg-elevated py-20 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-[16vw] font-serif font-medium italic text-white leading-[0.8] tracking-tight mix-blend-difference"
          >
            EATSFINE
          </motion.h2>
          <div className="mt-10 flex flex-wrap justify-center gap-8 md:gap-16">
            {["Instagram", "Twitter", "LinkedIn", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="cursor-hover text-lg font-light text-white/60 hover:text-accent transition-colors uppercase tracking-widest font-serif"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="mt-20 w-full border-t border-white/10 pt-8 flex justify-between text-sm text-white/40 font-serif">
            <span>© 2025 Eatsfine Inc.</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
