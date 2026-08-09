import { Router } from "express";

import {
  getAdminDashboard,
  adminDeleteEvent,
} from "../controllers/adminController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  adminOnly,
} from "../middleware/adminMiddleware.js";

const router = Router();

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getAdminDashboard
);

router.delete(
  "/events/:id",
  protect,
  adminOnly,
  adminDeleteEvent
);

export default router;