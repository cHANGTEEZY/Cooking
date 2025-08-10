// lib/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
});

// Request interceptor to add Clerk token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      if (typeof window !== "undefined") {
        const { useAuth } = await import("@clerk/nextjs");
        const { getToken } = useAuth();
        const token = await getToken();

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error("Failed to get Clerk token", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized — handle logout or redirect
      console.log("Unauthorized! Redirecting to login...");
      // For example, redirect to sign in page
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
