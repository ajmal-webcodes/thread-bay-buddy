import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-fashion.jpg";

const Hero = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
          New Collection
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Discover our latest arrivals featuring premium quality clothing and accessories 
          that define modern elegance and style.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="shop" 
            size="cart"
            className="text-lg"
          >
            Shop Women
          </Button>
          <Button 
            variant="outline" 
            size="cart"
            className="text-lg bg-transparent border-white text-white hover:bg-white hover:text-black"
          >
            Shop Men
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;