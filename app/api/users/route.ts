import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: NextRequest) {
  const { email, firstName, lastName, userId, username } = await request.json();

  console.log(
    "Received data",
    JSON.stringify({ email, firstName, lastName, userId, username }, null, 2)
  );

  try {
    const result = await sql`
      INSERT INTO user_details (user_id, username, first_name, last_name, email)
      VALUES (${userId}, ${username}, ${firstName}, ${lastName}, ${email})
      RETURNING *
    `;

    console.log("Got usertable result", result[0]);
    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: "Error creating user" },
        { status: 401, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, message: "User created" },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
