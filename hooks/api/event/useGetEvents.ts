"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { EventSchemaType } from "@/schema/event-schema";

export const useGetEvents = () =>
  useQuery({
    queryKey: ["events"],
    staleTime: 30000,
    queryFn: async () => {
      const response = await api.get("/api/events");
      return response as EventSchemaType[];
    },
    refetchInterval: 30000,
  });
