import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {

    // Fetch the profile from PostgreSQL
    const result = await pool.query(`
      SELECT id,
      full_name,
      headline,
      bio FROM about_me 
      `);

      //Check whether the profile exists
    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: " Profile not found",
        },
        {
          status: 404,
        },
      );
    }

    //Return the profile as json
    return NextResponse.json(
      {
        success: true,
        data: result.rows[0],
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("About Me API error:", err);
  }

  return NextResponse.json(
    {
      success: false,
      message: "Internal Server Error",
    },
    { status: 500 },
  );
}
