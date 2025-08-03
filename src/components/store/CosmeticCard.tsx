import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Star, Sparkles } from "lucide-react";
import { Product } from "@/types/store";

interface CosmeticCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const CosmeticCard = ({ product, onAddToCart, onProductClick }: CosmeticCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate random rating for cosmetic products
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 500 + 50);

  return (
    <div className="group cursor-pointer" onClick={() => onProductClick(product)}>
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-fashion-cream to-white p-4">
        {/* Product Image */}
        <div className="aspect-square relative">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 rounded-lg ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
          )}
          
          {/* Sale Badge */}
          {product.isOnSale && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
              <Sparkles className="h-3 w-3 mr-1" />
              Sale
            </Badge>
          )}
          
          {/* Best Seller Badge */}
          {Math.random() > 0.7 && (
            <Badge className="absolute top-3 right-3 bg-fashion-gold text-black">
              ⭐ Best Seller
            </Badge>
          )}
          
          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-3 right-3 bg-white/90 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
          >
            <Heart 
              className={`h-4 w-4 ${isWishlisted ? 'fill-accent text-accent' : 'text-foreground'}`} 
            />
          </Button>
          
          {/* Quick Add Button */}
          <Button
            variant="cart"
            size="sm"
            className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <ShoppingBag className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-1 text-sm text-fashion-gold">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-3 w-3 ${i < Math.floor(parseFloat(rating)) ? 'fill-current' : 'fill-gray-200'}`} 
            />
          ))}
          <span className="text-muted-foreground ml-1">
            {rating} ({reviewCount})
          </span>
        </div>
        
        <h3 className="font-medium text-sm group-hover:text-accent transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {product.category}
        </p>
        
        <div className="flex items-center gap-2">
          {product.isOnSale && product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
          <span className={`font-semibold ${product.isOnSale ? 'text-accent' : 'text-foreground'}`}>
            ${product.price}
          </span>
        </div>
        
        {/* Shade/Variant indicator for cosmetics */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">Available in {product.colors.length} shades</span>
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div 
                key={index}
                className="h-3 w-3 rounded-full border border-border"
                style={{ 
                  backgroundColor: color.toLowerCase() === 'nude' ? '#D4A574' : 
                                  color.toLowerCase() === 'pink' ? '#FFB6C1' :
                                  color.toLowerCase() === 'red' ? '#DC143C' :
                                  color.toLowerCase() === 'brown' ? '#8B4513' :
                                  color.toLowerCase() === 'gold' ? '#FFD700' :
                                  color.toLowerCase() === 'black' ? '#000000' :
                                  color.toLowerCase() === 'white' ? '#FFFFFF' :
                                  '#D1D5DB'
                }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CosmeticCard;