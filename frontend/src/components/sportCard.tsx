import {
  ArrowRight,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import type {
  Sport,
} from "../types/sport";

interface SportCardProps {
  sport: Sport;
}

function SportCard({
  sport,
}: SportCardProps) {
  const navigate =
    useNavigate();

  const handleClick = () => {
    navigate(
      `/events?sport=${encodeURIComponent(
         sport.name.toLowerCase()
      )}`
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        group
        relative
        h-52
        w-full
        overflow-hidden
        rounded-3xl
        text-left
        shadow-md
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* BACKGROUND */}

      <img
        src={sport.image}
        alt={sport.name}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          transition
          duration-500
          group-hover:scale-110
        "
      />

      {/* FADED OVERLAY */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/35
          to-black/10
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          flex-col
          justify-between
          p-5
        "
      >
       

        <div>
          <h3
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            {sport.name}
          </h3>

          <div
            className="
              mt-2
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-white/80
              transition
              group-hover:text-white
            "
          >
            Explore events

            <ArrowRight
              size={16}
              className="
                transition
                duration-300
                group-hover:translate-x-1
              "
            />
          </div>
        </div>
      </div>
    </button>
  );
}

export default SportCard;