import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const fallbackReviews = [
  {
    id: "1",
    name: "Nimal Perera",
    rating: 5,
    message:
      "Very professional service. They responded quickly and fixed the issue properly.",
  },
  {
    id: "2",
    name: "Kasuni Silva",
    rating: 5,
    message:
      "Good communication and clean work. I booked a home repair service and everything was handled well.",
  },
  {
    id: "3",
    name: "Mohamed Rizwan",
    rating: 4,
    message:
      "Reliable team and easy to contact through WhatsApp. I would recommend them.",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      if (!isSupabaseConfigured || !supabase) return;

      setLoading(true);

      const { data, error } = await supabase
        .from("reviews")
        .select("id, name, rating, message, created_at, services(title)")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (!error && data?.length) {
        setReviews(data);
      }

      setLoading(false);
    }

    loadReviews();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900">
          Customer Reviews
        </h1>

        <p className="mt-3 text-slate-600">
          Real feedback from customers who used our home service support.
        </p>
      </div>

      {loading ? (
        <p className="mt-10 text-center text-slate-600">
          Loading reviews...
        </p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-yellow-500">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                “{review.message}”
              </p>

              <div className="mt-5">
                <p className="font-bold text-slate-900">{review.name}</p>

                {review.services?.title && (
                  <p className="mt-1 text-xs text-slate-500">
                    Service: {review.services.title}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          to="/about"
          className="rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white transition hover:bg-sky-800"
        >
          Back to About
        </Link>

        <Link
          to="/login?redirect=/add-review"
          className="rounded-2xl border border-sky-700 px-6 py-3 font-semibold text-sky-700 transition hover:bg-sky-50"
        >
          Add Your Review
        </Link>
      </div>
    </section>
  );
}