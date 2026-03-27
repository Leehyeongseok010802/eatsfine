import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signUp, type User } from "@/utils/auth";

interface SignUpProps {
  onNavigate?: (page: string) => void;
  onLogin?: (user: User) => void;
}

export default function SignUp({ onNavigate, onLogin }: SignUpProps) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("이름을 입력해주세요.");
      return;
    }
    if (!id.trim()) {
      setError("아이디를 입력해주세요.");
      return;
    }
    if (id.trim().length < 3) {
      setError("아이디는 3자 이상이어야 합니다.");
      return;
    }
    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }
    if (password.length < 4) {
      setError("비밀번호는 4자 이상이어야 합니다.");
      return;
    }
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const result = signUp(id, password, name);

    if (result.ok) {
      onLogin?.(result.user);
      onNavigate?.("home");
    } else {
      setError(result.message);
      setIsLoading(false);
    }
  };

  const clearError = () => setError("");

  return (
    <div className="min-h-screen flex bg-bg text-text-primary">
      {/* Left: Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?q=80&w=2070&auto=format&fit=crop"
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
              Join Us
            </h2>
            <p className="text-white/80 text-lg font-light tracking-wide max-w-md leading-relaxed">
              Begin your journey into <br />
              extraordinary culinary experiences.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right: Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative bg-bg">
        <button
          onClick={() => onNavigate?.("login")}
          className="absolute top-8 right-8 md:top-12 md:right-12 text-text-secondary hover:text-accent transition-colors tracking-widest text-xs uppercase flex items-center gap-2 group"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">
            ←
          </span>{" "}
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[420px]"
        >
          <div className="mb-10 text-center lg:text-left">
            <h1 className="font-serif text-4xl mb-4 tracking-widest text-white uppercase">
              Sign Up
            </h1>
            <p className="text-text-secondary font-light tracking-wide">
              Create your account to get started.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-[0.2em] text-text-secondary ml-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearError();
                }}
                className="w-full bg-bg-elevated border border-line focus:border-accent outline-none px-4 py-3.5 text-white transition-colors placeholder:text-text-muted font-light"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-[0.2em] text-text-secondary ml-1">
                ID
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  clearError();
                }}
                className="w-full bg-bg-elevated border border-line focus:border-accent outline-none px-4 py-3.5 text-white transition-colors placeholder:text-text-muted font-light"
                placeholder="Choose your ID (3+ characters)"
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
                  clearError();
                }}
                className="w-full bg-bg-elevated border border-line focus:border-accent outline-none px-4 py-3.5 text-white transition-colors placeholder:text-text-muted font-light"
                placeholder="Create a password (4+ characters)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-[0.2em] text-text-secondary ml-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearError();
                }}
                className="w-full bg-bg-elevated border border-line focus:border-accent outline-none px-4 py-3.5 text-white transition-colors placeholder:text-text-muted font-light"
                placeholder="Re-enter your password"
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

            <div className="flex items-center justify-end text-[12px] text-text-secondary tracking-wider pt-1">
              <span className="mr-1.5">Already have an account?</span>
              <button
                type="button"
                onClick={() => onNavigate?.("login")}
                className="text-accent hover:text-white transition-colors"
              >
                Sign In
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-bg font-bold uppercase tracking-[0.2em] py-4 mt-6 hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed relative"
            >
              {isLoading ? (
                <motion.span
                  className="inline-block w-5 h-5 border-2 border-bg border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
