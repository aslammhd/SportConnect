import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EventForm from "../components/eventForm";

import {
    getEventById,
    updateEvent,
} from "../api/eventApi";
import type { EventFormData } from "../types/event";



interface EventFormErrors {
    title: string;
    description: string;
    sport: string;
    location: string;
    date: string;
    time: string;
}

const initialFormData: EventFormData = {
    title: "",
    description: "",
    sport: "",
    skillLevel: "",
    date: "",
    time: "",
    location: "",
    maxParticipants: 20,
    price: "Free",
    image: "",
    imagePublicId: "",
};

const initialErrors: EventFormErrors = {
    title: "",
    description: "",
    sport: "",
    location: "",
    date: "",
    time: "",
};
function EditEvent() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState<EventFormData>(initialFormData);

    const [errors, setErrors] =
        useState<EventFormErrors>(initialErrors);

    const [loadingEvent, setLoadingEvent] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [success, setSuccess] =
        useState(false);

    const [pageError, setPageError] =
        useState("");

    const inputClass =
        "w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

    const today = new Date()
        .toISOString()
        .split("T")[0];

    useEffect(() => {
        if (!id) {
            setPageError("Event ID is missing.");
            setLoadingEvent(false);
            return;
        }

        const loadEvent = async () => {
            try {
                setLoadingEvent(true);
                setPageError("");

                const data = await getEventById(id);
                const event = data.event;

                setFormData({
                    title: event.title ?? "",
                    description: event.description ?? "",
                    sport: event.sport ?? "",
                    skillLevel: event.skillLevel ?? "",
                    date: event.date ?? "",
                    time: event.time ?? "",
                    location: event.location ?? "",
                    maxParticipants:
                        event.maxParticipants ?? 20,
                    price: event.price ?? "Free",
                    image: event.image ?? "",
                    imagePublicId:
                        event.imagePublicId ?? "",
                });
            } catch (error) {
                console.error(
                    "Failed to load event:",
                    error
                );

                setPageError(
                    "Unable to load this event."
                );
            } finally {
                setLoadingEvent(false);
            }
        };

        loadEvent();
    }, [id]);

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]:
                name === "maxParticipants"
                    ? Number(value)
                    : value,
        }));
    };

    const validateForm = () => {
        const newErrors: EventFormErrors = {
            title: "",
            description: "",
            sport: "",
            location: "",
            date: "",
            time: "",
        };

        if (!formData.title.trim()) {
            newErrors.title =
                "Event title is required";
        }

        if (!formData.description.trim()) {
            newErrors.description =
                "Description is required";
        }

        if (!formData.sport) {
            newErrors.sport =
                "Please select a sport";
        }

        if (!formData.location.trim()) {
            newErrors.location =
                "Location is required";
        }

        if (!formData.date) {
            newErrors.date =
                "Please select a date";
        }

        if (!formData.time) {
            newErrors.time =
                "Please select a time";
        }

        setErrors(newErrors);

        return Object.values(newErrors).every(
            (error) => error === ""
        );
    };

    const handleSubmit = async (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        if (!id) {
            setPageError("Event ID is missing.");
            return;
        }

        if (!validateForm()) {
            return;
        }

        try {
            setSaving(true);
            setSuccess(false);
            setPageError("");

            await updateEvent(id, formData);

            setSuccess(true);

            setTimeout(() => {
                navigate(`/events/${id}`);
            }, 1000);
        } catch (error) {
            console.error(
                "Failed to update event:",
                error
            );

            setPageError(
                "Unable to update the event."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loadingEvent) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-3xl font-bold">
                    Loading event...
                </h1>
            </div>
        );
    }

    if (pageError && !formData.title) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-3xl font-bold text-red-600">
                    {pageError}
                </h1>
            </div>
        );
    }

    return (
        <>
            {pageError && (
                <div className="max-w-4xl mx-auto px-6 pt-8">
                    <div className="rounded-xl bg-red-100 p-4 text-red-700">
                        {pageError}
                    </div>
                </div>
            )}

            <EventForm
                formData={formData}
                errors={errors}
                loading={saving}
                success={success}
                inputClass={inputClass}
                today={today}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                setFormData={setFormData}
                title="Edit Event"
                description="Update the details of your sports event."
                submitText="Save Changes"
                loadingText="Saving..."
                successMessage="Event updated successfully!"
            />
        </>
    );
}

export default EditEvent;