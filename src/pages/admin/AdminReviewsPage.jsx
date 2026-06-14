import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase } from "../../lib/supabase";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    setLoading(true);

    const { data } = await supabase
      .from("reviews")
      .select("*, service_categories(title), services(title)")
      .order("created_at", { ascending: false });

    setReviews(data || []);
    setLoading(false);
  }

  async function toggleApproval(review) {
    await supabase
      .from("reviews")
      .update({ is_approved: !review.is_approved })
      .eq("id", review.id);

    loadReviews();
  }

  async function deleteReview(id) {
    const confirmDelete = window.confirm("Delete this review?");
    if (!confirmDelete) return;

    await supabase.from("reviews").delete().eq("id", id);
    loadReviews();
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-slate-900">Review Approval</h1>

      <p className="mt-2 text-slate-500">
        Approve, hide, or delete customer reviews.
      </p>

      {loading ? (
        <p className="mt-8 text-slate-600">Loading reviews...</p>
      ) : (
        <div className="mt-8 grid gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-slate-900">{review.name}</p>

                  <p className="mt-1 text-yellow-500">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {review.service_categories?.title ||
                      review.services?.title ||
                      "General Review"}
                  </p>
                </div>

                <span
                  className={
                    review.is_approved
                      ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
                      : "rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700"
                  }
                >
                  {review.is_approved ? "Approved" : "Pending / Hidden"}
                </span>
              </div>

              <p className="mt-4 text-slate-600">{review.message}</p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => toggleApproval(review)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  {review.is_approved ? "Hide" : "Approve"}
                </button>

                <button
                  onClick={() => deleteReview(review.id)}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-slate-500">No reviews found.</p>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}