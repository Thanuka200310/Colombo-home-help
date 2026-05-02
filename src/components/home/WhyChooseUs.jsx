export default function WhyChooseUs() {
  const points = [
    "Fast response for urgent house issues",
    "Multiple home services in one place",
    "Suitable for homes, apartments, and rental properties",
    "Simple booking and customer support process",
    "Professional and clean business-style presentation",
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Why Choose Us</h2>
            <p className="mt-4 text-slate-600">
              We focus on practical solutions, clear communication, and reliable
              service support for house owners in Colombo.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <ul className="space-y-4 text-slate-700">
              {points.map((point) => (
                <li key={point}>✔ {point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}