import express from "express";
import {
  createBooking,
  getUserBookings,
  getProviderBookings,
  updateBookingStatus,
  getAllBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/admin/all", getAllBookings);
router.get("/user/:customerId", getUserBookings);
router.get("/provider/:providerName", getProviderBookings);
router.put("/:id/status", updateBookingStatus);

export default router;
