import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const fallbackAreas = [
  "Colombo 1 - Fort",
  "Colombo 2 - Slave Island",
  "Colombo 3 - Kollupitiya",
  "Colombo 4 - Bambalapitiya",
  "Colombo 5 - Havelock Town",
  "Colombo 6 - Wellawatte",
  "Colombo 7 - Cinnamon Gardens",
  "Colombo 8 - Borella",
  "Colombo 9 - Dematagoda",
  "Colombo 10 - Maradana",
  "Colombo 11 - Pettah",
  "Colombo 12 - Hulftsdorp",
];

export default function ContactPage() {
  const [areas, setAreas] = useState(fallbackAreas);

  useEffect(() => {
    async function loadAreas() {
      if (!isSupabaseConfigured || !supabase) return;

      const { data, error } = await supabase
        .from("service_areas")
        .select("area_name")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (!error && data?.length) {
        setAreas(data.map((item) => item.area_name));
      }
    }

    loadAreas();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>

          <div className="mt-8 grid gap-5 text-slate-700">
            <p>
              <strong>Phone:</strong> +94 76 196 5333
            </p>

            <p>
              <strong>WhatsApp:</strong> +94 76 196 5333
            </p>

            <p>
              <strong>Email:</strong> support@colombohomehelp.lk
            </p>

            <p>
              <strong>Location:</strong> Colombo, Sri Lanka
            </p>

            <p>
              <strong>Working Hours:</strong> 8:00 AM - 8:00 PM
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900">Areas We Cover</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {areas.map((area) => (
              <div
                key={area}
                className="rounded-2xl bg-slate-50 px-5 py-4 text-slate-900"
              >
                {area}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}