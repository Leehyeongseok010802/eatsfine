import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <motion.header className="fixed top-0 left-0 w-full z-50">
      <motion.div
        className="absolute inset-0 bg-bg/80 backdrop-blur-xl"
        style={{ opacity }}
      />
      <div className="relative h-[72px] flex items-center justify-between px-8 md:px-12 max-w-[1800px] mx-auto">
        <motion.a
          href="#"
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{ scale: 1.03 }}
        >
          <img src="/logo.svg" alt="Eatsfine" className="h-[28px] w-auto" />
          <span className="text-white text-[18px] tracking-[0.25em] font-light uppercase">
            Eatsfine
          </span>
        </motion.a>

        <motion.nav
          className="hidden md:flex items-center gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {["Experience", "Reserve", "About"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white text-[12px] tracking-[0.2em] font-light uppercase hover:text-accent transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </motion.nav>
      </div>
    </motion.header>
  );
}
