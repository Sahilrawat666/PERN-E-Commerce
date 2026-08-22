import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext(null);

function CartProvider({ children }) {
  const { token, isAuthenticated, authLoading } = useAuth();

  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  // Fetch logged-in user's cart
  const fetchCart = useCallback(async () => {
    if (!token) {
      setCart([]);
      return;
    }

    try {
      setCartLoading(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch cart.");
      }

      setCart(data.cart || []);
    } catch (error) {
      console.error("Fetch cart error:", error);

      toast.error(error.message || "Failed to load cart.");
    } finally {
      setCartLoading(false);
    }
  }, [token]);

  // Load cart after authentication is ready
  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [authLoading, isAuthenticated, fetchCart]);

  // Add product to cart
  const addToCart = async (product) => {
    if (!isAuthenticated || !token) {
      toast.error("Please sign in to add products to your cart.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${product.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product to cart.");
      }

      // Refresh cart from database
      await fetchCart();

      toast.success("Added to cart.");
    } catch (error) {
      console.error("Add to cart error:", error);

      toast.error(error.message || "Failed to add product to cart.");
    }
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    if (!isAuthenticated || !token) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove product.");
      }

      setCart((currentCart) =>
        currentCart.filter((item) => item.product_id !== productId),
      );

      toast.success("Removed from cart.");
    } catch (error) {
      console.error("Remove from cart error:", error);

      toast.error(error.message || "Failed to remove product.");
    }
  };

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated || !token) {
      return;
    }

    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quantity,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update quantity.");
      }

      setCart((currentCart) =>
        currentCart.map((item) =>
          item.product_id === productId
            ? {
                ...item,
                quantity,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Update cart quantity error:", error);

      toast.error(error.message || "Failed to update quantity.");

      // Reload database state if update failed
      await fetchCart();
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!isAuthenticated || !token) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to clear cart.");
      }

      setCart([]);

      toast.success("Cart cleared.");
    } catch (error) {
      console.error("Clear cart error:", error);

      toast.error(error.message || "Failed to clear cart.");
    }
  };

  // Total number of products
  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  // Cart subtotal
  const cartSubtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0,
      ),
    [cart],
  );

  const value = {
    cart,
    cartCount,
    cartSubtotal,
    cartLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

export default CartProvider;
