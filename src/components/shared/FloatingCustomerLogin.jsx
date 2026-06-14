import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

export default function FloatingCustomerLogin() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
    window.location.href = import.meta.env.BASE_URL;
  }

  if (session) {
    return (
      <button
        type="button"
        onClick={handleLogout}
        className="fixed bottom-5 left-5 z-[9999] rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-400 transition hover:scale-105"
      >
        Logout
      </button>
    );
  }

  return (
    <Link
      to="/login"
      className="fixed bottom-5 left-5 z-[9999] rounded-full bg-sky-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-300 transition hover:scale-105 hover:bg-sky-800"
    >
      Login / Register
    </Link>
  );
}