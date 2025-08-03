import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, ShoppingBag } from "lucide-react";
import cosmeticsHero from "@/assets/cosmetics-hero.jpg";

const CosmeticsHero = () => {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-fashion-rose">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cosmeticsHero})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-6 w-6 text-fashion-gold" />
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Beauty Collection
          </Badge>
          <Sparkles className="h-6 w-6 text-fashion-gold" />
        </div>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
          Beauty & Cosmetics
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Discover our curated collection of premium cosmetics, skincare, and beauty essentials 
          from the world's most luxurious brands.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="cart" 
            size="cart"
            className="text-lg bg-white text-black hover:bg-fashion-cream"
          >
            <Heart className="h-5 w-5 mr-2" />
            Shop Beauty
          </Button>
          <Button 
            variant="outline" 
            size="cart"
            className="text-lg bg-transparent border-white text-white hover:bg-white hover:text-black"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            New Arrivals
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CosmeticsHero;