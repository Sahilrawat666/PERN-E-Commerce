import { motion } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f7f3ee]">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-xl"
        >
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#b08d57]" />

            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b08d57]">
              The New Collection
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#241c18] sm:text-6xl lg:text-7xl">
            Timeless
            <span className="block font-normal italic text-[#b08d57]">
              elegance.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-lg text-base leading-7 text-[#786f68] sm:text-lg">
            Discover thoughtfully designed essentials created for modern living.
            Refined materials, timeless silhouettes, and effortless
            sophistication.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="/shop"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#241c18] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b08d57]"
            >
              Explore Collection
              <FiArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="/collections"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d8cec3] bg-white/50 px-7 py-3.5 text-sm font-medium text-[#302923] transition-all duration-300 hover:border-[#b08d57] hover:text-[#b08d57]"
            >
              <FiPlay size={15} />
              View Lookbook
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex items-center gap-8 border-t border-[#e5ddd4] pt-7">
            <div>
              <p className="text-2xl font-semibold text-[#241c18]">10K+</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-[#786f68]">
                Happy Customers
              </p>
            </div>

            <div className="h-10 w-px bg-[#d8cec3]" />

            <div>
              <p className="text-2xl font-semibold text-[#241c18]">4.9/5</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-[#786f68]">
                Customer Rating
              </p>
            </div>
          </div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] max-w-[560px] overflow-hidden bg-[#e9e0d6]">
            {/* Replace this URL with your actual product/hero image later */}
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85"
              alt="LUXE collection"
              className="h-full w-full object-cover"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#241c18]/30 via-transparent to-transparent" />

            {/* Floating label */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute bottom-6 right-6 bg-[#f7f3ee]/95 px-5 py-4 shadow-xl backdrop-blur-sm"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b08d57]">
                Featured
              </p>

              <p className="mt-1 text-sm font-medium text-[#241c18]">
                Signature Collection
              </p>
            </motion.div>
          </div>

          {/* Decorative frame */}
          <div className="pointer-events-none absolute -bottom-4 -right-4 -z-0 h-full w-full border border-[#b08d57]/30" />

          {/* Vertical text */}
          <div className="absolute -right-8 top-1/2 hidden -translate-y-1/2 rotate-90 lg:block">
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#a49b92]">
              Modern Living • Est. 2026
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
