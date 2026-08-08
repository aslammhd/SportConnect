import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

const cloudName =
    process.env.CLOUDINARY_CLOUD_NAME;

const apiKey =
    process.env.CLOUDINARY_API_KEY;

const apiSecret =
    process.env.CLOUDINARY_API_SECRET;

if (!cloudName) {
    throw new Error(
        "CLOUDINARY_CLOUD_NAME is missing from the backend .env file"
    );
}

if (!apiKey) {
    throw new Error(
        "CLOUDINARY_API_KEY is missing from the backend .env file"
    );
}

if (!apiSecret) {
    throw new Error(
        "CLOUDINARY_API_SECRET is missing from the backend .env file"
    );
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
});

export const deleteCloudinaryImage =
    async (publicId?: string) => {
        if (!publicId) {
            return;
        }

        const result =
            await cloudinary.uploader.destroy(
                publicId,
                {
                    resource_type: "image",
                    invalidate: true,
                }
            );

        return result;
    };
export default cloudinary;