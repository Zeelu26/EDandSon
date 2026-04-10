import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

/*
 * ──────────────────────────────────────────────
 *  Contact / Quote Form API Route
 *  Saves submissions to Supabase
 *  Sends notification email via Resend (when configured)
 * ──────────────────────────────────────────────
 */

interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
}

// Basic server-side validation
function validate(data: ContactPayload): string | null {
  if (!data.name?.trim()) return "Name is required";
  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return "Valid email is required";
  if (!data.phone?.trim()) return "Phone is required";
  if (!data.projectType?.trim()) return "Project type is required";
  if (!data.message?.trim()) return "Message is required";

  // Length limits to prevent abuse
  if (data.name.length > 200) return "Name is too long";
  if (data.email.length > 300) return "Email is too long";
  if (data.phone.length > 30) return "Phone number is too long";
  if (data.message.length > 5000) return "Message is too long";

  return null;
}

// Simple rate-limit tracking (in-memory, resets on deploy)
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxPerWindow = 5;

  const times = submissions.get(ip)?.filter((t) => now - t < windowMs) ?? [];
  if (times.length >= maxPerWindow) return true;

  times.push(now);
  submissions.set(ip, times);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body: ContactPayload = await req.json();

    // Validate
    const error = validate(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    // Save to Supabase
    const supabase = createAdminClient();
    const { data: inserted, error: dbError } = await supabase
      .from("quote_requests")
      .insert({
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        project_type: body.projectType.trim(),
        message: body.message.trim(),
        status: "new",
      })
      .select("tracking_id")
      .single();

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save your request. Please call us directly." },
        { status: 500 }
      );
    }

    // ── Send notification email (uncomment when Resend is configured) ──
    /*
    const { Resend } = require("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Notify business owner
    await resend.emails.send({
      from: "Ed & Son Website <noreply@yourdomain.com>",
      to: [process.env.ADMIN_EMAIL || "ewcpereira@outlook.com"],
      subject: `New Quote Request: ${body.projectType} — ${body.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #9B1B1B;">New Quote Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Name</td><td style="padding: 8px 0; font-weight: 600;">${body.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0; font-weight: 600;">${body.phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0; font-weight: 600;">${body.email}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Project</td><td style="padding: 8px 0; font-weight: 600;">${body.projectType}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f5f3f0;">
            <p style="color: #666; margin: 0 0 4px;">Message:</p>
            <p style="margin: 0;">${body.message}</p>
          </div>
        </div>
      `,
    });

    // Auto-reply to customer
    await resend.emails.send({
      from: "Ed & Son Home Improvements <noreply@yourdomain.com>",
      to: [body.email],
      subject: "We received your quote request — Ed & Son Home Improvements",
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2>Thank you, ${body.name}!</h2>
          <p>We received your request for a <strong>${body.projectType}</strong> consultation and will be in touch within one business day.</p>
          <p>Call us anytime:</p>
          <p style="font-size: 18px; font-weight: 600;">
            <a href="tel:9082677613" style="color: #9B1B1B;">908-267-7613</a> |
            <a href="tel:9089231113" style="color: #9B1B1B;">908-923-1113</a>
          </p>
          <p style="color: #666; margin-top: 24px; font-size: 14px;">
            Ed & Son Home Improvements<br/>
            Livingston & Lebanon, NJ<br/>
            ewcpereira@outlook.com
          </p>
        </div>
      `,
    });
    */

    console.log("✅ Quote saved to Supabase:", body.name, body.projectType);

    return NextResponse.json({ success: true, tracking_id: inserted?.tracking_id || "" });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please call us directly at 908-267-7613." },
      { status: 500 }
    );
  }
}
