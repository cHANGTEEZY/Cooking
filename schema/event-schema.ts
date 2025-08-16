import * as z from "zod";

const eventSchema = z
  .object({
    eventTitle: z
      .string()
      .min(4, "Event title must be at least 4 characters")
      .max(20, "Event title must be max of 20 characters"),
    eventNames: z
      .string()
      .min(4, "Event name must be at least 4 characters") // Fixed: was 40
      .max(50, "Event name must be max of 50 characters"), // Fixed: was 20
    eventCategory: z.enum([
      // Fixed: was "evntCategory"
      "Music",
      "Festival",
      "Theater",
      "Comedy",
      "Exhibition",
      "Conference",
      "Workshop",
    ]),
    organizerName: z.string().min(1, "Organizer name is required"),
    organizerContactInfo: z
      .string()
      .min(1, "Organizer contact info is required"),
    eventStartDate: z.date().refine((date) => date > new Date(), {
      message: "Event start date must be in the future",
    }),
    eventEndDate: z.date(),
    eventDescription: z
      .string()
      .min(10, "Event description must be at least 10 characters"),
    eventLocation: z.string().min(1, "Event location is required"),
    eventPrice: z.string().min(1, "Event price is required"),
    eventImage: z
      .string()
      .url("Event image must be a valid URL")
      .optional()
      .or(z.literal("")),
    eventImageAlt: z.string().min(1, "Event image alt text is required"),
    eventDate: z.string().min(1, "Event date is required"),
  })
  .refine(
    (data) => {
      return data.eventEndDate >= data.eventStartDate;
    },
    {
      message: "Event end date must be on or after the start date",
      path: ["eventEndDate"],
    }
  );

export default eventSchema;
export type EventSchemaType = z.infer<typeof eventSchema>;
