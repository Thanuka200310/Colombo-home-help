import { Link, NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const navClass = ({ isActive }) =>
  isActive
    ? "rounded-2xl bg-sky-700 px-4 py-3 font-semibold text-white"
    : "rounded-2xl px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 hidden h-full w-72 border-r border-slate-200 bg-white p-6 md:block">
        <Link to="/admin/dashboard">
          <h2 className="text-2xl font-bold text-slate-900">Admin Panel</h2>
          <p className="mt-1 text-sm text-slate-500">Colombo Home Help</p>
        </Link>

        <nav className="mt-8 grid gap-2">
          <NavLink to="/admin/dashboard" className={navClass}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/bookings" className={navClass}>
            Bookings
          </NavLink>

          <NavLink to="/admin/service-categories" className={navClass}>
            Service Categories
          </NavLink>

          <NavLink to="/admin/services" className={navClass}>
  Services
</NavLink>

          <NavLink to="/admin/service-images" className={navClass}>
            Service Images
          </NavLink>

          <NavLink to="/admin/reviews" className={navClass}>
            Review Approval
          </NavLink>

          <NavLink to="/admin/areas" className={navClass}>
  Areas
</NavLink>

          <NavLink to="/admin/site-settings" className={navClass}>
            Site Settings
          </NavLink>

          <NavLink to="/admin/users" className={navClass}>
            Admin Users
          </NavLink>
        </nav>

        <button
          onClick={logout}
          className="mt-8 w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white"
        >
          Logout
        </button>
      </aside>

      <main className="md:ml-72">
        <div className="border-b border-slate-200 bg-white p-4 md:hidden">
          <div className="flex gap-4 overflow-x-auto text-sm font-semibold">
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/bookings">Bookings</Link>
            <Link to="/admin/service-categories">Categories</Link>
            <Link to="/admin/service-images">Images</Link>
            <Link to="/admin/reviews">Reviews</Link>
            <Link to="/admin/site-settings">Settings</Link>
            <Link to="/admin/users">Admins</Link>
            <Link to="/admin/areas">Areas</Link>
            <button onClick={logout}>Logout</button>
          </div>
        </div>

        <div className="p-6 lg:p-10">{children}</div>
      </main>
    </div>
  );
}