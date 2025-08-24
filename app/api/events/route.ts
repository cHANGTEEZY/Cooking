import eventSchema from "@/schema/event-schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    console.log("Request body:", formData);

    // Convert FormData to a plain object for validation
    const formDataObj: Record<string, any> = {};

    formData.forEach((value, key) => {
      // Handle dates stored as ISO strings
      if (key === "eventStartDate" || key === "eventEndDate") {
        formDataObj[key] = new Date(value as string);
      } else {
        formDataObj[key] = value;
      }
    });

    console.log("Form data object:", formDataObj);

    const result = eventSchema.safeParse(formDataObj);

    if (!result.success) {
      console.error("Validation error:", result.error);
      return NextResponse.json(
        {
          message: "Invalid event data",
          errors: result.error.format(),
        },
        {
          status: 400,
        }
      );
    }

    // Here you would typically save the event to a database
    // For now, we'll just return success

    return NextResponse.json(
      {
        message: "Event created successfully",
        data: result.data,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error processing event:", error);
    return NextResponse.json(
      {
        message: "Server error processing event",
      },
      {
        status: 500,
      }
    );
  }
}
