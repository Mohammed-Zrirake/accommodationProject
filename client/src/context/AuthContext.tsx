"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, AuthResponse } from "@/types";
import { getToken, getUser, setAuth, clearAuth } from "@/lib/auth";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string, role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = getToken();
    const savedUser = getUser();
    if (savedToken && savedUser) {
      setTokenState(savedToken);
      setUserState(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post<AuthResponse>("/api/auth/login", { email, password });
    const data = response.data;
    const authUser: User = {
      userId: data.userId,
      email: data.email,
      username: data.username,
      roles: data.roles,
    };
    setAuth(data.token, authUser);
    setTokenState(data.token);
    setUserState(authUser);
  };

  const register = async (email: string, password: string, username: string, role: string) => {
    const response = await api.post<AuthResponse>("/api/auth/register", {
      email,
      password,
      username,
      role,
    });
    const data = response.data;
    const authUser: User = {
      userId: data.userId,
      email: data.email,
      username: data.username,
      roles: data.roles,
    };
    setAuth(data.token, authUser);
    setTokenState(data.token);
    setUserState(authUser);
  };

  const logout = () => {
    clearAuth();
    setTokenState(null);
    setUserState(null);
    router.push("/");
    router.refresh();
  };

  const role = user?.roles && user.roles.length > 0 ? user.roles[0].toLowerCase() : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        role,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
