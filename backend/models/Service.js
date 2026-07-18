import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: [true, "Provider name is required"],
      trim: true,
    },

    service: {
      type: String,
      required: [true, "Service type is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    experience: {
      type: String,
      required: [true, "Experience is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    status: {
      type: String,
      enum: ["Available", "Busy"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;