import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex h-32 items-center justify-center bg-slate-100 text-5xl transition duration-300 group-hover:bg-sky-50">
        {service.image_url ? (
          <img
            src={service.image_url}
            alt={service.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="transition duration-300 group-hover:scale-110">
            {service.icon || "🛠️"}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
          {service.short_description || service.description}
        </p>

        <span className="mt-4 inline-flex rounded-2xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white">
          View Services
        </span>
      </div>
    </Link>
  );
}