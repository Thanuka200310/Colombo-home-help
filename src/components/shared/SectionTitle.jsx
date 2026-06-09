export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="reveal mb-10 text-center">
      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-slate-600">{subtitle}</p>
    </div>
  );
}