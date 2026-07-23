import express from "express";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import validateService from "../middleware/validateService.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", validateService, createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
