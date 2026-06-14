import { Link } from "react-router-dom";
import logoFull from "../../assets/doer-plus-logo-full.png";

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/90 p-5 text-slate-900 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-600 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-10">
        <div className="reveal">
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
              className="rounded-2xl border border-white/40 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              Book a Service
            </Link>

            <Link
              to="/services"
              className="rounded-2xl border border-white/40 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              View Services
            </Link>
          </div>
        </div>

        <div className="reveal reveal-delay-2 rounded-3xl bg-white/10 p-6 shadow-2xl backdrop-blur-md soft-float">
          <div className="mb-5 flex items-center gap-4 rounded-2xl bg-slate-950/80 p-4">
            <div className="flex h-20 w-32 items-center justify-center overflow-hidden rounded-xl bg-black p-2">
              <img
                src={logoFull}
                alt="Doer Plus Private Limited logo"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-white/90">
                Doer Plus Private Limited
              </p>
              <p className="text-xs text-white/70">
                Home service support partner
              </p>
            </div>
          </div>

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