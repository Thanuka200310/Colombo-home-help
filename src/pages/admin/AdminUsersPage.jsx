import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase } from "../../lib/supabase";

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadAdmins();
  }, []);

  async function loadAdmins() {
    const { data } = await supabase
      .from("admins")
      .select("*")
      .order("created_at", { ascending: false });

    setAdmins(data || []);
  }

  async function addAdmin(event) {
    event.preventDefault();
    setStatus("");

    const formData = new FormData(event.target);

    const { error } = await supabase.rpc("promote_admin_by_email", {
      admin_email: formData.get("email"),
      admin_name: formData.get("name") || "Admin",
    });

    if (error) {
      setStatus(error.message);
    } else {
      setStatus("Admin added successfully.");
      event.target.reset();
      loadAdmins();
    }
  }

  async function removeAdmin(email) {
    const confirmRemove = window.confirm(`Remove admin access for ${email}?`);
    if (!confirmRemove) return;

    const { error } = await supabase.rpc("remove_admin_by_email", {
      admin_email: email,
    });

    if (error) {
      setStatus(error.message);
    } else {
      setStatus("Admin removed successfully.");
      loadAdmins();
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-slate-900">Admin Users</h1>

      <p className="mt-2 text-slate-500">
        Add or remove admin access. The user must already exist in Supabase
        Authentication Users.
      </p>

      {status && (
        <p className="mt-5 rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm">
          {status}
        </p>
      )}

      <form
        onSubmit={addAdmin}
        className="mt-8 grid gap-4 rounded-3xl bg-white p-6 shadow-sm"
      >
        <input
          name="name"
          placeholder="Admin name"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <input
          type="email"
          name="email"
          required
          placeholder="Admin email"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <button className="rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white">
          Add Admin Access
        </button>
      </form>

      <div className="mt-8 grid gap-4">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm"
          >
            <div>
              <p className="font-bold text-slate-900">
                {admin.name || "Admin"}
              </p>
              <p className="text-sm text-slate-500">{admin.email}</p>
            </div>

            <button
              onClick={() => removeAdmin(admin.email)}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Remove Admin
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}