import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  role: "user" | "admin";
  email: string;
  password: string;
  avatar?: string;
  location?: string;
  bio?: string;
  coverImage?: string;
  avatarPublicId?: string;
  coverImagePublicId?: string;
  favouriteSports: string[];
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    avatarPublicId: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
    },

    coverImagePublicId: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    favouriteSports: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;