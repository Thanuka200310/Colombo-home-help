import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import SectionTitle from "../shared/SectionTitle";
import ServiceCard from "../shared/ServiceCard";

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
];

export default function ServicesPreview() {
  const [services, setServices] = useState(fallbackCategories);

  useEffect(() => {
    async function loadServices() {
      if (!isSupabaseConfigured || !supabase) return;

      const { data, error } = await supabase
        .from("services")
        .select("id, slug, title, icon, short_description, image_url")
        .eq("is_active", true)
        .eq("is_main", true)
        .order("sort_order", { ascending: true })
        .limit(6);

      if (!error && data?.length) {
        setServices(data);
      }
    }

    loadServices();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
      <SectionTitle
        title="Our Popular Services"
        subtitle="Choose a service category and view the services available inside."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/services"
          className="rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white"
        >
          See All Categories
        </Link>
      </div>
    </section>
  );
}