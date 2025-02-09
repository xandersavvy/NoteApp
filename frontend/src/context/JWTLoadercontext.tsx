"use client"

import { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// JWT & Loader Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwt_token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, isLoading, setIsLoading }}>
      {children}
      {isLoading && <Loader />} {/* Show loader globally */}
    </AuthContext.Provider>
  );
};

// Loader component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
  </div>
);
