import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import type { User } from "@/utils/auth";

interface HeaderProps {
  onNavigate?: (page: string) => void;
  user?: User | null;
  onLogout?: () => void;
}

export default function Header({ onNavigate, user, onLogout }: HeaderProps) {
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
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.("home");
          }}
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
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("reserve");
            }}
            className="text-white text-[12px] tracking-[0.2em] font-light uppercase hover:text-accent transition-colors duration-300 relative group flex items-center gap-2"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(200,169,126,0.8)]"
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            Reserve
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
          </a>

          <AnimatePresence mode="wait">
            {user ? (
              <motion.div
                key="user-menu"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-6"
              >
                <button
                  onClick={() => onNavigate?.("mypage")}
                  className="text-accent text-[12px] tracking-[0.15em] font-light uppercase hover:text-white transition-colors duration-300 relative group"
                >
                  {user.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                </button>
                <button
                  onClick={onLogout}
                  className="text-text-secondary text-[12px] tracking-[0.2em] font-light uppercase hover:text-white transition-colors duration-300 relative group"
                >
                  Logout
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                </button>
              </motion.div>
            ) : (
              <motion.a
                key="login-link"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.("login");
                }}
                className="text-white text-[12px] tracking-[0.2em] font-light uppercase hover:text-accent transition-colors duration-300 relative group"
              >
                Login
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </motion.a>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </motion.header>
  );
}
