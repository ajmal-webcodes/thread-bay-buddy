import { useState } from "react";
import { cosmeticProducts } from "@/data/products";
import CosmeticCard from "@/components/store/CosmeticCard";
import CosmeticsHero from "@/components/store/CosmeticsHero";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import Cart from "@/components/store/Cart";
import ProductModal from "@/components/store/ProductModal";
import { CartItem, Product } from "@/types/store";

const Beauty = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState("All Beauty");
  const [wishlist, setWishlist] = useState<string[]>([]);

  const categories = ["All Beauty", "Makeup", "Skincare", "Fragrance"];

  const filteredProducts = activeCategory === "All Beauty" 
    ? cosmeticProducts 
    : cosmeticProducts.filter(product => product.category === activeCategory);

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

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const cartTotal = cart.reduce((total, item) => 
    total + (item.product.price * item.quantity), 0
  );

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={cartItemsCount} 
        onCartClick={() => setIsCartOpen(true)} 
        onProfileClick={() => {}}
      />
      
      <CosmeticsHero />
      
      <main className="container mx-auto px-4 py-16">
        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <CosmeticCard
              key={product.id}
              product={product}
              onAddToCart={() => setSelectedProduct(product)}
              onToggleWishlist={() => toggleWishlist(product.id)}
              isInWishlist={wishlist.includes(product.id)}
            />
          ))}
        </div>
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

export default Beauty;