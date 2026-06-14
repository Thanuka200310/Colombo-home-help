import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export default function BookingPage() {
  const [searchParams] = useSearchParams();

  const requestedCategorySlug = searchParams.get("category");
  const requestedServiceId = searchParams.get("service");

  const [session, setSession] = useState(null);
  const [customer, setCustomer] = useState(null);

  const [categories, setCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [areas, setAreas] = useState([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");

  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const filteredServices = useMemo(() => {
    if (!selectedCategoryId) return [];

    return allServices.filter(
      (service) => service.category_id === selectedCategoryId
    );
  }, [allServices, selectedCategoryId]);

  useEffect(() => {
    async function loadData() {
      if (!isSupabaseConfigured || !supabase) {
        setFormStatus("Supabase is not connected.");
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        const { data: customerData } = await supabase
          .from("customers")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();

        setCustomer(customerData);
      }

      const { data: categoryData, error: categoryError } = await supabase
        .from("service_categories")
        .select("id, slug, title")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (categoryError) {
        setFormStatus(categoryError.message);
        return;
      }

      const { data: serviceData, error: serviceError } = await supabase
        .from("services")
        .select("id, category_id, title, description")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (serviceError) {
        setFormStatus(serviceError.message);
        return;
      }

      const { data: areaData } = await supabase
        .from("service_areas")
        .select("area_name")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      setCategories(categoryData || []);
      setAllServices(serviceData || []);
      setAreas((areaData || []).map((item) => item.area_name));

      if (requestedCategorySlug && categoryData?.length) {
        const selectedCategory = categoryData.find(
          (category) => category.slug === requestedCategorySlug
        );

        if (selectedCategory) {
          setSelectedCategoryId(selectedCategory.id);
        }
      }

      if (requestedServiceId && serviceData?.length) {
        const selectedService = serviceData.find(
          (service) => service.id === requestedServiceId
        );

        if (selectedService) {
          setSelectedServiceId(selectedService.id);

          if (!requestedCategorySlug) {
            setSelectedCategoryId(selectedService.category_id);
          }
        }
      }
    }

    loadData();
  }, [requestedCategorySlug, requestedServiceId]);

  function handleCategoryChange(event) {
    setSelectedCategoryId(event.target.value);
    setSelectedServiceId("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setFormStatus("");

    const formData = new FormData(event.target);

    const selectedCategory = categories.find(
      (category) => category.id === selectedCategoryId
    );

    const selectedService = allServices.find(
      (service) => service.id === selectedServiceId
    );

    const { error } = await supabase.from("bookings").insert([
      {
        customer_id: session?.user?.id || null,
        category_id: selectedCategoryId || null,
        service_id: selectedServiceId || null,
        customer_name: formData.get("name"),
        phone: formData.get("phone"),
        area: formData.get("area"),
        category_name: selectedCategory?.title || null,
        service_name: selectedService?.title || null,
        description: formData.get("description"),
        status: "new",
      },
    ]);

    if (error) {
      setFormStatus(error.message);
    } else {
      setFormStatus("Thank you! Your booking request was submitted.");
      event.target.reset();
      setSelectedCategoryId("");
      setSelectedServiceId("");
    }

    setSubmitting(false);
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
      <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
        <h1 className="text-3xl font-bold">Book a Service</h1>

        <p className="mt-3 text-slate-300">
          Select your area, service category, and required service type.
        </p>

        {formStatus && (
          <p className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-sm">
            {formStatus}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <input
            type="text"
            name="name"
            required
            defaultValue={customer?.full_name || ""}
            placeholder="Full name"
            className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-400"
          />

          <input
            type="tel"
            name="phone"
            required
            defaultValue={customer?.phone || ""}
            placeholder="Phone number"
            className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-400"
          />

          <select
            name="area"
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
          >
            <option value="">Select area in Colombo</option>

            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>

          <select
            name="category_id"
            required
            value={selectedCategoryId}
            onChange={handleCategoryChange}
            className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
          >
            <option value="">Select service category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>

          <select
            name="service_id"
            required
            value={selectedServiceId}
            onChange={(event) => setSelectedServiceId(event.target.value)}
            disabled={!selectedCategoryId}
            className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none disabled:opacity-50"
          >
            <option value="">
              {selectedCategoryId
                ? "Select service type"
                : "Select category first"}
            </option>

            {filteredServices.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            rows={6}
            required
            placeholder="Describe the issue or requirement"
            className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-400"
          />

          <button
            type="submit"
            disabled={submitting}
            className="rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </section>
  );
}