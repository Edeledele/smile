"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const AUTH_KEY = "addis-eats-user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {
      console.warn("Could not load user auth", e);
    }
    setReady(true);
  }, []);

  const login = (name, email) => {
    const newUser = { name: name || "Genet", email: email || "genet@example.com" };
    setUser(newUser);
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    } catch (e) {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (e) {}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, ready }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
