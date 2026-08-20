import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }),
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ZENOVA API is running",
    });
});

export default app;