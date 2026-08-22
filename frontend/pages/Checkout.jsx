import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";
import { useCart } from "../src/context/CartContext.jsx";
import { useAuth } from "../src/context/AuthContext.jsx";

function Checkout() {
  const navigate = useNavigate();

  const { cart, cartSubtotal, clearCartState } = useCart();
  const { token, user } = useAuth();

  const [formData, setFormData] = useState({
    shipping_name: user?.name || "",
    shipping_email: user?.email || "",
    shipping_phone: "",
    shipping_address: "",
    city: "",
    state: "",
    postal_code: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const shipping = cartSubtotal >= 2000 || cartSubtotal === 0 ? 0 : 99;
  const total = cartSubtotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error("Please login before placing your order.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      navigate("/cart");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order.");
      }

      toast.success("Order placed successfully!");
      clearCartState();
      navigate(`/order-confirmation/${data.order.id}`);
    } catch (error) {
      console.error("Create order error:", error);

      toast.error(error.message || "Failed to place order.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#f8f5f0] px-6 py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#b08d57]">
            <FiCheck size={26} />
          </div>

          <h1 className="mt-6 text-3xl font-light text-[#302923]">
            Your cart is empty
          </h1>

          <p className="mt-3 text-sm text-[#81776e]">
            Add some products before proceeding to checkout.
          </p>

          <Link
            to="/shop"
            className="mt-7 bg-[#241c18] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b08d57]"
          >
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      {/* Header */}
      <section className="border-b border-[#ddd5cc] px-6 py-12 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-[#81776e] transition-colors hover:text-[#b08d57]"
          >
            <FiArrowLeft size={16} />
            Back to Cart
          </Link>

          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[#b08d57]">
            Secure Checkout
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-tight text-[#302923] md:text-5xl">
            Checkout
          </h1>
        </div>
      </section>

      <section className="px-6 py-12 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="border border-[#ddd5cc] bg-white p-6 sm:p-8">
              <h2 className="text-xl font-medium text-[#302923]">
                Shipping Information
              </h2>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="shipping_name"
                    className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#81776e]"
                  >
                    Full Name
                  </label>

                  <input
                    id="shipping_name"
                    name="shipping_name"
                    type="text"
                    value={formData.shipping_name}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#d8d0c8] bg-[#fdfcfb] px-4 py-3 text-sm text-[#302923] outline-none transition focus:border-[#b08d57]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="shipping_email"
                    className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#81776e]"
                  >
                    Email
                  </label>

                  <input
                    id="shipping_email"
                    name="shipping_email"
                    type="email"
                    value={formData.shipping_email}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#d8d0c8] bg-[#fdfcfb] px-4 py-3 text-sm text-[#302923] outline-none transition focus:border-[#b08d57]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="shipping_phone"
                    className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#81776e]"
                  >
                    Phone
                  </label>

                  <input
                    id="shipping_phone"
                    name="shipping_phone"
                    type="tel"
                    value={formData.shipping_phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#d8d0c8] bg-[#fdfcfb] px-4 py-3 text-sm text-[#302923] outline-none transition focus:border-[#b08d57]"
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="shipping_address"
                    className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#81776e]"
                  >
                    Address
                  </label>

                  <textarea
                    id="shipping_address"
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full resize-none border border-[#d8d0c8] bg-[#fdfcfb] px-4 py-3 text-sm text-[#302923] outline-none transition focus:border-[#b08d57]"
                  />
                </div>

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#81776e]"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#d8d0c8] bg-[#fdfcfb] px-4 py-3 text-sm text-[#302923] outline-none transition focus:border-[#b08d57]"
                  />
                </div>

                {/* State */}
                <div>
                  <label
                    htmlFor="state"
                    className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#81776e]"
                  >
                    State
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#d8d0c8] bg-[#fdfcfb] px-4 py-3 text-sm text-[#302923] outline-none transition focus:border-[#b08d57]"
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label
                    htmlFor="postal_code"
                    className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#81776e]"
                  >
                    Postal Code
                  </label>

                  <input
                    id="postal_code"
                    name="postal_code"
                    type="text"
                    value={formData.postal_code}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#d8d0c8] bg-[#fdfcfb] px-4 py-3 text-sm text-[#302923] outline-none transition focus:border-[#b08d57]"
                  />
                </div>
              </div>
            </div>

            {/* Payment placeholder */}
            <div className="mt-6 border border-[#ddd5cc] bg-white p-6 sm:p-8">
              <h2 className="text-xl font-medium text-[#302923]">Payment</h2>

              <p className="mt-3 text-sm leading-6 text-[#81776e]">
                Payment integration will be added after the order flow is
                complete.
              </p>

              <div className="mt-5 border border-[#e5ddd4] bg-[#f8f5f0] p-4 text-sm text-[#6f665e]">
                Cash on delivery / test order for now.
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full bg-[#241c18] py-4 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#b08d57] disabled:cursor-not-allowed disabled:bg-[#b8afa7]"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          {/* Order Summary */}
          <aside className="h-fit border border-[#ddd5cc] bg-white p-6 sm:p-8 lg:sticky lg:top-24">
            <h2 className="text-xl font-medium text-[#302923]">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5 border-b border-[#e5ddd4] pb-6">
              {cart.map((product) => (
                <div key={product.id} className="flex gap-4">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-20 w-16 shrink-0 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#302923]">
                      {product.name}
                    </p>

                    <p className="mt-1 text-xs text-[#81776e]">
                      Qty: {product.quantity}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[#302923]">
                      ₹
                      {(
                        Number(product.price) * product.quantity
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
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

              <div className="flex justify-between border-t border-[#e5ddd4] pt-5">
                <span className="font-medium text-[#302923]">Total</span>

                <span className="text-xl font-semibold text-[#241c18]">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Checkout;
