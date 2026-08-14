import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useAuth } from "../src/context/AuthContext.jsx";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create account.");
      }

      signup(data);
      console.log(data);

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      setError(error.message);
      toast.error(error.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eee9e2] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[2rem] bg-[#211b18] shadow-2xl sm:min-h-[calc(100vh-3rem)]">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#b08d57]/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-52 right-1/3 h-[32rem] w-[32rem] rounded-full bg-[#b08d57]/5 blur-3xl" />

        {/* LEFT FORM SECTION */}
        <section className="relative flex w-full items-center justify-center bg-[#f8f5f0] px-5 py-10 sm:px-10 lg:w-1/2 lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            {/* Mobile logo */}
            <div className="mb-9 lg:hidden">
              <Link
                to="/"
                className="text-2xl font-medium tracking-[0.18em] text-[#211b18]"
              >
                LUXE
              </Link>
            </div>

            {/* Back */}
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-[#81776e] transition-colors hover:text-[#b08d57]"
            >
              <FiArrowLeft size={16} />
              Back to store
            </Link>

            {/* Heading */}
            <div className="mb-7">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#b08d57]">
                Create account
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-[#211b18] sm:text-4xl">
                Join LUXE
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#81776e]">
                Create your account and discover your new essentials.
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
              className="group flex w-full items-center justify-center gap-3 rounded-xl border border-[#ddd5cc] bg-white px-5 py-3.5 text-sm font-medium text-[#302923] transition-all duration-300 hover:border-[#b08d57] hover:shadow-md"
            >
              <FcGoogle size={20} />

              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#ded6ce]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a49b92]">
                or
              </span>

              <div className="h-px flex-1 bg-[#ded6ce]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#514840]"
                >
                  Full name
                </label>

                <div className="relative">
                  <FiUser
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9087]"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    className="w-full rounded-xl border border-[#ddd5cc] bg-white py-3.5 pl-11 pr-4 text-sm text-[#211b18] outline-none transition-all placeholder:text-[#aaa098] focus:border-[#b08d57] focus:ring-4 focus:ring-[#b08d57]/10"
                  />
                </div>
              </div>

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
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#514840]"
                >
                  Password
                </label>

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
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
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

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#514840]"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <FiLock
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a9087]"
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    required
                    className="w-full rounded-xl border border-[#ddd5cc] bg-white py-3.5 pl-11 pr-12 text-sm text-[#211b18] outline-none transition-all placeholder:text-[#aaa098] focus:border-[#b08d57] focus:ring-4 focus:ring-[#b08d57]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8d837a] transition-colors hover:text-[#b08d57]"
                  >
                    {showConfirmPassword ? (
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
                className="group relative mt-2 w-full overflow-hidden rounded-xl bg-[#211b18] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#b08d57] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10">
                  {loading ? "Creating account..." : "Create account"}
                </span>
              </button>
            </form>

            {/* Login */}
            <div className="mt-7 text-center">
              <p className="text-sm text-[#81776e]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#211b18] underline decoration-[#b08d57] decoration-2 underline-offset-4 transition-colors hover:text-[#b08d57]"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Terms */}
            <p className="mx-auto mt-7 max-w-sm text-center text-[10px] leading-5 text-[#aaa098]">
              By creating an account, you agree to LUXE's Terms of Service and
              Privacy Policy.
            </p>
          </motion.div>
        </section>

        {/* RIGHT BRAND SECTION */}
        <section className="relative hidden w-1/2 overflow-hidden bg-[#211b18] lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14">
          {/* Decorative circles */}
          <div className="absolute left-[-12rem] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-white/[0.07]" />

          <div className="absolute left-[-9rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full border border-white/[0.06]" />

          {/* Top */}
          <div className="relative z-10 flex justify-end">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
              LUXE / 01
            </p>
          </div>

          {/* Center */}
          <div className="relative z-10 max-w-lg">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#d8b77d]">
              Begin your journey
            </p>

            <h1 className="text-7xl font-medium tracking-[0.18em] text-white xl:text-8xl">
              LUXE
            </h1>

            <div className="mt-8 h-px w-20 bg-[#b08d57]" />

            <p className="mt-7 max-w-md text-sm leading-7 text-white/50">
              Join a community that appreciates thoughtful design, refined
              details, and timeless style.
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
      </div>
    </div>
  );
}

export default Signup;
