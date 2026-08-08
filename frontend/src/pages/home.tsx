import {
  ArrowRight,
  Users,
  MapPin,
  Trophy,
} from "lucide-react";

import Button from "../components/button";
import SportCard from "../components/sportCard";
import { sports } from "../data/sport";
import FeaturedEvents from "../components/FeaturedEvents";
import SportConnectHero from "../assets/images/SportConnectHero.png";

import {
  Link,
} from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-50">
      {/* HERO */}

      <section className="relative overflow-hidden">
        {/* BACKGROUND IMAGE */}

        <div
          className="
            absolute
            inset-0
            bg-cover
            bg-center
          "
            style={{
          backgroundImage: `url(${SportConnectHero})`,
        }}
        />

        {/* DARK / FADED OVERLAY */}

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

        {/* HERO CONTENT */}

        <div
          className="
            relative
            z-10
            max-w-7xl
            mx-auto
            px-6
            py-24
            md:py-32
          "
        >
          <div className="max-w-3xl">
            <p
              className="
                mb-4
                text-sm
                font-semibold
                uppercase
                tracking-[0.25em]
                text-blue-300
              "
            >
              Your Sports Community
            </p>

            <h1
              className="
                text-5xl
                md:text-6xl
                font-bold
                leading-tight
                text-white
              "
            >
              Connect.
              <span className="text-blue-400">
                {" "}
                Play.
              </span>
              <br />
              Compete.
            </h1>

            <p
              className="
                mt-6
                max-w-2xl
                text-lg
                md:text-xl
                leading-relaxed
                text-gray-200
              "
            >
              Discover sports activities near you,
              join local events, meet new people and
              build your sports community.
            </p>

            <div
              className="
                mt-8
                flex
                flex-wrap
                gap-4
              "
            >
              <Link to="/events">
                <Button>
                  Explore Events
                  <ArrowRight size={18} />
                </Button>
              </Link>

              <Link
                to="/create-event"
                className="
                  inline-flex
                  items-center
                  rounded-xl
                  border
                  border-white/40
                  bg-white/10
                  px-5
                  py-3
                  font-semibold
                  text-white
                  backdrop-blur-sm
                  transition
                  hover:bg-white/20
                "
              >
                Host an Event
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK BENEFITS */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          -mt-8
          relative
          z-20
        "
      >
        <div
          className="
            grid
            gap-4
            rounded-3xl
            bg-white
            p-6
            shadow-lg
            md:grid-cols-3
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-blue-100
                text-blue-600
              "
            >
              <MapPin size={22} />
            </div>

            <div>
              <h3 className="font-semibold">
                Find Nearby Events
              </h3>

              <p className="text-sm text-gray-500">
                Discover sports activities in your
                area.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-blue-100
                text-blue-600
              "
            >
              <Users size={22} />
            </div>

            <div>
              <h3 className="font-semibold">
                Meet New People
              </h3>

              <p className="text-sm text-gray-500">
                Connect with people who share your
                interests.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-blue-100
                text-blue-600
              "
            >
              <Trophy size={22} />
            </div>

            <div>
              <h3 className="font-semibold">
                Play Your Way
              </h3>

              <p className="text-sm text-gray-500">
                Join casual games or competitive
                events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SPORTS CATEGORIES */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          py-16
        "
      >
        <div className="mb-8">
          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-blue-600
            "
          >
            Discover
          </p>

          <h2
            className="
              mt-2
              text-3xl
              md:text-4xl
              font-bold
              text-gray-900
            "
          >
            Explore Sports
          </h2>

          <p className="mt-2 text-gray-500">
            Find activities based on the sports you
            enjoy.
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-5
            md:grid-cols-4
          "
        >
          {sports.map((sport) => (
            <SportCard
              key={sport.id}
              sport={sport}
            />
          ))}
        </div>
      </section>

      {/* FEATURED EVENTS */}

      <section
        className="
          bg-white
          py-16
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
          "
        >
          <FeaturedEvents />
        </div>
      </section>

      {/* FINAL CTA */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          py-16
        "
      >
        <div
          className="
            rounded-3xl
            bg-blue-600
            px-8
            py-12
            text-center
            text-white
            md:px-16
          "
        >
          <h2 className="text-3xl font-bold">
            Ready to get active?
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-blue-100
            "
          >
            Find your next game, meet people and
            become part of a growing sports community.
          </p>

          <div className="mt-7">
            <Link
              to="/events"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-white
                px-6
                py-3
                font-semibold
                text-blue-600
                transition
                hover:bg-gray-100
              "
            >
              Browse Events
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;