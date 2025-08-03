import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/store/Header";
import Hero from "@/components/store/Hero";
import ProductGrid from "@/components/store/ProductGrid";
import Cart from "@/components/store/Cart";
import ProductModal from "@/components/store/ProductModal";
import ProfileModal from "@/components/store/ProfileModal";
import Footer from "@/components/store/Footer";
import CosmeticsSection from "@/components/store/CosmeticsSection";
import { products, cosmeticProducts } from "@/data/products";
import { Product, CartItem } from "@/types/store";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { toast } = useToast();

  const addToCart = (product: Product, size?: string, color?: string) => {
    const selectedSize = size || product.sizes[0];
    const selectedColor = color || product.colors[0];
    
    const existingItemIndex = cartItems.findIndex(
      item => 
        item.product.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
    );

    if (existingItemIndex > -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      const newItem: CartItem = {
        product,
        quantity: 1,
        selectedSize,
        selectedColor
      };
      setCartItems([...cartItems, newItem]);
    }

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(items =>
      items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(items => items.filter(item => item.product.id !== productId));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleModalAddToCart = (product: Product, size: string, color: string) => {
    addToCart(product, size, color);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartItemsCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={cartItemsCount} 
        onCartClick={() => setIsCartOpen(true)}
        onProfileClick={() => setIsProfileModalOpen(true)}
      />
      
      <main>
        <Hero />
        <ProductGrid 
          products={products}
          onAddToCart={(product) => addToCart(product)}
          onProductClick={handleProductClick}
        />
        <CosmeticsSection
          cosmeticProducts={cosmeticProducts}
          onAddToCart={(product) => addToCart(product)}
          onProductClick={handleProductClick}
        />
        <Footer />
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        total={cartTotal}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleModalAddToCart}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};

export default Index;