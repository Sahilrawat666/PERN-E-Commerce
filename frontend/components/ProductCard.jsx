import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useWishlist } from "../src/context/WishlistContext.jsx";
import { useCart } from "../src/context/CartContext.jsx";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const productInWishlist = isInWishlist(product.id);
  const { addToCart } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#eee7df]">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-4 top-4  bg-[#241c18] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label={
            productInWishlist ? "Remove from wishlist" : "Add to wishlist"
          }
          onClick={() => toggleWishlist(product)}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 ${
            productInWishlist
              ? "bg-[#b08d57] text-white"
              : "bg-white/90 text-[#302923] hover:bg-[#241c18] hover:text-white"
          }`}
        >
          <FiHeart
            size={18}
            fill={productInWishlist ? "currentColor" : "none"}
          />
        </button>
        {/* Add to cart */}
        <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => {
              addToCart(product);
            }}
            className="flex w-full items-center justify-center gap-2 bg-[#241c18] py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b08d57]"
          >
            <FiShoppingBag size={17} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="pt-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-[#a49b92]">
              {product.category}
            </p>

            <h3 className="mt-1.5 text-base font-medium text-[#241c18] transition-colors group-hover:text-[#b08d57]">
              {product.name}
            </h3>
          </div>

          <p className="shrink-0 text-sm font-semibold text-[#241c18]">
            {product.price}
          </p>
        </div>

        <div className="mt-2 flex items-center gap-1">
          <FiStar size={13} fill="#b08d57" className="text-[#b08d57]" />

          <span className="text-xs text-[#786f68]">{product.rating}</span>
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;
