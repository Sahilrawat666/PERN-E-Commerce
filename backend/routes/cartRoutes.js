import express from "express";

import {
    getCart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
} from "../controllers/cartController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getCart);

router.post("/:productId", authMiddleware, addToCart);

router.patch("/:productId", authMiddleware, updateCartQuantity);

router.delete("/:productId", authMiddleware, removeFromCart);

router.delete("/", authMiddleware, clearCart);

export default router;