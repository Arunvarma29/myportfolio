import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT id, platform, url, icon
      FROM social_links
      ORDER BY sort_order ASC, created_at ASC
    `);

    return NextResponse.json(
      { success: true, data: result.rows },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch (error) {
    console.error("Social links API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch social links." },
      { status: 500 },
    );
  }
}
