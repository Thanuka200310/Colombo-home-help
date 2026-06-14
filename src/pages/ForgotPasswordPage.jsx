import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState("");

  async function sendResetEmail(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = String(formData.get("email")).trim();

    const redirectTo = `${window.location.origin}${import.meta.env.BASE_URL}reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      setStatus(error.message);
    } else {
      setStatus("Password reset link sent. Please check your email.");
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-16">
      <div className="w-full rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Forgot Password</h1>

        <p className="mt-2 text-slate-500">
          Enter your email and we will send a password reset link.
        </p>

        {status && (
          <p className="mt-5 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
            {status}
          </p>
        )}

        <form onSubmit={sendResetEmail} className="mt-6 grid gap-4">
          <input
            type="email"
            name="email"
            required
            placeholder="Email address"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <button className="rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white">
            Send Reset Link
          </button>
        </form>
      </div>
    </section>
  );
}