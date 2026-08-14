import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

function PromoBanner() {
  return (
    <section className="bg-[#241c18] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden border border-[#b08d57]/30 px-7 py-12 text-center sm:px-12 sm:py-16"
        >
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[#b08d57]/10 blur-3xl" />

          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[#b08d57]/10 blur-3xl" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d8b77d]">
              LUXE Private Edit
            </p>

            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
              Elevate your everyday.
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#c5bbb2] sm:text-base">
              Thoughtfully designed pieces that bring quiet luxury into every
              moment.
            </p>

            <a
              href="/shop"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#b08d57] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#927343]"
            >
              Discover LUXE
              <FiArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PromoBanner;
