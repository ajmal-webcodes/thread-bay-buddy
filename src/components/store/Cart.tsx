import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Minus, ShoppingBag, MapPin, Edit } from "lucide-react";
import { CartItem } from "@/types/store";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  total: number;
}

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, total }: CartProps) => {
  const { user } = useAuth();
  const [userAddress, setUserAddress] = useState<string>("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Load user address when cart opens
  useEffect(() => {
    if (isOpen && user) {
      loadUserAddress();
    }
  }, [isOpen, user]);

  const loadUserAddress = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('address_line1, address_line2, city, state, pincode, country')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading address:', error);
        return;
      }

      if (data) {
        const addressParts = [
          data.address_line1,
          data.address_line2,
          data.city,
          data.state,
          data.pincode,
          data.country
        ].filter(Boolean);
        
        setUserAddress(addressParts.join(', ') || "No address saved");
      } else {
        setUserAddress("No address saved");
      }
    } catch (error) {
      console.error('Error loading address:', error);
      setUserAddress("No address saved");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Shopping Cart
              {items.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {items.length}
                </Badge>
              )}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <Button variant="outline" className="mt-4" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-medium text-sm">{item.product.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Size: {item.selectedSize}</span>
                        <span>•</span>
                        <span>Color: {item.selectedColor}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-destructive"
                            onClick={() => onRemoveItem(item.product.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-6 space-y-4">
              {/* Delivery Address Section */}
              {user && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Delivery Address
                    </h4>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsEditingAddress(true)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      {userAddress === "No address saved" ? "Add" : "Change"}
                    </Button>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {userAddress}
                    </p>
                  </div>
                  {userAddress === "No address saved" && (
                    <p className="text-xs text-destructive">
                      Please add your address in profile to proceed with checkout
                    </p>
                  )}
                </div>
              )}
              
              <Separator />
              
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button 
                variant="cart" 
                size="cart" 
                className="w-full"
                disabled={!user || userAddress === "No address saved"}
              >
                {!user ? "Login to Checkout" : userAddress === "No address saved" ? "Add Address to Checkout" : "Proceed to Checkout"}
              </Button>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          )}

          {/* Address Edit Modal Trigger */}
          {isEditingAddress && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Update Address</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  To update your delivery address, please go to your profile settings.
                </p>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditingAddress(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="cart"
                    onClick={() => {
                      setIsEditingAddress(false);
                      // This would open the profile modal in a real implementation
                      // For now, we'll just refresh the address
                      loadUserAddress();
                    }}
                    className="flex-1"
                  >
                    Go to Profile
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;