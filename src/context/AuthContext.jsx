import React, { createContext, useContext, useState, useEffect } from "react";
import { userAPI } from "../services/user_api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          const profileRes = await userAPI.getProfile();
          const userData = profileRes.data;

          setUser(userData);
          setIsAuthenticated(true);

          localStorage.setItem("userData", JSON.stringify(userData));
        } catch (error) {
          logout();
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData, token) => {
    if (token) {
      localStorage.setItem("authToken", token);
    }
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
