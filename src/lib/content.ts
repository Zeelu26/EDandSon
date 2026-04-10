import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getSiteContent() {
  const { data } = await supabase.from("site_content").select("*");

  const content: Record<string, any> = {};
  data?.forEach((row: { key: string; value: any }) => {
    content[row.key] = row.value;
  });

  return content;
}