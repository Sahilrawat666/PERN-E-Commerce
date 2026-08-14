import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useAuth } from "../src/context/AuthContext.jsx";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      login(data);
      console.log(data);
      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eee9e2] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[2rem] bg-[#211b18] shadow-2xl sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-3rem)]">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#b08d57]/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-52 left-1/3 h-[32rem] w-[32rem] rounded-full bg-[#b08d57]/5 blur-3xl" />

        {/* LEFT BRAND SECTION */}
        <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden p-10 text-white lg:flex xl:p-14">
          {/* Decorative circle */}
          <div className="absolute right-[-12rem] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-white/[0.07]" />

          <div className="absolute right-[-9rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full border border-white/[0.06]" />

          {/* Top */}
          <div className="relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#d8b77d]"
            >
              <FiArrowLeft size={16} />
              Back to store
            </Link>
          </div>

          {/* Center */}
          <div className="relative z-10 max-w-lg">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#d8b77d]">
              Refined living
            </p>

            <h1 className="text-7xl font-medium tracking-[0.18em] text-white xl:text-8xl">
              LUXE
            </h1>

            <div className="mt-8 h-px w-20 bg-[#b08d57]" />

            <p className="mt-7 max-w-md text-sm leading-7 text-white/50">
              A curated collection of timeless essentials, thoughtfully designed
              for those who appreciate the finer details.
            </p>
          </div>

          {/* Bottom */}
          <div className="relative z-10 flex items-end justify-between">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              Est. 2026
            </p>

            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              Discover • Define • LUXE
            </p>
          </div>
        </section>

        {/* RIGHT AUTH SECTION */}
        <section className="relative flex w-full items-center justify-center bg-[#f8f5f0] px-5 py-10 sm:px-10 lg:w-1/2 lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            {/* Mobile logo */}
            <div className="mb-10 lg:hidden">
              <Link
                to="/"
                className="text-2xl font-medium tracking-[0.18em] text-[#211b18]"
              >
                LUXE
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#b08d57]">
                Welcome back
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-[#211b18] sm:text-4xl">
                Sign in
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#81776e]">
                Enter your details to access your LUXE account.
              </p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </motion.div>
            )}

            {/* Google */}
            <button
              type="button"
              className="group flex w-full items-center justify-center gap-3 rounded-xl border border-[#ddd5cc] bg-white px-5 py-3.5 text-sm font-medium text-[#302923] transition-all duration-300 hover:border-[#b08d57] hover:shadow-md cursor-pointer"
            >
              <FcGoogle size={20} />
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#ded6ce]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a49b92]">
                or
              </span>

              <div className="h-px flex-1 bg-[#ded6ce]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#514840]"
                >
                  Email address
                </label>

                <div className="relative">
                  <FiMail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9087]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-[#ddd5cc] bg-white py-3.5 pl-11 pr-4 text-sm text-[#211b18] outline-none transition-all placeholder:text-[#aaa098] focus:border-[#b08d57] focus:ring-4 focus:ring-[#b08d57]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#514840]"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-[#b08d57] transition-colors hover:text-[#927343]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <FiLock
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9087]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-[#ddd5cc] bg-white py-3.5 pl-11 pr-12 text-sm text-[#211b18] outline-none transition-all placeholder:text-[#aaa098] focus:border-[#b08d57] focus:ring-4 focus:ring-[#b08d57]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8d837a] transition-colors hover:text-[#b08d57]"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative mt-2 w-full cursor-pointer overflow-hidden rounded-xl bg-[#211b18] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#b08d57] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10">
                  {loading ? "Signing in..." : "Sign in"}
                </span>
              </button>
            </form>

            {/* Signup */}
            <div className="mt-8 text-center">
              <p className="text-sm text-[#81776e]">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-[#211b18] underline decoration-[#b08d57] decoration-2 underline-offset-4 transition-colors hover:text-[#b08d57]"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* Terms */}
            <p className="mx-auto mt-8 max-w-sm text-center text-[10px] leading-5 text-[#aaa098]">
              By continuing, you agree to LUXE's Terms of Service and Privacy
              Policy.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default Login;
