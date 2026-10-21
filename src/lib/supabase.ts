import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// One shared Supabase connection for the whole website.
// Only the public URL and the publishable key are used here (never the secret key).
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      throw new Error(
        "Missing Supabase keys: add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local (and to Vercel)."
      );
    }
    client = createClient(url, key);
  }
  return client;
}
