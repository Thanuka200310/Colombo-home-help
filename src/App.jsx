import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/shared/FloatingWhatsApp";
import FloatingCustomerLogin from "./components/shared/FloatingCustomerLogin";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import useScrollReveal from "./hooks/useScrollReveal";

import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import ReviewsPage from "./pages/ReviewsPage";
import AddReviewPage from "./pages/AddReviewPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminBookingsPage from "./pages/admin/AdminBookingsPage";
import AdminServiceImagesPage from "./pages/admin/AdminServiceImagesPage";
import AdminServiceCategoriesPage from "./pages/admin/AdminServiceCategoriesPage";
import AdminReviewsPage from "./pages/admin/AdminReviewsPage";
import AdminAreasPage from "./pages/admin/AdminAreasPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminSiteSettingsPage from "./pages/admin/AdminSiteSettingsPage";
import AdminServicesPage from "./pages/admin/AdminServicesPage";

export default function App() {
  useScrollReveal();

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/add-review" element={<AddReviewPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <AdminProtectedRoute>
              <AdminBookingsPage />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/service-images"
          element={
            <AdminProtectedRoute>
              <AdminServiceImagesPage />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/service-categories"
          element={
            <AdminProtectedRoute>
              <AdminServiceCategoriesPage />
            </AdminProtectedRoute>
          }
        />

        <Route
  path="/admin/services"
  element={
    <AdminProtectedRoute>
      <AdminServicesPage />
    </AdminProtectedRoute>
  }
/>

        <Route
          path="/admin/reviews"
          element={
            <AdminProtectedRoute>
              <AdminReviewsPage />
            </AdminProtectedRoute>
          }
        />
        <Route
  path="/admin/areas"
  element={
    <AdminProtectedRoute>
      <AdminAreasPage />
    </AdminProtectedRoute>
  }
/>

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <AdminUsersPage />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/site-settings"
          element={
            <AdminProtectedRoute>
              <AdminSiteSettingsPage />
            </AdminProtectedRoute>
          }
        />
      </Routes>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingCustomerLogin />}
      {!isAdminRoute && <FloatingWhatsApp />}
    </div>
  );
}