export default function ServiceCard({ service }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="text-4xl">{service.icon}</div>
      <h3 className="mt-4 text-xl font-bold">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {service.description}
      </p>
      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">Solution</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          {service.solution}
        </p>
      </div>
    </div>
  );
}