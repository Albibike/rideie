import Link from "next/link";

// Public landing page: in 5 seconds a visitor must know what this is, who it is for, and what to click.
export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <section className="py-14 text-center sm:py-20">
        <p className="mb-4 inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-800">
          For IE students in Madrid
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Skip the metro mess. Stop paying for Ubers.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-stone-700">
          Get your own scooter and reach class on time. We find you a 50cc or 125cc scooter,
          handle all the paperwork, and buy it back when you graduate.
        </p>
        <Link
          href="/signup"
          className="mt-8 inline-block rounded-xl bg-orange-600 px-8 py-4 text-lg font-bold text-white shadow-sm hover:bg-orange-700"
        >
          Sign up and request a scooter
        </Link>
        <p className="mt-4 text-sm text-stone-600">
          Free to request. Already have an account?{" "}
          <Link href="/login" className="font-semibold text-orange-700 underline">
            Log in
          </Link>
        </p>
      </section>

      <section className="grid gap-4 pb-16 sm:grid-cols-3">
        {[
          {
            step: "1",
            title: "Request",
            text: "Write what you're looking for: 50cc or 125cc, budget, when you need it.",
          },
          {
            step: "2",
            title: "We find it",
            text: "We search second-hand sites and check the scooter. You track the status online.",
          },
          {
            step: "3",
            title: "Ride, then sell back",
            text: "We do the ownership paperwork. When you graduate, we buy it back.",
          },
        ].map((item) => (
          <div key={item.step} className="rounded-2xl border border-stone-200 bg-white p-6">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 font-bold text-white">
              {item.step}
            </div>
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="mt-1 text-stone-700">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
