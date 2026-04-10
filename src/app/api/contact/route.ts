import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

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

    const supabase = createAdminClient();
    const { error: dbError } = await supabase.from("quote_requests").insert({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      project_type: body.projectType.trim(),
      message: body.message.trim(),
      status: "new",
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save your request. Please call us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please call us directly at 908-267-7613." },
      { status: 500 }
    );
  }
}