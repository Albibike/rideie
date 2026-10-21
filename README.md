# RideIE

**RideIE helps IE students get a scooter, paperwork included, so they skip the metro and reach class on time.**

Students commuting to IE University in Madrid often spend 45 minutes each way on a crowded, hot metro. RideIE lets them request a 50cc or 125cc scooter in 30 seconds. We find it on second-hand sites, handle the ownership paperwork and buy it back when they graduate.

## Main feature

On `/app` a logged-in student submits a scooter request (what they need, licence type, budget) and follows its status: Searching → Scooter found → Paperwork → Delivered. Each student only sees their own requests.

## Tech

- [Next.js](https://nextjs.org) (App Router) + Tailwind CSS
- [Supabase](https://supabase.com) for email/password accounts and the `requests` table, protected by Row Level Security (see [`supabase/schema.sql`](supabase/schema.sql))
- Hosted on [Vercel](https://vercel.com)

## Run it locally

1. Create `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
2. `npm install`
3. `npm run dev` and open http://localhost:3000

Independent student project, not affiliated with IE University.
