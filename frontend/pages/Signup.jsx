import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

function Signup() {
  const navigate = useNavigate();

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

      localStorage.setItem("luxe_token", data.token);
      localStorage.setItem("luxe_user", JSON.stringify(data.user));

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f3ee] lg:grid lg:grid-cols-2">
      {/* Brand */}
      <div className="relative hidden overflow-hidden bg-[#241c18] lg:flex lg:min-h-screen lg:items-center lg:justify-center lg:order-2">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#b08d57]/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#b08d57]/10 blur-3xl" />

        <div className="relative max-w-md px-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d8b77d]">
            Begin your journey
          </p>

          <h1 className="mt-5 text-6xl font-semibold tracking-[0.2em] text-white">
            LUXE
          </h1>

          <p className="mt-6 text-sm leading-7 text-[#b9aea4]">
            Join a community that appreciates thoughtful design, refined
            details, and timeless style.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8 lg:order-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#786f68] transition-colors hover:text-[#b08d57]"
          >
            <FiArrowLeft size={16} />
            Back to LUXE
          </Link>

          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b08d57]">
              Create account
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#241c18] sm:text-4xl">
              Join LUXE
            </h2>

            <p className="mt-3 text-sm text-[#786f68]">
              Create your account and discover your new essentials.
            </p>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-[#d8cec3] bg-white px-5 py-3.5 text-sm font-medium text-[#302923] transition-all hover:border-[#b08d57] hover:shadow-sm"
          >
            <span className="text-base font-bold">G</span>
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-[#e5ddd4]" />

            <span className="text-xs uppercase tracking-wider text-[#a49b92]">
              or
            </span>

            <span className="h-px flex-1 bg-[#e5ddd4]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#302923]"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                autoComplete="name"
                required
                className="w-full rounded-xl border border-[#d8cec3] bg-white px-4 py-3.5 text-sm outline-none transition-all placeholder:text-[#a49b92] focus:border-[#b08d57] focus:ring-2 focus:ring-[#b08d57]/10"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#302923]"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-[#d8cec3] bg-white px-4 py-3.5 text-sm outline-none transition-all placeholder:text-[#a49b92] focus:border-[#b08d57] focus:ring-2 focus:ring-[#b08d57]/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#302923]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-xl border border-[#d8cec3] bg-white px-4 py-3.5 pr-12 text-sm outline-none transition-all placeholder:text-[#a49b92] focus:border-[#b08d57] focus:ring-2 focus:ring-[#b08d57]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#786f68] hover:text-[#b08d57]"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-[#302923]"
              >
                Confirm password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-xl border border-[#d8cec3] bg-white px-4 py-3.5 pr-12 text-sm outline-none transition-all placeholder:text-[#a49b92] focus:border-[#b08d57] focus:ring-2 focus:ring-[#b08d57]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#786f68] hover:text-[#b08d57]"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#241c18] px-5 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#b08d57] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#786f68]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#b08d57] hover:text-[#927343]"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
