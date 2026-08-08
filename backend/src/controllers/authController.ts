import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../middleware/authMiddleware";
export const testAuth = (
    req: Request,
    res: Response
) => {
    res.status(200).json({
        success: true,
        message: "Authentication controller is working 🚀",
    });
};

export const registerUser = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(409).json({
                success: false,
                message: "Email already exists.",
            });
        }

        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.status(409).json({
                success: false,
                message: "Username already exists.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export const loginUser = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        // 2. Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        // 3. Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        // 4. Generate JWT
        const token = generateToken(user._id.toString());

        // 5. Return success
        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                location: user.location,
                favouriteSports: user.favouriteSports,
            },
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};
export const getCurrentUser = async (
    req: AuthRequest,
    res: Response
) => {

    try {

        const user = await User.findById(
            req.userId
        ).select("-password");

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found.",

            });

        }

        res.status(200).json({

            success: true,

            user,

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal server error.",

        });

    }

};