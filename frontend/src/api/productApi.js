const API_URL = import.meta.env.VITE_API_URL;
// get all products 
export const getProducts = async () => {
    const response = await fetch(`${API_URL}/api/products`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products.");
    }

    return data;
};

// get single product by id
export const getProductById = async (id) => {
    const response = await fetch(`${API_URL}/api/products/${id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch product.");
    }

    return data;
};