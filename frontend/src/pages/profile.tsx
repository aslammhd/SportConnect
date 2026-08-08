import {
    CalendarDays,
    Trophy,
    Users,
    Activity,
    LogOut,
    Pencil,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/button";
import EventCard from "../components/eventcard";
import ProfileHeader from "../components/profilHeader";
import StatCard from "../components/statCard";

import { useAuth } from "../hooks/useAuth";

import { getProfile } from "../api/userApi";

import type { ProfileResponse } from "../types/profile";

function Profile() {

    const { logout } = useAuth();

    const navigate = useNavigate();

    const [profile, setProfile] =
        useState<ProfileResponse | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");



    useEffect(() => {

        loadProfile();

    }, []);



    const loadProfile = async () => {

        try {

            const data =
                await getProfile();

            setProfile(data);

        }

        catch (error) {

            console.error(error);

            setError("Failed to load profile.");

        }

        finally {

            setLoading(false);

        }

    };



    const handleLogout = () => {

        logout();

        navigate("/login");

    };



    if (loading) {

        return (

            <div className="text-center py-20">

                <h1 className="text-3xl font-bold">

                    Loading profile...

                </h1>

            </div>

        );

    }



    if (error || !profile) {

        return (

            <div className="text-center py-20">

                <h1 className="text-3xl font-bold">

                    {error}

                </h1>

            </div>

        );

    }

    const sportsPlayed =
        new Set(
            [
                ...profile.hostedEvents,
                ...profile.joinedEvents,
            ].map((event) => event.sport)
        ).size;


    return (

        <div className="max-w-6xl mx-auto px-6 py-10">

            <ProfileHeader
                user={profile.user}
            />



            <section className="mt-10">

                <h2 className="text-2xl font-bold mb-6">

                    Statistics

                </h2>



                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <StatCard
                        title="Hosted Events"
                        value={profile.stats.hosted}
                        icon={<Trophy size={32} />}
                    />

                    <StatCard
                        title="Joined Events"
                        value={profile.stats.joined}
                        icon={<Users size={32} />}
                    />

                    <StatCard
                        title="Sports Played"
                        value={sportsPlayed}
                        icon={<Activity size={32} />}
                    />

                </div>

            </section>





            <section className="mt-12">

                <div className="flex items-center gap-3 mb-6">

                    <CalendarDays />

                    <h2 className="text-2xl font-bold">

                        Hosted Events

                    </h2>

                </div>



                {

                    profile.hostedEvents.length > 0 ?

                        (

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                                {

                                    profile.hostedEvents.map((event) => (

                                        <EventCard

                                            key={event._id}

                                            event={event}

                                        />

                                    ))

                                }

                            </div>

                        )

                        :

                        (

                            <p className="text-gray-500">

                                You haven't hosted any events yet.

                            </p>

                        )

                }

            </section>






            <section className="mt-12">

                <h2 className="text-2xl font-bold mb-6">

                    Joined Events

                </h2>



                {

                    profile.joinedEvents.length > 0 ?

                        (

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                                {

                                    profile.joinedEvents.map((event) => (

                                        <EventCard

                                            key={event._id}

                                            event={event}

                                        />

                                    ))

                                }

                            </div>

                        )

                        :

                        (

                            <p className="text-gray-500">

                                You haven't joined any events yet.

                            </p>

                        )

                }

            </section>






            <section className="mt-12 flex gap-4">

                <button
                    onClick={() =>
                        navigate("/profile/edit")
                    }
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                >
                    <Pencil size={17} />
                    Edit Profile
                </button>



                <Button
                    variant="secondary"
                    onClick={handleLogout}
                >

                    <LogOut size={18} />

                    Logout

                </Button>


            </section>

        </div>

    );

}

export default Profile;