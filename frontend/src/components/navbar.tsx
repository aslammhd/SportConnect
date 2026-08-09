import {
  CalendarDays,
  Home,
  LogIn,
  PlusCircle,
  ShieldCheck,
  UserCircle,
} from "lucide-react";
import SportConnectLogo from "../assets/images/SportConnectLogo.png";
import {
  Link,
  NavLink,
} from "react-router-dom";

import {
  useAuth,
} from "../hooks/useAuth";

function Navbar() {
  const {
    user,
    isAuthenticated,
  } = useAuth();

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Events",
      path: "/events",
      icon: CalendarDays,
    },
    {
      name: "Create",
      path: "/create-event",
      icon: PlusCircle,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: UserCircle,
    },
  ];

  return (
    <>
      {/* DESKTOP NAVBAR */}

      <nav
        className="
          sticky
          top-0
          z-50
          hidden
          border-b
          border-gray-100
          bg-white/95
          shadow-sm
          backdrop-blur-md
          md:block
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            items-center
            justify-between
            px-6
            py-3
          "
        >
          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center"
          >
            <img
              src={SportConnectLogo}
              alt="SportConnect"
              className="
                    h-10
    w-auto
    object-contain
    scale-400
    origin-left
  "
            />
          </Link>

          {/* NAVIGATION */}

          <div
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-gray-50
              p-1.5
            "
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `
                  rounded-xl
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition
                  ${isActive
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-white hover:text-blue-600"
                }
                `
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/events"
              className={({ isActive }) =>
                `
                  rounded-xl
                  px-4
                  py-2
                  text-sm
                  font-medium
                  transition
                  ${isActive
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-white hover:text-blue-600"
                }
                `
              }
            >
              Events
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink
                  to="/create-event"
                  className={({ isActive }) =>
                    `
                      rounded-xl
                      px-4
                      py-2
                      text-sm
                      font-medium
                      transition
                      ${isActive
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:bg-white hover:text-blue-600"
                    }
                    `
                  }
                >
                  Create
                </NavLink>

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `
                      rounded-xl
                      px-4
                      py-2
                      text-sm
                      font-medium
                      transition
                      ${isActive
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:bg-white hover:text-blue-600"
                    }
                    `
                  }
                >
                  Profile
                </NavLink>
              </>
            )}

            {user?.role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition
                    ${isActive
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-white hover:text-blue-600"
                  }
                  `
                }
              >
                <ShieldCheck size={16} />
                Admin
              </NavLink>
            )}
          </div>

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                <LogIn size={17} />
                Login
              </Link>
            ) : (
              <Link
                to="/profile"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border
                  border-gray-200
                  bg-gray-100
                  transition
                  hover:border-blue-400
                "
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  <UserCircle
                    size={24}
                    className="text-gray-500"
                  />
                )}
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE TOP LOGO */}

      <nav
        className="
          sticky
          top-0
          z-40
          border-b
          border-gray-100
          bg-white/95
          px-4
          py-3
          shadow-sm
          backdrop-blur-md
          md:hidden
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <Link to="/">
            <img
              src={SportConnectLogo}
              alt="SportConnect"
              className="
                    h-10
    w-auto
    object-contain
    scale-400
    origin-left"
            />
          </Link>

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="
                rounded-lg
                bg-blue-600
                px-3
                py-2
                text-sm
                font-semibold
                text-white
              "
            >
              Login
            </Link>
          ) : (
            <Link
              to="/profile"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-gray-100
              "
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              ) : (
                <UserCircle
                  size={22}
                  className="text-gray-500"
                />
              )}
            </Link>
          )}
        </div>
      </nav>

      {/* MOBILE BOTTOM NAVIGATION */}

      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-50
          border-t
          border-gray-200
          bg-white/95
          px-2
          pb-[env(safe-area-inset-bottom)]
          pt-2
          shadow-[0_-5px_20px_rgba(0,0,0,0.06)]
          backdrop-blur-md
          md:hidden
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-md
            items-center
            justify-around
          "
        >
          {navItems
            .filter((item) => {
              if (
                item.path === "/create-event" ||
                item.path === "/profile"
              ) {
                return isAuthenticated;
              }

              return true;
            })
            .map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `
                      group
                      flex
                      min-w-16
                      flex-col
                      items-center
                      justify-center
                      gap-1
                      rounded-xl
                      px-3
                      py-2
                      text-xs
                      font-medium
                      transition
                      ${isActive
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-blue-600"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          transition
                          ${isActive
                            ? "bg-blue-50"
                            : "group-hover:bg-gray-50"
                          }
                        `}
                      >
                        <Icon
                          size={21}
                          strokeWidth={
                            isActive
                              ? 2.4
                              : 2
                          }
                        />
                      </div>

                      <span>
                        {item.name}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}

          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `
                  group
                  flex
                  min-w-16
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  rounded-xl
                  px-3
                  py-2
                  text-xs
                  font-medium
                  transition
                  ${isActive
                  ? "text-blue-600"
                  : "text-gray-500"
                }
                `
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      ${isActive
                        ? "bg-blue-50"
                        : ""
                      }
                    `}
                  >
                    <ShieldCheck
                      size={21}
                    />
                  </div>

                  <span>
                    Admin
                  </span>
                </>
              )}
            </NavLink>
          )}

          {!isAuthenticated && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `
                  flex
                  min-w-16
                  flex-col
                  items-center
                  gap-1
                  px-3
                  py-2
                  text-xs
                  font-medium
                  ${isActive
                  ? "text-blue-600"
                  : "text-gray-500"
                }
                `
              }
            >
              <LogIn size={21} />
              Login
            </NavLink>
          )}
        </div>
      </nav>

      {/* MOBILE NAV SPACER */}

      <div className="h-1 md:hidden" />
    </>
  );
}

export default Navbar;