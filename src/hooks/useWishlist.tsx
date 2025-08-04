import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadWishlist();
    } else {
      setWishlistItems([]);
      setLoading(false);
    }
  }, [user]);

  const loadWishlist = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading wishlist:', error);
      } else {
        setWishlistItems(data.map(item => item.product_id));
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (productId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to manage your wishlist",
        variant: "destructive",
      });
      return false;
    }

    try {
      const isInWishlist = wishlistItems.includes(productId);
      
      if (isInWishlist) {
        const { error } = await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (error) throw error;
        
        setWishlistItems(prev => prev.filter(id => id !== productId));
        toast({
          title: "Removed from wishlist",
          description: "Item has been removed from your wishlist",
        });
      } else {
        const { error } = await supabase
          .from('wishlist')
          .insert([{ user_id: user.id, product_id: productId }]);

        if (error) throw error;
        
        setWishlistItems(prev => [...prev, productId]);
        toast({
          title: "Added to wishlist",
          description: "Item has been added to your wishlist",
        });
      }
      return true;
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      });
      return false;
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.includes(productId);
  };

  return {
    wishlistItems,
    loading,
    toggleWishlist,
    isInWishlist,
  };
};