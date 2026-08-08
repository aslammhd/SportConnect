import { Router } from "express";

import { protect } from "../middleware/authMiddleware";
import { getProfile } from "../controllers/userController";
import {
  updateProfile,
} from "../controllers/userController";

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