import type { Event } from "./event";
import type { User } from "./user";

export interface ProfileResponse {

    success: boolean;

    user: User;

    stats: {

        hosted: number;

        joined: number;

    };

    hostedEvents: Event[];

    joinedEvents: Event[];

}