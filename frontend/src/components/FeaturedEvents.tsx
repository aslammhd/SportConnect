import { useEffect, useState } from "react";

import EventCard from "./eventcard";

import {
  getEvents,
} from "../api/eventApi";

import type {
  Event,
} from "../types/event";

function FeaturedEvents() {
  const [events, setEvents] =
    useState<Event[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);

        const data =
          await getEvents();

        setEvents(
          data.events.slice(0, 3)
        );
      } catch (error) {
        console.error(
          "Failed to load featured events:",
          error
        );

        setError(
          "Unable to load featured events."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return (
      <section>
        <h2 className="text-3xl font-bold mb-8">
          Featured Events
        </h2>

        <p className="text-gray-500">
          Loading events...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2 className="text-3xl font-bold mb-8">
          Featured Events
        </h2>

        <p className="text-red-500">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          Featured Events
        </h2>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-500">
          No events available yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedEvents;