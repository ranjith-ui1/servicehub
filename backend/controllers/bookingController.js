import Booking from "../models/Booking.js";
import Service from "../models/Service.js";

// POST /api/bookings  (user)
export const createBooking = async (req, res, next) => {
  try {
    const { customerId, serviceId } = req.body;

    const targetedService = await Service.findById(serviceId);
    if (!targetedService) {
      return res.status(404).json({ success: false, message: "Target service listing not found" });
    }

    const booking = await Booking.create({
      customer: customerId,
      service: serviceId,
      serviceName: targetedService.service,
      providerName: targetedService.provider,
      city: targetedService.city,
      price: targetedService.price,
    });

    res.status(201).json({ success: true, message: "Booking registered successfully!", data: booking });
  } catch (error) {
    next(error);
  }
};

// GET /api/bookings/user/:customerId  (user)
export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ customer: req.params.customerId });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};

// GET /api/bookings/provider/:providerName  (provider)
export const getProviderBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ providerName: req.params.providerName });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};

// PUT /api/bookings/:id/status  (provider/admin) — status: Approved | Cancelled | Rejected
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking record not found" });
    }

    res.status(200).json({ success: true, message: `Booking status updated to ${status}`, data: booking });
  } catch (error) {
    next(error);
  }
};

// GET /api/bookings/admin/all  (admin)
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate("customer", "name email");
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};
