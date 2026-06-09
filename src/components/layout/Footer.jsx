import logoFull from "../../assets/doer-plus-logo-full.png";

export default function Footer() {
  return (
    <footer className="bg-slate-950 px-6 py-10 text-slate-300 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div className="reveal">
          <div className="flex h-24 w-40 items-center justify-center overflow-hidden rounded-2xl bg-black p-3 shadow-lg">
            <img
              src={logoFull}
              alt="Doer Plus Private Limited logo"
              className="h-full w-full object-contain"
            />
          </div>

          <p className="mt-4 text-lg font-bold text-white">
            Colombo Home Help
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Trusted repair and maintenance solutions for homes and apartments in Colombo.
          </p>
        </div>

        <div className="reveal reveal-delay-1">
          <p className="font-semibold text-white">Services</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>Plumbing</li>
            <li>Electrical Repairs</li>
            <li>Cleaning</li>
            <li>Pest Control</li>
            <li>Handyman Services</li>
          </ul>
        </div>

        <div className="reveal reveal-delay-2">
          <p className="font-semibold text-white">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>Phone: +94 77 123 4567</li>
            <li>Email: support@colombohomehelp.lk</li>
            <li>Colombo, Sri Lanka</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-slate-800 pt-5 text-sm text-slate-500">
        © 2026 Colombo Home Help. All rights reserved.
      </div>
    </footer>
  );
}