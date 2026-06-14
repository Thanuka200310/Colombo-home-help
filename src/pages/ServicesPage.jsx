import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import SectionTitle from "../components/shared/SectionTitle";
import ServiceCard from "../components/shared/ServiceCard";

const fallbackCategories = [
  {
    id: "1",
    slug: "home-maintenance-technical",
    title: "Home Maintenance & Technical",
    icon: "🛠️",
    short_description:
      "General repairs, HVAC, pest control, painting, and renovation services.",
  },
  {
    id: "2",
    slug: "cleaning-hygiene",
    title: "Cleaning & Hygiene",
    icon: "🧹",
    short_description:
      "Residential cleaning, upholstery care, and commercial janitorial services.",
  },
  {
    id: "3",
    slug: "security-safety",
    title: "Security & Safety",
    icon: "🔒",
    short_description:
      "Professional guarding, event security, and CCTV surveillance solutions.",
  },
  {
    id: "4",
    slug: "healthcare-caregiving",
    title: "Healthcare & Caregiving",
    icon: "🩺",
    short_description: "Elderly care, nursing care, and babysitting services.",
  },
  {
    id: "5",
    slug: "event-entertainment",
    title: "Event & Entertainment",
    icon: "🎉",
    short_description:
      "Event planning, entertainment, decor, ambience, and catering services.",
  },
  {
    id: "6",
    slug: "professional-services",
    title: "Professional Services",
    icon: "💼",
    short_description:
      "Business consulting, legal documentation, and financial advisory support.",
  },
  {
    id: "7",
    slug: "specialized-new-services",
    title: "Specialized / New Services",
    icon: "⭐",
    short_description:
      "Concierge, errands, mobile vehicle care, IT support, and landscaping.",
  },
];

export default function ServicesPage() {
  const [categories, setCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadCategories() {
      if (!isSupabaseConfigured || !supabase) {
        setCategories(fallbackCategories);
        return;
      }

      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("service_categories")
        .select(
          "id, slug, title, icon, short_description, description, sort_order, is_active"
        )
        .eq("is_active", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Service categories load error:", error);
        setErrorMessage(error.message);
        setCategories(fallbackCategories);
      } else if (data && data.length > 0) {
        setCategories(data);
      } else {
        setCategories(fallbackCategories);
      }

      setLoading(false);
    }

    loadCategories();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <SectionTitle
        title="All Service Categories"
        subtitle="Select a category to view the services and descriptions inside."
      />

      {errorMessage && (
        <p className="mb-6 rounded-2xl bg-yellow-100 px-4 py-3 text-sm text-yellow-800">
          {errorMessage}
        </p>
      )}

      {loading ? (
        <p className="text-center text-slate-600">Loading service categories...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <ServiceCard key={category.id} service={category} />
          ))}
        </div>
      )}
    </section>
  );
}