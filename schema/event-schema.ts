import * as z from "zod";

const eventSchema = z
  .object({
    eventTitle: z
      .string()
      .min(4, "Event title must be at least 4 characters")
      .max(20, "Event title must be max of 20 characters"),
    eventCategory: z.enum([
      "Music",
      "Festival",
      "Theater",
      "Comedy",
      "Exhibition",
      "Conference",
      "Workshop",
    ]),
    eventVenue: z.string().min(1, "Event venue is required"),
    eventLocation: z.string().min(1, "Event location is required"),
    eventStartDate: z.date().refine((date) => date > new Date(), {
      message: "Event start date must be in the future",
    }),
    eventEndDate: z.date(),
    eventDescription: z
      .string()
      .min(10, "Event description must be at least 10 characters"),

    //Event Type
    ticketType: z.enum(["Free", "Paid"]),
    ticketPrice: z.string().min(1, "Ticket price is required"),
    ticketQuantity: z.string().min(1, "Ticket quantity is required"),
    eventImage: z
      .union([
        z
          .instanceof(File)
          .refine(
            (file) =>
              ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
            {
              message: "Only JPEG, PNG, and JPG images are allowed",
            }
          ),
        z.any().optional(),
      ])
      .optional(),
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
