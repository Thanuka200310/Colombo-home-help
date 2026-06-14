import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

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

export default function ReviewsPreview() {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function loadReviews() {
      if (!isSupabaseConfigured || !supabase) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      const { data, error } = await supabase
        .from("reviews")
        .select("id, name, rating, message, created_at")
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (!error && data?.length) {
        setReviews(data);
      }
    }

    loadReviews();
  }, []);

  return (
    <section className="mt-16 mb-16 pb-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          What Our Customers Say
        </h2>

        <p className="mt-3 text-slate-600">
          Real feedback from customers who used our home service support.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
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

            <p className="mt-5 font-bold text-slate-900">{review.name}</p>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/reviews"
          className="rounded-2xl bg-sky-700 px-6 py-3 font-semibold text-white transition hover:bg-sky-800"
        >
          View All Reviews
        </Link>

        <Link
          to={session ? "/add-review" : "/login?redirect=/add-review"}
          className="rounded-2xl border border-sky-700 bg-white px-6 py-3 font-semibold text-sky-700 transition hover:bg-sky-50"
        >
          Add Your Review
        </Link>
      </div>
    </section>
  );
}