import {
  useRef,
  useState,
} from "react";

import type {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
} from "react";

import {
  CalendarDays,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  LoaderCircle,
  MapPin,
  Trash2,
  Upload,
  Users,
} from "lucide-react";

import Button from "./button";
import FilterSelect from "./filterSelect";

import { sportOptions } from "../constants/sport";
import { skillLevelOptions } from "../constants/skilllevels";

import { uploadImage } from "../api/uploadApi";
import CreateEventImage from "../assets/images/CreateEvent.png";

import type {
  EventFormData,
} from "../types/event";

interface EventFormErrors {
  title: string;
  description: string;
  sport: string;
  location: string;
  date: string;
  time: string;
}

interface EventFormProps {
  formData: EventFormData;
  errors: EventFormErrors;

  loading: boolean;
  success: boolean;
  inputClass: string;
  today: string;

  title: string;
  description: string;
  submitText: string;
  loadingText: string;
  successMessage: string;

  handleSubmit: (
    event: FormEvent<HTMLFormElement>
  ) => void;

  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;

  setFormData: Dispatch<
    SetStateAction<EventFormData>
  >;
}

function EventForm({
  formData,
  errors,
  loading,
  success,
  inputClass,
  today,
  title,
  description,
  submitText,
  loadingText,
  successMessage,
  handleSubmit,
  handleChange,
  setFormData,
}: EventFormProps) {
  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [imageUploadError, setImageUploadError] =
    useState("");

  const handleImageSelection = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setImageUploadError(
        "Please select a JPG, PNG or WebP image."
      );

      event.target.value = "";
      return;
    }

    const maximumFileSize =
      5 * 1024 * 1024;

    if (file.size > maximumFileSize) {
      setImageUploadError(
        "The image must be smaller than 5 MB."
      );

      event.target.value = "";
      return;
    }

    try {
      setUploadingImage(true);
      setImageUploadError("");

      const result =
        await uploadImage(file);

      setFormData(
        (previousData) => ({
          ...previousData,

          image:
            result.imageUrl,

          imagePublicId:
            result.publicId,
        })
      );
    } catch (error) {
      console.error(
        "Image upload failed:",
        error
      );

      setImageUploadError(
        "Unable to upload the image. Please try again."
      );
    } finally {
      setUploadingImage(false);

      event.target.value = "";
    }
  };

  const handleRemoveImage = () => {
    setFormData(
      (previousData) => ({
        ...previousData,
        image: "",
        imagePublicId: "",
      })
    );

    setImageUploadError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const fieldClass =
    `${inputClass} bg-gray-50 border-gray-200 hover:border-gray-300 focus:bg-white focus:ring-blue-100`;

  const sectionClass =
    "rounded-2xl border border-gray-100 bg-gray-50/70 p-5 sm:p-6";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}

      <section className="relative overflow-hidden">
        <div
          className="
            absolute
            inset-0
            bg-cover
            bg-center
          "
            style={{
          backgroundImage: `url(${CreateEventImage})`,
        }}
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/80
            via-black/60
            to-black/30
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-6
            py-16
            md:py-20
          "
        >
          <div className="max-w-2xl">
            <p
              className="
                text-sm
                font-semibold
                uppercase
                tracking-[0.2em]
                text-blue-300
              "
            >
              Build your sports community
            </p>

            <h1
              className="
                mt-3
                text-4xl
                font-bold
                leading-tight
                text-white
                md:text-5xl
              "
            >
              {title}
            </h1>

            <p
              className="
                mt-4
                max-w-xl
                text-lg
                leading-relaxed
                text-gray-200
              "
            >
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* FORM AREA */}

      <section
        className="
          relative
          z-20
          mx-auto
          -mt-8
          max-w-5xl
          px-4
          pb-16
          sm:px-6
        "
      >
        {success && (
          <div
            className="
              mb-5
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-green-200
              bg-green-50
              p-4
              text-green-700
              shadow-sm
            "
          >
            <CheckCircle size={20} />

            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="
            space-y-6
            rounded-3xl
            border
            border-gray-100
            bg-white
            p-5
            shadow-xl
            sm:p-7
            md:p-8
          "
        >
          {/* BASIC INFORMATION */}

          <section className={sectionClass}>
            <div className="mb-5">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-blue-600
                "
              >
                Step 1
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Tell people what your event is about.
              </p>
            </div>

            <label
              htmlFor="title"
              className="text-sm font-semibold text-gray-700"
            >
              Event Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Football Meetup"
              className={fieldClass}
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title}
              </p>
            )}

            <label
              htmlFor="description"
              className="
                mt-5
                block
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={4}
              maxLength={300}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event..."
              className={fieldClass}
            />

            <div className="mt-1 flex justify-between">
              {errors.description ? (
                <p className="text-sm text-red-500">
                  {errors.description}
                </p>
              ) : (
                <span />
              )}

              <p className="text-xs text-gray-400">
                {formData.description.length}/300
              </p>
            </div>
          </section>

          {/* EVENT DETAILS */}

          <section className={sectionClass}>
            <div className="mb-5">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-blue-600
                "
              >
                Step 2
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Event Details
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose the sport, level, date and time.
              </p>
            </div>

            <div
              className="
                grid
                gap-5
                md:grid-cols-2
              "
            >
              <div>
                <FilterSelect
                  label="Sport"
                  value={formData.sport}
                  options={sportOptions}
                  onChange={(value) =>
                    setFormData(
                      (previousData) => ({
                        ...previousData,
                        sport: value,
                      })
                    )
                  }
                />

                {errors.sport && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.sport}
                  </p>
                )}
              </div>

              <FilterSelect
                label="Skill Level"
                value={formData.skillLevel}
                options={skillLevelOptions}
                onChange={(value) =>
                  setFormData(
                    (previousData) => ({
                      ...previousData,
                      skillLevel: value,
                    })
                  )
                }
              />

              <div>
                <label
                  htmlFor="date"
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  <CalendarDays size={17} />
                  Date
                </label>

                <input
                  id="date"
                  type="date"
                  name="date"
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  className={fieldClass}
                />

                {errors.date && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  <Clock size={17} />
                  Time
                </label>

                <input
                  id="time"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={fieldClass}
                />

                {errors.time && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.time}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* VENUE */}

          <section className={sectionClass}>
            <div className="mb-5">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-blue-600
                "
              >
                Step 3
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Venue & Capacity
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Tell participants where to meet and how many can join.
              </p>
            </div>

            <div
              className="
                grid
                gap-5
                md:grid-cols-2
              "
            >
              <div>
                <label
                  htmlFor="location"
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  <MapPin size={17} />
                  Location
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Glasgow Green"
                  className={fieldClass}
                />

                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.location}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="maxParticipants"
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-gray-700
                  "
                >
                  <Users size={17} />
                  Maximum Participants
                </label>

                <input
                  id="maxParticipants"
                  type="number"
                  name="maxParticipants"
                  min={2}
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
            </div>
          </section>

          {/* PRICING */}

          <section className={sectionClass}>
            <div className="mb-5">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-blue-600
                "
              >
                Step 4
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Pricing
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Let participants know whether the event is free or paid.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  setFormData(
                    (previousData) => ({
                      ...previousData,
                      price: "Free",
                    })
                  )
                }
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  transition
                  ${
                    formData.price === "Free"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }
                `}
              >
                <DollarSign size={18} />

                Free
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData(
                    (previousData) => ({
                      ...previousData,
                      price: "Paid",
                    })
                  )
                }
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  transition
                  ${
                    formData.price === "Paid"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }
                `}
              >
                <CreditCard size={18} />

                Paid
              </button>
            </div>
          </section>

          {/* IMAGE */}

          <section className={sectionClass}>
            <div className="mb-5">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-blue-600
                "
              >
                Step 5
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Event Image
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add an image that helps your event stand out.
              </p>
            </div>

            <input
              ref={fileInputRef}
              id="event-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageSelection}
              disabled={
                uploadingImage ||
                loading
              }
              className="hidden"
            />

            {!formData.image && (
              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                disabled={
                  uploadingImage ||
                  loading
                }
                className="
                  flex
                  w-full
                  flex-col
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border-2
                  border-dashed
                  border-gray-300
                  bg-white
                  px-6
                  py-9
                  text-gray-500
                  transition
                  hover:border-blue-400
                  hover:bg-blue-50/50
                  hover:text-blue-600
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {uploadingImage ? (
                  <>
                    <LoaderCircle
                      size={25}
                      className="animate-spin"
                    />

                    <span className="font-medium">
                      Uploading image...
                    </span>
                  </>
                ) : (
                  <>
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-50
                        text-blue-600
                      "
                    >
                      <Upload size={20} />
                    </div>

                    <span className="font-semibold">
                      Choose event image
                    </span>

                    <span className="text-xs text-gray-400">
                      JPG, PNG or WebP · Max 5 MB
                    </span>
                  </>
                )}
              </button>
            )}

            {imageUploadError && (
              <p className="mt-3 text-sm text-red-500">
                {imageUploadError}
              </p>
            )}

            {formData.image && (
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={formData.image}
                  alt="Event preview"
                  className="
                    h-64
                    w-full
                    object-cover
                  "
                />

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    flex
                    justify-end
                    gap-2
                    bg-gradient-to-t
                    from-black/60
                    to-transparent
                    p-4
                  "
                >
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    disabled={
                      uploadingImage ||
                      loading
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      bg-white
                      px-3
                      py-2
                      text-sm
                      font-medium
                      text-gray-700
                      shadow
                      transition
                      hover:bg-gray-100
                    "
                  >
                    {uploadingImage ? (
                      <LoaderCircle
                        size={16}
                        className="animate-spin"
                      />
                    ) : (
                      <Upload size={16} />
                    )}

                    Replace
                  </button>

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={
                      uploadingImage ||
                      loading
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      bg-red-600
                      px-3
                      py-2
                      text-sm
                      font-medium
                      text-white
                      shadow
                      transition
                      hover:bg-red-700
                    "
                  >
                    <Trash2 size={16} />

                    Remove
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* SUBMIT */}

          <div className="pt-1">
            <Button
              type="submit"
              disabled={
                loading ||
                uploadingImage
              }
              className="w-full"
            >
              {uploadingImage ? (
                <>
                  <LoaderCircle
                    className="animate-spin"
                    size={18}
                  />

                  Uploading image...
                </>
              ) : loading ? (
                <>
                  <LoaderCircle
                    className="animate-spin"
                    size={18}
                  />

                  {loadingText}
                </>
              ) : (
                submitText
              )}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default EventForm;