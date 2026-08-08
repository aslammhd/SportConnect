import type { Event } from "../types/event";

import Badge from "./badge";
import Button from "./button";

import { Link } from "react-router-dom";

import { Heart } from "lucide-react";

import {
    CalendarDays,
    Clock3,
    MapPin,
    Trophy,
    UserRound,
    Users,
} from "lucide-react";

import { useState } from "react";


interface EventCardProps {
    event: Event;
}



function EventCard({ event }: EventCardProps) {


    


    const [liked, setLiked] =
        useState(false);



    const skillVariant =
        event.skillLevel === "Beginner"
            ? "green"
            : event.skillLevel === "Intermediate"
                ? "blue"
                : event.skillLevel === "Advanced"
                    ? "red"
                    : "purple";



    const participantCount =
        event.participants.length;



    const participationPercentage =
        (participantCount / event.maxParticipants) * 100;



   



    const handleLike = (
        e: React.MouseEvent
    ) => {

        e.preventDefault();

        setLiked(!liked);

    };



    return (

        <Link
            to={`/events/${event._id}`}
        >


            <div className="
                bg-white 
                rounded-2xl 
                shadow-md 
                hover:shadow-xl 
                hover:-translate-y-2
                transition 
                duration-300 
                p-6
            ">



                {/* Sport Badge */}

                <div className="flex justify-between items-center">


                    <Badge>
                        {event.sport}
                    </Badge>
                    
                    {event.status === "completed" && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            Completed
                        </span>
                    )}

                    <Badge
                        variant={
                            participantCount >= event.maxParticipants
                                ?
                                "red"
                                :
                                "green"
                        }
                    >

                        {
                            participantCount >= event.maxParticipants
                                ?
                                "Full"
                                :
                                "Upcoming"
                        }

                    </Badge>


                </div>




                {/* Title */}

                <h2 className="
                    text-2xl 
                    font-bold 
                    mt-4
                ">

                    {event.title}

                </h2>




                {/* Description */}

                <p className="
                    text-gray-600 
                    mt-2
                ">

                    {event.description}

                </p>




                {/* Event Details */}

                <div className="
                    mt-6 
                    space-y-3
                ">



                    <div className="
                        flex 
                        items-center 
                        gap-2 
                        text-gray-700
                    ">

                        <MapPin size={18} />

                        <span>
                            {event.location}
                        </span>

                    </div>




                    <div className="
                        flex 
                        items-center 
                        gap-2 
                        text-gray-700
                    ">

                        <CalendarDays size={18} />

                        <span>
                            {event.date}
                        </span>

                    </div>




                    <div className="
                        flex 
                        items-center 
                        gap-2 
                        text-gray-700
                    ">

                        <Clock3 size={18} />

                        <span>
                            {event.time}
                        </span>

                    </div>




                    <div className="
                        flex 
                        items-center 
                        gap-2 
                        text-gray-700
                    ">

                        <UserRound size={18} />

                        <span>
                            {event.host.name}
                        </span>

                    </div>





                    <div className="
                        flex 
                        items-center 
                        gap-2
                    ">

                        <Trophy size={18} />


                        <Badge variant={skillVariant}>

                            {event.skillLevel}

                        </Badge>


                    </div>





                    <div className="
                        flex 
                        items-center 
                        gap-2 
                        text-gray-700
                    ">

                        <Users size={18} />


                        <span>

                            {participantCount}
                            {" / "}
                            {event.maxParticipants}
                            {" Players"}

                        </span>


                    </div>




                    <div className="
                        mt-2 
                        w-full 
                        bg-gray-200 
                        rounded-full 
                        h-2
                    ">


                        <div

                            className="
                                bg-blue-600 
                                h-2 
                                rounded-full
                            "

                            style={{
                                width:
                                    `${participationPercentage}%`
                            }}

                        />


                    </div>



                </div>





                {/* Bottom Section */}


                <div className="
                    mt-6 
                    flex 
                    justify-between 
                    items-center
                ">


                    <span className="
                        text-xl 
                        font-bold 
                        text-green-600
                    ">

                        {event.price}

                    </span>





                    <Button

                    >

                      see more


                    </Button>



                </div>





                <Heart

                    size={22}

                    className="mt-4 cursor-pointer"

                    fill={
                        liked
                            ?
                            "currentColor"
                            :
                            "none"
                    }

                    onClick={handleLike}

                />



            </div>


        </Link>

    );

}


export default EventCard;