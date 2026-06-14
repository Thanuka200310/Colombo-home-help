import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase } from "../../lib/supabase";

export default function AdminServiceImagesPage() {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadImages();
  }, [selectedFilter]);

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

  async function loadImages() {
    let query = supabase
      .from("service_images")
      .select("*, service_categories(title)")
      .order("created_at", { ascending: false });

    if (selectedFilter) {
      query = query.eq("category_id", selectedFilter);
    }

    const { data, error } = await query;

    if (error) {
      setStatus(error.message);
      setImages([]);
      return;
    }

    setImages(data || []);
  }

  async function handleUpload(event) {
    event.preventDefault();
    setUploading(true);
    setStatus("");

    const formData = new FormData(event.target);
    const categoryId = formData.get("category_id");
    const caption = formData.get("caption");
    const file = formData.get("image");

    if (!categoryId || !file || file.size === 0) {
      setStatus("Please select category and image.");
      setUploading(false);
      return;
    }

    const safeFileName = file.name.replace(/\s+/g, "-").toLowerCase();
    const filePath = `${categoryId}/${Date.now()}-${safeFileName}`;

    const { error: uploadError } = await supabase.storage
      .from("service-images")
      .upload(filePath, file);

    if (uploadError) {
      setStatus(uploadError.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("service-images")
      .getPublicUrl(filePath);

    const { error } = await supabase.from("service_images").insert([
      {
        category_id: categoryId,
        image_url: urlData.publicUrl,
        storage_path: filePath,
        caption,
      },
    ]);

    if (error) {
      setStatus(error.message);
    } else {
      setStatus("Image uploaded successfully.");
      event.target.reset();
      setSelectedFilter(categoryId);
      loadImages();
    }

    setUploading(false);
  }

  async function deleteImage(image) {
    const confirmDelete = window.confirm("Delete this service image?");
    if (!confirmDelete) return;

    const { error: storageError } = await supabase.storage
      .from("service-images")
      .remove([image.storage_path]);

    if (storageError) {
      setStatus(storageError.message);
      return;
    }

    const { error } = await supabase
      .from("service_images")
      .delete()
      .eq("id", image.id);

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus("Image deleted successfully.");
    loadImages();
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-slate-900">Service Images</h1>

      <p className="mt-2 text-slate-500">
        Upload images under the correct service category.
      </p>

      {status && (
        <p className="mt-5 rounded-2xl bg-white p-4 text-sm shadow-sm">
          {status}
        </p>
      )}

      <form
        onSubmit={handleUpload}
        className="mt-8 grid gap-4 rounded-3xl bg-white p-6 shadow-sm"
      >
        <select
          name="category_id"
          required
          className="rounded-2xl border border-slate-300 px-4 py-3"
        >
          <option value="">Select service category for upload</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="image"
          accept="image/*"
          required
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <input
          name="caption"
          placeholder="Image caption optional"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <button
          type="submit"
          disabled={uploading}
          className="rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
        <label className="text-sm font-semibold text-slate-700">
          Filter by category
        </label>

        <select
          value={selectedFilter}
          onChange={(event) => setSelectedFilter(event.target.value)}
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

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {images.map((image) => (
          <div
            key={image.id}
            className="overflow-hidden rounded-3xl bg-white shadow-sm"
          >
            <img
              src={image.image_url}
              alt={image.caption || "Service image"}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <p className="font-bold text-slate-900">
                {image.service_categories?.title || "No category"}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {image.caption || "No caption"}
              </p>

              <button
                type="button"
                onClick={() => deleteImage(image)}
                className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {images.length === 0 && (
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-slate-500">No images found.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}