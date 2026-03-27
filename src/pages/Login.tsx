import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { login, type User } from "@/utils/auth";

interface LoginProps {
  onNavigate?: (page: string) => void;
  onLogin?: (user: User) => void;
}

export default function Login({ onNavigate, onLogin }: LoginProps) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!id.trim()) {
      setError("아이디를 입력해주세요.");
      return;
    }
    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    // 실제 API 호출을 시뮬레이션하는 딜레이
    await new Promise((r) => setTimeout(r, 800));

    const result = login(id, password);

    if (result.ok) {
      onLogin?.(result.user);
      onNavigate?.("home");
    } else {
      setError(result.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-bg text-text-primary">
      {/* Left: Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
          alt="Fine Dining"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-16 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="font-serif text-5xl text-white mb-6 tracking-widest uppercase">
              Eatsfine
            </h2>
            <p className="text-white/80 text-lg font-light tracking-wide max-w-md leading-relaxed">
              Experience the pinnacle of culinary excellence. <br />
              Reserve your moment of taste.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative bg-bg">
        <button
          onClick={() => onNavigate?.("home")}
          className="absolute top-8 right-8 md:top-12 md:right-12 text-text-secondary hover:text-accent transition-colors tracking-widest text-xs uppercase flex items-center gap-2 group"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">
            ✕
          </span>{" "}
          Close
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[420px]"
        >
          <div className="mb-12 text-center lg:text-left">
            <h1 className="font-serif text-4xl mb-4 tracking-widest text-white uppercase">
              Welcome
            </h1>
            <p className="text-text-secondary font-light tracking-wide">
              Sign in to continue your journey.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-[0.2em] text-text-secondary ml-1">
                ID
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  setError("");
                }}
                className="w-full bg-bg-elevated border border-line focus:border-accent outline-none px-4 py-3.5 text-white transition-colors placeholder:text-text-muted font-light"
                placeholder="Enter your ID"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-[0.2em] text-text-secondary ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full bg-bg-elevated border border-line focus:border-accent outline-none px-4 py-3.5 text-white transition-colors placeholder:text-text-muted font-light"
                placeholder="Enter your password"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-red-400 text-[13px] tracking-wide font-light"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between text-[12px] text-text-secondary tracking-wider pt-2">
              <div className="flex items-center gap-3">
                <a href="#" className="hover:text-accent transition-colors">
                  Find ID
                </a>
                <span className="text-line text-[10px]">|</span>
                <a href="#" className="hover:text-accent transition-colors">
                  Find Password
                </a>
              </div>
              <button
                type="button"
                onClick={() => onNavigate?.("signup")}
                className="text-accent hover:text-white transition-colors"
              >
                Sign Up
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-bg font-bold uppercase tracking-[0.2em] py-4 mt-8 hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed relative"
            >
              {isLoading ? (
                <motion.span
                  className="inline-block w-5 h-5 border-2 border-bg border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-12">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute w-full h-px bg-line" />
              <span className="relative bg-bg px-4 text-[11px] uppercase tracking-[0.2em] text-text-muted">
                Or continue with
              </span>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 border border-line hover:border-[#FEE500] bg-bg-elevated py-3.5 flex items-center justify-center gap-3 transition-colors group">
                <svg
                  className="w-5 h-5 text-[#FEE500] opacity-80 group-hover:opacity-100 transition-opacity"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 3c-5.523 0-10 3.5-10 7.813 0 2.766 1.766 5.187 4.406 6.562l-1.125 4.125c-.062.25.188.469.438.344l4.75-3.281c.5.062 1.031.094 1.531.094 5.523 0 10-3.5 10-7.813S17.523 3 12 3z" />
                </svg>
                <span className="text-[12px] tracking-wider text-text-secondary group-hover:text-white transition-colors">
                  Kakao
                </span>
              </button>
              <button className="flex-1 border border-line hover:border-[#4285F4] bg-bg-elevated py-3.5 flex items-center justify-center gap-3 transition-colors group">
                <svg
                  className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-[12px] tracking-wider text-text-secondary group-hover:text-white transition-colors">
                  Google
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
