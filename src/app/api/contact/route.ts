import { NextRequest, NextResponse } from "next/server";

/*
 * ──────────────────────────────────────────────
 *  Contact Form API Route
 *  Ready for Resend, SendGrid, or any provider.
 * ──────────────────────────────────────────────
 *
 *  TO CONNECT RESEND:
 *  1. npm install resend
 *  2. Add RESEND_API_KEY to .env.local
 *  3. Uncomment the Resend blocks below
 *  4. Set your "from" address (must be verified domain in Resend)
 */

// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

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
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    // Validate
    const error = validate(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    // ── Send notification email to business ──
    // Uncomment when Resend is connected:
    /*
    await resend.emails.send({
      from: 'Ed & Son Website <noreply@yourdomain.com>',
      to: ['ewcpereira@outlook.com'],
      subject: `New Quote Request: ${body.projectType} — ${body.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #9B1B1B;">New Quote Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Name</td><td style="padding: 8px 0; font-weight: 600;">${body.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0; font-weight: 600;">${body.phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0; font-weight: 600;">${body.email}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Project Type</td><td style="padding: 8px 0; font-weight: 600;">${body.projectType}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f5f3f0;">
            <p style="color: #666; margin: 0 0 4px;">Message:</p>
            <p style="margin: 0;">${body.message}</p>
          </div>
        </div>
      `,
    });
    */

    // ── Send confirmation email to customer ──
    // Uncomment when Resend is connected:
    /*
    await resend.emails.send({
      from: 'Ed & Son Home Improvements <noreply@yourdomain.com>',
      to: [body.email],
      subject: 'We received your quote request — Ed & Son Home Improvements',
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #1A1A1A;">Thank you, ${body.name}!</h2>
          <p>We've received your request for a <strong>${body.projectType}</strong> consultation and will be in touch within one business day.</p>
          <p>In the meantime, feel free to call us directly:</p>
          <p style="font-size: 18px; font-weight: 600;">
            <a href="tel:9082677613" style="color: #9B1B1B;">908-267-7613</a> &nbsp;|&nbsp;
            <a href="tel:9089231113" style="color: #9B1B1B;">908-923-1113</a>
          </p>
          <p style="color: #666; margin-top: 24px; font-size: 14px;">
            Ed & Son Home Improvements<br/>
            Livingston, NJ & Lebanon, NJ<br/>
            ewcpereira@outlook.com
          </p>
        </div>
      `,
    });
    */

    // Log for development
    console.log("📬 Contact form submission:", body);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
