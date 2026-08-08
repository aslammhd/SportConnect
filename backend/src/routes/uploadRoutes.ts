import { Router } from "express";

import {
  uploadImage,
  uploadAvatar,
  uploadCoverImage,
} from "../controllers/uploadController";

import upload from "../middleware/uploadMiddleware";
import { protect } from "../middleware/authMiddleware";

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