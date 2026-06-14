import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export default function ServiceDetailsPage() {
  const { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [services, setServices] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    async function loadPage() {
      setLoading(true);
      setPageError("");

      if (!isSupabaseConfigured || !supabase) {
        setPageError("Supabase is not connected.");
        setLoading(false);
        return;
      }

      // 1. Load category from service_categories
      const { data: categoryData, error: categoryError } = await supabase
        .from("service_categories")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (categoryError) {
        console.error("Category load error:", categoryError);
        setPageError(categoryError.message);
        setLoading(false);
        return;
      }

      if (!categoryData) {
        setCategory(null);
        setLoading(false);
        return;
      }

      setCategory(categoryData);

      // 2. Load services inside this category
      const { data: serviceData, error: serviceError } = await supabase
        .from("services")
        .select("id, title, description, sort_order, is_active")
        .eq("category_id", categoryData.id)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (serviceError) {
        console.error("Services load error:", serviceError);
      }

      setServices(serviceData || []);

      // 3. Load images connected to this category
      const { data: imageData, error: imageError } = await supabase
        .from("service_images")
        .select("id, image_url, caption, created_at")
        .eq("category_id", categoryData.id)
        .order("created_at", { ascending: false });

      if (imageError) {
        console.error("Service images error:", imageError);
      }

      setImages(imageData || []);
      setLoading(false);
    }

    loadPage();
  }, [slug]);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <p className="text-slate-600">Loading service category...</p>
      </section>
    );
  }

  if (pageError) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Something went wrong
          </h1>

          <p className="mt-3 text-slate-600">{pageError}</p>

          <Link
            to="/services"
            className="mt-6 inline-flex rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white"
          >
            Back to Services
          </Link>
        </div>
      </section>
    );
  }

  if (!category) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Service category not found
          </h1>

          <p className="mt-3 text-slate-600">
            This category is not available right now.
          </p>

          <Link
            to="/services"
            className="mt-6 inline-flex rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white"
          >
            Back to Services
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="text-5xl">{category.icon || "🛠️"}</div>

            <h1 className="mt-4 text-4xl font-bold text-slate-900">
              {category.title}
            </h1>

            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              {category.description || category.short_description}
            </p>
          </div>

          <Link
            to={`/booking?category=${category.slug}`}
            className="rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white"
          >
            Book This Category
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Services Inside This Category
        </h2>

        <p className="mt-2 text-slate-500">
          Select from the available services and descriptions below.
        </p>

        {services.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-slate-100 p-5 text-slate-600">
            No services added under this category yet.
          </p>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {service.description}
                </p>

                <Link
  to={`/booking?category=${category.slug}&service=${service.id}`}
  className="mt-5 inline-flex rounded-2xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white"
>
  Book This Service
</Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">
          Our Work / Project Images
        </h2>

        <p className="mt-2 text-slate-500">
          Images uploaded by admin for this service category.
        </p>

        {images.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-slate-100 p-5 text-slate-600">
            No project images uploaded yet.
          </p>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {images.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-3xl bg-white shadow-sm"
              >
                <img
                  src={image.image_url}
                  alt={image.caption || category.title}
                  className="h-56 w-full object-cover"
                />

                {image.caption && (
                  <p className="p-4 text-sm text-slate-600">
                    {image.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}