import { Request, Response } from "express";
import Event from "../models/event";
import { AuthRequest } from "../middleware/authMiddleware";
import mongoose from "mongoose";
import {
    deleteCloudinaryImage,
} from "../config/cloudinary";

export const createEvent = async (
    req: AuthRequest,
    res: Response
) => {
    if (!req.userId) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }
    try {
        const {
            title,
            description,
            sport,
            skillLevel,
            date,
            time,
            location,
            maxParticipants,
            price,
            image,
        } = req.body;

        const event = await Event.create({
            title,
            description,
            sport,
            skillLevel,
            date,
            time,
            location,
            maxParticipants,
            price,
            image,
            host: req.userId,
            participants: [req.userId],
        });

        res.status(201).json({
            success: true,
            message: "Event created successfully.",
            event,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create event.",
        });
    }
};
export const getAllEvents = async (
    req: Request,
    res: Response
) => {
    try {

        const events = await Event.find()

            .populate(
                "host",
                "name username avatar"
            )

            .sort({
                createdAt: -1,
            });

        res.status(200).json({
            success: true,
            count: events.length,
            events,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch events.",
        });

    }
};
export const getEventById = async (
    req: Request,
    res: Response
) => {

    try {

        const event =
            await Event.findById(req.params.id)
                .populate(
                    "host",
                    "name username avatar"
                )
                .populate(
                    "participants",
                    "name username avatar"
                );


        if (!event) {

            res.status(404).json({
                success: false,
                message: "Event not found",
            });

            return;
        }



        res.status(200).json({

            success: true,

            event,

        });



    } catch (error) {


        console.error(error);


        res.status(500).json({

            success: false,

            message: "Failed to fetch event",

        });


    }

};
export const joinEvent = async (
    req: AuthRequest,
    res: Response
) => {

    try {

        if (!req.userId) {

            return res.status(401).json({

                success: false,

                message: "Unauthorized"

            });

        }



        const event =
            await Event.findById(req.params.id);



        if (!event) {

            return res.status(404).json({

                success: false,

                message: "Event not found"

            });

        }
        if (event.status === "completed") {
            return res.status(400).json({
                message:
                    "You cannot join a completed event",
            });
        }




        // Check if already joined

        const alreadyJoined =
            event.participants.some(
                (participant) =>
                    participant.toString() === req.userId
            );



        if (alreadyJoined) {

            return res.status(400).json({

                success: false,

                message: "Already joined this event"

            });

        }





        // Check event capacity

        if (
            event.participants.length >=
            event.maxParticipants
        ) {


            return res.status(400).json({

                success: false,

                message: "Event is full"

            });


        }





        event.participants.push(
            new mongoose.Types.ObjectId(req.userId)
        );


        await event.save();



        res.status(200).json({

            success: true,

            message: "Joined event successfully",

            event

        });



    } catch (error) {


        console.error(error);


        res.status(500).json({

            success: false,

            message: "Failed to join event"

        });


    }

};

export const leaveEvent = async (
    req: AuthRequest,
    res: Response
) => {

    try {

        if (!req.userId) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });

        }


        const event =
            await Event.findById(req.params.id);


        if (!event) {

            return res.status(404).json({
                success: false,
                message: "Event not found"
            });

        }

        if (event.status === "completed") {
            return res.status(400).json({
                message:
                    "This event has already been completed",
            });
        }


        event.participants =
            event.participants.filter(
                (participant) =>
                    participant.toString() !== req.userId
            );



        await event.save();



        res.status(200).json({

            success: true,

            message: "Left event successfully",

            event

        });



    } catch (error) {

        console.error(error);


        res.status(500).json({

            success: false,

            message: "Failed to leave event"

        });

    }

};

export const updateEvent = async (
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

        const event =
            await Event.findById(req.params.id);

        if (!event) {

            return res.status(404).json({
                success: false,
                message: "Event not found.",
            });

        }

        if (event.host.toString() !== req.userId) {

            return res.status(403).json({
                success: false,
                message: "You can only edit your own events.",
            });

        }

        const updatedEvent =
            await Event.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            ).populate(
                "host",
                "name username"
            );

        const oldImagePublicId =
            event.imagePublicId;

        event.title =
            req.body.title ?? event.title;

        event.description =
            req.body.description ??
            event.description;

        event.sport =
            req.body.sport ?? event.sport;

        event.skillLevel =
            req.body.skillLevel ??
            event.skillLevel;

        event.date =
            req.body.date ?? event.date;

        event.time =
            req.body.time ?? event.time;

        event.location =
            req.body.location ??
            event.location;

        event.maxParticipants =
            req.body.maxParticipants ??
            event.maxParticipants;

        event.price =
            req.body.price ?? event.price;

        /*
          These two are deliberately different
          because "" is valid when removing an image.
        */

        if (
            typeof req.body.image === "string"
        ) {
            event.image = req.body.image;
        }

        if (
            typeof req.body.imagePublicId ===
            "string"
        ) {
            event.imagePublicId =
                req.body.imagePublicId;
        }

        await event.save();

        /*
          MongoDB is successfully updated.
    
          Now clean up the OLD Cloudinary image
          if it was replaced or removed.
        */

        if (
            oldImagePublicId &&
            oldImagePublicId !==
            event.imagePublicId
        ) {
            try {
                await deleteCloudinaryImage(
                    oldImagePublicId
                );
            } catch (cloudinaryError) {
                console.error(
                    "Failed to delete old Cloudinary image:",
                    cloudinaryError
                );
            }
        }

        res.status(200).json({

            success: true,

            message: "Event updated successfully.",

            event: updatedEvent,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Failed to update event.",

        });

    }

};

export const deleteEvent = async (
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

        const event =
            await Event.findById(req.params.id);

        if (!event) {

            return res.status(404).json({
                success: false,
                message: "Event not found.",
            });

        }

        if (event.host.toString() !== req.userId) {

            return res.status(403).json({
                success: false,
                message: "You can only delete your own events.",
            });

        }
        const imagePublicId =
            event.imagePublicId;

        await Event.findByIdAndDelete(req.params.id);

        if (imagePublicId) {
            try {
                await deleteCloudinaryImage(
                    imagePublicId
                );
            } catch (cloudinaryError) {
                console.error(
                    "Failed to delete Cloudinary image:",
                    cloudinaryError
                );
            }
        }
        res.status(200).json({

            success: true,

            message: "Event deleted successfully."

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Failed to delete event."

        });

    }

};

export const completeEvent = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const event = await Event.findById(
            req.params.id
        );

        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        if (
            event.host.toString() !==
            req.userId.toString()
        ) {
            return res.status(403).json({
                message:
                    "Only the host can complete this event",
            });
        }

        if (event.status === "completed") {
            return res.status(400).json({
                message:
                    "Event is already completed",
            });
        }

        event.status = "completed";

        await event.save();

        return res.status(200).json({
            message:
                "Event marked as completed",
            event,
        });
    } catch (error) {
        console.error(
            "Complete event error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to complete event",
        });
    }
};