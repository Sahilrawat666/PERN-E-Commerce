import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPackage,
  FiHeart,
  FiShoppingBag,
  FiArrowRight,
  FiLogOut,
  FiEdit2,
} from "react-icons/fi";
import { useAuth } from "../src/context/AuthContext.jsx";
import toast from "react-hot-toast";

function Account() {
  const { user, token, logout, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);

  // edit profile
  const handleSaveProfile = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile.");
      }

      updateUser(data.user);
      setName(data.user.name);
      setEditing(false);

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Update profile error:", error);

      toast.error(error.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      {/* Header */}
      <section className="border-b border-[#ddd5cc] px-6 py-14 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#b08d57]">
            Account
          </p>

          <h1 className="mt-3 text-3xl font-light tracking-tight text-[#302923] md:text-4xl">
            Welcome, {user?.name}
          </h1>

          <p className="mt-3 text-sm text-[#81776e]">
            Manage your account and view your activity.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[320px_1fr]">
          {/* Profile */}
          <aside className="h-fit border border-[#ddd5cc] bg-white p-6 sm:p-8">
            <div className="flex flex-col items-center text-center">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#eee7df] text-[#b08d57]">
                  <FiUser size={36} strokeWidth={1.5} />
                </div>
              )}

              {editing ? (
                <form onSubmit={handleSaveProfile} className="mt-5 w-full">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-left text-xs uppercase tracking-[0.15em] text-[#81776e]"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full border border-[#d8d0c8] bg-[#fdfcfb] px-4 py-3 text-sm text-[#302923] outline-none transition focus:border-[#b08d57]"
                  />

                  <div className="mt-4 flex gap-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 bg-[#241c18] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#b08d57] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEditing(false);
                        setName(user?.name || "");
                      }}
                      className="flex-1 border border-[#302923] px-4 py-3 text-sm text-[#302923] transition hover:bg-[#302923] hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="mt-5 text-xl font-medium text-[#302923]">
                    {user?.name}
                  </h2>

                  <p className="mt-1 break-all text-sm text-[#81776e]">
                    {user?.email}
                  </p>

                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="mt-5 cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-[#302923] transition hover:text-[#b08d57]"
                  >
                    <FiEdit2 size={15} />
                    Edit Profile
                  </button>
                </>
              )}
            </div>

            <div className="mt-8 border-t border-[#e5ddd4] pt-6">
              <div className="flex items-center gap-3 text-sm">
                <FiUser className="text-[#b08d57]" size={17} />

                <span className="text-[#81776e]">Name</span>

                <span className="ml-auto text-right text-[#302923]">
                  {user?.name}
                </span>
              </div>

              <div className="mt-5 flex items-start gap-3 text-sm">
                <FiMail className="mt-0.5 text-[#b08d57]" size={17} />

                <span className="text-[#81776e]">Email</span>

                <span className="ml-auto max-w-[160px] break-all text-right text-[#302923]">
                  {user?.email}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 border border-[#302923] px-5 py-3 text-sm font-medium text-[#302923] transition-colors hover:bg-[#302923] hover:text-white"
            >
              <FiLogOut size={17} />
              Logout
            </button>
          </aside>

          {/* Account Options */}
          <div>
            <h2 className="text-xl font-medium text-[#302923]">
              Account Overview
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {/* Orders */}
              <Link
                to="/orders"
                className="group border border-[#ddd5cc] bg-white p-6 transition hover:border-[#b08d57]"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-[#f8f5f0] text-[#b08d57]">
                  <FiPackage size={21} />
                </div>

                <h3 className="mt-5 text-lg font-medium text-[#302923]">
                  My Orders
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#81776e]">
                  View your order history and track your purchases.
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[#302923] group-hover:text-[#b08d57]">
                  View Orders
                  <FiArrowRight size={16} />
                </div>
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="group border border-[#ddd5cc] bg-white p-6 transition hover:border-[#b08d57]"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-[#f8f5f0] text-[#b08d57]">
                  <FiHeart size={21} />
                </div>

                <h3 className="mt-5 text-lg font-medium text-[#302923]">
                  Wishlist
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#81776e]">
                  View the products you've saved for later.
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[#302923] group-hover:text-[#b08d57]">
                  View Wishlist
                  <FiArrowRight size={16} />
                </div>
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="group border border-[#ddd5cc] bg-white p-6 transition hover:border-[#b08d57]"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-[#f8f5f0] text-[#b08d57]">
                  <FiShoppingBag size={21} />
                </div>

                <h3 className="mt-5 text-lg font-medium text-[#302923]">
                  Shopping Bag
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#81776e]">
                  Review the products currently in your shopping bag.
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[#302923] group-hover:text-[#b08d57]">
                  View Bag
                  <FiArrowRight size={16} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Account;
