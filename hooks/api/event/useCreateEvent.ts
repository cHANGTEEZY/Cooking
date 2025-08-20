import api from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EventSchemaType } from "@/schema/event-schema";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

export const useCreateEvent = (data: EventSchemaType) => {
  return useMutation({
    mutationFn: () => creatEvent(data),
    onSuccess: () => {
      toast.success("Event created ");
    },
    onError: (error: any) => {
      toast.error("Error creating event", {
        description: `There was error creating Event. ${error}`,
      });
    },
  });
};

const creatEvent = async (data: EventSchemaType) => {
  try {
    const { getToken } = useAuth();
    const token = await getToken();
    if (!token) {
      throw new Error("Authentication token is missing");
    }
    const response = await api.post("/api/events", data, token);
    return response;
  } catch (error: any) {
    toast.error("Error creating event", {
      description: `There was error creating Event. ${error}`,
    });
    console.error(error);
  }
};
