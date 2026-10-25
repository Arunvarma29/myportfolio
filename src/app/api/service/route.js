import pool from "@/lib/db";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        title,
        short_description,
        description,
        href
      FROM services
      WHERE is_visible = TRUE
      ORDER BY sort_order ASC, id ASC
    `);

    return NextResponse.json(
      {
        success: true,
        data: result.rows,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Services API error:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch services",
      },
      { status: 500 }
    );
  }
}