import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext.jsx";
import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
} from "../api/wishlistApi.js";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { token, isAuthenticated, authLoading } = useAuth();

  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Load user's wishlist from database
  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated || !token) {
      setWishlist([]);
      return;
    }

    const loadWishlist = async () => {
      try {
        setWishlistLoading(true);

        const data = await getWishlist(token);

        setWishlist(data.wishlist || []);
      } catch (error) {
        console.error("Failed to load wishlist:", error);
        toast.error(error.message || "Failed to load wishlist.");
      } finally {
        setWishlistLoading(false);
      }
    };

    loadWishlist();
  }, [authLoading, isAuthenticated, token]);

  const isInWishlist = (productId) => {
    return wishlist.some((product) => product.id === productId);
  };

  const addToWishlist = async (product) => {
    if (!isAuthenticated || !token) {
      toast.error("Please sign in to add products to your wishlist.");
      return;
    }

    try {
      await addWishlistItem(product.id, token);

      setWishlist((currentWishlist) => {
        if (currentWishlist.some((item) => item.id === product.id)) {
          return currentWishlist;
        }

        return [...currentWishlist, product];
      });

      toast.success("Added to wishlist.");
    } catch (error) {
      console.error("Add wishlist error:", error);
      toast.error(error.message || "Failed to add to wishlist.");
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!isAuthenticated || !token) {
      return;
    }

    try {
      await removeWishlistItem(productId, token);

      setWishlist((currentWishlist) =>
        currentWishlist.filter((product) => product.id !== productId),
      );

      toast.success("Removed from wishlist.");
    } catch (error) {
      console.error("Remove wishlist error:", error);
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

  const clearWishlist = () => {
    if (!isAuthenticated || !token) {
      return;
    }

    const removeAll = async () => {
      try {
        await Promise.all(
          wishlist.map((product) => removeWishlistItem(product.id, token)),
        );

        setWishlist([]);
        toast.success("Wishlist cleared.");
      } catch (error) {
        console.error("Clear wishlist error:", error);
        toast.error("Failed to clear wishlist.");
      }
    };

    removeAll();
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
