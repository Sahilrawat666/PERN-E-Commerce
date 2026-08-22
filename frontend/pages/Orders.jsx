import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiPackage, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../src/context/AuthContext.jsx";

function Orders() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        if (!token) {
          setError("Please login to view your orders.");
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders.");
        }

        setOrders(data.orders || []);
      } catch (error) {
        console.error("Fetch orders error:", error);
        setError(error.message || "Failed to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f5f0]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#ddd5cc] border-t-[#b08d57]" />

          <p className="mt-4 text-sm text-[#81776e]">Loading your orders...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f5f0] px-6">
        <div className="text-center">
          <h1 className="text-2xl font-light text-[#302923]">
            Unable to load orders
          </h1>

          <p className="mt-3 text-sm text-[#81776e]">{error}</p>

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 border border-[#302923] px-6 py-3 text-sm text-[#302923] transition hover:bg-[#302923] hover:text-white"
          >
            <FiArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      {/* Header */}
      <section className="border-b border-[#ddd5cc] px-6 py-14 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#b08d57]">
            Your Account
          </p>

          <h1 className="mt-3 text-4xl font-light tracking-tight text-[#302923] md:text-5xl">
            My Orders
          </h1>

          <p className="mt-3 text-sm text-[#81776e]">
            {orders.length} {orders.length === 1 ? "order" : "orders"} placed
          </p>
        </div>
      </section>

      {/* Orders */}
      <section className="px-6 py-12 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {orders.length === 0 ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#b08d57]">
                <FiPackage size={26} strokeWidth={1.5} />
              </div>

              <h2 className="mt-6 text-2xl font-light text-[#302923]">
                No orders yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#81776e]">
                You haven't placed any orders yet. Start shopping and your
                orders will appear here.
              </p>

              <Link
                to="/shop"
                className="mt-7 bg-[#241c18] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b08d57]"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="border border-[#ddd5cc] bg-white"
                >
                  {/* Order Header */}
                  <div className="flex flex-col gap-4 border-b border-[#e5ddd4] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#81776e]">
                        Order Number
                      </p>

                      <p className="mt-1 text-base font-medium text-[#302923]">
                        #{order.id}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#81776e]">
                          Status
                        </p>

                        <span className="mt-1 inline-block text-sm font-medium capitalize text-[#b08d57]">
                          {order.status}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#81776e]">
                          Total
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#302923]">
                          ₹{Number(order.total_amount).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="divide-y divide-[#e5ddd4]">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 px-6 py-5 sm:px-8"
                      >
                        <div className="h-24 w-20 shrink-0 overflow-hidden bg-[#eee7df]">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <p className="text-sm font-medium text-[#302923]">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-[#81776e]">
                            Quantity: {item.quantity}
                          </p>

                          <p className="mt-2 text-sm font-semibold text-[#302923]">
                            ₹
                            {(
                              Number(item.price) * item.quantity
                            ).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col gap-4 border-t border-[#e5ddd4] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <p className="text-xs text-[#81776e]">
                      Ordered on{" "}
                      {new Date(order.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    <Link
                      to={`/orders/${order.id}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#302923] transition-colors hover:text-[#b08d57]"
                    >
                      View Order
                      <FiArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Orders;
