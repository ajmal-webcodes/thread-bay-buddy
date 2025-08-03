import CosmeticCard from "./CosmeticCard";
import CosmeticsHero from "./CosmeticsHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types/store";
import { Sparkles, Palette, Droplets, Flower } from "lucide-react";

interface CosmeticsSectionProps {
  cosmeticProducts: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const CosmeticsSection = ({ cosmeticProducts, onAddToCart, onProductClick }: CosmeticsSectionProps) => {
  // Filter products by category
  const makeupProducts = cosmeticProducts.filter(p => p.category === "Makeup");
  const skincareProducts = cosmeticProducts.filter(p => p.category === "Skincare");
  const fragranceProducts = cosmeticProducts.filter(p => p.category === "Fragrance");

  return (
    <section className="py-16 bg-gradient-to-b from-background to-fashion-cream/20">
      <CosmeticsHero />
      
      <div className="container mx-auto px-4 mt-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-fashion-gold" />
            <Badge variant="secondary" className="bg-fashion-rose text-fashion-charcoal">
              Premium Beauty
            </Badge>
            <Sparkles className="h-6 w-6 text-fashion-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Beauty Collection</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform your beauty routine with our curated selection of luxury cosmetics, 
            advanced skincare, and captivating fragrances from leading beauty brands.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              All Beauty
            </TabsTrigger>
            <TabsTrigger value="makeup" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Makeup
            </TabsTrigger>
            <TabsTrigger value="skincare" className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              Skincare
            </TabsTrigger>
            <TabsTrigger value="fragrance" className="flex items-center gap-2">
              <Flower className="h-4 w-4" />
              Fragrance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cosmeticProducts.map((product) => (
                <CosmeticCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="makeup">
            {makeupProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {makeupProducts.map((product) => (
                  <CosmeticCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onProductClick={onProductClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Palette className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No makeup products available</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="skincare">
            {skincareProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {skincareProducts.map((product) => (
                  <CosmeticCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onProductClick={onProductClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Droplets className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No skincare products available</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="fragrance">
            {fragranceProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {fragranceProducts.map((product) => (
                  <CosmeticCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onProductClick={onProductClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Flower className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No fragrance products available</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button variant="cart" size="cart" className="text-lg">
            <Sparkles className="h-5 w-5 mr-2" />
            View All Beauty Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CosmeticsSection;