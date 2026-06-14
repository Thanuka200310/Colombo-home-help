import ReviewsPreview from "../components/shared/ReviewsPreview";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold md:text-4xl">About Us</h1>
        <p className="mt-5 leading-7 text-slate-600">
          Colombo Home Help is a professional home services business focused on
          helping residents solve common house problems quickly and reliably.
        </p>
        <p className="mt-4 leading-7 text-slate-600">
          We provide support for plumbing, electrical repairs, roof issues,
          cleaning, pest control, handyman tasks, AC work, and outdoor care.
        </p>
        <p className="mt-4 leading-7 text-slate-600">
          Our goal is to make home maintenance easier by offering a clear and
          simple booking process with practical solutions for every type of house issue.
        </p>
      </div>
      <ReviewsPreview />
    </section>
  );
}