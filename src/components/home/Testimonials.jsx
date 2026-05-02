import testimonials from "../../data/testimonials";
import SectionTitle from "../shared/SectionTitle";

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <SectionTitle
        title="What Customers Say"
        subtitle="Feedback from homeowners who used our repair and maintenance services."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-slate-600">“{item.text}”</p>
            <p className="mt-4 font-semibold text-slate-900">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}