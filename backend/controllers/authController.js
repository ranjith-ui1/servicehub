import User from "../models/User.js";

// REGISTER USER
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      success: true,
      message: "Registration successful!",
      data: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN USER
export const loginUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password || user.role !== role) {
      return res.status(401).json({ success: false, message: "Invalid credentials or role mismatch" });
    }

    if (user.role === "provider" && !user.isApproved) {
      return res.status(403).json({ success: false, message: "Profile pending Admin approval." });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL USERS (ADMIN CONTROL)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// TOGGLE PROVIDER APPROVAL STATUS (ADMIN CONTROL)
export const toggleProviderApproval = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== "provider") {
      return res.status(404).json({ success: false, message: "Service provider not found" });
    }
    user.isApproved = !user.isApproved;
    await user.save();
    res.status(200).json({ success: true, message: `Provider status set to ${user.isApproved ? "Approved" : "Pending"}` });
  } catch (error) {
    next(error);
  }
};

// DELETE ACCOUNT (ADMIN CONTROL)
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Account deleted successfully." });
  } catch (error) {
    next(error);
  }
};