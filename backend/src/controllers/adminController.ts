import type { Request, Response } from "express";

import User from "../models/User";
import Event from "../models/event";

import {
  deleteCloudinaryImage,
} from "../config/cloudinary";

export const getAdminDashboard = async (
  _req: Request,
  res: Response
) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    const events = await Event.find()
      .populate("host", "name email avatar")
      .sort({ createdAt: -1 });

    const completedEvents = await Event.countDocuments({
      status: "completed",
    });

    const upcomingEvents = await Event.countDocuments({
      status: {
        $ne: "completed",
      },
    });

    return res.status(200).json({
      success: true,

      stats: {
        users: users.length,
        events: events.length,
        upcomingEvents,
        completedEvents,
      },

      users,
      events,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard",
    });
  }
};

export const adminDeleteEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const imagePublicId = event.imagePublicId;

    await event.deleteOne();

    if (imagePublicId) {
      try {
        await deleteCloudinaryImage(
          imagePublicId
        );
      } catch (error) {
        console.error(
          "Admin Cloudinary cleanup failed:",
          error
        );
      }
    }

    return res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Admin delete event error:", error);

    return res.status(500).json({
      message: "Failed to delete event",
    });
  }
};