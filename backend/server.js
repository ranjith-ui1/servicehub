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

// Allowed origins array (Handles local dev + production deployment)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL, // e.g., https://servicehub-rlm713maq-ranjith-ui1s-project.vercel.app
].filter(Boolean); // Filters out undefined if CLIENT_URL is not set

// Dynamic CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., Postman, mobile apps, curl)
      if (!origin) return callback(null, true);

      // Check if origin matches allowed list or matches Vercel preview deployment patterns
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /\.vercel\.app$/.test(origin);

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy blocked request from origin: ${origin}`));
      }
    },
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