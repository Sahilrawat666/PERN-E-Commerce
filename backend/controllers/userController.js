import pool from "../config/db.js";

// PATCH /api/users/profile
export const updateProfile = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name is required.",
            });
        }

        const result = await pool.query(
            `
            UPDATE users
            SET name = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING id, name, email, avatar_url, created_at
            `,
            [name.trim(), req.user.id],
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: result.rows[0],
        });
    } catch (error) {
        console.error("Update profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update profile.",
        });
    }
};