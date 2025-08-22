import eventSchema from "@/schema/event-schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const body = console.log("Request body:", await request.json());
  const { data, success } = eventSchema.safeParse(body);

  console.log("Parsed event data:", JSON.stringify(data, null, 2));

  if (!success) {
    return NextResponse.json(
      {
        message: "Invalid event data",
      },
      {
        status: 400,
      }
    );
  }
}
