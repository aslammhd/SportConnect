import api from "./api";

interface UploadImageResponse {
  message: string;
  imageUrl: string;
  publicId: string;
}

export const uploadImage = async (
  file: File
): Promise<UploadImageResponse> => {
  const formData = new FormData();

  formData.append("image", file);

  const response =
    await api.post<UploadImageResponse>(
      "/uploads/image",
      formData
    );

  return response.data;
};

export const uploadAvatar = async (
  file: File
): Promise<UploadImageResponse> => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post<UploadImageResponse>(
    "/uploads/avatar",
    formData
  );

  return response.data;
};

export const uploadCoverImage = async (
  file: File
): Promise<UploadImageResponse> => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post<UploadImageResponse>(
    "/uploads/cover",
    formData
  );

  return response.data;
};