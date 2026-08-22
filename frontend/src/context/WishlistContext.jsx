import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext.jsx";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { token, isAuthenticated, authLoading } = useAuth();

  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!token) {
      setWishlist([]);
      return;
    }

    try {
      setWishlistLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch wishlist.");
      }

      setWishlist(data.wishlist || []);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      toast.error(error.message || "Failed to load wishlist.");
      setWishlist([]);
    } finally {
      setWishlistLoading(false);
    }
  }, [token]);

  // Load wishlist whenever authentication is ready
  // or when the logged-in user changes.
  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated || !token) {
      setWishlist([]);
      return;
    }

    fetchWishlist();
  }, [authLoading, isAuthenticated, token, fetchWishlist]);

  const isInWishlist = (productId) => {
    return wishlist.some((product) => product.id === productId);
  };

  const addToWishlist = async (product) => {
    if (!isAuthenticated || !token) {
      toast.error("Please sign in to add items to your wishlist.");
      return;
    }

    // Prevent duplicate requests.
    if (isInWishlist(product.id)) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/wishlist/${product.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add to wishlist.");
      }

      setWishlist((currentWishlist) => [...currentWishlist, product]);

      toast.success("Added to wishlist.");
    } catch (error) {
      console.error("Add to wishlist error:", error);
      toast.error(error.message || "Failed to add to wishlist.");
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!isAuthenticated || !token) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove from wishlist.");
      }

      setWishlist((currentWishlist) =>
        currentWishlist.filter((product) => product.id !== productId),
      );

      toast.success("Removed from wishlist.");
    } catch (error) {
      console.error("Remove from wishlist error:", error);
      toast.error(error.message || "Failed to remove from wishlist.");
    }
  };

  const toggleWishlist = async (product) => {
    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product);
    }
  };

  const clearWishlist = async () => {
    if (!isAuthenticated || !token) {
      return;
    }

    try {
      // Remove every item from the database.
      await Promise.all(
        wishlist.map((product) =>
          fetch(`${import.meta.env.VITE_API_URL}/api/wishlist/${product.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ),
      );

      setWishlist([]);
      toast.success("Wishlist cleared.");
    } catch (error) {
      console.error("Clear wishlist error:", error);
      toast.error("Failed to clear wishlist.");
    }
  };

  const value = {
    wishlist,
    wishlistCount: wishlist.length,
    wishlistLoading,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    refreshWishlist: fetchWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}
