import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import serviceRoutes from "./routes/serviceRoutes.js";

import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

// ... existing imports at the top of server.js (dotenv, express, cors, connectDB, etc.)
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// ... existing middleware setups (app.use(cors()), app.use(express.json()))

// MOUNT THE MAIN API ROUTERS


// ... existing error handlers and app.listen blocks

dotenv.config();

const app = express();


// Connect MongoDB
connectDB();


// Middleware
app.use(cors());

app.use(express.json());

app.use(logger);

app.use("/api/services", serviceRoutes); // Existing baseline route[cite: 2]
app.use("/api/auth", authRoutes);         // New authentication pipeline
app.use("/api/bookings", bookingRoutes);     // New transaction pipeline


// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to ServiceHub Backend API",
  });
});


// Service API routes
app.use("/api/services", serviceRoutes);


// 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});




// Global error handler
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});