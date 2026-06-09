import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/shared/FloatingWhatsApp";
import useScrollReveal from "./hooks/useScrollReveal";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";

export default function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/services/:serviceSlug" element={<ServiceDetailsPage />} />
      </Routes>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}