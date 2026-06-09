import { Link, NavLink } from "react-router-dom";
import logoMark from "../../assets/doer-plus-logo-mark.png";

const linkClass = ({ isActive }) =>
  isActive
    ? "text-sky-700 font-semibold"
    : "text-slate-700 hover:text-sky-700";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <span className="flex h-14 w-16 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 p-2 shadow-sm transition duration-300 group-hover:scale-105">
            <img
              src={logoMark}
              alt="Doer Plus Private Limited logo"
              className="h-full w-full object-contain"
            />
          </span>

          <span className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-slate-900">
              Colombo Home Help
            </span>
            <span className="text-xs text-slate-500">
              Powered by Doer Plus Private Limited
            </span>
          </span>
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
          className="rounded-2xl bg-sky-700 px-4 py-2 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-sky-800 hover:shadow-lg"
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}