import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useProducts } from "../src/context/ProductContext.jsx";

function FeaturedCollections() {
  const { products, productsLoading, productsError } = useProducts();

  // Use real products from Neon as collection cover images.
  const newArrivalsProduct = [...products].sort((a, b) => b.id - a.id)[0];

  const menProduct = products.find(
    (product) => product.gender?.toLowerCase() === "men",
  );

  const womenProduct = products.find(
    (product) => product.gender?.toLowerCase() === "women",
  );

  const collections = [
    {
      title: "New Arrivals",
      subtitle: "Freshly curated",
      image: newArrivalsProduct?.image_url,
      href: "/shop",
    },
    {
      title: "Men's Edit",
      subtitle: "Refined essentials",
      image: menProduct?.image_url,
      href: "/shop?gender=Men",
    },
    {
      title: "Women's Edit",
      subtitle: "Modern elegance",
      image: womenProduct?.image_url,
      href: "/shop?gender=Women",
    },
  ];

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

          <Link
            to="/collections"
            className="group inline-flex items-center gap-2 self-start text-sm font-medium text-[#302923] transition-colors hover:text-[#b08d57] sm:self-auto"
          >
            View all
            <FiArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

        {/* Loading */}
        {productsLoading && (
          <div className="grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="aspect-[4/5] animate-pulse bg-[#e9e0d6]"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!productsLoading && productsError && (
          <div className="py-16 text-center">
            <p className="text-sm text-red-600">{productsError}</p>
          </div>
        )}

        {/* Collection Cards */}
        {!productsLoading && !productsError && products.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              >
                <Link
                  to={collection.href}
                  className="group relative block aspect-[4/5] overflow-hidden bg-[#e9e0d6]"
                >
                  {/* Image */}
                  {collection.image ? (
                    <img
                      src={collection.image}
                      alt={collection.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-[#e9e0d6]" />
                  )}

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
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedCollections;
