import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase } from "../../lib/supabase";

const emptyForm = {
  title: "",
  icon: "🛠️",
  description: "",
  solution: "",
  image_url: "",
  is_active: true,
};

export default function AdminServiceFormPage() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadService() {
      if (!isEditMode) return;

      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setErrorMessage("Service could not load.");
        return;
      }

      setForm({
        title: data.title || "",
        icon: data.icon || "🛠️",
        description: data.description || "",
        solution: data.solution || "",
        image_url: data.image_url || "",
        is_active: data.is_active,
      });
    }

    loadService();
  }, [id, isEditMode]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function uploadImage() {
    if (!imageFile) {
      return form.image_url;
    }

    const fileExtension = imageFile.name.split(".").pop();
    const fileName = `services/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExtension}`;

    const { error } = await supabase.storage
      .from("service-images")
      .upload(fileName, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error("Image upload failed.");
    }

    const { data } = supabase.storage
      .from("service-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setErrorMessage("");

    try {
      const imageUrl = await uploadImage();

      const servicePayload = {
        title: form.title.trim(),
        icon: form.icon.trim(),
        description: form.description.trim(),
        solution: form.solution.trim(),
        image_url: imageUrl,
        is_active: form.is_active,
      };

      let result;

      if (isEditMode) {
        result = await supabase
          .from("services")
          .update(servicePayload)
          .eq("id", id);
      } else {
        result = await supabase.from("services").insert([servicePayload]);
      }

      if (result.error) {
        setErrorMessage(result.error.message);
        setSaving(false);
        return;
      }

      navigate("/admin/services");
    } catch (error) {
      setErrorMessage(error.message);
      setSaving(false);
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900">
          {isEditMode ? "Edit Service" : "Add Service"}
        </h1>
        <p className="mt-2 text-slate-500">
          Add service details and upload a service image.
        </p>

        {errorMessage && (
          <p className="mt-5 rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5 rounded-3xl bg-white p-6 shadow-sm">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Service Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="Example: Plumbing"
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-700"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Icon / Emoji
            </label>
            <input
              type="text"
              name="icon"
              value={form.icon}
              onChange={handleChange}
              placeholder="🛠️"
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-700"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the service"
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-700"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Solution
            </label>
            <textarea
              name="solution"
              rows={4}
              value={form.solution}
              onChange={handleChange}
              placeholder="Explain how you solve this customer problem"
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-700"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Service Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImageFile(event.target.files[0])}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
            />

            {form.image_url && (
              <img
                src={form.image_url}
                alt={form.title}
                className="mt-4 h-40 w-full rounded-2xl object-cover"
              />
            )}
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <span className="font-semibold text-slate-700">
              Show this service on website
            </span>
          </label>

          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : isEditMode ? "Update Service" : "Create Service"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}