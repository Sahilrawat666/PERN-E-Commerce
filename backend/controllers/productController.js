import pool from "../config/db.js";

// Get all products
export const getProducts = async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT
        id,
        name,
        description,
        category,
        gender,
        price,
        original_price,
        discount,
        image_url,
        rating,
        stock,
        created_at,
        updated_at
      FROM products
      ORDER BY created_at DESC
    `);

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            products: result.rows,
        });
    } catch (error) {
        console.error("Get products error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch products.",
        });
    }
};

// Get single product
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `
        SELECT
          id,
          name,
          description,
          category,
          gender,
          price,
          original_price,
          discount,
          image_url,
          rating,
          stock,
          created_at,
          updated_at
        FROM products
        WHERE id = $1
      `,
            [id],
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        return res.status(200).json({
            success: true,
            product: result.rows[0],
        });
    } catch (error) {
        console.error("Get product error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch product.",
        });
    }
};