import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

let s3Client;

export async function GET() {
  const config = {
    endpoint: process.env.AWS_ENDPOINT_URL_S3,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.NEON_STORAGE_BUCKET,
    key: process.env.NEON_AVATAR_KEY,
  };
  const missingConfig = [
    ["AWS_ENDPOINT_URL_S3", config.endpoint],
    ["AWS_REGION", config.region],
    ["AWS_ACCESS_KEY_ID", config.accessKeyId],
    ["AWS_SECRET_ACCESS_KEY", config.secretAccessKey],
    ["NEON_STORAGE_BUCKET", config.bucket],
    ["NEON_AVATAR_KEY", config.key],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missingConfig.length > 0) {
    console.error("Avatar storage configuration is missing:", missingConfig.join(", "));
    return NextResponse.json(
      { success: false, message: "Avatar storage is not configured." },
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
        Key: config.key,
      }),
    );

    if (!object.Body) {
      console.error("Avatar object was returned without a response body.");
      return NextResponse.json(
        { success: false, message: "Avatar image is unavailable." },
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
        { success: false, message: "Avatar image was not found in storage." },
        { status: 404 },
      );
    }

    console.error("Avatar storage request failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch avatar from storage." },
      { status: 502 },
    );
  }
}
