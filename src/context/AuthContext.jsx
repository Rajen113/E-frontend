import React, { createContext, useState, useEffect } from "react";
import { authAPI } from "../api/instances";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const loadUserProfile = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await authAPI.get(`/api/user_profile?token=${token}`);
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (err) {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  
  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
    loadUserProfile();
  };

  
  const logout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
