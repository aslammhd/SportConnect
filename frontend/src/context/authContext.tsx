import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import type { User } from "../types/user";
import type { AuthContextType } from "../types/auth";

import {
  getCurrentUser,
} from "../api/authApi";

export const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const initialiseAuth = async () => {

      const token =
        localStorage.getItem("token");

      if (!token) {

        setLoading(false);

        return;

      }

      try {

        const response =
          await getCurrentUser();

        setUser(response.user);

      } catch (error) {

        console.error(error);

        localStorage.removeItem("token");

        setUser(null);

      } finally {

        setLoading(false);

      }

    };

    initialiseAuth();

  }, []);

  const login = (
    user: User,
    token: string
  ) => {

    localStorage.setItem(
      "token",
      token
    );

    setUser(user);

  };

  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

  };

  if (loading) {

    return <div>Loading...</div>;

  }

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}