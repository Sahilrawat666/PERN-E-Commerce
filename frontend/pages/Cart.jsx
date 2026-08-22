import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";
import { useCart } from "../src/context/CartContext.jsx";

function Cart() {
  const { cart, cartSubtotal, updateQuantity, removeFromCart } = useCart();

  const shipping = cartSubtotal >= 2000 || cartSubtotal === 0 ? 0 : 99;
  const total = cartSubtotal + shipping;

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      {/* Header */}
      <section className="border-b border-[#ddd5cc] px-6 py-14 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#b08d57]">
            Your Selection
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-tight text-[#302923] md:text-5xl">
            Shopping Bag
          </h1>

          <p className="mt-3 text-sm text-[#81776e]">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your bag
          </p>
        </div>
      </section>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <section className="px-6 py-20 md:px-10 lg:px-16">
          <div className="mx-auto flex min-h-[400px] max-w-7xl flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#b08d57]">
              <FiShoppingBag size={26} strokeWidth={1.5} />
            </div>

            <h2 className="mt-6 text-2xl font-light text-[#302923]">
              Your bag is empty
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#81776e]">
              Discover something you'll love and add it to your shopping bag.
            </p>

            <Link
              to="/shop"
              className="mt-7 bg-[#241c18] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b08d57]"
            >
              Explore Products
            </Link>
          </div>
        </section>
      ) : (
        <section className="px-6 py-12 md:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_380px]">
            {/* Cart Items */}
            <div>
              <div className="space-y-6">
                {cart.map((product) => (
                  <article
                    key={product.id}
                    className="flex gap-4 border-b border-[#ddd5cc] pb-6 sm:gap-6"
                  >
                    {/* Image */}
                    <Link
                      to={`/products/${product.id}`}
                      className="h-36 w-28 shrink-0 overflow-hidden bg-[#eee7df] sm:h-44 sm:w-36"
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-[#a49b92]">
                          {product.category}
                        </p>

                        <Link
                          to={`/products/${product.id}`}
                          className="mt-1 block text-base font-medium text-[#241c18] hover:text-[#b08d57]"
                        >
                          {product.name}
                        </Link>

                        <p className="mt-1 text-sm font-semibold text-[#302923]">
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-4">
                        {/* Quantity */}
                        <div className="flex items-center border border-[#d8cec3] bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, product.quantity - 1)
                            }
                            className="flex h-9 w-9 items-center justify-center cursor-pointer text-[#786f68] transition-colors hover:text-[#b08d57]"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus size={14} />
                          </button>

                          <span className="w-8 text-center text-sm text-[#302923]">
                            {product.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, product.quantity + 1)
                            }
                            className="flex h-9 w-9 items-center justify-center cursor-pointer text-[#786f68] transition-colors hover:text-[#b08d57]"
                            aria-label="Increase quantity"
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          className="flex items-center cursor-pointer gap-2 text-xs text-[#81776e] transition-colors hover:text-red-600"
                        >
                          <FiTrash2 size={15} />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <Link
                to="/shop"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#302923] transition-colors hover:text-[#b08d57]"
              >
                <FiArrowLeft size={17} />
                Continue Shopping
              </Link>
            </div>

            {/* Summary */}
            <aside className="h-fit border border-[#ddd5cc] bg-white p-6 sm:p-8">
              <h2 className="text-xl font-medium text-[#302923]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 border-b border-[#e5ddd4] pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#81776e]">Subtotal</span>

                  <span className="font-medium text-[#302923]">
                    ₹{cartSubtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#81776e]">Shipping</span>

                  <span className="font-medium text-[#302923]">
                    {shipping === 0
                      ? "Free"
                      : `₹${shipping.toLocaleString("en-IN")}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6">
                <span className="text-base font-medium text-[#302923]">
                  Total
                </span>

                <span className="text-xl font-semibold text-[#241c18]">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <Link
                to="/checkout"
                className="mt-7 flex w-full items-center justify-center bg-[#241c18] py-4 text-sm font-medium text-white transition-colors hover:bg-[#b08d57]"
              >
                Proceed to Checkout
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-[#81776e]">
                Free shipping on orders above ₹2,000.
              </p>
            </aside>
          </div>
        </section>
      )}
    </main>
  );
}

export default Cart;
