export interface EventHost {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
}

export interface Event {
  _id: string;

  title: string;
  description: string;

  sport: string;
  skillLevel: string;

  date: string;
  time: string;

  location: string;

  maxParticipants: number;

  price: string;

  status?: "upcoming" | "completed" | "cancelled";

  image?: string;

  imagePublicId?: string;

  host: EventHost;

  participants:  EventParticipant[];

  createdAt: string;

  updatedAt: string;
}

export interface EventFormData {
  title: string;
  description: string;
  sport: string;
  skillLevel: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  price: string;
  image: string;
  imagePublicId: string;

}

export interface EventsResponse {
  success: boolean;
  count: number;
  events: Event[];
}

export interface EventParticipant {
  _id: string;
  name: string;
  email?: string;
  avatar?: string;
}
