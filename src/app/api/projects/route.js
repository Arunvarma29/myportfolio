import pool from "@/lib/db";
import { NextResponse } from "next/server";

function getImageUrl(value, slug, imageId) {
  if (!value) {
    return null;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const imagePath = `/api/projects/${encodeURIComponent(slug)}/image`;
  return imageId ? `${imagePath}?imageId=${encodeURIComponent(imageId)}` : imagePath;
}

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.title,
        p.slug,
        p.summary,
        p.description,
        p.thumbnail_url,
        p.live_url,
        p.repo_url,
        p.tech_stack,
        p.is_featured,
        p.sort_order,
        COALESCE(
          json_agg(
            json_build_object(
              'id', pi.id,
              'image_url', pi.image_url,
              'alt_text', pi.alt_text,
              'caption', pi.caption
            )
            ORDER BY pi.sort_order ASC
          ) FILTER (WHERE pi.id IS NOT NULL),
          '[]'::json
        ) AS images
      FROM projects p
      LEFT JOIN project_images pi ON pi.project_id = p.id
      WHERE p.is_published = true
      GROUP BY p.id
      ORDER BY p.is_featured DESC, p.sort_order ASC, p.created_at DESC
    `);

    const projects = result.rows.map((project) => ({
      id: project.id,
      title: project.title,
      slug: project.slug,
      summary: project.summary,
      description: project.description,
      thumbnailUrl: getImageUrl(project.thumbnail_url, project.slug),
      liveUrl: project.live_url,
      repoUrl: project.repo_url,
      techStack: project.tech_stack || [],
      isFeatured: project.is_featured,
      images: project.images.map((image) => ({
        id: image.id,
        url: getImageUrl(image.image_url, project.slug, image.id),
        altText: image.alt_text,
        caption: image.caption,
      })),
    }));

    return NextResponse.json(
      { success: true, data: projects },
      { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } },
    );
  } catch (error) {
    console.error("Projects API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects." },
      { status: 500 },
    );
  }
}
