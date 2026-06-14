import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { supabase } from "../../lib/supabase";

const statuses = ["new", "contacted", "confirmed", "completed", "cancelled"];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setBookings(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function updateStatus(id, status) {
    await supabase.from("bookings").update({ status }).eq("id", id);
    loadBookings();
  }

  async function deleteBooking(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadBookings();
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-slate-900">Bookings</h1>

      <p className="mt-2 text-slate-500">
        View, update status, or delete customer booking requests.
      </p>

      {loading ? (
        <p className="mt-8 text-slate-600">Loading bookings...</p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Service</th>
                  <th className="px-5 py-4">Area</th>
                  <th className="px-5 py-4">Description</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-slate-100">
                    <td className="px-5 py-4 align-top">
                      <p className="font-semibold">{booking.customer_name}</p>
                      <p className="text-slate-500">{booking.phone}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {new Date(booking.created_at).toLocaleString()}
                      </p>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <p>{booking.category_name || booking.service_name}</p>
                    </td>

                    <td className="px-5 py-4 align-top">{booking.area}</td>

                    <td className="max-w-xs px-5 py-4 align-top text-slate-600">
                      {booking.description}
                    </td>

                    <td className="px-5 py-4 align-top">
                      <select
                        value={booking.status}
                        onChange={(event) =>
                          updateStatus(booking.id, event.target.value)
                        }
                        className="rounded-xl border border-slate-300 px-3 py-2"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {bookings.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-5 py-8 text-center text-slate-500"
                    >
                      No bookings yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}