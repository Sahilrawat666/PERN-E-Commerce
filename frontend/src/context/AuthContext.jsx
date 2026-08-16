import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("luxe_user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("luxe_user");
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("luxe_token") || null,
  );
  // login
  const login = (data) => {
    localStorage.setItem("luxe_token", data.token);
    localStorage.setItem("luxe_user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    toast.success(data.message || "Login successful!");
  };
  // signup
  const signup = (data) => {
    localStorage.setItem("luxe_token", data.token);
    localStorage.setItem("luxe_user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    toast.success(data.message || "Account created successfully!");
  };
  // Google login
  const googleLogin = (data) => {
    localStorage.setItem("luxe_token", data.token);
    localStorage.setItem("luxe_user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    toast.success(data.message || "Google login successful!");
  };

  // logout
  const logout = () => {
    localStorage.removeItem("luxe_token");
    localStorage.removeItem("luxe_user");

    setToken(null);
    setUser(null);

    toast.success("Logged out successfully.");
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    login,
    signup,

    googleLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
