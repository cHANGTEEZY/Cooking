import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { EventSchemaType } from "@/schema/event-schema";
import { toast } from "sonner";

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: async ({
      data,
      token,
    }: {
      data: EventSchemaType;
      token: string;
    }) => {
      if (!token) throw new Error("Authentication token is missing");
      const response = await api.post("/api/events", data, token);
      return response;
    },
    onSuccess: () => {
      toast.success("Event created");
    },
    onError: (error: any) => {
      toast.error("Error creating event", {
        description: `There was error creating Event. ${
          error.message ?? error
        }`,
      });
    },
  });
};
