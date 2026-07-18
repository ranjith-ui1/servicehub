import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Automatically creates an index to prevent duplicate emails
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: ["user", "provider", "admin"],
      default: "user",
    },
    // Service Provider Specific Validation Properties
    isApproved: {
      type: Boolean,
      default: function () {
        // Admins and Standard Users don't need approval; providers default to false
        return this.role !== "provider";
      },
    },
  },
  {
    timestamps: true, // Automatically generates createdAt and updatedAt timestamps
  }
);

const User = mongoose.model("User", userSchema);
export default User;