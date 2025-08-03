import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  CreditCard,
  Truck,
  RotateCcw,
  Shield
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-fashion-charcoal text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">LUXE</h3>
            <p className="text-gray-300 leading-relaxed">
              Discover timeless elegance and contemporary fashion. We curate premium clothing 
              and accessories that define modern style and sophistication.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>123 Fashion Avenue, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-LUXE</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>hello@luxefashion.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock className="h-4 w-4" />
                <span>Mon-Sat: 9AM-8PM, Sun: 11AM-6PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                About Us
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                New Arrivals
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Best Sellers
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Sale
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Size Guide
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Style Blog
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Contact Us
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Shipping Info
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Returns & Exchanges
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                FAQ
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Track Your Order
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Connected</h4>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for exclusive offers and style updates.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded focus:outline-none focus:border-white/40 text-white placeholder-gray-400"
              />
              <Button variant="cart" size="sm">
                Subscribe
              </Button>
            </div>
            <div>
              <p className="text-sm text-gray-300 mb-3">Follow us</p>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-3 text-center lg:text-left">
            <div className="bg-white/10 p-2 rounded-full">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Free Shipping</p>
              <p className="text-xs text-gray-300">On orders over $100</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center lg:text-left">
            <div className="bg-white/10 p-2 rounded-full">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Easy Returns</p>
              <p className="text-xs text-gray-300">30-day return policy</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center lg:text-left">
            <div className="bg-white/10 p-2 rounded-full">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Secure Payment</p>
              <p className="text-xs text-gray-300">SSL encrypted checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center lg:text-left">
            <div className="bg-white/10 p-2 rounded-full">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Multiple Payment</p>
              <p className="text-xs text-gray-300">Various payment options</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-300">
            © 2024 LUXE Fashion. All rights reserved. | Terms of Service | Privacy Policy
          </div>
          <div className="flex items-center gap-4">
            <img src="/api/placeholder/40/24" alt="Visa" className="h-6 opacity-70" />
            <img src="/api/placeholder/40/24" alt="Mastercard" className="h-6 opacity-70" />
            <img src="/api/placeholder/40/24" alt="American Express" className="h-6 opacity-70" />
            <img src="/api/placeholder/40/24" alt="PayPal" className="h-6 opacity-70" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;