import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import useAuthStore from "./store/useAuthStore";
import { handleTokenExpiration } from "@/services/auth";
import axiosInstance from "./services/axiosInstace";

const getToken = useAuthStore.getState;

axiosInstance.interceptors.request.use(
  (config) => {
    // Skip token expiration check for login requests
    if (config.url?.includes("login") || config.url?.includes("register")) {
      return config;
    }

    const { token } = getToken();
    if (token) {
      if (handleTokenExpiration()) {
        return Promise.reject(new Error("Token is expired"));
      }
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
