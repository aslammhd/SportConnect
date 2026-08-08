import type {
  NextFunction,
  Request,
  Response,
} from "express";

import type {
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";

import cloudinary from "../config/cloudinary";

interface CloudinaryUploadResult {
  secureUrl: string;
  publicId: string;
}

const uploadBufferToCloudinary = (
  fileBuffer: Buffer,
  folder: string
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",

          transformation: [
            {
              width: 1600,
              height: 900,
              crop: "limit",
              quality: "auto",
              fetch_format: "auto",
            },
          ],
        },
        (
          error:
            | UploadApiErrorResponse
            | undefined,
          result:
            | UploadApiResponse
            | undefined
        ) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(
              new Error(
                "Cloudinary did not return an upload result"
              )
            );
            return;
          }

          resolve({
            secureUrl: result.secure_url,
            publicId: result.public_id,
          });
        }
      );

    uploadStream.end(fileBuffer);
  });
};

export const uploadImage = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (!request.file) {
      response.status(400).json({
        message: "Please select an image",
      });

      return;
    }

    const result =
      await uploadBufferToCloudinary(
        request.file.buffer,
        "sportconnect/events"
      );

    response.status(201).json({
      message: "Image uploaded successfully",
      imageUrl: result.secureUrl,
      publicId: result.publicId,
    });
  } catch (error) {
    console.error(
      "Event image upload failed:",
      error
    );

    next(error);
  }
};

export const uploadAvatar = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (!request.file) {
      response.status(400).json({
        message:
          "Please select an avatar image",
      });

      return;
    }

    const result =
      await uploadBufferToCloudinary(
        request.file.buffer,
        "sportconnect/users/avatars"
      );

    response.status(201).json({
      message:
        "Avatar uploaded successfully",
      imageUrl: result.secureUrl,
      publicId: result.publicId,
    });
  } catch (error) {
    console.error(
      "Avatar upload failed:",
      error
    );

    next(error);
  }
};

export const uploadCoverImage = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    if (!request.file) {
      response.status(400).json({
        message:
          "Please select a cover image",
      });

      return;
    }

    const result =
      await uploadBufferToCloudinary(
        request.file.buffer,
        "sportconnect/users/covers"
      );

    response.status(201).json({
      message:
        "Cover image uploaded successfully",
      imageUrl: result.secureUrl,
      publicId: result.publicId,
    });
  } catch (error) {
    console.error(
      "Cover image upload failed:",
      error
    );

    next(error);
  }
};