import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // Link to the user who placed the booking
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer reference is required"],
    },
    // Link to the specific service that was selected
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Service reference is required"],
    },
    serviceName: {
      type: String,
      required: true, // Redundant snapshot cache for fast UI loading
    },
    providerName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Cancelled", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;