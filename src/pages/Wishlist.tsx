import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import ProductCard from "@/components/store/ProductCard";
import CosmeticCard from "@/components/store/CosmeticCard";
import Cart from "@/components/store/Cart";
import ProductModal from "@/components/store/ProductModal";
import { products, cosmeticProducts } from "@/data/products";
import { CartItem, Product } from "@/types/store";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const [user, setUser] = useState<User | null>(null);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const allProducts = [...products, ...cosmeticProducts];
  const wishlistProducts = allProducts.filter(product => 
    wishlistItems.includes(product.id)
  );

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      await loadWishlist(session.user.id);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await loadWishlist(session.user.id);
        } else {
          setUser(null);
          navigate("/auth");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadWishlist = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id')
        .eq('user_id', userId);

      if (error) {
        console.error('Error loading wishlist:', error);
        toast({
          title: "Error",
          description: "Failed to load wishlist",
          variant: "destructive",
        });
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
      navigate("/auth");
      return;
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
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      });
    }
  };

  const addToCart = (product: Product, size: string, color: string) => {
    const existingItem = cart.find(
      item => item.product.id === product.id && 
               item.selectedSize === size && 
               item.selectedColor === color
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item === existingItem 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1, selectedSize: size, selectedColor: color }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.product.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.product.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const cartTotal = cart.reduce((total, item) => 
    total + (item.product.price * item.quantity), 0
  );

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          cartItemsCount={cartItemsCount} 
          onCartClick={() => setIsCartOpen(true)} 
          onProfileClick={() => {}}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>Loading your wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={cartItemsCount} 
        onCartClick={() => setIsCartOpen(true)} 
        onProfileClick={() => {}}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">My Wishlist</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Your curated collection of favorite items
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-6">
              Start adding items to your wishlist by clicking the heart icon on products you love
            </p>
            <button 
              onClick={() => navigate("/")}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => {
              const isCosmetic = cosmeticProducts.some(p => p.id === product.id);
              
              if (isCosmetic) {
                return (
                  <div key={product.id} className="space-y-3">
                    <CosmeticCard
                      product={product}
                      onAddToCart={() => setSelectedProduct(product)}
                      onToggleWishlist={() => toggleWishlist(product.id)}
                      isInWishlist={true}
                    />
                    <div className="flex gap-2">
                      <Button variant="cart" size="sm" onClick={() => setSelectedProduct(product)}>
                        Buy Now
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => toggleWishlist(product.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              }
              
              return (
                <div key={product.id} className="space-y-3">
                  <ProductCard
                    product={product}
                    onAddToCart={() => setSelectedProduct(product)}
                    onToggleWishlist={() => toggleWishlist(product.id)}
                    isInWishlist={true}
                  />
                  <div className="flex gap-2">
                    <Button variant="cart" size="sm" onClick={() => setSelectedProduct(product)}>
                      Buy Now
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toggleWishlist(product.id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        total={cartTotal}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
};

export default Wishlist;