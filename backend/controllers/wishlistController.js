import pool from "../config/db.js";

export const getWishlist = async (req, res) => {
    try {
        const result = await pool.query(
            `
      SELECT
        p.id,
        p.name,
        p.description,
        p.category,
        p.gender,
        p.price,
        p.original_price,
        p.discount,
        p.image_url,
        p.rating,
        p.stock
      FROM wishlists w
      JOIN products p ON w.product_id = p.id
      WHERE w.user_id = $1
      ORDER BY w.created_at DESC
      `,
            [req.user.id]
        );

        res.status(200).json({
            success: true,
            wishlist: result.rows,
        });
    } catch (error) {
        console.error("Get wishlist error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch wishlist",
        });
    }
};

export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await pool.query(
            "SELECT id FROM products WHERE id = $1",
            [productId]
        );

        if (product.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const result = await pool.query(
            `
      INSERT INTO wishlists (user_id, product_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, product_id) DO NOTHING
      RETURNING *
      `,
            [req.user.id, productId]
        );

        res.status(201).json({
            success: true,
            message: "Product added to wishlist",
            wishlistItem: result.rows[0] || null,
        });
    } catch (error) {
        console.error("Add wishlist error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to add product to wishlist",
        });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        const result = await pool.query(
            `
      DELETE FROM wishlists
      WHERE user_id = $1 AND product_id = $2
      RETURNING *
      `,
            [req.user.id, productId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product is not in wishlist",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product removed from wishlist",
        });
    } catch (error) {
        console.error("Remove wishlist error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to remove product from wishlist",
        });
    }
};