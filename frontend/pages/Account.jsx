import React from "react";
import { FiArrowLeft, FiMail, FiLock } from "react-icons/fi";

function Account() {
  return (
    <main className="min-h-screen bg-[#f7f3ee] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-md">
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#786f68] transition-colors hover:text-[#b08d57]"
        >
          <FiArrowLeft size={16} />
          Back to ZENOVA
        </a>

        <div className="bg-white p-7 shadow-[0_10px_40px_rgba(36,28,24,0.06)] sm:p-10">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b08d57]">
              Welcome to
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#241c18]">
              ZENOVA
            </h1>

            <p className="mt-3 text-sm text-[#786f68]">
              Sign in to access your account.
            </p>
          </div>

          <form className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#302923]"
              >
                Email
              </label>

              <div className="flex items-center gap-3 border border-[#d8cec3] px-4 py-3 focus-within:border-[#b08d57]">
                <FiMail size={18} className="text-[#a49b92]" />

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm text-[#241c18] outline-none placeholder:text-[#a49b92]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#302923]"
              >
                Password
              </label>

              <div className="flex items-center gap-3 border border-[#d8cec3] px-4 py-3 focus-within:border-[#b08d57]">
                <FiLock size={18} className="text-[#a49b92]" />

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-transparent text-sm text-[#241c18] outline-none placeholder:text-[#a49b92]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#241c18] py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b08d57]"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#786f68]">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-[#b08d57] hover:text-[#927343]"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Account;
