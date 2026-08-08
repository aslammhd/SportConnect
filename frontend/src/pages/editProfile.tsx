import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  ChangeEvent,
} from "react";

import {
  Camera,
  ImagePlus,
  LoaderCircle,
  MapPin,
  Trash2,
  UserRound,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getProfile,
  updateProfile,
} from "../api/userApi";

import {
  uploadAvatar,
  uploadCoverImage,
} from "../api/uploadApi";

interface ProfileFormData {
  name: string;
  bio: string;
  location: string;

  avatar: string;
  avatarPublicId: string;

  coverImage: string;
  coverImagePublicId: string;
}

const initialFormData: ProfileFormData = {
  name: "",
  bio: "",
  location: "",

  avatar: "",
  avatarPublicId: "",

  coverImage: "",
  coverImagePublicId: "",
};

function EditProfile() {
  const navigate = useNavigate();

  const avatarInputRef =
    useRef<HTMLInputElement | null>(null);

  const coverInputRef =
    useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] =
    useState<ProfileFormData>(
      initialFormData
    );

  const [loadingProfile, setLoadingProfile] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [uploadingAvatar, setUploadingAvatar] =
    useState(false);

  const [uploadingCover, setUploadingCover] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoadingProfile(true);
        setError("");

        const data = await getProfile();

        const user =
          data.user ?? data;

        setFormData({
          name: user.name ?? "",
          bio: user.bio ?? "",
          location: user.location ?? "",

          avatar: user.avatar ?? "",
          avatarPublicId:
            user.avatarPublicId ?? "",

          coverImage:
            user.coverImage ?? "",
          coverImagePublicId:
            user.coverImagePublicId ?? "",
        });
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );

        setError(
          "Unable to load your profile."
        );
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  const validateImage = (
    file: File
  ) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Please select a JPG, PNG or WebP image."
      );

      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "The image must be smaller than 5 MB."
      );

      return false;
    }

    return true;
  };

  const handleAvatarUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!validateImage(file)) {
      event.target.value = "";
      return;
    }

    try {
      setUploadingAvatar(true);
      setError("");

      const result =
        await uploadAvatar(file);

      setFormData(
        (previousData) => ({
          ...previousData,
          avatar: result.imageUrl,
          avatarPublicId:
            result.publicId,
        })
      );
    } catch (error) {
      console.error(
        "Avatar upload failed:",
        error
      );

      setError(
        "Unable to upload avatar."
      );
    } finally {
      setUploadingAvatar(false);
      event.target.value = "";
    }
  };

  const handleCoverUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!validateImage(file)) {
      event.target.value = "";
      return;
    }

    try {
      setUploadingCover(true);
      setError("");

      const result =
        await uploadCoverImage(file);

      setFormData(
        (previousData) => ({
          ...previousData,
          coverImage:
            result.imageUrl,
          coverImagePublicId:
            result.publicId,
        })
      );
    } catch (error) {
      console.error(
        "Cover upload failed:",
        error
      );

      setError(
        "Unable to upload cover image."
      );
    } finally {
      setUploadingCover(false);
      event.target.value = "";
    }
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {
    const { name, value } =
      event.target;

    setFormData(
      (previousData) => ({
        ...previousData,
        [name]: value,
      })
    );
  };

  const handleRemoveAvatar = () => {
    setFormData(
      (previousData) => ({
        ...previousData,
        avatar: "",
        avatarPublicId: "",
      })
    );
  };

  const handleRemoveCover = () => {
    setFormData(
      (previousData) => ({
        ...previousData,
        coverImage: "",
        coverImagePublicId: "",
      })
    );
  };

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError(
        "Name is required."
      );

      return;
    }

    try {
      setSaving(true);
      setSuccess(false);
      setError("");

      await updateProfile({
        name: formData.name,
        bio: formData.bio,
        location:
          formData.location,

        avatar:
          formData.avatar,
        avatarPublicId:
          formData.avatarPublicId,

        coverImage:
          formData.coverImage,
        coverImagePublicId:
          formData.coverImagePublicId,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/profile");
      }, 800);
    } catch (error) {
      console.error(
        "Profile update failed:",
        error
      );

      setError(
        "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="py-24 text-center">
        <LoaderCircle
          className="mx-auto animate-spin"
          size={32}
        />

        <p className="mt-4 text-gray-600">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold">
        Edit Profile
      </h1>

      <p className="text-gray-600 mt-2">
        Update your profile information
        and images.
      </p>

      {error && (
        <div className="mt-6 rounded-xl bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-6 rounded-xl bg-green-100 p-4 text-green-700">
          Profile updated successfully.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-8 rounded-3xl bg-white p-8 shadow-lg"
      >
        {/* COVER IMAGE */}

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Cover Image
          </h2>

          <input
            ref={coverInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleCoverUpload}
            className="hidden"
          />

          <div className="relative overflow-hidden rounded-2xl bg-gray-100 h-56">
            {formData.coverImage ? (
              <img
                src={formData.coverImage}
                alt="Cover"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                <ImagePlus size={42} />
              </div>
            )}

            <div className="absolute right-3 top-3 flex gap-2">
              <button
                type="button"
                onClick={() =>
                  coverInputRef.current?.click()
                }
                disabled={uploadingCover}
                className="rounded-lg bg-white px-3 py-2 shadow"
              >
                {uploadingCover ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Camera size={18} />
                )}
              </button>

              {formData.coverImage && (
                <button
                  type="button"
                  onClick={
                    handleRemoveCover
                  }
                  className="rounded-lg bg-red-600 px-3 py-2 text-white shadow"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* AVATAR */}

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Profile Picture
          </h2>

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleAvatarUpload}
            className="hidden"
          />

          <div className="flex items-center gap-5">
            <div className="h-28 w-28 overflow-hidden rounded-full bg-gray-100">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  <UserRound size={42} />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  avatarInputRef.current?.click()
                }
                disabled={uploadingAvatar}
                className="rounded-xl border px-4 py-2 font-medium"
              >
                {uploadingAvatar
                  ? "Uploading..."
                  : "Change Photo"}
              </button>

              {formData.avatar && (
                <button
                  type="button"
                  onClick={
                    handleRemoveAvatar
                  }
                  className="rounded-xl border border-red-200 px-4 py-2 font-medium text-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </section>

        {/* PROFILE INFORMATION */}

        <section className="space-y-5">
          <h2 className="text-xl font-semibold">
            Profile Information
          </h2>

          <div>
            <label
              htmlFor="name"
              className="font-medium"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="flex items-center gap-2 font-medium"
            >
              <MapPin size={17} />
              Location
            </label>

            <input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Glasgow"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="font-medium"
            >
              Bio
            </label>

            <textarea
              id="bio"
              name="bio"
              rows={4}
              maxLength={300}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell the community a little about yourself..."
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="mt-1 text-right text-sm text-gray-500">
              {formData.bio.length}/300
            </p>
          </div>
        </section>

        <button
          type="submit"
          disabled={
            saving ||
            uploadingAvatar ||
            uploadingCover
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
              />

              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
}

export default EditProfile;