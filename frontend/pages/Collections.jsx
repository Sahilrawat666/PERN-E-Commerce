import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useProducts } from "../src/context/ProductContext.jsx";

function Collections() {
  const { products, productsLoading, productsError } = useProducts();

  // Create one collection for each product category.
  const collections = Object.values(
    products.reduce((groups, product) => {
      const category = product.category;

      if (!groups[category]) {
        groups[category] = {
          name: category,
          product: product,
          count: 0,
        };
      }

      groups[category].count += 1;

      return groups;
    }, {}),
  );

  if (productsLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ee]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#ddd5cc] border-t-[#b08d57]" />

          <p className="mt-4 text-sm text-[#786f68]">Loading collections...</p>
        </div>
      </main>
    );
  }

  if (productsError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ee] px-6">
        <div className="text-center">
          <h1 className="text-2xl font-light text-[#241c18]">
            Collections unavailable
          </h1>

          <p className="mt-3 text-sm text-[#786f68]">{productsError}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ee]">
      {/* Hero */}
      <section className="px-6 pb-16 pt-16 md:px-10 md:pb-20 md:pt-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#b08d57]">
              Explore Zenova
            </p>

            <h1 className="mt-4 text-4xl font-light tracking-tight text-[#241c18] sm:text-5xl md:text-6xl">
              Collections
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-[#786f68] md:text-base">
              Explore our carefully curated collections, designed to bring
              timeless style and modern elegance to your wardrobe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections */}
      <section className="px-6 pb-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {collections.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm text-[#786f68]">
                No collections available yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.name}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  className="group"
                >
                  <Link
                    to={`/shop?category=${encodeURIComponent(collection.name)}`}
                    className="block"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#ebe5de]">
                      <img
                        src={collection.product.image_url}
                        alt={collection.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#241c18]/75 via-[#241c18]/10 to-transparent opacity-90" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#e1c99f]">
                          {collection.count}{" "}
                          {collection.count === 1 ? "Product" : "Products"}
                        </p>

                        <h2 className="mt-2 text-2xl font-light text-white">
                          {collection.name}
                        </h2>

                        <div className="mt-4 flex items-center gap-2 text-sm text-white/90">
                          <span>Explore Collection</span>

                          <FiArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Collections;
