import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    createEvent,
    getAllEvents,
    getEventById,
    joinEvent,
    leaveEvent,
    updateEvent,
    deleteEvent,
    completeEvent,
} from "../controllers/eventController.js";
const router = Router();

router.get(
    "/", getAllEvents);
    
router.get(
    "/:id",
    getEventById
);    

router.post(
    "/",
    protect,
    createEvent
);
router.post(
    "/:id/join",
    protect,
    joinEvent
);
router.delete(
    "/:id/join",
    protect,
    leaveEvent
);
router.put(
    "/:id",
    protect,
    updateEvent
);
router.delete(
    "/:id",
    protect,
    deleteEvent
);
router.patch(
  "/:id/complete",
  protect,
  completeEvent
);
export default router;