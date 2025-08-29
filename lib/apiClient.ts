import axios from "axios";

// Function to create an API client instance with a token
export const createAuthenticatedApiClient = (token: string | null) => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "", // Empty string to use relative URLs for Next.js API routes
  });

  if (token) {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Log error only in development
      if (process.env.NODE_ENV === "development") {
        console.error("API Error:", error.response?.data || error.message);
      }

      if (error.response?.status === 401) {
        if (process.env.NODE_ENV === "development") {
          console.log("Unauthorized! Redirecting to login...");
        }
        if (typeof window !== "undefined") {
          window.location.href = "/signin";
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};
