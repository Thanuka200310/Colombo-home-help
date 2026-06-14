import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ResetPasswordPage() {
  const [status, setStatus] = useState("");

  async function updatePassword(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const password = String(formData.get("password")).trim();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setStatus(error.message);
    } else {
      setStatus("Password updated successfully. You can login now.");
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-16">
      <div className="w-full rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Reset Password</h1>

        {status && (
          <p className="mt-5 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
            {status}
          </p>
        )}

        <form onSubmit={updatePassword} className="mt-6 grid gap-4">
          <input
            type="password"
            name="password"
            required
            minLength={6}
            placeholder="New password"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <button className="rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white">
            Update Password
          </button>
        </form>
      </div>
    </section>
  );
}