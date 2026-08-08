import mongoose, {
    Schema,
    Document,
} from "mongoose";


export interface IEvent extends Document {

    title: string;

    description: string;

    sport: string;

    skillLevel: string;

    date: string;

    time: string;

    location: string;

    maxParticipants: number;

    price: string;

    status?: "upcoming" | "completed" | "cancelled";

    image?: string;

    imagePublicId?: string;

    host: mongoose.Types.ObjectId;

    participants: mongoose.Types.ObjectId[];

    createdAt: Date;

}


const EventSchema = new Schema<IEvent>(
    {

        title: {
            type: String,
            required: true,
            trim: true,
        },


        description: {
            type: String,
            required: true,
        },


        sport: {
            type: String,
            required: true,
        },


        skillLevel: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["upcoming", "completed", "cancelled"],
            default: "upcoming",
        },

        date: {
            type: String,
            required: true,
        },


        time: {
            type: String,
            required: true,
        },


        location: {
            type: String,
            required: true,
        },


        maxParticipants: {
            type: Number,
            required: true,
            default: 20,
        },


        price: {
            type: String,
            default: "Free",
        },


        image: {
            type: String,
        },

        imagePublicId: {
            type: String,
            default: "",
        },

        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },


        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],


    },
    {
        timestamps: true,
    }
);


export default mongoose.model<IEvent>(
    "Event",
    EventSchema
);