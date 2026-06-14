import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoMark from "../../assets/doer-plus-logo-mark.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Booking", path: "/booking" },
];

const desktopLinkClass = ({ isActive }) =>
  isActive
    ? "text-sky-700 font-semibold"
    : "text-slate-700 hover:text-sky-700";

const mobileLinkClass = ({ isActive }) =>
  isActive
    ? "rounded-xl bg-sky-50 px-4 py-3 font-semibold text-sky-700"
    : "rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100 hover:text-sky-700";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <Link
          to="/"
          className="group flex items-center gap-3"
          onClick={closeMenu}
        >
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
            <span className="hidden text-xs text-slate-500 sm:block">
              Powered by Doer Plus Private Limited
            </span>
          </span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={desktopLinkClass}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/booking"
            className="hidden rounded-2xl bg-sky-700 px-4 py-2 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-sky-800 hover:shadow-lg sm:inline-flex"
          >
            Book Now
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label="Toggle navigation menu"
          >
            <span className="flex flex-col gap-1.5">
              <span
                className={`h-0.5 w-6 rounded bg-slate-800 transition ${
                  isOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-6 rounded bg-slate-800 transition ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-6 rounded bg-slate-800 transition ${
                  isOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 shadow-lg md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={mobileLinkClass}
                onClick={closeMenu}
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/booking"
              onClick={closeMenu}
              className="mt-2 rounded-xl bg-sky-700 px-4 py-3 text-center font-semibold text-white hover:bg-sky-800"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}