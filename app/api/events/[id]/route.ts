import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  console.log("Fetching event with ID:", id);

  try {
    const event = await sql`SELECT * FROM events WHERE id = ${id}`;

    if (event.length === 0) {
      return NextResponse.json(
        {
          message: "Event not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(event[0], {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      {
        message: "Server error fetching event",
      },
      {
        status: 500,
      }
    );
  }
}
