import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [profile, experience, education, skills, socialLinks] = await Promise.all([
      pool.query(`
        SELECT full_name, headline, bio, email, phone, location
        FROM about_me
        ORDER BY updated_at DESC
        LIMIT 1
      `),
      pool.query(`
        SELECT company, role, location, employment_type, start_date, end_date,
               is_current, description
        FROM experience
        ORDER BY sort_order ASC, start_date DESC
      `),
      pool.query(`
        SELECT institution, degree, field_of_study, start_date, end_date,
               description
        FROM education
        ORDER BY sort_order ASC, start_date DESC
      `),
      pool.query(`
        SELECT name, category, icon_url
        FROM skills
        ORDER BY sort_order ASC, name ASC
      `),
      pool.query(`
        SELECT platform, url
        FROM social_links
        ORDER BY sort_order ASC, created_at ASC
      `),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          profile: profile.rows[0] || null,
          experience: experience.rows,
          education: education.rows,
          skills: skills.rows,
          socialLinks: socialLinks.rows,
        },
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch (error) {
    console.error("Resume API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch resume data." },
      { status: 500 },
    );
  }
}
