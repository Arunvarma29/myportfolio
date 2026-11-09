import pool from "@/lib/db";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const services = new Set([
  "web-development",
  "full-stack",
  "ai-development",
  "ui-ux",
  "other",
]);

let transporter;

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 320;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function getMailConfig() {
  const port = Number(process.env.SMTP_PORT || 587);
  const config = {
    host: process.env.SMTP_HOST,
    port,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
  };
  const missing = Object.entries(config)
    .filter(([name, value]) => name !== "port" && !value)
    .map(([name]) => name);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    missing.push("SMTP_PORT (must be a valid port)");
  }

  return { config, missing };
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
  const name = `${firstName} ${lastName}`.trim();
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const service = typeof body.service === "string" ? body.service : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (
    !firstName ||
    !lastName ||
    name.length > 200 ||
    !isEmail(email) ||
    phone.length > 50 ||
    (service && !services.has(service)) ||
    !message ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { success: false, message: "Please check the form details and try again." },
      { status: 400 },
    );
  }

  try {
    const profile = await pool.query(`
      SELECT email
      FROM about_me
      ORDER BY updated_at DESC
      LIMIT 1
    `);
    const recipient = (process.env.CONTACT_EMAIL_TO || profile.rows[0]?.email || "").trim();
    const saved = await pool.query(
      `INSERT INTO contact_messages (name, email, phone, service, subject, message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [name, email, phone || null, service || null, service || null, message],
    );

    const { config, missing } = getMailConfig();
    if (missing.length > 0 || !recipient || !isEmail(recipient)) {
      console.error(
        `Contact message ${saved.rows[0].id} saved, but email configuration is missing or invalid:`,
        missing.length > 0 ? missing.join(", ") : "recipient",
      );
      return NextResponse.json(
        {
          success: false,
          saved: true,
          message: "Your message was saved, but email delivery is not configured. Please contact me directly if you need confirmation.",
        },
        { status: 503 },
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeService = escapeHtml(service || "Not specified");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    transporter ??= nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: process.env.SMTP_SECURE
        ? process.env.SMTP_SECURE.toLowerCase() === "true"
        : config.port === 465,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    const mailResults = await Promise.allSettled([
      transporter.sendMail({
        from: config.from,
        to: recipient,
        replyTo: email,
        subject: `New portfolio enquiry${service ? ` - ${service}` : ""}`,
        text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nService: ${service || "Not specified"}\n\nMessage:\n${message}`,
        html: `<h2>New contact form submission</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Phone:</strong> ${safePhone}</p><p><strong>Service:</strong> ${safeService}</p><p><strong>Message:</strong><br>${safeMessage}</p>`,
      }),
      transporter.sendMail({
        from: config.from,
        to: email,
        replyTo: process.env.SMTP_NO_REPLY_TO || config.from,
        subject: "Thank you for contacting me",
        text: `Hi ${name},\n\nThank you for contacting me. I have received your message and will get back to you as soon as possible.\n\nThis is an automated confirmation email. Please do not reply to this message.\n\nRegards,\nArun`,
        html: `<p>Hi ${safeName},</p><p>Thank you for contacting me. I have received your message and will get back to you as soon as possible.</p><p><strong>This is an automated confirmation email. Please do not reply to this message.</strong></p><p>Regards,<br>Arun</p>`,
      }),
    ]);

    const failedMail = mailResults.flatMap((result, index) =>
      result.status === "rejected" ? [index === 0 ? "notification" : "confirmation"] : [],
    );

    if (failedMail.length > 0) {
      console.error(
        `Contact message ${saved.rows[0].id} saved, but email delivery failed for:`,
        failedMail.join(", "),
      );
      return NextResponse.json(
        {
          success: false,
          saved: true,
          message: "Your message was saved, but email delivery failed. Please contact me directly if you need confirmation.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Thanks for reaching out! Your message has been sent." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to send your message right now. Please try again later." },
      { status: 500 },
    );
  }
}
