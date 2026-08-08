import api from "./api";

import type {
    EventsResponse,
} from "../types/event";

export const getEvents = async () => {

    const response =
        await api.get<EventsResponse>(
            "/events"
        );

    return response.data;

};
export const getEventById = async (
    id: string
) => {

    const response =
        await api.get(
            `/events/${id}`
        );

    return response.data;

};

export const joinEvent = async (
    id: string
) => {

    const response =
        await api.post(
            `/events/${id}/join`
        );


    return response.data;

};

export const leaveEvent = async (
    id: string
) => {

    const response =
        await api.delete(
            `/events/${id}/join`
        );


    return response.data;

};

export const createEvent = async (
    eventData: any
) => {

    const response =
        await api.post(
            "/events",
            eventData
        );

    return response.data;

};

export const updateEvent = async (
    id: string,
    eventData: any
) => {

    const response =
        await api.put(
            `/events/${id}`,
            eventData
        );

    return response.data;

};



export const deleteEvent = async (
    id: string
) => {

    const response =
        await api.delete(
            `/events/${id}`
        );

    return response.data;

};

export const completeEvent = async (
    id: string
) => {
    const response = await api.patch(
        `/events/${id}/complete`
    );

    return response.data;
};