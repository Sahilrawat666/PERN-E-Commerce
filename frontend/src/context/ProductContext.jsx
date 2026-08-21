import { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "../api/productApi.js";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      setProductsError("");

      const data = await getProducts();

      setProducts(data.products);
    } catch (error) {
      console.error("Fetch products error:", error);

      setProductsError(error.message || "Failed to load products.");
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        productsLoading,
        productsError,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }

  return context;
}
