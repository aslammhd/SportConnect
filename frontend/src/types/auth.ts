import type { User } from "./user";

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: User | null;

  isAuthenticated: boolean;

  login: (user: User, token: string) => void;

  logout: () => void;
}