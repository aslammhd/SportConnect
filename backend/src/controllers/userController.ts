import type { Response } from "express";

import {
  deleteCloudinaryImage,
} from "../config/cloudinary";

import Event from "../models/event";
import User from "../models/User";

import type {
  AuthRequest,
} from "../middleware/authMiddleware";

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(
      req.userId
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hostedEvents = await Event.find({
      host: req.userId,
    }).sort({
      createdAt: -1,
    });

    const joinedEvents = await Event.find({
      participants: req.userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,

      user,

      stats: {
        hosted: hostedEvents.length,
        joined: joinedEvents.length,
      },

      hostedEvents,
      joinedEvents,
    });
  } catch (error) {
    console.error(
      "Get profile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load profile",
    });
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(
      req.userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const oldAvatarPublicId =
      user.avatarPublicId;

    const oldCoverPublicId =
      user.coverImagePublicId;

    /*
      BASIC PROFILE DETAILS
    */

    if (
      typeof req.body.name === "string"
    ) {
      user.name = req.body.name.trim();
    }

    if (
      typeof req.body.bio === "string"
    ) {
      user.bio = req.body.bio.trim();
    }

    if (
      typeof req.body.location === "string"
    ) {
      user.location =
        req.body.location.trim();
    }

    /*
      AVATAR

      Empty string is allowed so the
      user can remove the avatar.
    */

    if (
      typeof req.body.avatar === "string"
    ) {
      user.avatar = req.body.avatar;
    }

    if (
      typeof req.body.avatarPublicId ===
      "string"
    ) {
      user.avatarPublicId =
        req.body.avatarPublicId;
    }

    /*
      COVER IMAGE
    */

    if (
      typeof req.body.coverImage ===
      "string"
    ) {
      user.coverImage =
        req.body.coverImage;
    }

    if (
      typeof req.body.coverImagePublicId ===
      "string"
    ) {
      user.coverImagePublicId =
        req.body.coverImagePublicId;
    }

    /*
      SAVE TO MONGODB FIRST
    */

    await user.save();

    /*
      DELETE OLD AVATAR FROM CLOUDINARY
      ONLY IF IT CHANGED
    */

    if (
      oldAvatarPublicId &&
      oldAvatarPublicId !==
        user.avatarPublicId
    ) {
      try {
        await deleteCloudinaryImage(
          oldAvatarPublicId
        );
      } catch (error) {
        console.error(
          "Old avatar cleanup failed:",
          error
        );
      }
    }

    /*
      DELETE OLD COVER FROM CLOUDINARY
      ONLY IF IT CHANGED
    */

    if (
      oldCoverPublicId &&
      oldCoverPublicId !==
        user.coverImagePublicId
    ) {
      try {
        await deleteCloudinaryImage(
          oldCoverPublicId
        );
      } catch (error) {
        console.error(
          "Old cover image cleanup failed:",
          error
        );
      }
    }

    return res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,

        bio: user.bio,
        location: user.location,

        avatar: user.avatar,
        avatarPublicId:
          user.avatarPublicId,

        coverImage:
          user.coverImage,

        coverImagePublicId:
          user.coverImagePublicId,
      },
    });
  } catch (error) {
    console.error(
      "Update profile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to update profile",
    });
  }
};