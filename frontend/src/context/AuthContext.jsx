import { createContext, useContext, useEffect, useState } from "react";
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

  const [authLoading, setAuthLoading] = useState(true);
  //verify authentication
  useEffect(() => {
    const verifyAuthentication = async () => {
      const savedToken = localStorage.getItem("luxe_token");

      if (!savedToken) {
        setAuthLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Authentication failed.");
        }

        localStorage.setItem("luxe_user", JSON.stringify(data.user));

        setToken(savedToken);
        setUser(data.user);
      } catch (error) {
        console.error("Authentication verification failed:", error);

        localStorage.removeItem("luxe_token");
        localStorage.removeItem("luxe_user");

        setToken(null);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    verifyAuthentication();
  }, []);
  //login
  const login = (data) => {
    localStorage.setItem("luxe_token", data.token);
    localStorage.setItem("luxe_user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    toast.success(data.message || "Login successful!");
  };
  //signup
  const signup = (data) => {
    localStorage.setItem("luxe_token", data.token);
    localStorage.setItem("luxe_user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    toast.success(data.message || "Account created successfully!");
  };
  //googlelogin
  const googleLogin = (data) => {
    localStorage.setItem("luxe_token", data.token);
    localStorage.setItem("luxe_user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    toast.success(data.message || "Google login successful!");
  };
  //logout
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
    authLoading,
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
