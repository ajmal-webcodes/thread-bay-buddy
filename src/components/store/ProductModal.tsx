import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/types/store";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

const ProductModal = ({ product, isOpen, onClose, onAddToCart }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    onAddToCart(product, selectedSize, selectedColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="absolute inset-4 md:inset-8 lg:inset-16 bg-background rounded-lg shadow-2xl overflow-hidden">
        <div className="h-full flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/2 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
            {product.isOnSale && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                Sale
              </Badge>
            )}
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-muted-foreground text-sm uppercase tracking-wide">
                  {product.category}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  {product.isOnSale && product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className={`text-2xl font-bold ${product.isOnSale ? 'text-accent' : 'text-foreground'}`}>
                    ${product.price}
                  </span>
                </div>
              </div>
              
              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              {/* Size Selection */}
              <div>
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className="h-10 w-12"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Color Selection */}
              <div>
                <h3 className="font-semibold mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                      className="capitalize"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Stock Info */}
              <div className="text-sm text-muted-foreground">
                {product.stock > 0 ? (
                  <span className="text-green-600">✓ In Stock ({product.stock} remaining)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
              
              {/* Actions */}
              <div className="space-y-3">
                <Button
                  variant="cart"
                  size="cart"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor || product.stock === 0}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="wishlist"
                  size="cart"
                  className="w-full"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;