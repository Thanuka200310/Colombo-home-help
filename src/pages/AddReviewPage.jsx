import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export default function AddReviewPage() {
  const [session, setSession] = useState(null);
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPage() {
      if (!isSupabaseConfigured || !supabase) {
        setStatus("Supabase is not connected.");
        setLoading(false);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      const { data } = await supabase
        .from("services")
        .select("id, title")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      setServices(data || []);
      setLoading(false);
    }

    loadPage();
  }, []);

async function submitReview(event) {
  event.preventDefault();
  setStatus("");

  if (!session) {
    setStatus("Please login to add a review.");
    return;
  }

  const formData = new FormData(event.target);
  const name = String(formData.get("name")).trim();
  const categoryId = formData.get("category_id") || null;
  const rating = Number(formData.get("rating"));
  const message = String(formData.get("message")).trim();

  const { error: customerError } = await supabase.from("customers").upsert([
    {
      id: session.user.id,
      full_name: name,
      email: session.user.email,
    },
  ]);

  if (customerError) {
    setStatus(customerError.message);
    return;
  }

 const { error } = await supabase.from("reviews").insert([
  {
    customer_id: session.user.id,
    category_id: categoryId,
    name,
    rating,
    message,
    is_approved: false,
  },
]);

  if (error) {
    setStatus(error.message);
    return;
  }

  setStatus("Thank you! Your review was submitted and is waiting for admin approval.");
  event.target.reset();
}

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        <p className="text-slate-600">Loading...</p>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Login Required
          </h1>
          <p className="mt-3 text-slate-600">
            Please login or register to add a customer review.
          </p>

          <Link
            to="/login?redirect=/add-review"
            className="mt-6 inline-flex rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white"
          >
            Login / Register
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Add Review</h1>
        <p className="mt-3 text-slate-600">
          Share your experience with Colombo Home Help.
        </p>

        {status && (
          <p className="mt-5 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
            {status}
          </p>
        )}

        <form onSubmit={submitReview} className="mt-6 grid gap-4">
          <input
            name="name"
            required
            placeholder="Your name"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <select
            name="service_id"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          >
            <option value="">Select service optional</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>

          <select
            name="rating"
            required
            className="rounded-2xl border border-slate-300 px-4 py-3"
          >
            <option value="">Star rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <textarea
            name="message"
            required
            rows={5}
            placeholder="Write your review"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <button className="rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white">
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
}