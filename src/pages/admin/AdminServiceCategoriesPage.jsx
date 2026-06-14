import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase } from "../../lib/supabase";

const emptyForm = {
  id: "",
  title: "",
  slug: "",
  icon: "🛠️",
  short_description: "",
  description: "",
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

export default function AdminServiceCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const { data } = await supabase
      .from("service_categories")
      .select("*")
      .order("sort_order", { ascending: true });

    setCategories(data || []);
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function editCategory(category) {
    setForm(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm(emptyForm);
  }

  async function saveCategory(event) {
    event.preventDefault();
    setStatus("");

    const payload = {
      title: form.title,
      slug: form.slug || makeSlug(form.title),
      icon: form.icon,
      short_description: form.short_description,
      description: form.description,
      sort_order: Number(form.sort_order || 0),
      is_active: form.is_active,
    };

    let result;

    if (form.id) {
      result = await supabase
        .from("service_categories")
        .update(payload)
        .eq("id", form.id);
    } else {
      result = await supabase.from("service_categories").insert([payload]);
    }

    if (result.error) {
      setStatus(result.error.message);
      return;
    }

    setStatus(form.id ? "Category updated." : "Category created.");
    resetForm();
    loadCategories();
  }

  async function deleteCategory(id) {
    const confirmDelete = window.confirm(
      "Delete this category? Related images/services can also be affected."
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("service_categories")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadCategories();
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-slate-900">
        Service Categories
      </h1>

      <p className="mt-2 text-slate-500">
        Add, edit, or delete service categories shown on the website.
      </p>

      {status && (
        <p className="mt-5 rounded-2xl bg-white p-4 text-sm shadow-sm">
          {status}
        </p>
      )}

      <form
        onSubmit={saveCategory}
        className="mt-8 grid gap-4 rounded-3xl bg-white p-6 shadow-sm"
      >
        <input
          name="title"
          required
          value={form.title}
          onChange={handleChange}
          placeholder="Category name"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="slug optional, auto generated if empty"
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
          name="short_description"
          required
          value={form.short_description}
          onChange={handleChange}
          rows={3}
          placeholder="Short description"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <textarea
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          rows={4}
          placeholder="Full category description"
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

        <div className="flex gap-3">
          <button className="rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white">
            {form.id ? "Update Category" : "Add Category"}
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

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-4xl">{category.icon}</div>
            <h2 className="mt-4 text-xl font-bold">{category.title}</h2>
            <p className="mt-2 text-sm text-slate-600">
              {category.short_description}
            </p>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => editCategory(category)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Edit
              </button>

              <button
                onClick={() => deleteCategory(category.id)}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}