"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

type ScooterRequest = {
  id: string;
  description: string;
  licence: string;
  budget_eur: number | null;
  status: string;
  created_at: string;
};

const LICENCES: Record<string, string> = {
  not_sure: "Not sure, help me choose",
  am: "AM licence: 50cc",
  b3: "Car licence (B) for 3+ years: up to 125cc",
  a: "Motorbike licence (A1, A2 or A): 125cc",
};

const STATUSES: Record<string, { label: string; color: string }> = {
  searching: { label: "Searching", color: "bg-amber-100 text-amber-900" },
  found: { label: "Scooter found", color: "bg-sky-100 text-sky-900" },
  paperwork: { label: "Paperwork in progress", color: "bg-violet-100 text-violet-900" },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-900" },
};

// Main feature: a logged-in student submits a scooter request and sees only their own requests.
export default function AppPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [requests, setRequests] = useState<ScooterRequest[]>([]);
  const [description, setDescription] = useState("");
  const [licence, setLicence] = useState("not_sure");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadRequests() {
    const { data, error } = await getSupabase()
      .from("requests")
      .select("id, description, licence, budget_eur, status, created_at")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setRequests(data ?? []);
  }

  useEffect(() => {
    // Only logged-in users may see this page; everyone else goes to /login.
    getSupabase()
      .auth.getSession()
      .then(async ({ data }) => {
        if (!data.session) {
          router.replace("/login");
          return;
        }
        await loadRequests();
        setReady(true);
      });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    setError("");
    setSaving(true);
    const { error } = await getSupabase()
      .from("requests")
      .insert({
        description: description.trim(),
        licence,
        budget_eur: budget ? Number(budget) : null,
      });
    if (error) {
      setError(error.message);
    } else {
      setDescription("");
      setBudget("");
      setLicence("not_sure");
      await loadRequests();
    }
    setSaving(false);
  }

  async function cancelRequest(id: string) {
    const { error } = await getSupabase().from("requests").delete().eq("id", id);
    if (error) setError(error.message);
    else await loadRequests();
  }

  if (!ready) {
    return <p className="px-4 py-12 text-center text-stone-600">Loading…</p>;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Request a scooter</h1>
      <p className="mt-2 text-stone-700">
        Describe what you need. We&apos;ll search for it and update the status here.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-stone-200 bg-white p-6">
        <label className="block">
          <span className="text-sm font-semibold">What are you looking for?</span>
          <input
            data-testid="core-input"
            type="text"
            required
            maxLength={500}
            placeholder="e.g. 125cc scooter, black, for my daily commute"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-base"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Your driving licence</span>
            <select
              value={licence}
              onChange={(e) => setLicence(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-base"
            >
              {Object.entries(LICENCES).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Budget in € (optional)</span>
            <input
              type="number"
              min={0}
              max={20000}
              placeholder="e.g. 1500"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2.5 text-base"
            />
          </label>
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}

        <button
          data-testid="core-submit"
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-orange-600 py-3 font-bold text-white hover:bg-orange-700 disabled:opacity-60"
        >
          {saving ? "Sending…" : "Send request"}
        </button>
        <p className="text-xs text-stone-500">
          Don&apos;t add ID or document numbers here. We&apos;ll ask for the paperwork documents only when your scooter is ready.
        </p>
      </form>

      <h2 className="mt-10 text-xl font-bold">My requests</h2>
      {requests.length === 0 ? (
        <p className="mt-3 text-stone-600">No requests yet. Your first one will appear here.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {requests.map((r) => {
            const status = STATUSES[r.status] ?? STATUSES.searching;
            return (
              <li
                key={r.id}
                data-testid="core-item"
                className="rounded-2xl border border-stone-200 bg-white p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="break-words font-semibold">{r.description}</p>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <p className="mt-1 text-sm text-stone-600">
                  {LICENCES[r.licence] ?? r.licence}
                  {r.budget_eur !== null && ` · Budget €${r.budget_eur}`}
                  {" · "}
                  {new Date(r.created_at).toLocaleDateString("en-GB")}
                </p>
                {r.status === "searching" && (
                  <button
                    onClick={() => cancelRequest(r.id)}
                    className="mt-2 text-sm font-medium text-red-700 underline"
                  >
                    Cancel request
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
