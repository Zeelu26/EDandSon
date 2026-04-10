import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { Resend } from "resend";

interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
}

function validate(data: ContactPayload): string | null {
  if (!data.name?.trim()) return "Name is required";
  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return "Valid email is required";
  if (!data.phone?.trim()) return "Phone is required";
  if (!data.projectType?.trim()) return "Project type is required";
  if (!data.message?.trim()) return "Message is required";
  if (data.name.length > 200) return "Name is too long";
  if (data.email.length > 300) return "Email is too long";
  if (data.phone.length > 30) return "Phone number is too long";
  if (data.message.length > 5000) return "Message is too long";
  return null;
}

const submissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxPerWindow = 5;
  const times = submissions.get(ip)?.filter((t) => now - t < windowMs) ?? [];
  if (times.length >= maxPerWindow) return true;
  times.push(now);
  submissions.set(ip, times);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body: ContactPayload = await req.json();

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

    const trackingId = inserted?.tracking_id || "";

    // Send emails via Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Email to business owner
      try {
        await resend.emails.send({
          from: "Ed & Son Website <onboarding@resend.dev>",
          to: ["ewcpereira@outlook.com"],
          subject: `New Quote Request: ${body.projectType} — ${body.name} [${trackingId}]`,
          html: `
            <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1A1A1A; padding: 24px; text-align: center;">
                <h1 style="color: #9B1B1B; margin: 0; font-size: 20px;">New Quote Request</h1>
              </div>
              <div style="padding: 24px; background: #ffffff;">
                <p style="color: #666; font-size: 13px; margin-bottom: 4px;">Tracking ID</p>
                <p style="font-size: 22px; font-weight: bold; color: #1A1A1A; margin-top: 0; letter-spacing: 2px;">${trackingId}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 10px 0; color: #999; width: 120px;">Name</td>
                    <td style="padding: 10px 0; font-weight: 600; color: #1A1A1A;">${body.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #999;">Phone</td>
                    <td style="padding: 10px 0; font-weight: 600; color: #1A1A1A;">
                      <a href="tel:${body.phone.replace(/\D/g, "")}" style="color: #9B1B1B; text-decoration: none;">${body.phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #999;">Email</td>
                    <td style="padding: 10px 0; font-weight: 600; color: #1A1A1A;">
                      <a href="mailto:${body.email}" style="color: #9B1B1B; text-decoration: none;">${body.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #999;">Project</td>
                    <td style="padding: 10px 0; font-weight: 600; color: #1A1A1A;">${body.projectType}</td>
                  </tr>
                </table>
                <div style="margin-top: 20px; padding: 16px; background: #f8f7f5; border-left: 3px solid #9B1B1B;">
                  <p style="color: #999; margin: 0 0 6px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                  <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.6;">${body.message}</p>
                </div>
                <div style="margin-top: 24px; text-align: center;">
                  <a href="https://edandson.vercel.app/admin/quotes" style="display: inline-block; background: #9B1B1B; color: white; padding: 12px 24px; text-decoration: none; font-size: 14px; font-weight: 600;">View in Dashboard</a>
                </div>
              </div>
              <div style="padding: 16px; background: #f5f5f5; text-align: center;">
                <p style="margin: 0; color: #999; font-size: 12px;">Ed & Son Home Improvements — Quote Notification</p>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Failed to send owner notification:", emailErr);
      }

      // Auto-reply to customer
      try {
        await resend.emails.send({
          from: "Ed & Son Home Improvements <onboarding@resend.dev>",
          to: [body.email],
          subject: "We received your quote request — Ed & Son Home Improvements",
          html: `
            <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1A1A1A; padding: 24px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Ed & Son Home Improvements</h1>
              </div>
              <div style="padding: 32px 24px; background: #ffffff;">
                <h2 style="color: #1A1A1A; margin-top: 0;">Thank you, ${body.name}!</h2>
                <p style="color: #555; font-size: 15px; line-height: 1.6;">
                  We've received your request for a <strong>${body.projectType}</strong> consultation and will be in touch within one business day.
                </p>
                
                <div style="background: #f8f7f5; padding: 20px; text-align: center; margin: 24px 0; border: 1px solid #eee;">
                  <p style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Your Tracking ID</p>
                  <p style="font-size: 28px; font-weight: bold; color: #9B1B1B; margin: 0; letter-spacing: 3px;">${trackingId}</p>
                  <p style="color: #999; font-size: 12px; margin: 8px 0 0;">
                    Use this ID to <a href="https://edandson.vercel.app/track" style="color: #9B1B1B;">track your request status</a>
                  </p>
                </div>

                <p style="color: #555; font-size: 15px; line-height: 1.6;">
                  In the meantime, feel free to call us directly:
                </p>
                <p style="font-size: 18px; font-weight: 600; text-align: center;">
                  <a href="tel:9082677613" style="color: #9B1B1B; text-decoration: none;">908-267-7613</a>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <a href="tel:9089231113" style="color: #9B1B1B; text-decoration: none;">908-923-1113</a>
                </p>
              </div>
              <div style="padding: 20px; background: #1A1A1A; text-align: center;">
                <p style="margin: 0 0 4px; color: #999; font-size: 13px;">Ed & Son Home Improvements</p>
                <p style="margin: 0; color: #666; font-size: 12px;">Livingston & Lebanon, NJ | ewcpereira@outlook.com</p>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Failed to send customer auto-reply:", emailErr);
      }
    }

    return NextResponse.json({ success: true, tracking_id: trackingId });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please call us directly at 908-267-7613." },
      { status: 500 }
    );
  }
}