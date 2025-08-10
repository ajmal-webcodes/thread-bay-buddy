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
      const { data: hasAdmin, error } = await supabase
        .rpc('has_role', { _user_id: user.id, _role: 'admin' });
      if (active) {
        if (error) {
          console.error("Failed to check admin role", error);
          setIsAdmin(false);
        } else {
          setIsAdmin(!!hasAdmin);
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
