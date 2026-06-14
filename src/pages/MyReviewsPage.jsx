import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function loadMyReviews() {
      if (!isSupabaseConfigured || !supabase) {
        setStatus("Supabase is not connected.");
        setLoading(false);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (!session) {
        setStatus("Please login to view your reviews.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("reviews")
        .select("*, services(title, slug)")
        .eq("customer_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setStatus("Could not load your reviews.");
      } else {
        setReviews(data || []);
      }

      setLoading(false);
    }

    loadMyReviews();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/Colombo-home-help/login";
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Reviews</h1>
          <p className="mt-2 text-slate-500">
            View the reviews you submitted for Colombo Home Help services.
          </p>
        </div>

        {session && (
          <button
            onClick={handleLogout}
            className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white"
          >
            Logout
          </button>
        )}
      </div>

      {loading ? (
        <p className="mt-8 text-slate-600">Loading reviews...</p>
      ) : status ? (
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-slate-600">{status}</p>

          {!session && (
            <Link
              to="/login?redirect=/my-reviews"
              className="mt-5 inline-flex rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white"
            >
              Login / Register
            </Link>
          )}
        </div>
      ) : (
        <div className="mt-8 grid gap-5">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {review.services?.title || "Service"}
                  </h2>

                  <p className="mt-1 text-yellow-500">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </p>
                </div>

                <span
                  className={
                    review.is_approved
                      ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
                      : "rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700"
                  }
                >
                  {review.is_approved ? "Visible" : "Pending / Hidden"}
                </span>
              </div>

              <p className="mt-4 text-slate-600">{review.message}</p>

              <p className="mt-4 text-xs text-slate-400">
                Submitted on {new Date(review.created_at).toLocaleString()}
              </p>
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-slate-600">You have not submitted reviews yet.</p>
              <Link
                to="/services"
                className="mt-5 inline-flex rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white"
              >
                Browse Services
              </Link>
            </div>
          )}
        </div>
      )}
    </section>
  );
}