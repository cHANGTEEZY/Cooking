"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetEventById = (id: string) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Event ID is required");
      }
      return fetchEventById(id);
    },

    enabled: !!id, // Only run the query if id is truthy
  });
};

const fetchEventById = async (id: string) => {
  try {
    const response = await api.get(`/events/${id}`);
    return response;
  } catch (error: any) {
    // Log error only in development
    if (process.env.NODE_ENV === "development") {
      console.error("API Error:", error.response?.data || error.message);
    }
    throw error;
  }
};

export default useGetEventById;
