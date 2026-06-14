import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

export default function AdminProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      if (!isSupabaseConfigured || !supabase) {
        setAllowed(false);
        setChecking(false);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setAllowed(false);
        setChecking(false);
        return;
      }

      const { data } = await supabase
        .from("admins")
        .select("id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      setAllowed(Boolean(data));
      setChecking(false);
    }

    checkAdmin();
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-600">Checking admin access...</p>
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}