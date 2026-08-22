import pool from "../config/db.js";

// GET /api/cart
export const getCart = async (req, res) => {
    try {
        const result = await pool.query(
            `
      SELECT
        ci.id,
        ci.product_id,
        ci.quantity,
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
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = $1
      ORDER BY ci.created_at DESC
      `,
            [req.user.id],
        );

        return res.status(200).json({
            success: true,
            cart: result.rows,
        });
    } catch (error) {
        console.error("Get cart error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch cart.",
        });
    }
};

// POST /api/cart/:productId
export const addToCart = async (req, res) => {
    try {
        const { productId } = req.params;

        // Check product
        const productResult = await pool.query(
            `
      SELECT id, stock
      FROM products
      WHERE id = $1
      `,
            [productId],
        );

        if (productResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        const product = productResult.rows[0];

        if (product.stock <= 0) {
            return res.status(400).json({
                success: false,
                message: "Product is out of stock.",
            });
        }

        // Check existing cart item
        const existingItem = await pool.query(
            `
      SELECT quantity
      FROM cart_items
      WHERE user_id = $1 AND product_id = $2
      `,
            [req.user.id, productId],
        );

        if (existingItem.rows.length > 0) {
            const newQuantity = existingItem.rows[0].quantity + 1;

            if (newQuantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: "Requested quantity exceeds available stock.",
                });
            }

            const result = await pool.query(
                `
        UPDATE cart_items
        SET quantity = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $2 AND product_id = $3
        RETURNING *
        `,
                [newQuantity, req.user.id, productId],
            );

            return res.status(200).json({
                success: true,
                message: "Cart quantity updated.",
                cartItem: result.rows[0],
            });
        }

        // Add new cart item
        const result = await pool.query(
            `
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES ($1, $2, 1)
      RETURNING *
      `,
            [req.user.id, productId],
        );

        return res.status(201).json({
            success: true,
            message: "Product added to cart.",
            cartItem: result.rows[0],
        });
    } catch (error) {
        console.error("Add to cart error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to add product to cart.",
        });
    }
};

// PATCH /api/cart/:productId
export const updateCartQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive integer.",
            });
        }

        // Check product stock
        const productResult = await pool.query(
            `
      SELECT id, stock
      FROM products
      WHERE id = $1
      `,
            [productId],
        );

        if (productResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        const product = productResult.rows[0];

        if (quantity > product.stock) {
            return res.status(400).json({
                success: false,
                message: "Requested quantity exceeds available stock.",
            });
        }

        const result = await pool.query(
            `
      UPDATE cart_items
      SET quantity = $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $2 AND product_id = $3
      RETURNING *
      `,
            [quantity, req.user.id, productId],
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product is not in your cart.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart quantity updated.",
            cartItem: result.rows[0],
        });
    } catch (error) {
        console.error("Update cart error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update cart.",
        });
    }
};

// DELETE /api/cart/:productId
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const result = await pool.query(
            `
      DELETE FROM cart_items
      WHERE user_id = $1 AND product_id = $2
      RETURNING *
      `,
            [req.user.id, productId],
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product is not in your cart.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product removed from cart.",
        });
    } catch (error) {
        console.error("Remove from cart error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to remove product from cart.",
        });
    }
};

// DELETE /api/cart
export const clearCart = async (req, res) => {
    try {
        await pool.query(
            `
      DELETE FROM cart_items
      WHERE user_id = $1
      `,
            [req.user.id],
        );

        return res.status(200).json({
            success: true,
            message: "Cart cleared.",
        });
    } catch (error) {
        console.error("Clear cart error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to clear cart.",
        });
    }
};