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

  // Fetch user's cart from backend
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
      setCart([]);
    } finally {
      setCartLoading(false);
    }
  }, [token]);

  // Load cart whenever authentication is ready/user changes
  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated) {
      setCart([]);
      return;
    }

    fetchCart();
  }, [authLoading, isAuthenticated, fetchCart]);

  // Add product to cart
  const addToCart = async (product) => {
    if (!token) {
      toast.error("Please login to add items to your cart.");
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

      await fetchCart();

      toast.success(data.message || "Product added to cart.");
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(error.message || "Failed to add product to cart.");
    }
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    if (!token) {
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

      toast.success(data.message || "Product removed from cart.");
    } catch (error) {
      console.error("Remove from cart error:", error);
      toast.error(error.message || "Failed to remove product.");
    }
  };

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    if (!token) {
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
        throw new Error(data.message || "Failed to update cart.");
      }

      setCart((currentCart) =>
        currentCart.map((item) =>
          item.product_id === productId
            ? {
                ...item,
                quantity: data.cartItem.quantity,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Update cart error:", error);
      toast.error(error.message || "Failed to update cart.");

      // Refresh from server in case the local state became stale
      await fetchCart();
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!token) {
      setCart([]);
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

      // Clear React state immediately
      setCart([]);
    } catch (error) {
      console.error("Clear cart error:", error);
      toast.error(error.message || "Failed to clear cart.");
    }
  };

  // clear cart
  const clearCartState = () => {
    setCart([]);
  };

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + Number(item.quantity), 0),
    [cart],
  );

  const cartSubtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
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
    clearCartState,
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
