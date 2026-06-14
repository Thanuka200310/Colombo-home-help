import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

      <p className="mt-2 text-slate-500">
        Manage bookings, service categories, service images, reviews, and site
        details.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <Link
          to="/admin/bookings"
          className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">Bookings</h2>
          <p className="mt-2 text-sm text-slate-500">
            View, update, or delete customer bookings.
          </p>
        </Link>

        <Link
          to="/admin/service-categories"
          className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">Service Categories</h2>
          <p className="mt-2 text-sm text-slate-500">
            Add, edit, or delete service categories.
          </p>
        </Link>

        <Link
          to="/admin/service-images"
          className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">Service Images</h2>
          <p className="mt-2 text-sm text-slate-500">
            Upload and delete project images.
          </p>
        </Link>

        <Link
          to="/admin/reviews"
          className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">Review Approval</h2>
          <p className="mt-2 text-sm text-slate-500">
            Approve, hide, or remove reviews.
          </p>
        </Link>

        <Link
          to="/admin/site-settings"
          className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">Site Settings</h2>
          <p className="mt-2 text-sm text-slate-500">
            Update About and Contact details.
          </p>
        </Link>

        <Link
          to="/admin/users"
          className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <h2 className="text-xl font-bold">Admin Users</h2>
          <p className="mt-2 text-sm text-slate-500">
            Add or remove admin access.
          </p>
        </Link>
      </div>
    </AdminLayout>
  );
}