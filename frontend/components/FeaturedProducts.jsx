import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useProducts } from "../src/context/ProductContext.jsx";

function FeaturedProducts() {
  const { products, productsLoading, productsError } = useProducts();

  // Show the highest-rated products first.
  const featuredProducts = [...products]
    .sort((a, b) => Number(b.rating) - Number(a.rating))
    .slice(0, 4);

  return (
    <section className="bg-[#f7f3ee] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#b08d57]" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b08d57]">
                Curated Selection
              </span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-[#241c18] sm:text-4xl lg:text-5xl">
              Featured pieces
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#786f68] sm:text-base">
              Discover the pieces our community is loving right now.
            </p>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#302923] hover:text-[#b08d57]"
          >
            Shop all
            <FiArrowUpRight
              size={17}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

        {/* Loading */}
        {productsLoading && (
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="aspect-[3/4] bg-[#ebe5de]" />

                <div className="mt-4 h-4 w-2/3 rounded bg-[#ebe5de]" />

                <div className="mt-2 h-4 w-1/3 rounded bg-[#ebe5de]" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!productsLoading && productsError && (
          <div className="py-16 text-center">
            <p className="text-sm text-red-600">{productsError}</p>
          </div>
        )}

        {/* Products */}
        {!productsLoading && !productsError && featuredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* No products */}
        {!productsLoading &&
          !productsError &&
          featuredProducts.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm text-[#786f68]">
                No featured products available.
              </p>
            </div>
          )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
