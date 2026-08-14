import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();

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
      {/* Brand Panel */}
      <div className="relative hidden overflow-hidden bg-[#241c18] lg:flex lg:min-h-screen lg:items-center lg:justify-center">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#b08d57]/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#b08d57]/10 blur-3xl" />

        <div className="relative max-w-md px-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d8b77d]">
            Welcome to
          </p>

          <h1 className="mt-5 text-6xl font-semibold tracking-[0.2em] text-white">
            LUXE
          </h1>

          <p className="mt-6 text-sm leading-7 text-[#b9aea4]">
            Timeless essentials for modern living. Discover thoughtfully
            designed pieces made to become part of your everyday.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[#786f68] transition-colors hover:text-[#b08d57]"
          >
            <FiArrowLeft size={16} />
            Back to LUXE
          </Link>

          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b08d57]">
              Welcome back
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#241c18] sm:text-4xl">
              Sign in to your account
            </h2>

            <p className="mt-3 text-sm text-[#786f68]">
              Enter your details to continue shopping.
            </p>
          </div>

          {/* Google */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-[#d8cec3] bg-white px-5 py-3.5 text-sm font-medium text-[#302923] transition-all hover:border-[#b08d57] hover:shadow-sm"
          >
            <span className="text-base font-bold">G</span>
            Continue with Google
          </button>

          <div className="my-7 flex items-center gap-4">
            <span className="h-px flex-1 bg-[#e5ddd4]" />

            <span className="text-xs uppercase tracking-wider text-[#a49b92]">
              or
            </span>

            <span className="h-px flex-1 bg-[#e5ddd4]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

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
                className="w-full rounded-xl border border-[#d8cec3] bg-white px-4 py-3.5 text-sm text-[#241c18] outline-none transition-all placeholder:text-[#a49b92] focus:border-[#b08d57] focus:ring-2 focus:ring-[#b08d57]/10"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#302923]"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-[#b08d57] hover:text-[#927343]"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-[#d8cec3] bg-white px-4 py-3.5 pr-12 text-sm text-[#241c18] outline-none transition-all placeholder:text-[#a49b92] focus:border-[#b08d57] focus:ring-2 focus:ring-[#b08d57]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#786f68] hover:text-[#b08d57]"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#241c18] px-5 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#b08d57] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#786f68]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-[#b08d57] hover:text-[#927343]"
            >
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
