import api from "./api";

export const getProfile = async () => {

    const response =
        await api.get("/users/profile");

    return response.data;

};

export interface UpdateProfileData {
  name: string;
  bio: string;
  location: string;

  avatar: string;
  avatarPublicId: string;

  coverImage: string;
  coverImagePublicId: string;
}

export const updateProfile = async (
  data: UpdateProfileData
) => {
  const response = await api.put(
    "/users/profile",
    data
  );

  return response.data;
};