import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT NOW() AS current_time, current_database() AS database_name",
    );

    return Response.json({
      success: true,
      message: "PostgreSQL connected successfully!",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("PostgreSQL connection error:", err);

    return Response.json(
      { success: false, message: "Database connection failed" },
      { status: 500 },
    );
  }
}
