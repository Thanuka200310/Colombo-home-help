import { useState } from "react";

export default function BookingPage() {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const response = await fetch("https://formspree.io/f/xpqbweev", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setFormStatus("Thank you for your submission!");
    } else {
      setFormStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
      <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
        <h1 className="text-3xl font-bold">Book a Service</h1>
        <p className="mt-3 text-slate-300">
          Fill in the details below to request home repair or maintenance support.
        </p>

        {formStatus && <p className="mt-3">{formStatus}</p>}

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full name"
            className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-400"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-400"
          />
          <input
            type="text"
            name="area"
            placeholder="Area in Colombo"
            className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-400"
          />
          <select
            name="service"
            className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
          >
            <option>Select service</option>
            {/* Dynamically fill service options */}
            <option>Plumbing</option>
            <option>Electrical Repairs</option>
            <option>Cleaning</option>
            <option>Pest Control</option>
            <option>Handyman Services</option>
          </select>
          <textarea
            name="description"
            rows={6}
            placeholder="Describe the issue"
            className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="rounded-2xl bg-emerald-400 px-5 py-3 font-semibold text-slate-900"
          >
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
}