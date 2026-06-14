import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (error) {
      setStatus("Invalid admin email or password.");
      return;
    }

    const { data: admin } = await supabase
      .from("admins")
      .select("id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (!admin) {
      await supabase.auth.signOut();
      setStatus("This account is not an admin.");
      return;
    }

    navigate("/admin/dashboard");
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold">Admin Login</h1>
        <p className="mt-2 text-slate-500">
          This login is only for website admin users.
        </p>

        {status && <p className="mt-4 rounded-2xl bg-red-100 p-4 text-sm text-red-700">{status}</p>}

        <form onSubmit={handleLogin} className="mt-6 grid gap-4">
          <input
            type="email"
            name="email"
            required
            placeholder="Admin email"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className="rounded-2xl border border-slate-300 px-4 py-3"
          />

          <button className="rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}