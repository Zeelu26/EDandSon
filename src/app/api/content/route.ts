import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("site_content").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const content: Record<string, unknown> = {};
  data?.forEach((row: { key: string; value: unknown }) => {
    content[row.key] = row.value;
  });

  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { key, value } = body;

  if (!key || !value) {
    return NextResponse.json({ error: "Key and value required" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("site_content")
    .upsert({ key, value, updated_at: new Date().toISOString() });

  if (error) {
    console.error("Content save error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}