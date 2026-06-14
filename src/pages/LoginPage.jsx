import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirect = searchParams.get("redirect") || "/";

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");
    setLoading(true);

    if (!isSupabaseConfigured || !supabase) {
      setStatus("Supabase is not connected.");
      setLoading(false);
      return;
    }

    const formData = new FormData(event.target);
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password")).trim();

    if (mode === "register") {
      const fullName = String(formData.get("full_name")).trim();
      const phone = String(formData.get("phone")).trim();

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setStatus(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        await supabase.from("customers").upsert([
          {
            id: data.user.id,
            full_name: fullName,
            email,
            phone,
          },
        ]);
      }

      setStatus("Account created. Please login now.");
      setMode("login");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus(error.message);
      setLoading(false);
      return;
    }

    const { data: adminData } = await supabase
      .from("admins")
      .select("id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (adminData) {
      navigate("/admin/dashboard");
      setLoading(false);
      return;
    }

    navigate(redirect);
    setLoading(false);
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-16">
      <div className="w-full rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          {mode === "login" ? "Login" : "Customer Register"}
        </h1>

        <p className="mt-2 text-slate-500">
          Customers can login for reviews. Admin users will automatically go to
          the admin dashboard.
        </p>

        {status && (
          <p className="mt-5 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
            {status}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          {mode === "register" && (
            <>
              <input
                name="full_name"
                required
                placeholder="Full name"
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-700"
              />

              <input
                name="phone"
                placeholder="Phone number"
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-700"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            required
            placeholder="Email address"
            className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-700"
          />

          <input
            type="password"
            name="password"
            required
            minLength={6}
            placeholder="Password"
            className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-700"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-sky-700 px-5 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <button
          onClick={() => {
            setStatus("");
            setMode(mode === "login" ? "register" : "login");
          }}
          className="mt-5 text-sm font-semibold text-sky-700"
        >
            <a
  href={`${import.meta.env.BASE_URL}forgot-password`}
  className="mt-3 inline-block text-sm font-semibold text-sky-700"
>
  Forgot password?
</a>
          {mode === "login"
            ? "No customer account? Register here"
            : "Already have account? Login here"}
        </button>
      </div>
    </section>
  );
}