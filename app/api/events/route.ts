import eventSchema from "@/schema/event-schema";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { sql } from "@/lib/db";
import { verifyToken } from "@clerk/nextjs/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
          statusText: "You are not authorized to perform this action",
        }
      );
    }

    const token = authHeader.split(" ")[1];
    console.log("token is", token);

    const { sub: userId } = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    console.log("Authenticated userid is ", userId);

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

    const bannerImage = formData.get("eventImage") as File;

    console.log("Stored image is ", bannerImage);

    // Convert File to buffer for Cloudinary upload
    const arrayBuffer = await bannerImage.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const cloudinaryResult = await cloudinary.uploader.upload(
      `data:${bannerImage.type};base64,${buffer.toString("base64")}`,
      {
        folder: "event-banners",
      }
    );

    const cloudinaryImageUrl = cloudinaryResult.secure_url;
    console.log("Retrieved image url is", cloudinaryImageUrl);

    const uploadEvents =
      await sql`INSERT INTO events (event_title, event_description, event_category , event_start_date, event_end_date, ticket_type, banner_image_url, ticket_price,ticket_quantity,event_creator,event_venue,event_location)
      VALUES (${result.data.eventTitle}, ${result.data.eventDescription}, ${result.data.eventCategory} ,${result.data.eventStartDate}, ${result.data.eventEndDate}, ${result.data.ticketType}, ${cloudinaryImageUrl},
       ${result.data.ticketPrice}, ${result.data.ticketQuantity}, ${userId}, ${result.data.eventVenue}, ${result.data.eventLocation})
      RETURNING *
    `;

    if (uploadEvents.length === 0) {
      return NextResponse.json(
        {
          message: "Error creating event",
        },
        {
          status: 500,
        }
      );
    }

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

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const events = await sql`SELECT * FROM events`;

    return NextResponse.json(events, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      {
        message: "Server error fetching events",
      },
      {
        status: 500,
      }
    );
  }
}
