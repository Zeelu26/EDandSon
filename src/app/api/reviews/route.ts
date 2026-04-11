import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { sanitizeString } from "@/lib/sanitize";

export async function GET(req: NextRequest) {
  const supabase = createAdminClient();
  const showAll = req.nextUrl.searchParams.get("all") === "true";

  let query = supabase.from("reviews").select("*").order("created_at", { ascending: false });

  if (!showAll) {
    query = query.eq("approved", true);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, location, rating, text } = body;

  if (!name?.trim() || !text?.trim()) {
    return NextResponse.json({ error: "Name and review text are required" }, { status: 400 });
  }

  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
  }

  if (text.length > 2000) {
    return NextResponse.json({ error: "Review is too long" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("reviews").insert({
    name: sanitizeString(name),
    location: sanitizeString(location || ""),
    rating: Number(rating),
    text: sanitizeString(text),
    approved: false,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, approved } = body;

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("reviews").update({ approved }).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("reviews").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}