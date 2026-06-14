import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-900 via-sky-700 to-cyan-600 py-16 text-white">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <h2 className="text-3xl font-bold md:text-4xl">
          Need help with a house issue today?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/90">
          Book a service now and let our team help you with repairs, maintenance,
          cleaning, and more across Colombo.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/booking"
            className="rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Request Service
          </Link>
          <Link
            to="/contact"
            className="rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}