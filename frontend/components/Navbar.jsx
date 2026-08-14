import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiHeart,
  FiMenu,
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext.jsx";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const accountRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (!accountRef.current?.contains(e.target)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5ddd4] bg-[#f7f3ee]/95 shadow-[0_2px_20px_rgba(36,28,24,0.05)] backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <a
          href="/"
          className="shrink-0 text-2xl font-semibold tracking-[0.25em] text-[#241c18] transition-colors duration-300 hover:text-[#b08d57]"
        >
          LUXE
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative py-2 text-sm font-medium tracking-wide text-[#786f68] transition-colors duration-300 hover:text-[#241c18]"
            >
              {link.label}

              <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-[#b08d57] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((current) => !current)}
            className="rounded-full p-2.5 text-[#786f68] transition-all duration-300 hover:bg-[#ebe3da] hover:text-[#b08d57] cursor-pointer"
          >
            <FiSearch size={20} strokeWidth={1.7} />
          </button>

          {/* Account */}
          <div ref={accountRef} className="relative hidden sm:block">
            <button
              type="button"
              aria-label="Account"
              onClick={() => setAccountOpen((current) => !current)}
              className="rounded-full p-2.5 text-[#786f68] transition-all duration-300 hover:bg-[#ebe3da] hover:text-[#b08d57] cursor-pointer"
            >
              <FiUser size={20} strokeWidth={1.7} />
            </button>

            <AnimatePresence>
              {accountOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-14 w-56 overflow-hidden rounded-2xl border border-[#e5ddd4] bg-[#f7f3ee] p-2 shadow-xl"
                >
                  {!isAuthenticated ? (
                    <>
                      <div className="px-3 py-3">
                        <p className="text-sm font-semibold text-[#241c18]">
                          Welcome to LUXE
                        </p>

                        <p className="mt-1 text-xs text-[#786f68]">
                          Sign in to manage your account.
                        </p>
                      </div>

                      <div className="my-1 h-px bg-[#e5ddd4]" />

                      <Link
                        to="/login"
                        onClick={() => setAccountOpen(false)}
                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#302923] transition-colors hover:bg-[#ebe3da] hover:text-[#b08d57]"
                      >
                        Sign In
                      </Link>

                      <Link
                        to="/signup"
                        onClick={() => setAccountOpen(false)}
                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#302923] transition-colors hover:bg-[#ebe3da] hover:text-[#b08d57]"
                      >
                        Create Account
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="px-3 py-3">
                        <p className="text-xs font-medium uppercase tracking-wider text-[#b08d57]">
                          Welcome back
                        </p>

                        <p className="mt-1 truncate text-sm font-semibold text-[#241c18]">
                          {user.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-[#786f68]">
                          {user.email}
                        </p>
                      </div>

                      <div className="my-1 h-px bg-[#e5ddd4]" />

                      <Link
                        to="/account"
                        onClick={() => setAccountOpen(false)}
                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#302923] transition-colors hover:bg-[#ebe3da] hover:text-[#b08d57]"
                      >
                        My Account
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setAccountOpen(false)}
                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#302923] transition-colors hover:bg-[#ebe3da] hover:text-[#b08d57]"
                      >
                        My Orders
                      </Link>

                      <Link
                        to="/wishlist"
                        onClick={() => setAccountOpen(false)}
                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#302923] transition-colors hover:bg-[#ebe3da] hover:text-[#b08d57]"
                      >
                        Wishlist
                      </Link>

                      <div className="my-1 h-px bg-[#e5ddd4]" />

                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setAccountOpen(false);
                        }}
                        className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Wishlist */}
          <a
            href="/wishlist"
            aria-label="Wishlist"
            className="relative hidden rounded-full p-2.5 text-[#786f68] transition-all duration-300 hover:bg-[#ebe3da] hover:text-[#b08d57] sm:block"
          >
            <FiHeart size={20} strokeWidth={1.7} />

            <span className="absolute right-1 top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#b08d57] px-1 text-[9px] font-semibold text-white">
              0
            </span>
          </a>

          {/* Cart */}
          <a
            href="/cart"
            aria-label="Shopping bag"
            className="relative rounded-full p-2.5 text-[#786f68] transition-all duration-300 hover:bg-[#ebe3da] hover:text-[#b08d57]"
          >
            <FiShoppingBag size={20} strokeWidth={1.7} />

            <span className="absolute right-1 top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#b08d57] px-1 text-[9px] font-semibold text-white">
              0
            </span>
          </a>

          {/* Mobile menu */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="rounded-full p-2.5 text-[#786f68] transition-all duration-300 hover:bg-[#ebe3da] hover:text-[#b08d57] lg:hidden"
          >
            {mobileMenuOpen ? (
              <FiX size={22} strokeWidth={1.7} />
            ) : (
              <FiMenu size={22} strokeWidth={1.7} />
            )}
          </button>
        </div>
      </div>

      {/* Search Panel */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-[#e5ddd4] z-50"
          >
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-4 sm:px-8 lg:px-10">
              <FiSearch size={20} className="shrink-0 text-[#b08d57]" />

              <input
                type="search"
                placeholder="Search products..."
                autoFocus
                className="w-full bg-transparent text-sm text-[#241c18] outline-none placeholder:text-[#a49b92]"
              />

              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="shrink-0 text-sm font-medium text-[#786f68] transition-colors hover:text-[#b08d57] cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-[#e5ddd4] bg-[#f7f3ee] lg:hidden"
          >
            <nav className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
              <div className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.05,
                    }}
                    className="border-b border-[#e5ddd4] py-4 text-sm font-medium tracking-wide text-[#302923] transition-colors hover:text-[#b08d57]"
                  >
                    {link.label}
                  </motion.a>
                ))}

                <div className="flex gap-3 pt-5 sm:hidden">
                  <a
                    href="/account"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#d8cec3] bg-white py-3 text-sm font-medium text-[#302923] transition-all hover:border-[#b08d57] hover:text-[#b08d57]"
                  >
                    <FiUser size={18} />
                    Account
                  </a>

                  <a
                    href="/wishlist"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#d8cec3] bg-white py-3 text-sm font-medium text-[#302923] transition-all hover:border-[#b08d57] hover:text-[#b08d57]"
                  >
                    <FiHeart size={18} />
                    Wishlist
                  </a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
