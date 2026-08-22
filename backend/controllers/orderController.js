import pool from "../config/db.js";

// POST /api/orders
// Create an order from the authenticated user's cart
export const createOrder = async (req, res) => {
    const client = await pool.connect();

    try {
        const {
            shipping_name,
            shipping_email,
            shipping_phone,
            shipping_address,
            city,
            state,
            postal_code,
        } = req.body;

        // Validate shipping information
        if (
            !shipping_name ||
            !shipping_email ||
            !shipping_phone ||
            !shipping_address ||
            !city ||
            !state ||
            !postal_code
        ) {
            return res.status(400).json({
                success: false,
                message: "All shipping details are required.",
            });
        }

        await client.query("BEGIN");

        // Get user's cart
        const cartResult = await client.query(
            `
            SELECT
                ci.product_id,
                ci.quantity,
                p.name,
                p.price,
                p.stock
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.id
            WHERE ci.user_id = $1
            FOR UPDATE
            `,
            [req.user.id],
        );

        if (cartResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                success: false,
                message: "Your cart is empty.",
            });
        }

        const cartItems = cartResult.rows;

        // Validate stock and calculate total on the server
        let totalAmount = 0;

        for (const item of cartItems) {
            if (item.stock <= 0) {
                await client.query("ROLLBACK");

                return res.status(400).json({
                    success: false,
                    message: `${item.name} is out of stock.`,
                });
            }

            if (item.quantity > item.stock) {
                await client.query("ROLLBACK");

                return res.status(400).json({
                    success: false,
                    message: `Only ${item.stock} units of ${item.name} are available.`,
                });
            }

            totalAmount += Number(item.price) * item.quantity;
        }

        // Create order
        const orderResult = await client.query(
            `
            INSERT INTO orders (
                user_id,
                total_amount,
                status,
                shipping_name,
                shipping_email,
                shipping_phone,
                shipping_address,
                city,
                state,
                postal_code
            )
            VALUES (
                $1, $2, 'pending', $3, $4, $5, $6, $7, $8, $9
            )
            RETURNING *
            `,
            [
                req.user.id,
                totalAmount,
                shipping_name.trim(),
                shipping_email.trim().toLowerCase(),
                shipping_phone.trim(),
                shipping_address.trim(),
                city.trim(),
                state.trim(),
                postal_code.trim(),
            ],
        );

        const order = orderResult.rows[0];

        // Create order items and reduce stock
        for (const item of cartItems) {
            await client.query(
                `
                INSERT INTO order_items (
                    order_id,
                    product_id,
                    quantity,
                    price
                )
                VALUES ($1, $2, $3, $4)
                `,
                [
                    order.id,
                    item.product_id,
                    item.quantity,
                    item.price,
                ],
            );

            await client.query(
                `
                UPDATE products
                SET stock = stock - $1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2
                `,
                [item.quantity, item.product_id],
            );
        }

        // Clear user's cart
        await client.query(
            `
            DELETE FROM cart_items
            WHERE user_id = $1
            `,
            [req.user.id],
        );

        await client.query("COMMIT");

        return res.status(201).json({
            success: true,
            message: "Order created successfully.",
            order,
        });
    } catch (error) {
        await client.query("ROLLBACK");

        console.error("Create order error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create order.",
        });
    } finally {
        client.release();
    }
};


// GET /api/orders
// Get all orders belonging to the authenticated user
export const getMyOrders = async (req, res) => {
    try {
        const result = await pool.query(
            `
            SELECT
                o.id,
                o.total_amount,
                o.status,
                o.shipping_name,
                o.shipping_email,
                o.shipping_phone,
                o.shipping_address,
                o.city,
                o.state,
                o.postal_code,
                o.created_at,
                o.updated_at,

                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', oi.id,
                            'product_id', oi.product_id,
                            'quantity', oi.quantity,
                            'price', oi.price,
                            'name', p.name,
                            'image_url', p.image_url
                        )
                    ) FILTER (WHERE oi.id IS NOT NULL),
                    '[]'
                ) AS items

            FROM orders o
            LEFT JOIN order_items oi
                ON o.id = oi.order_id
            LEFT JOIN products p
                ON oi.product_id = p.id

            WHERE o.user_id = $1

            GROUP BY o.id
            ORDER BY o.created_at DESC
            `,
            [req.user.id],
        );

        return res.status(200).json({
            success: true,
            orders: result.rows,
        });
    } catch (error) {
        console.error("Get orders error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders.",
        });
    }
};


// GET /api/orders/:orderId
// Get one order belonging to the authenticated user
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const result = await pool.query(
            `
            SELECT
                o.id,
                o.total_amount,
                o.status,
                o.shipping_name,
                o.shipping_email,
                o.shipping_phone,
                o.shipping_address,
                o.city,
                o.state,
                o.postal_code,
                o.created_at,
                o.updated_at,

                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', oi.id,
                            'product_id', oi.product_id,
                            'quantity', oi.quantity,
                            'price', oi.price,
                            'name', p.name,
                            'image_url', p.image_url
                        )
                    ) FILTER (WHERE oi.id IS NOT NULL),
                    '[]'
                ) AS items

            FROM orders o
            LEFT JOIN order_items oi
                ON o.id = oi.order_id
            LEFT JOIN products p
                ON oi.product_id = p.id

            WHERE o.id = $1
              AND o.user_id = $2

            GROUP BY o.id
            `,
            [orderId, req.user.id],
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Order not found.",
            });
        }

        return res.status(200).json({
            success: true,
            order: result.rows[0],
        });
    } catch (error) {
        console.error("Get order error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch order.",
        });
    }
};