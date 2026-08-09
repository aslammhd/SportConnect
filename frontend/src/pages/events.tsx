import EventCard from "../components/eventcard";
import SearchBar from "../components/searchBar";

import { priceOptions } from "../constants/prices";
import { skillLevelOptions } from "../constants/skilllevels";
import { sportOptions } from "../constants/sport";

import FilterSelect from "../components/filterSelect";
import Button from "../components/button";
import ExploreEventsImage from "../assets/images/exploreEvents.png";
import {
    Search,
    SlidersHorizontal,
    RotateCcw,
    CalendarDays,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
    useSearchParams,
} from "react-router-dom";

import type {
    Event,
} from "../types/event";

import {
    getEvents,
} from "../api/eventApi";

function Events() {
    const [searchParams] =
        useSearchParams();

    const sportFromUrl =
        searchParams.get("sport") || "all";

    const [events, setEvents] =
        useState<Event[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [searchTerm, setSearchTerm] =
        useState("");

    const [selectedSport, setSelectedSport] =
        useState(sportFromUrl);

    const [selectedSkill, setSelectedSkill] =
        useState("all");

    const [selectedPrice, setSelectedPrice] =
        useState("all");

    useEffect(() => {
        setSelectedSport(
            searchParams.get("sport") || "all"
        );
    }, [searchParams]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            // const data =
            //     await getEvents();

            // setEvents(data.events);
            const data = await getEvents();

            console.log("EVENTS API DATA:", data);

            setEvents(data.events);
        } catch (error) {
            console.error(error);

            setError(
                "Unable to load events."
            );
        } finally {
            setLoading(false);
        }
    };

    const filteredEvents =
        events.filter((event) => {
            const matchesSearch =
                event.title
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    ) ||
                event.location
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    );

            const matchesSport =
                selectedSport === "all" ||
                event.sport.toLowerCase() ===
                selectedSport.toLowerCase();

            const matchesSkill =
                selectedSkill === "all" ||
                event.skillLevel ===
                selectedSkill;

            const matchesPrice =
                selectedPrice === "all" ||
                (
                    selectedPrice === "Free"
                        ? event.price === "Free"
                        : event.price !== "Free"
                );

            return (
                matchesSearch &&
                matchesSport &&
                matchesSkill &&
                matchesPrice
            );
        });

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedSport("all");
        setSelectedSkill("all");
        setSelectedPrice("all");
    };

    if (loading) {
        return (
            <div className="text-center py-24">
                <h2 className="text-2xl font-semibold">
                    Loading events...
                </h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-24">
                <h2 className="text-2xl font-semibold text-red-500">
                    {error}
                </h2>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
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
                        backgroundImage: `url(${ExploreEventsImage})`,
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
            max-w-7xl
            mx-auto
            px-6
            py-20
            md:py-24
          "
                >
                    <div className="max-w-3xl">
                        <p
                            className="
                text-sm
                font-semibold
                uppercase
                tracking-[0.2em]
                text-blue-300
              "
                        >
                            Discover your next game
                        </p>

                        <h1
                            className="
                mt-3
                text-4xl
                md:text-6xl
                font-bold
                text-white
                leading-tight
              "
                        >
                            Explore Events
                        </h1>

                        <p
                            className="
                mt-4
                max-w-2xl
                text-lg
                md:text-xl
                text-gray-200
              "
                        >
                            Find sports activities near you,
                            join local communities and meet
                            people who share your passion.
                        </p>
                    </div>
                </div>
            </section>

            {/* FILTER PANEL */}

            <section
                className="
    relative
    z-20
    mx-auto
    -mt-8
    max-w-5xl
    px-4
    sm:px-6
  "
            >
                <div
                    className="
      rounded-2xl
      border
      border-gray-200
      bg-white/95
      p-4
      shadow-lg
      backdrop-blur-md
      sm:p-5
    "
                >
                    {/* HEADER */}

                    <div className="mb-4 flex items-center gap-2">
                        <SlidersHorizontal
                            size={18}
                            className="text-blue-600"
                        />

                        <h2 className="text-base font-semibold text-gray-900">
                            Find the right event
                        </h2>
                    </div>

                    {/* SEARCH */}

                    <div className="mb-4">
                        <SearchBar
                            value={searchTerm}
                            onChange={setSearchTerm}
                        />
                    </div>

                    {/* FILTER ROW */}

                    <div
                        className="
        grid
        gap-3
        md:grid-cols-3
      "
                    >
                        <FilterSelect
                            label="Sport"
                            value={selectedSport}
                            options={sportOptions}
                            onChange={setSelectedSport}
                        />

                        <FilterSelect
                            label="Skill Level"
                            value={selectedSkill}
                            options={skillLevelOptions}
                            onChange={setSelectedSkill}
                        />

                        <FilterSelect
                            label="Price"
                            value={selectedPrice}
                            options={priceOptions}
                            onChange={setSelectedPrice}
                        />
                    </div>

                    {/* FOOTER */}

                    <div
                        className="
        mt-4
        flex
        flex-col
        gap-3
        border-t
        border-gray-100
        pt-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
                    >
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <CalendarDays size={16} />

                            <span>
                                {filteredEvents.length} event
                                {filteredEvents.length !== 1 ? "s" : ""} found
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={clearFilters}
                            className="
          inline-flex
          items-center
          gap-2
          self-start
          text-sm
          font-medium
          text-gray-500
          transition
          hover:text-blue-600
          sm:self-auto
        "
                        >
                            <RotateCcw size={15} />
                            Clear filters
                        </button>
                    </div>
                </div>
            </section>

            {/* EVENTS */}

            <section
                className="
          max-w-7xl
          mx-auto
          px-6
          py-14
        "
            >
                <div
                    className="
            flex
            items-end
            justify-between
            mb-8
          "
                >
                    <div>
                        <p
                            className="
                text-sm
                font-semibold
                uppercase
                tracking-wider
                text-blue-600
              "
                        >
                            Available activities
                        </p>

                        <h2
                            className="
                mt-1
                text-3xl
                font-bold
                text-gray-900
              "
                        >
                            Events for you
                        </h2>
                    </div>
                </div>

                {filteredEvents.length === 0 ? (
                    <div
                        className="
              rounded-3xl
              border
              border-dashed
              border-gray-300
              bg-white
              py-20
              px-6
              text-center
            "
                    >
                        <div
                            className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-blue-50
                text-blue-600
              "
                        >
                            <Search size={25} />
                        </div>

                        <h2 className="mt-5 text-2xl font-semibold">
                            No events found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try changing your search term or
                            adjusting the filters.
                        </p>

                        <div className="mt-6">
                            <Button
                                variant="secondary"
                                onClick={clearFilters}
                            >
                                <RotateCcw size={17} />
                                Reset Filters
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div
                        className="
              grid
              gap-8
              md:grid-cols-2
              lg:grid-cols-3
            "
                    >
                        {filteredEvents.map(
                            (event) => (
                                <EventCard
                                    key={event._id}
                                    event={event}
                                />
                            )
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}

export default Events;