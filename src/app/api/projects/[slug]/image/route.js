import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import pool from "@/lib/db";
import { NextResponse } from "next/server";

let s3Client;

export async function GET(request, { params }) {
  const { slug } = await params;
  const imageId = new URL(request.url).searchParams.get("imageId");

  if (imageId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(imageId)) {
    return NextResponse.json(
      { success: false, message: "Project image was not found." },
      { status: 404 },
    );
  }

  let result;
  try {
    result = imageId
      ? await pool.query(
          `
            SELECT pi.image_url AS object_key
            FROM project_images pi
            JOIN projects p ON p.id = pi.project_id
            WHERE p.slug = $1 AND pi.id = $2 AND p.is_published = true
          `,
          [slug, imageId],
        )
      : await pool.query(
          `
            SELECT thumbnail_url AS object_key
            FROM projects
            WHERE slug = $1 AND is_published = true
          `,
          [slug],
        );
  } catch (error) {
    console.error("Project image database query failed:", error);
    return NextResponse.json(
        { success: false, message: "Failed to fetch project image." },
        { status: 500 },
    );
  }

  const objectKey = result.rows[0]?.object_key;

  if (!objectKey || /^https?:\/\//i.test(objectKey)) {
    return NextResponse.json(
        { success: false, message: "Project image was not found." },
        { status: 404 },
    );
  }

  const config = {
    endpoint: process.env.AWS_ENDPOINT_URL_S3,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.NEON_STORAGE_BUCKET,
  };
  const missingConfig = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missingConfig.length > 0) {
    console.error("Project image storage configuration is missing:", missingConfig.join(", "));
    return NextResponse.json(
        { success: false, message: "Project image storage is not configured." },
        { status: 500 },
    );
  }

  try {
    s3Client ??= new S3Client({
        endpoint: config.endpoint,
        region: config.region,
        forcePathStyle: true,
        credentials: {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
        },
    });

    const object = await s3Client.send(
        new GetObjectCommand({
          Bucket: config.bucket,
          Key: objectKey,
        }),
    );

    if (!object.Body) {
        console.error("Project image object was returned without a response body.");
        return NextResponse.json(
          { success: false, message: "Project image is unavailable." },
          { status: 502 },
        );
    }

    const headers = new Headers({
        "Content-Type": object.ContentType || "image/png",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
    });

    if (object.ContentLength !== undefined) {
        headers.set("Content-Length", String(object.ContentLength));
    }

    return new Response(object.Body.transformToWebStream(), { headers });
  } catch (error) {
    if (error?.$metadata?.httpStatusCode === 404 || error?.name === "NoSuchKey") {
        return NextResponse.json(
          { success: false, message: "Project image was not found in storage." },
        { status: 404 },
      );
    }

    console.error("Project image API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch project image." },
      { status: 502 },
    );
  }
}
