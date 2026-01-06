import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();
export const useAuth = () => useContext(authContext);

export function AuthProvider({ children }) {
  const [Loading, setLoading] = useState(true);
  const [User, setUser] = useState(null);
  const [Error, setError] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const url = import.meta.env.VITE_SERVER || "http://localhost:4000";

  const fetchUser = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${url}/api/auth/getMe`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data.user);
      setUser(res.data.user);
      setisAuthenticated(true);
      return res.data.user;
    } catch (error) {
      console.log("Fetch user error", error);

      if (error.response?.status !== 401) {
        setError(error.response?.data?.msg || "Failed to fetch user");
        setUser(null);
        setisAuthenticated(false);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };
  const register = async (username, name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${url}/api/auth/register`,
        {
          username,
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setUser(res.data.user);
      setisAuthenticated(true);
      return { success: true, user: res.data.user };
    } catch (error) {
      console.log("register error", error);
      const errorMsg = error.res?.data?.msg || "register failed";
      setError(errorMsg);
      setUser(null);
      setisAuthenticated(false);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };
  const login = async (emailOrUsername, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${url}/api/auth/login`,
        {
          emailOrUsername,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setUser(res.data.user);
      setisAuthenticated(true);
      return { success: true, user: res.data.user };
    } catch (error) {
      console.log("Login error:", error);
      const errorMsg = error.response.data.msg;
      setError(errorMsg);

      setUser(null);
      setisAuthenticated(false);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `${url}/api/auth/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUser(null);
      setisAuthenticated(false);
      return { success: true };
    } catch (error) {
      console.error("logout error: ", error);
      setUser(null);
      setisAuthenticated(false);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };
  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        await fetchUser();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const value = {
    User,
    Loading,
    isAuthenticated,
    login,
    logout,
    clearError,
    fetchUser,
    Error,
    register,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
