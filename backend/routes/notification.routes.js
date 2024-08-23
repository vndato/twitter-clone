import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getNotfications, deleteNotification, deleteOneNotification } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getNotfications);
router.delete("/", protectRoute, deleteNotification);
router.delete("/:id", protectRoute, deleteOneNotification);

export default router;