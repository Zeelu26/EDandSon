import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = createAdminClient();
  const body = await req.json();

  const { title, category, description, image_url, image_path } = body;

  if (!title || !category || !image_url) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data: maxOrder } = await supabase
    .from("projects")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();

  const nextOrder = (maxOrder?.sort_order ?? -1) + 1;

  const { data, error } = await supabase
    .from("projects")
    .insert({
      title,
      category,
      description: description || "",
      image_url,
      image_path,
      sort_order: nextOrder,
      visible: true,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const supabase = createAdminClient();
  const body = await req.json();

  if (body.reorder) {
    const updates = body.items.map((item: { id: string; sort_order: number }) =>
      supabase.from("projects").update({ sort_order: item.sort_order }).eq("id", item.id)
    );
    await Promise.all(updates);
    return NextResponse.json({ success: true });
  }

  const { id, ...fields } = body;
  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const { error } = await supabase.from("projects").update(fields).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const supabase = createAdminClient();
  const { id, image_path } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  if (image_path) {
    await supabase.storage.from("projects").remove([image_path]);
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}