import { Router } from "express";

import {
  uploadImage,
  uploadAvatar,
  uploadCoverImage,
} from "../controllers/uploadController.js";

import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post(
  "/image",
  protect,
  upload.single("image"),
  uploadImage
);

router.post(
  "/avatar",
  protect,
  upload.single("image"),
  uploadAvatar
);

router.post(
  "/cover",
  protect,
  upload.single("image"),
  uploadCoverImage
);

export default router;