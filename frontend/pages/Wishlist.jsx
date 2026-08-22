import { Link } from "react-router-dom";
import { FiArrowLeft, FiHeart, FiTrash2 } from "react-icons/fi";
import { useWishlist } from "../src/context/WishlistContext.jsx";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      {/* Header */}
      <section className="border-b border-[#ddd5cc] px-6 py-14 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#b08d57]">
            Your Selection
          </p>

          <div className="mt-3 flex items-end justify-between gap-5">
            <div>
              <h1 className="text-4xl font-light tracking-tight text-[#302923] md:text-5xl">
                Wishlist
              </h1>

              <p className="mt-3 text-sm text-[#81776e]">
                {wishlist.length} {wishlist.length === 1 ? "item" : "items"}{" "}
                saved
              </p>
            </div>

            <Link
              to="/shop"
              className="hidden items-center gap-2 text-sm font-medium text-[#302923] transition-colors hover:text-[#b08d57] sm:flex"
            >
              <FiArrowLeft size={17} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* Wishlist */}
      <section className="px-6 py-12 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {wishlist.length === 0 ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#b08d57]">
                <FiHeart size={26} strokeWidth={1.5} />
              </div>

              <h2 className="mt-6 text-2xl font-light text-[#302923]">
                Your wishlist is empty
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#81776e]">
                Save pieces you love and come back to them whenever you're
                ready.
              </p>

              <Link
                to="/shop"
                className="mt-7 bg-[#241c18] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b08d57]"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-y-14">
              {wishlist.map((product) => (
                <article key={product.id} className="group">
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

                    <button
                      type="button"
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#b08d57] backdrop-blur-sm transition-all hover:bg-[#241c18] hover:text-white"
                    >
                      <FiTrash2 size={17} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="pt-4">
                    <p className="text-xs uppercase tracking-[0.15em] text-[#a49b92]">
                      {product.category}
                    </p>

                    <div className="mt-1.5 flex items-start justify-between gap-4">
                      <Link
                        to={`/products/${product.id}`}
                        className="text-base font-medium text-[#241c18] transition-colors hover:text-[#b08d57]"
                      >
                        {product.name}
                      </Link>

                      <p className="shrink-0 text-sm font-semibold text-[#241c18]">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Mobile continue shopping */}
          {wishlist.length > 0 && (
            <Link
              to="/shop"
              className="mt-10 flex items-center justify-center gap-2 text-sm font-medium text-[#302923] sm:hidden"
            >
              <FiArrowLeft size={17} />
              Continue Shopping
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}

export default Wishlist;
