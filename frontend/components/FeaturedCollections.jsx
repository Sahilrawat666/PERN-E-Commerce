import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const collections = [
  {
    title: "New Arrivals",
    subtitle: "Freshly curated",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85",
    href: "/shop?collection=new-arrivals",
  },
  {
    title: "Timeless Essentials",
    subtitle: "Designed to last",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
    href: "/shop?collection=essentials",
  },
  {
    title: "The Edit",
    subtitle: "Our signature pieces",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
    href: "/shop?collection=the-edit",
  },
];

function FeaturedCollections() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#b08d57]" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b08d57]">
                Curated For You
              </span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-[#241c18] sm:text-4xl lg:text-5xl">
              Explore our collections
            </h2>
          </div>

          <a
            href="/shop"
            className="group inline-flex items-center gap-2 self-start text-sm font-medium text-[#302923] transition-colors hover:text-[#b08d57] sm:self-auto"
          >
            View all
            <FiArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>

        {/* Collection Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {collections.map((collection, index) => (
            <motion.a
              key={collection.title}
              href={collection.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="group relative block aspect-[4/5] overflow-hidden bg-[#e9e0d6]"
            >
              {/* Image */}
              <img
                src={collection.image}
                alt={collection.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#241c18]/70 via-[#241c18]/10 to-transparent" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b77d]">
                  {collection.subtitle}
                </p>

                <div className="flex items-end justify-between gap-4">
                  <h3 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                    {collection.title}
                  </h3>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-[#b08d57] group-hover:bg-[#b08d57]">
                    <FiArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollections;
