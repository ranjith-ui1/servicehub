import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS Configuration (Configured once)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Fallback for local Vite dev
    credentials: true,
  })
);

// Built-in & Custom Middlewares
app.use(express.json());
app.use(logger);

// Root route (Health check)
app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to ServiceHub Backend API" });
});

// API Routes
app.use("/api/services", serviceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

// 404 Handler (Runs if no route matches)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "API Route Not Found" });
});

// Global Error Handler (Must be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});