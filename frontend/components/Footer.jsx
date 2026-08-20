import {
  FiArrowUp,
  FiFacebook,
  FiInstagram,
  FiMail,
  FiTwitter,
} from "react-icons/fi";

const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "/shop?sort=new" },
    { label: "Best Sellers", href: "/shop?sort=popular" },
    { label: "Women", href: "/shop?category=women" },
    { label: "Men", href: "/shop?category=men" },
  ],
  Help: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "FAQs", href: "/faq" },
    { label: "Track Order", href: "/track-order" },
  ],
  Company: [
    { label: "About ZENOVA", href: "/about" },
    { label: "Our Story", href: "/story" },
    { label: "Journal", href: "/journal" },
    { label: "Careers", href: "/careers" },
  ],
};

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#241c18] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="/" className="text-2xl font-semibold tracking-[0.25em]">
              ZENOVA
            </a>

            <p className="mt-5 max-w-sm text-sm leading-6 text-[#b9aea4]">
              Timeless essentials for modern living. Thoughtfully designed,
              beautifully made.
            </p>

            <a
              href="mailto:hello@Zenova.com"
              className="mt-6 inline-flex items-center gap-2 text-sm text-[#d8b77d] transition-colors hover:text-white"
            >
              <FiMail size={16} />
              hello@Zenova.com
            </a>

            <div className="mt-7 flex gap-2">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#b9aea4] transition-all hover:border-[#b08d57] hover:bg-[#b08d57] hover:text-white"
              >
                <FiInstagram size={16} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#b9aea4] transition-all hover:border-[#b08d57] hover:bg-[#b08d57] hover:text-white"
              >
                <FiFacebook size={16} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#b9aea4] transition-all hover:border-[#b08d57] hover:bg-[#b08d57] hover:text-white"
              >
                <FiTwitter size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b77d]">
                {title}
              </h3>

              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#b9aea4] transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
          <p className="text-xs text-[#8f837a]">
            © 2026 ZENOVA. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="/privacy"
              className="text-xs text-[#8f837a] hover:text-white"
            >
              Privacy
            </a>

            <a
              href="/terms"
              className="text-xs text-[#8f837a] hover:text-white"
            >
              Terms
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#b9aea4] transition-all hover:border-[#b08d57] hover:bg-[#b08d57] hover:text-white"
            >
              <FiArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
