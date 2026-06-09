import { useState } from "react";
import { Link } from "react-router-dom";
import services, { serviceCategories } from "../data/services";
import SectionTitle from "../components/shared/SectionTitle";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((service) => service.categorySlug === activeCategory);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <SectionTitle
        title="Our Services"
        subtitle="Choose a service category, then open a service to view details and photos."
      />

      <div className="mb-10 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={`rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${
            activeCategory === "all"
              ? "bg-sky-700 text-white"
              : "border border-slate-200 bg-white text-slate-700"
          }`}
        >
          All Services
        </button>

        {serviceCategories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setActiveCategory(category.slug)}
            className={`rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${
              activeCategory === category.slug
                ? "bg-sky-700 text-white"
                : "border border-slate-200 bg-white text-slate-700"
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredServices.map((service) => (
          <Link
            key={service.id}
            to={`/services/${service.slug}`}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="text-4xl transition group-hover:scale-110">
              {service.icon}
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">
              {service.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {service.description}
            </p>

            <div className="mt-5 inline-flex rounded-2xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-sky-800">
              View Service Photos
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}