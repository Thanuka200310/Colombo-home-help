export default function FloatingWhatsApp() {
  const message = encodeURIComponent(
    "Hello Colombo Home Help, I need a service booking."
  );

  return (
    <a
      href={`https://wa.me/94761965333?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-pulse fixed bottom-5 right-5 z-50 rounded-full bg-green-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105"
    >
      WhatsApp Us
    </a>
  );
}