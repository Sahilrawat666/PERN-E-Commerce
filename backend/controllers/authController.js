import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import pool from "../config/db.js";

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required.",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [normalizedEmail]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await pool.query(
            `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, avatar_url, created_at
      `,
            [name.trim(), normalizedEmail, hashedPassword]
        );

        const user = result.rows[0];

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
            user,
        });
    } catch (error) {
        console.error("Signup error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong while creating your account.",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [normalizedEmail]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const user = result.rows[0];

        if (!user.password) {
            return res.status(400).json({
                success: false,
                message:
                    "This account uses Google login. Please continue with Google.",
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const token = generateToken(user);

        res.json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar_url: user.avatar_url,
            },
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong while logging in.",
        });
    }
};

export const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                success: false,
                message: "Google credential is required.",
            });
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const {
            sub: googleId,
            email,
            name,
            picture,
            email_verified: emailVerified,
        } = payload;

        if (!emailVerified) {
            return res.status(400).json({
                success: false,
                message: "Google email is not verified.",
            });
        }

        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email.toLowerCase()]
        );

        let user;

        if (existingUser.rows.length > 0) {
            user = existingUser.rows[0];

            await pool.query(
                `
        UPDATE users
        SET google_id = $1,
            avatar_url = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        `,
                [googleId, picture || null, user.id]
            );
        } else {
            const result = await pool.query(
                `
        INSERT INTO users
        (name, email, google_id, avatar_url)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, avatar_url, created_at
        `,
                [
                    name || "LUXE User",
                    email.toLowerCase(),
                    googleId,
                    picture || null,
                ]
            );

            user = result.rows[0];
        }

        const token = generateToken(user);

        res.json({
            success: true,
            message: "Google login successful.",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar_url: user.avatar_url,
            },
        });
    } catch (error) {
        console.error("Google login error:", error);

        res.status(401).json({
            success: false,
            message: "Google authentication failed.",
        });
    }
};