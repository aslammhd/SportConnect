import { Router } from "express";

import { protect } from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/userController.js";
import {
  updateProfile,
} from "../controllers/userController.js";

const router = Router();

router.get(
    "/profile",
    protect,
    getProfile
);

router.put(
  "/profile",
  protect,
  updateProfile
);

export default router;