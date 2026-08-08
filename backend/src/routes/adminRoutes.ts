import { Router } from "express";

import {
  getAdminDashboard,
  adminDeleteEvent,
} from "../controllers/adminController";

import {
  protect,
} from "../middleware/authMiddleware";

import {
  adminOnly,
} from "../middleware/adminMiddleware";

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