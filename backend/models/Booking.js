import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer reference is required"],
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Service reference is required"],
    },
    // Snapshots so the booking still reads fine even if the service listing changes later.
    serviceName: { type: String, required: true },
    providerName: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Cancelled", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
