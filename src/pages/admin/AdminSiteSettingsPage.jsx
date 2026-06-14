import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase } from "../../lib/supabase";

const emptySettings = {
  about_text: "",
  phone: "",
  email: "",
  address: "",
  whatsapp_number: "",
  working_hours: "",
};

export default function AdminSiteSettingsPage() {
  const [settings, setSettings] = useState(emptySettings);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", "main")
      .single();

    if (data) {
      setSettings(data);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setSettings((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function saveSettings(event) {
    event.preventDefault();
    setStatus("");

    const { error } = await supabase
      .from("site_settings")
      .upsert([
        {
          id: "main",
          about_text: settings.about_text,
          phone: settings.phone,
          email: settings.email,
          address: settings.address,
          whatsapp_number: settings.whatsapp_number,
          working_hours: settings.working_hours,
          updated_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      setStatus(error.message);
    } else {
      setStatus("Site settings updated.");
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-slate-900">Site Settings</h1>

      <p className="mt-2 text-slate-500">
        Update About Us and Contact details shown on the public website.
      </p>

      {status && (
        <p className="mt-5 rounded-2xl bg-white p-4 text-sm shadow-sm">
          {status}
        </p>
      )}

      <form
        onSubmit={saveSettings}
        className="mt-8 grid gap-4 rounded-3xl bg-white p-6 shadow-sm"
      >
        <textarea
          name="about_text"
          value={settings.about_text || ""}
          onChange={handleChange}
          rows={6}
          placeholder="About Us text"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <input
          name="phone"
          value={settings.phone || ""}
          onChange={handleChange}
          placeholder="Phone number"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <input
          name="email"
          value={settings.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <input
          name="address"
          value={settings.address || ""}
          onChange={handleChange}
          placeholder="Address"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <input
          name="whatsapp_number"
          value={settings.whatsapp_number || ""}
          onChange={handleChange}
          placeholder="WhatsApp number, example: 94761965333"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <input
          name="working_hours"
          value={settings.working_hours || ""}
          onChange={handleChange}
          placeholder="Working hours"
          className="rounded-2xl border border-slate-300 px-4 py-3"
        />

        <button className="rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white">
          Save Settings
        </button>
      </form>
    </AdminLayout>
  );
}