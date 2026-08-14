import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Linen Relaxed Shirt",
    category: "Men",
    price: "₹2,499",
    rating: "4.9",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Structured Leather Bag",
    category: "Accessories",
    price: "₹4,999",
    rating: "4.8",
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Minimal Gold Watch",
    category: "Accessories",
    price: "₹6,499",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Classic Wool Coat",
    category: "Women",
    price: "₹7,999",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
  },
];

function FeaturedProducts() {
  return (
    <section className="bg-[#f7f3ee] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
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

          <a
            href="/shop"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#302923] hover:text-[#b08d57]"
          >
            Shop all
            <FiArrowUpRight
              size={17}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
