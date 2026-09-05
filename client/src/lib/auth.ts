import Cookies from "js-cookie";
import { User } from "@/types";

const TOKEN_KEY = "accommodation_jwt";
const USER_KEY = "accommodation_user";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return Cookies.get(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
}

export function setAuth(token: string, user: User): void {
  // Store in cookie for Next.js middleware and SSR
  Cookies.set(TOKEN_KEY, token, { expires: 30, sameSite: "lax" });
  Cookies.set(USER_KEY, JSON.stringify(user), { expires: 30, sameSite: "lax" });

  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function clearAuth(): void {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_KEY);
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const userJson = Cookies.get(USER_KEY) || localStorage.getItem(USER_KEY);
  if (!userJson) return null;
  try {
    return JSON.parse(userJson) as User;
  } catch {
    return null;
  }
}

export function hasRole(role: string): boolean {
  const user = getUser();
  if (!user || !user.roles) return false;
  return user.roles.map(r => r.toLowerCase()).includes(role.toLowerCase());
}
