import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/store/ProductCard";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import Cart from "@/components/store/Cart";
import ProductModal from "@/components/store/ProductModal";
import { CartItem, Product } from "@/types/store";

const Accessories = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const accessoryProducts = products.filter(product => 
    product.category === "Accessories"
  );

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
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Accessories Collection</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Complete your look with our exquisite selection of luxury accessories and statement pieces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {accessoryProducts.map((product) => (
            <ProductCard
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

export default Accessories;