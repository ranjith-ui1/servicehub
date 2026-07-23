import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  toggleProviderApproval,
  deleteUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.put("/providers/:id/approve", toggleProviderApproval);
router.delete("/users/:id", deleteUser);

export default router;
