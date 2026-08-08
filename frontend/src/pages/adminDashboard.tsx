import {
  CalendarDays,
  CheckCircle,
  LoaderCircle,
  Trash2,
  Users,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  adminDeleteEvent,
  getAdminDashboard,
} from "../api/adminApi";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

interface AdminEvent {
  _id: string;
  title: string;
  sport: string;
  location: string;
  date: string;
  status?: string;

  host?: {
    name?: string;
    email?: string;
  };
}

interface AdminDashboardData {
  stats: {
    users: number;
    events: number;
    upcomingEvents: number;
    completedEvents: number;
  };

  users: AdminUser[];
  events: AdminEvent[];
}

function AdminDashboard() {
  const [data, setData] =
    useState<AdminDashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getAdminDashboard();

      setData(response);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load admin dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleDeleteEvent = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this event?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await adminDeleteEvent(id);

      setData((previousData) => {
        if (!previousData) {
          return previousData;
        }

        const deletedEvent =
          previousData.events.find(
            (event) => event._id === id
          );

        return {
          ...previousData,

          events:
            previousData.events.filter(
              (event) =>
                event._id !== id
            ),

          stats: {
            ...previousData.stats,

            events:
              previousData.stats.events - 1,

            upcomingEvents:
              deletedEvent?.status !==
              "completed"
                ? Math.max(
                    0,
                    previousData.stats
                      .upcomingEvents - 1
                  )
                : previousData.stats
                    .upcomingEvents,

            completedEvents:
              deletedEvent?.status ===
              "completed"
                ? Math.max(
                    0,
                    previousData.stats
                      .completedEvents - 1
                  )
                : previousData.stats
                    .completedEvents,
          },
        };
      });
    } catch (error) {
      console.error(error);

      setError(
        "Unable to delete event."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <LoaderCircle
          size={32}
          className="mx-auto animate-spin"
        />

        <p className="mt-4">
          Loading admin dashboard...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="py-24 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Manage SportConnect users and events.
      </p>

      {/* STATS */}

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow">
          <Users size={28} />

          <p className="mt-4 text-gray-500">
            Users
          </p>

          <p className="text-3xl font-bold">
            {data.stats.users}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <CalendarDays size={28} />

          <p className="mt-4 text-gray-500">
            Total Events
          </p>

          <p className="text-3xl font-bold">
            {data.stats.events}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <CalendarDays size={28} />

          <p className="mt-4 text-gray-500">
            Upcoming
          </p>

          <p className="text-3xl font-bold">
            {data.stats.upcomingEvents}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <CheckCircle size={28} />

          <p className="mt-4 text-gray-500">
            Completed
          </p>

          <p className="text-3xl font-bold">
            {data.stats.completedEvents}
          </p>
        </div>
      </section>

      {/* USERS */}

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-5">
          Users
        </h2>

        <div className="overflow-x-auto rounded-2xl bg-white shadow">
          <table className="w-full text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-4">
                  Name
                </th>

                <th className="p-4">
                  Email
                </th>

                <th className="p-4">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {data.users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b last:border-none"
                >
                  <td className="p-4 font-medium">
                    {user.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="p-4 capitalize">
                    {user.role ?? "user"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* EVENTS */}

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-5">
          Events
        </h2>

        <div className="overflow-x-auto rounded-2xl bg-white shadow">
          <table className="w-full text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-4">
                  Event
                </th>

                <th className="p-4">
                  Sport
                </th>

                <th className="p-4">
                  Host
                </th>

                <th className="p-4">
                  Location
                </th>

                <th className="p-4">
                  Status
                </th>

                <th className="p-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data.events.map((event) => (
                <tr
                  key={event._id}
                  className="border-b last:border-none"
                >
                  <td className="p-4 font-medium">
                    {event.title}
                  </td>

                  <td className="p-4">
                    {event.sport}
                  </td>

                  <td className="p-4">
                    {event.host?.name ??
                      "Unknown"}
                  </td>

                  <td className="p-4">
                    {event.location}
                  </td>

                  <td className="p-4 capitalize">
                    {event.status ??
                      "upcoming"}
                  </td>

                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteEvent(
                          event._id
                        )
                      }
                      disabled={
                        deletingId ===
                        event._id
                      }
                      className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                    >
                      <Trash2 size={16} />

                      {deletingId ===
                      event._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;