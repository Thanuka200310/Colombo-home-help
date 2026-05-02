import { Link, NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  isActive
    ? "text-sky-700 font-semibold"
    : "text-slate-700 hover:text-sky-700";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="flex flex-col">
          <span className="text-xl font-bold text-slate-900">Colombo Home Help</span>
          <span className="text-xs text-slate-500">Professional Home Services</span>
        </Link>

        <nav className="hidden gap-6 md:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/services" className={linkClass}>
            Services
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
          <NavLink to="/booking" className={linkClass}>
            Booking
          </NavLink>
        </nav>

        <Link
          to="/booking"
          className="rounded-2xl bg-sky-700 px-4 py-2 font-semibold text-white transition hover:bg-sky-800"
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}