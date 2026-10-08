import { createContext, useContext, useEffect, useState } from "react";

import {
  registerUser,
  loginUser,
  getUserById,
  checkUsername as checkUsernameApi,
} from "../services/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch logged-in user
  const fetchCurrentUser = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const userData = await getUserById(userId);

      setUser(userData);
    } catch (error) {
      localStorage.removeItem("userId");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login
  const login = async (credentials) => {
    try {
      setIsLoading(true);

      const users = await loginUser(credentials.email);

      if (users.length === 0) {
        throw new Error("Invalid email or password");
      }

      const foundUser = users[0];

      if (foundUser.password !== credentials.password) {
        throw new Error("Invalid email or password");
      }

      // Store only ID
      localStorage.setItem("userId", foundUser.id);

      setUser(foundUser);

      return foundUser;
    } finally {
      setIsLoading(false);
    }
  };

  // Register
  const register = async (userData) => {
    try {
      setIsLoading(true);

      // Check username
      const existingUsers = await checkUsernameApi(
        userData.username
      );

      if (existingUsers.length > 0) {
        throw new Error("Username already exists");
      }

      const newUser = await registerUser(userData);

      return newUser;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("userId");

    setUser(null);
  };

  // Check authentication
  const isAuthenticated = () => {
    return !!localStorage.getItem("userId");
  };

  // Check username
  const checkUsername = async (username) => {
    const users = await checkUsernameApi(username);

    return users.length > 0;
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
        fetchCurrentUser,
        checkUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};