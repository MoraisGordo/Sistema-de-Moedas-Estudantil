"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "COMPANY" | "ADMIN";
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Protect routes
  useEffect(() => {
    if (!loading) {
      const publicRoutes = ["/", "/login", "/register"];
      const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith("/register/");
      
      if (!user && !isPublicRoute) {
        router.push("/login");
      }
      
      if (user && (pathname === "/login" || pathname === "/register")) {
        router.push("/dashboard");
      }
    }
  }, [user, loading, pathname, router]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const userData = await response.json();
      setUser(userData.user);
      localStorage.setItem("user", JSON.stringify(userData.user));
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}