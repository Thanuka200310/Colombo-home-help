import services from "../data/services";
import SectionTitle from "../components/shared/SectionTitle";
import ServiceCard from "../components/shared/ServiceCard";

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <SectionTitle
        title="All Services"
        subtitle="A full list of house repair and maintenance solutions for Colombo customers."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}