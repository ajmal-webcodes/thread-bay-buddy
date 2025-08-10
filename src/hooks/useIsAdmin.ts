import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export const useIsAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const check = async () => {
      if (!user) {
        if (active) {
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);
      if (active) {
        if (error) {
          console.error("Failed to fetch user roles", error);
          setIsAdmin(false);
        } else {
          setIsAdmin(!!data?.some((r: any) => r.role === "admin"));
        }
        setLoading(false);
      }
    };
    check();
    return () => {
      active = false;
    };
  }, [user?.id]);

  return { isAdmin, loading };
};
