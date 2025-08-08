import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Search, Heart, Menu, User, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onProfileClick: () => void;
}

const Header = ({ cartItemsCount, onCartClick, onProfileClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleWishlistClick = () => {
    if (user) {
      navigate('/wishlist');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            {location.pathname !== '/' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <h1 className="text-2xl font-bold tracking-tight">VELVERRA</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/women" className="text-sm font-medium hover:text-accent transition-colors">
              Women
            </Link>
            <Link to="/men" className="text-sm font-medium hover:text-accent transition-colors">
              Men
            </Link>
            <Link to="/accessories" className="text-sm font-medium hover:text-accent transition-colors">
              Accessories
            </Link>
            <Link to="/beauty" className="text-sm font-medium hover:text-accent transition-colors">
              Beauty
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onProfileClick}>
              <User className="h-5 w-5" />
            </Button>
            {user && (
              <Button variant="ghost" size="icon" onClick={handleWishlistClick}>
                <Heart className="h-5 w-5" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-4 pt-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/women" className="text-sm font-medium hover:text-accent transition-colors">
                Women
              </Link>
              <Link to="/men" className="text-sm font-medium hover:text-accent transition-colors">
                Men
              </Link>
              <Link to="/accessories" className="text-sm font-medium hover:text-accent transition-colors">
                Accessories
              </Link>
              <Link to="/beauty" className="text-sm font-medium hover:text-accent transition-colors">
                Beauty
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;