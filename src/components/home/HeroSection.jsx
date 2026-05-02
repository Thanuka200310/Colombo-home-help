import { Link } from "react-router-dom";

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/90 p-5 text-slate-900">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-sky-700 via-cyan-600 to-emerald-500 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10">
        <div>
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">
            Professional business website for home services
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">
            Fast and trusted house repair services in Colombo
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            Plumbing, electrical, roofing, cleaning, pest control, handyman work,
            and more for homes, apartments, and rental properties.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/booking"
              className="rounded-2xl bg-white px-6 py-3 font-semibold text-sky-700 shadow-lg"
            >
              Book a Service
            </Link>
            <Link
              to="/services"
              className="rounded-2xl border border-white/40 px-6 py-3 font-semibold text-white"
            >
              View Services
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-white/10 p-6 shadow-2xl backdrop-blur-md">
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="Response" value="Same-day support" />
            <StatCard label="Coverage" value="Colombo area" />
            <StatCard label="Service Types" value="10+ categories" />
            <StatCard label="Booking" value="Easy request" />
          </div>
        </div>
      </div>
    </section>
  );
}