export interface User {
    _id: string;
    name: string;
    username?: string;
    role?: "user" | "admin";
    email: string;

    bio?: string;
    location?: string;

    avatar?: string;
    avatarPublicId?: string;

    coverImage?: string;
    coverImagePublicId?: string;

}