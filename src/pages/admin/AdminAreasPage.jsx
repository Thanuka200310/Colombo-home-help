import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase } from "../../lib/supabase";

export default function AdminAreasPage() {
  const [areas, setAreas] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAreas();
  }, []);

  async function loadAreas() {
    setLoading(true);

    const { data, error } = await supabase
      .from("service_areas")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      setStatus(error.message);
      setAreas([]);
    } else {
      setAreas(data || []);
    }

    setLoading(false);
  }

  async function addArea(event) {
    event.preventDefault();
    setStatus("");

    const formData = new FormData(event.target);
    const areaName = String(formData.get("area_name")).trim();
    const sortOrder = Number(formData.get("sort_order") || 0);

    if (!areaName) {
      setStatus("Please enter area name.");
      return;
    }

    const { error } = await supabase.from("service_areas").insert([
      {
        area_name: areaName,
        sort_order: sortOrder,
        is_active: true,
      },
    ]);

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus("Area added successfully.");
    event.target.reset();
    loadAreas();
  }

  async function deleteArea(id) {
    const confirmDelete = window.confirm("Delete this area?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("service_areas").delete().eq("id", id);

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus("Area deleted successfully.");
    loadAreas();
  }

  async function toggleArea(area) {
    const { error } = await supabase
      .from("service_areas")
      .update({ is_active: !area.is_active })
      .eq("id", area.id);

    if (error) {
      setStatus(error.message);
      return;
    }

    loadAreas();
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-slate-900">Areas We Cover</h1>

      <p className="mt-2 text-slate-500">
        Add, hide, or delete Colombo service areas shown on the public Contact page.
      </p>

      {status && (
        <p className="mt-5 rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm">
          {status}
        </p>
      )}

      <form
        onSubmit={addArea}
        className="mt-8 grid gap-4 rounded-3xl bg-white p-6 shadow-sm"
      >
        <input
          name="area_name"
          required
          placeholder="Area name, example: Colombo 13 - Kotahena"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <input
          type="number"
          name="sort_order"
          placeholder="Sort order"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <button className="rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white">
          Add Area
        </button>
      </form>

      {loading ? (
        <p className="mt-8 text-slate-600">Loading areas...</p>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {areas.map((area) => (
            <div
              key={area.id}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold text-slate-900">
                {area.area_name}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Sort order: {area.sort_order}
              </p>

              <p
                className={
                  area.is_active
                    ? "mt-2 text-sm font-semibold text-emerald-600"
                    : "mt-2 text-sm font-semibold text-red-600"
                }
              >
                {area.is_active ? "Showing on website" : "Hidden"}
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => toggleArea(area)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  {area.is_active ? "Hide" : "Show"}
                </button>

                <button
                  onClick={() => deleteArea(area.id)}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {areas.length === 0 && (
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-slate-500">No areas added yet.</p>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}