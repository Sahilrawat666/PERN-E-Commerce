import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiCheck,
  FiPackage,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../src/context/AuthContext.jsx";

function OrderConfirmation() {
  const { orderId } = useParams();
  const { token } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!token) {
        setError("Please login to view this order.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch order.");
        }

        setOrder(data.order);
      } catch (error) {
        console.error("Fetch order error:", error);

        setError(error.message || "Failed to load order.");
        toast.error(error.message || "Failed to load order.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, token]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f5f0]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#ddd5cc] border-t-[#b08d57]" />

          <p className="mt-4 text-sm text-[#81776e]">Loading your order...</p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f5f0] px-6">
        <div className="text-center">
          <h1 className="text-2xl font-light text-[#302923]">
            Order unavailable
          </h1>

          <p className="mt-3 text-sm text-[#81776e]">
            {error || "We couldn't find this order."}
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 border border-[#302923] px-6 py-3 text-sm text-[#302923] transition hover:bg-[#302923] hover:text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const total = Number(order.total_amount);

  return (
    <main className="min-h-screen bg-[#f8f5f0] px-6 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl">
        {/* Success */}
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#eee7df] text-[#b08d57]">
            <FiCheck size={38} strokeWidth={1.5} />
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[#b08d57]">
            Order Confirmed
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-tight text-[#302923] md:text-5xl">
            Thank you for your order
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#81776e]">
            Your order has been placed successfully. We've received your order
            and will begin preparing it shortly.
          </p>
        </div>

        {/* Order Information */}
        <div className="mt-12 border border-[#ddd5cc] bg-white">
          <div className="border-b border-[#e5ddd4] px-6 py-5 sm:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#81776e]">
              Order Number
            </p>

            <p className="mt-2 text-lg font-medium text-[#302923]">
              #{order.id}
            </p>
          </div>

          {/* Status */}
          <div className="grid gap-px bg-[#e5ddd4] sm:grid-cols-2">
            <div className="bg-white px-6 py-6 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#f8f5f0] text-[#b08d57]">
                  <FiPackage size={19} />
                </div>

                <div>
                  <p className="text-sm font-medium capitalize text-[#302923]">
                    {order.status}
                  </p>

                  <p className="mt-1 text-xs text-[#81776e]">
                    We're preparing your order.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white px-6 py-6 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#f8f5f0] text-[#b08d57]">
                  <FiShoppingBag size={19} />
                </div>

                <div>
                  <p className="text-sm font-medium text-[#302923]">
                    Order Total
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#302923]">
                    ₹{total.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-[#e5ddd4] px-6 py-6 sm:px-8">
            <h2 className="text-lg font-medium text-[#302923]">Your Items</h2>

            <div className="mt-6 space-y-5">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-[#eee7df] pb-5 last:border-0 last:pb-0"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-24 w-20 shrink-0 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#302923]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-[#81776e]">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[#302923]">
                      ₹
                      {(
                        Number(item.price) * Number(item.quantity)
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping */}
          <div className="border-t border-[#e5ddd4] px-6 py-6 sm:px-8">
            <h2 className="text-lg font-medium text-[#302923]">
              Shipping Information
            </h2>

            <div className="mt-4 text-sm leading-7 text-[#81776e]">
              <p className="font-medium text-[#302923]">
                {order.shipping_name}
              </p>

              <p>{order.shipping_email}</p>

              <p>{order.shipping_phone}</p>

              <p className="mt-2">
                {order.shipping_address}
                <br />
                {order.city}, {order.state} - {order.postal_code}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/orders"
            className="inline-flex items-center justify-center gap-2 bg-[#241c18] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b08d57]"
          >
            View My Orders
            <FiArrowRight size={16} />
          </Link>

          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 border border-[#302923] px-7 py-3.5 text-sm font-medium text-[#302923] transition-colors hover:bg-[#302923] hover:text-white"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-[#a49b92]">
          Thank you for choosing ZENOVA.
        </p>
      </div>
    </main>
  );
}

export default OrderConfirmation;
