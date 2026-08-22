const API_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}, token) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {}),
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Wishlist request failed.");
    }

    return data;
}

export async function getWishlist(token) {
    return request("/api/wishlist", {}, token);
}

export async function addWishlistItem(productId, token) {
    return request(
        `/api/wishlist/${productId}`,
        {
            method: "POST",
        },
        token,
    );
}

export async function removeWishlistItem(productId, token) {
    return request(
        `/api/wishlist/${productId}`,
        {
            method: "DELETE",
        },
        token,
    );
}