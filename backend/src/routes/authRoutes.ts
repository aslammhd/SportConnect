import { Router } from "express";
import {
  testAuth,
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

router.get("/test", testAuth);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get(
  "/me",
  protect,
  getCurrentUser
);

export default router;