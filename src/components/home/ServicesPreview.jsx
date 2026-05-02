import { Link } from "react-router-dom";
import services from "../../data/services";
import SectionTitle from "../shared/SectionTitle";
import ServiceCard from "../shared/ServiceCard";

export default function ServicesPreview() {
  const previewServices = services.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <SectionTitle
        title="Our Popular Services"
        subtitle="We provide a wide range of professional house repair and maintenance solutions."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {previewServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/services"
          className="rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white"
        >
          See All Services
        </Link>
      </div>
    </section>
  );
}