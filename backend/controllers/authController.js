import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import pool from "../config/db.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Find user
        const result = await pool.query(
            `
      SELECT
        id,
        full_name,
        email,
        password_hash,
        role
      FROM users
      WHERE email = $1
      `,
            [normalizedEmail]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const user = result.rows[0];

        // Compare password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // Send response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};