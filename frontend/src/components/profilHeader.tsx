import type { User } from "../types/user";

import {
  Mail,
  MapPin,
  UserRound,
} from "lucide-react";

interface ProfileHeaderProps {
  user: User;
}

function ProfileHeader({
  user,
}: ProfileHeaderProps) {
  const fallbackAvatar =
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.name
    )}&background=2563eb&color=fff&size=256`;

  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-lg">
      {/* COVER IMAGE */}

      <div className="relative h-64 w-full bg-gradient-to-r from-blue-600 to-blue-400">
        {user.coverImage ? (
          <img
            src={user.coverImage}
            alt={`${user.name} cover`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center text-white/80">
              <UserRound
                size={48}
                className="mx-auto"
              />

              <p className="mt-2 text-sm">
                SportConnect
              </p>
            </div>
          </div>
        )}
      </div>

      {/* PROFILE CONTENT */}

      <div className="px-6 pb-8 md:px-8">
        <div className="flex flex-col items-center -mt-20">
          {/* AVATAR */}

          <img
            src={
              user.avatar ||
              fallbackAvatar
            }
            alt={user.name}
            className="
            relative
            z-10
              h-36
              w-36
              rounded-full
              border-4
              border-white
              bg-white
              object-cover
              shadow-lg
            "
          />

          {/* NAME */}

          <h1 className="mt-5 text-center text-4xl font-bold">
            {user.name}
          </h1>

          {/* USERNAME */}

          {user.username && (
            <p className="mt-1 text-blue-600">
              @{user.username}
            </p>
          )}

          {/* BIO */}

          {user.bio ? (
            <p className="mt-4 max-w-2xl text-center leading-relaxed text-gray-600">
              {user.bio}
            </p>
          ) : (
            <p className="mt-4 text-sm text-gray-400">
              No bio added yet.
            </p>
          )}

          {/* EMAIL + LOCATION */}

          <div className="mt-6 flex flex-col items-center gap-3 text-gray-600 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2">
              <Mail size={18} />

              <span>
                {user.email}
              </span>
            </div>

            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin size={18} />

                <span>
                  {user.location}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;