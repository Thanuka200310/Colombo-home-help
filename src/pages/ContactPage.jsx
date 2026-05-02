import areas from "../data/areas";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <div className="mt-6 space-y-4 text-slate-600">
            <p><strong>Phone:</strong> +94 77 123 4567</p>
            <p><strong>WhatsApp:</strong> +94 77 123 4567</p>
            <p><strong>Email:</strong> support@colombohomehelp.lk</p>
            <p><strong>Location:</strong> Colombo, Sri Lanka</p>
            <p><strong>Working Hours:</strong> 8:00 AM - 8:00 PM</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">Areas We Cover</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {areas.map((area) => (
              <div key={area} className="rounded-2xl bg-slate-50 px-4 py-3">
                {area}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}