import { Link, useParams } from "react-router-dom";
import services, { serviceCategories } from "../data/services";

export default function ServiceDetailsPage() {
  const { serviceSlug } = useParams();
  const service = services.find((item) => item.slug === serviceSlug);

  if (!service) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-10">
        <h1 className="text-3xl font-bold">Service not found</h1>
        <p className="mt-3 text-slate-600">
          The service you opened is not available.
        </p>
        <Link
          to="/services"
          className="mt-6 inline-flex rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white"
        >
          Back to Services
        </Link>
      </section>
    );
  }

  const category = serviceCategories.find(
    (item) => item.slug === service.categorySlug
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <Link
        to="/services"
        className="inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md"
      >
        ← Back to Services
      </Link>

      <div className="mt-8 rounded-3xl bg-gradient-to-br from-sky-700 to-cyan-600 p-8 text-white shadow-xl">
        <p className="text-sm font-semibold text-white/80">
          {category?.icon} {category?.name}
        </p>

        <h1 className="mt-3 text-4xl font-extrabold">{service.title}</h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/90">
          {service.description}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Service Solution</h2>
          <p className="mt-3 leading-7 text-slate-600">{service.solution}</p>

          <Link
            to="/booking"
            className="mt-6 inline-flex rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white transition hover:bg-sky-800"
          >
            Book This Service
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Service Photos</h2>
          <p className="mt-2 text-sm text-slate-500">
            Our completed work and service portfolio photos.
          </p>

          {service.gallery.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {service.gallery.map((photo, index) => (
                <img
                  key={photo}
                  src={photo}
                  alt={`${service.title} photo ${index + 1}`}
                  className="h-56 w-full rounded-2xl object-cover shadow-sm transition hover:scale-[1.02] hover:shadow-lg"
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-lg font-semibold text-slate-700">
                Photos coming soon
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Service photos will be added here soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}