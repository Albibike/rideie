"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

// Top bar shown on every page. When someone is logged in it shows the logout button.
export default function Header() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => setLoggedIn(!!data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  async function logout() {
    await getSupabase().auth.signOut();
    router.push("/");
  }

  return (
    <header className="border-b border-stone-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-stone-900">
          Ride<span className="text-orange-600">IE</span>
        </Link>
        {loggedIn ? (
          <div className="flex items-center gap-3">
            <Link href="/app" className="text-sm font-medium text-stone-700 hover:text-stone-900">
              My requests
            </Link>
            <button
              data-testid="logout"
              onClick={logout}
              className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-800 hover:bg-stone-100"
            >
              Log out
            </button>
          </div>
        ) : (
          <Link href="/login" className="text-sm font-medium text-stone-700 hover:text-stone-900">
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
}
