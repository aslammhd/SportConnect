import api from "./api";

export const getAdminDashboard =
  async () => {
    const response =
      await api.get(
        "/admin/dashboard"
      );

    return response.data;
  };

export const adminDeleteEvent =
  async (id: string) => {
    const response =
      await api.delete(
        `/admin/events/${id}`
      );

    return response.data;
  };