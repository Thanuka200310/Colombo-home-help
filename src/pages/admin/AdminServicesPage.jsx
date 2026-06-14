import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase } from "../../lib/supabase";

const emptyForm = {
  id: "",
  category_id: "",
  title: "",
  slug: "",
  description: "",
  icon: "🛠️",
  sort_order: 0,
  is_active: true,
};

function makeSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminServicesPage() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [filterCategoryId, setFilterCategoryId] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadServices();
  }, [filterCategoryId]);

  async function loadCategories() {
    const { data, error } = await supabase
      .from("service_categories")
      .select("id, title")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      setStatus(error.message);
      return;
    }

    setCategories(data || []);
  }

  async function loadServices() {
    setLoading(true);

    let query = supabase
      .from("services")
      .select("*, service_categories(title)")
      .order("sort_order", { ascending: true });

    if (filterCategoryId) {
      query = query.eq("category_id", filterCategoryId);
    }

    const { data, error } = await query;

    if (error) {
      setStatus(error.message);
      setServices([]);
    } else {
      setServices(data || []);
    }

    setLoading(false);
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function editService(service) {
    setForm({
      id: service.id,
      category_id: service.category_id || "",
      title: service.title || "",
      slug: service.slug || "",
      description: service.description || service.short_description || "",
      icon: service.icon || "🛠️",
      sort_order: service.sort_order || 0,
      is_active: service.is_active ?? true,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm(emptyForm);
  }

  async function saveService(event) {
    event.preventDefault();
    setStatus("");

    if (!form.category_id) {
      setStatus("Please select a category.");
      return;
    }

    const payload = {
      category_id: form.category_id,
      title: form.title,
      slug: form.slug || makeSlug(form.title),
      short_description: form.description,
      description: form.description,
      icon: form.icon || "🛠️",
      is_main: false,
      sort_order: Number(form.sort_order || 0),
      is_active: form.is_active,
    };

    let result;

    if (form.id) {
      result = await supabase.from("services").update(payload).eq("id", form.id);
    } else {
      result = await supabase.from("services").insert([payload]);
    }

    if (result.error) {
      setStatus(result.error.message);
      return;
    }

    setStatus(form.id ? "Service updated successfully." : "Service added successfully.");
    resetForm();
    loadServices();
  }

  async function deleteService(id) {
    const confirmDelete = window.confirm("Delete this service?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus("Service deleted successfully.");
    loadServices();
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-slate-900">Services</h1>

      <p className="mt-2 text-slate-500">
        Add, edit, or delete services inside each service category.
      </p>

      {status && (
        <p className="mt-5 rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm">
          {status}
        </p>
      )}

      <form
        onSubmit={saveService}
        className="mt-8 grid gap-4 rounded-3xl bg-white p-6 shadow-sm"
      >
        <select
          name="category_id"
          required
          value={form.category_id}
          onChange={handleChange}
          className="rounded-2xl border border-slate-300 px-4 py-3"
        >
          <option value="">Select category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>

        <input
          name="title"
          required
          value={form.title}
          onChange={handleChange}
          placeholder="Service name, example: Residential Cleaning"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug optional, auto generated if empty"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <input
          name="icon"
          value={form.icon}
          onChange={handleChange}
          placeholder="Icon emoji"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <textarea
          name="description"
          required
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Service description"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <input
          type="number"
          name="sort_order"
          value={form.sort_order}
          onChange={handleChange}
          placeholder="Sort order"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <label className="flex items-center gap-3 text-sm font-semibold">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
          />
          Show on website
        </label>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white">
            {form.id ? "Update Service" : "Add Service"}
          </button>

          {form.id && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
        <label className="text-sm font-semibold text-slate-700">
          Filter services by category
        </label>

        <select
          value={filterCategoryId}
          onChange={(event) => setFilterCategoryId(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
        >
          <option value="">All categories</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="mt-8 text-slate-600">Loading services...</p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="text-4xl">{service.icon || "🛠️"}</div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {service.service_categories?.title || "No category"}
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                {service.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {service.description || service.short_description}
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => editService(service)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteService(service.id)}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {services.length === 0 && (
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-slate-500">No services found.</p>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}