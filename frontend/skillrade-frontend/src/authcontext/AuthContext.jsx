/* eslint-disable react/prop-types */

import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await API.get("/api/user")

      if (res.status !== 200) {
        setUser(null);
        return;
      }

      const data = await res.data;
      setUser(data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await refreshUser();
      setLoading(false);
      console.log(user)
    };

    init();
  }, []);

  const login = async () => {
    await refreshUser();
    window.location.reload();
  };


  const logout = async () => {
    try {
    setLoading(true);
      await API.post("/api/auth/logout");

      setUser(null);
      localStorage.clear();
    setLoading(false);
    window.location.href = "/";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};