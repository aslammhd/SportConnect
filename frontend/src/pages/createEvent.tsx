import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { createEvent } from "../api/eventApi";
import EventForm from "../components/eventForm";


const initialFormData = {
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


function CreateEvent() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialFormData);


    const [errors, setErrors] = useState({
        title: "",
        description: "",
        sport: "",
        location: "",
        date: "",
        time: "",
    });


    const [loading, setLoading] = useState(false);


    const [success, setSuccess] = useState(false);



    const inputClass =
        "w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";



    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        const { name, value } = e.target;


        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "maxParticipants"
                    ? Number(value)
                    : value,
        }));

    };



    const validateForm = () => {


        const newErrors = {
            title: "",
            description: "",
            sport: "",
            location: "",
            date: "",
            time: "",
        };


        if (!formData.title.trim())
            newErrors.title = "Event title is required";


        if (!formData.description.trim())
            newErrors.description = "Description is required";


        if (!formData.sport)
            newErrors.sport = "Please select a sport";


        if (!formData.location.trim())
            newErrors.location = "Location is required";


        if (!formData.date)
            newErrors.date = "Please select a date";


        if (!formData.time)
            newErrors.time = "Please select a time";



        setErrors(newErrors);


        return Object.values(newErrors).every(
            (error) => error === ""
        );

    };




    const handleSubmit = async (
        e: React.FormEvent
    ) => {


        e.preventDefault();


        if (!validateForm())
            return;


        try {

            setLoading(true);


            await createEvent(formData);



            setSuccess(true);


            setFormData(initialFormData);



            setTimeout(() => {

                navigate("/events");

            }, 1500);



        } catch (error) {


            console.error(
                "Create event failed:",
                error
            );


        } finally {

            setLoading(false);

        }

    };



    const today =
        new Date()
            .toISOString()
            .split("T")[0];



    return (

        <EventForm

            formData={formData}
            errors={errors}
            loading={loading}
            success={success}
            inputClass={inputClass}
            today={today}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setFormData={setFormData}
            title="Create Event"
            description="Host your own sports activity and connect with your community."
            submitText="Create Event"
            loadingText="Creating..."
            successMessage="Event created successfully!"

        />

    );
}


export default CreateEvent;