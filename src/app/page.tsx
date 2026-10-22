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
          Skip the metro. Skip the Uber. Ride to class.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-stone-700">
          Get your own 50cc or 125cc scooter and reach class faster, on your own schedule.
          We find it, handle all the paperwork, and buy it back when you graduate.
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

      <section className="pb-14">
        <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight">The time you get back</h2>
        <div className="grid gap-4 rounded-2xl bg-stone-900 p-6 text-center text-white sm:grid-cols-3">
          {[
            { value: "45 → 20 min", label: "metro vs scooter, each way" },
            { value: "50 min", label: "saved every day" },
            { value: "4 hours", label: "back every week" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold text-orange-400">{stat.value}</p>
              <p className="mt-1 text-sm text-stone-300">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-stone-500">
          Based on a typical 45-minute metro commute to IE and our own daily rides across Madrid.
        </p>
      </section>

      <section className="pb-14">
        <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight">Why ride?</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: "🚇",
              title: "No more metro",
              text: "45 minutes packed and sweaty, and you never know if you'll make it on time. On a scooter, you're in control: you decide when you leave and when you arrive.",
            },
            {
              icon: "🚕",
              title: "No more Ubers",
              text: "No paying for every ride, no waiting for a driver, no sitting in traffic. Your scooter is ready when you are.",
            },
            {
              icon: "☀️",
              title: "Enjoy the ride",
              text: "Fresh air, the streets of Madrid, and you arrive awake. Your commute becomes the best part of the day.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-stone-200 bg-white p-6">
              <div className="mb-3 text-3xl" aria-hidden="true">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-1 text-stone-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-16">
        <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight">How it works</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Request",
              text: "Tell us what you're looking for: 50cc or 125cc, your licence, your budget.",
            },
            {
              step: "2",
              title: "We find it",
              text: "We search second-hand sites, check the scooter and do the paperwork. You track the status online.",
            },
            {
              step: "3",
              title: "Ride, then sell back",
              text: "Ride it every day. When you graduate or move city, we buy it back.",
            },
          ].map((item) => (
            <div key={item.step} className="rounded-2xl border border-stone-200 bg-white p-6">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 font-bold text-white">
                {item.step}
              </div>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-1 text-stone-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
