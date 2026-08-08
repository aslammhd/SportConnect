import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Badge from "../components/badge";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import {
    CalendarDays,
    Clock3,
    MapPin,
    Users,
    ArrowLeft,
    UserRound,
    Pencil,
    Trash2,
    CheckCircle,
} from "lucide-react";

import { getEventById, joinEvent, leaveEvent, deleteEvent, completeEvent, } from "../api/eventApi";

import type { Event } from "../types/event";

import { useAuth } from "../hooks/useAuth";

function EventDetails() {

    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [completing, setCompleting] =
        useState(false);

    const [event, setEvent] =
        useState<Event | null>(null);


    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [joining, setJoining] =
        useState(false);

    const hostId =
        event
            ? typeof event.host === "string"
                ? event.host
                : event.host?._id
            : null;

    const isHost =
        Boolean(
            user &&
            hostId &&
            String(user._id) === String(hostId)
        );

    console.log("HOST CHECK", {
        loggedInUserId: user?._id,
        eventHost: event?.host,
        hostId,
        isHost,
    });

    useEffect(() => {


        if (id) {

            fetchEvent(id);

        }


    }, [id]);


    const handleJoinEvent = async () => {

        if (!event) return;


        try {

            setJoining(true);


            if (isJoined) {

                await leaveEvent(
                    event._id
                );


            } else {

                await joinEvent(
                    event._id
                );

            }



            const updatedEvent =
                await getEventById(
                    event._id
                );


            setEvent(
                updatedEvent.event
            );


        } catch (error) {

            console.error(error);


        } finally {

            setJoining(false);

        }

    };

    const fetchEvent = async (
        eventId: string
    ) => {


        try {


            const data =
                await getEventById(eventId);



            setEvent(data.event);



        } catch (error) {


            console.error(error);


            setError(
                "Unable to load event."
            );


        } finally {


            setLoading(false);


        }


    };

    const handleDelete = async () => {

        if (!event) return;


        const confirmed =
            window.confirm(
                "Delete this event?"
            );


        if (!confirmed)
            return;


        try {

            await deleteEvent(event._id);

            navigate("/events");


        } catch (error) {

            console.error(error);

            alert("Failed to delete event.");

        }

    };

    const handleCompleteEvent = async () => {
        if (!id) {
            return;
        }

        try {
            setCompleting(true);

            await completeEvent(id);

            setEvent((previousEvent) => {
                if (!previousEvent) {
                    return previousEvent;
                }

                return {
                    ...previousEvent,
                    status: "completed",
                };
            });
        } catch (error) {
            console.error(
                "Complete event failed:",
                error
            );
        } finally {
            setCompleting(false);
        }
    };

    const isJoined =
        event?.participants.some(
            (participant: any) =>
                participant._id === user?._id ||
                participant === user?._id
        );

    if (loading) {


        return (

            <div className="
                text-center
                py-20
            ">

                <h1 className="
                    text-3xl
                    font-bold
                ">

                    Loading event...

                </h1>

            </div>

        );

    }




    if (error || !event) {


        return (

            <div className="
                max-w-4xl
                mx-auto
                py-20
                text-center
            ">


                <h1 className="
                    text-4xl
                    font-bold
                ">

                    Event Not Found

                </h1>


                <p className="
                    text-gray-600
                    mt-4
                ">

                    {error ||
                        "The event you're looking for doesn't exist."}

                </p>


                <Link to="/events">

                    <Button variant="secondary">

                        Back to Events

                    </Button>

                </Link>


            </div>

        );

    }





    return (


        <div className="
            max-w-5xl
            mx-auto
            px-6
            py-10
        ">


            <Link

                to="/events"

                className="
                    inline-flex
                    items-center
                    gap-2
                    text-blue-600
                    hover:text-blue-700
                    mb-8
                "

            >

                <ArrowLeft size={18} />

                Back to Events


            </Link>





            <div className="
                bg-white
                rounded-3xl
                shadow-lg
                overflow-hidden
            ">


                {event.image && (

                    <img

                        src={event.image}

                        alt={event.title}

                        className="
                            w-full
                            h-80
                            object-cover
                        "

                    />

                )}





                <div className="p-8">


                    <div className="
                        flex
                        justify-between
                        items-center
                    ">


                        <Badge>

                            {event.sport}

                        </Badge>



                        <Badge variant="green">

                            Upcoming

                        </Badge>


                    </div>




                    <h1 className="
                        text-4xl
                        font-bold
                        mt-5
                    ">

                        {event.title}

                    </h1>

                    {event.status === "completed" && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                            <CheckCircle size={16} />
                            Completed
                        </span>
                    )}




                    <p className="
                        text-gray-600
                        mt-4
                    ">

                        {event.description}

                    </p>


                </div>


            </div>





            <div className="
                grid
                md:grid-cols-2
                gap-8
                mt-10
            ">


                <div className="flex gap-4">

                    <CalendarDays className="text-blue-600" />

                    <div>

                        <h3 className="font-semibold">
                            Date
                        </h3>

                        <p>
                            {event.date}
                        </p>

                    </div>

                </div>




                <div className="flex gap-4">


                    <Clock3 className="text-blue-600" />


                    <div>

                        <h3 className="font-semibold">
                            Time
                        </h3>


                        <p>
                            {event.time}
                        </p>


                    </div>


                </div>





                <div className="flex gap-4">


                    <MapPin className="text-blue-600" />


                    <div>

                        <h3 className="font-semibold">
                            Location
                        </h3>


                        <p>
                            {event.location}
                        </p>


                    </div>


                </div>


                <section className="mt-10">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <Users size={22} />

                            <h2 className="text-2xl font-bold">
                                Participants
                            </h2>
                        </div>

                        <span className="text-sm text-gray-500">
                            {event.participants.length}/
                            {event.maxParticipants}
                        </span>
                    </div>

                    {event.participants.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {event.participants.map(
                                (participant) => (
                                    <div
                                        key={participant._id}
                                        className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4"
                                    >
                                        <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                            {participant.avatar ? (
                                                <img
                                                    src={participant.avatar}
                                                    alt={participant.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-gray-400">
                                                    <UserRound size={24} />
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <p className="font-semibold">
                                                {participant.name}
                                            </p>

                                            {participant.email && (
                                                <p className="text-sm text-gray-500">
                                                    {participant.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
                            No participants have joined yet.
                        </div>
                    )}
                </section>


                {typeof event.host !== "string" && (
                    <div className="mb-6 flex items-center gap-4 rounded-2xl bg-blue-50 p-4">
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-white">
                            {event.host.avatar ? (
                                <img
                                    src={event.host.avatar}
                                    alt={event.host.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-gray-400">
                                    <UserRound size={24} />
                                </div>
                            )}
                        </div>

                        <div>
                            <p className="text-sm text-blue-600">
                                Host
                            </p>

                            <p className="font-semibold">
                                {event.host.name}
                            </p>
                        </div>
                    </div>
                )}




                <div className="flex gap-4">


                    <Users className="text-blue-600" />


                    <div>


                        <h3 className="font-semibold">
                            Participants
                        </h3>


                        <p>

                            {event.participants.length}
                            {" / "}
                            {event.maxParticipants}

                        </p>


                    </div>


                </div>


            </div>





            <div className="
                bg-blue-50
                rounded-2xl
                mt-10
                p-8
            ">


                <div className="
                    flex
                    justify-between
                    items-center
                ">


                    <div>


                        <h2 className="
                            text-2xl
                            font-bold
                        ">

                            {event.price}

                        </h2>


                        <p className="
                            text-gray-600
                        ">

                            Reserve your spot today.

                        </p>


                    </div>





                    {isHost ? (
                        <div className="flex gap-4 flex-wrap">
                            {event.status !== "completed" && (
                                <>
                                    <Button
                                        onClick={() =>
                                            navigate(`/events/${id}/edit`)
                                        }
                                    >
                                        <Pencil size={18} />
                                        Edit Event
                                    </Button>

                                    <Button
                                        onClick={handleCompleteEvent}
                                        disabled={completing}
                                    >
                                        <CheckCircle size={18} />

                                        {completing
                                            ? "Completing..."
                                            : "Mark as Completed"}
                                    </Button>
                                </>
                            )}

                            <Button
                                variant="secondary"
                                onClick={handleDelete}
                            >
                                <Trash2 size={18} />
                                Delete Event
                            </Button>
                        </div>
                    ) : event.status === "completed" ? (
                        <div className="rounded-xl bg-gray-100 px-4 py-3 text-gray-600">
                            This event has been completed.
                        </div>
                    ) : (
                        <Button
                            onClick={handleJoinEvent}
                            disabled={joining}
                        >
                            {joining
                                ? "Updating..."
                                : isJoined
                                    ? "Leave Event"
                                    : "Join Event"}
                        </Button>
                    )}



                </div>


            </div>


        </div>

    );

}


export default EventDetails;