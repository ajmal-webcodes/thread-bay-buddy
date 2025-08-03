import { Product } from "@/types/store";
import womensCollection from "@/assets/womens-collection.jpg";
import mensCollection from "@/assets/mens-collection.jpg";
import accessoriesCollection from "@/assets/accessories-collection.jpg";
import cosmeticsCollection from "@/assets/cosmetics-collection.jpg";
import skincareProducts from "@/assets/skincare-products.jpg";
import makeupCollection from "@/assets/makeup-collection.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Elegant Silk Dress",
    price: 299.99,
    originalPrice: 399.99,
    category: "Women's Clothing",
    image: womensCollection,
    description: "A stunning silk dress perfect for special occasions. Features a flowing silhouette and premium silk fabric that drapes beautifully.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy"],
    isOnSale: true,
    stock: 12
  },
  {
    id: "2",
    name: "Classic Leather Jacket",
    price: 449.99,
    category: "Men's Clothing",
    image: mensCollection,
    description: "Premium leather jacket crafted from genuine cowhide. Timeless design with modern details for the contemporary gentleman.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Brown", "Tan"],
    isOnSale: false,
    stock: 8
  },
  {
    id: "3",
    name: "Designer Handbag Collection",
    price: 199.99,
    originalPrice: 249.99,
    category: "Accessories",
    image: accessoriesCollection,
    description: "Luxurious handbag featuring premium materials and exquisite craftsmanship. Perfect for both day and evening wear.",
    sizes: ["One Size"],
    colors: ["Black", "Camel", "White", "Red"],
    isOnSale: true,
    stock: 15
  },
  {
    id: "4",
    name: "Cashmere Sweater",
    price: 189.99,
    category: "Women's Clothing",
    image: womensCollection,
    description: "Ultra-soft cashmere sweater with a relaxed fit. Perfect for layering or wearing alone for effortless elegance.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Gray", "Blush", "Navy"],
    isOnSale: false,
    stock: 20
  },
  {
    id: "5",
    name: "Tailored Blazer",
    price: 329.99,
    category: "Men's Clothing",
    image: mensCollection,
    description: "Impeccably tailored blazer made from premium wool blend. Essential piece for professional and formal occasions.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Charcoal", "Black"],
    isOnSale: false,
    stock: 10
  },
  {
    id: "6",
    name: "Statement Jewelry Set",
    price: 79.99,
    originalPrice: 119.99,
    category: "Accessories",
    image: accessoriesCollection,
    description: "Eye-catching jewelry set including necklace, earrings, and bracelet. Gold-plated with cubic zirconia accents.",
    sizes: ["One Size"],
    colors: ["Gold", "Silver", "Rose Gold"],
    isOnSale: true,
    stock: 25
  },
  {
    id: "7",
    name: "Vintage Denim Jacket",
    price: 89.99,
    category: "Women's Clothing",
    image: womensCollection,
    description: "Classic denim jacket with vintage-inspired details. Perfect for creating casual chic looks with any outfit.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Light Blue", "Dark Blue", "Black"],
    isOnSale: false,
    stock: 18
  },
  {
    id: "8",
    name: "Premium Leather Shoes",
    price: 279.99,
    category: "Men's Clothing",
    image: mensCollection,
    description: "Handcrafted leather dress shoes with Italian-inspired design. Perfect for business and formal occasions.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "Brown", "Oxblood"],
    isOnSale: false,
    stock: 14
  }
];

// Cosmetic Products
export const cosmeticProducts: Product[] = [
  {
    id: "c1",
    name: "Luxury Foundation Set",
    price: 89.99,
    originalPrice: 119.99,
    category: "Makeup",
    image: makeupCollection,
    description: "Full coverage foundation with matching concealer and setting powder. Perfect for all-day wear with a natural, radiant finish.",
    sizes: ["30ml", "50ml"],
    colors: ["Porcelain", "Ivory", "Beige", "Tan", "Deep"],
    isOnSale: true,
    stock: 25
  },
  {
    id: "c2",
    name: "Anti-Aging Serum Complex",
    price: 149.99,
    category: "Skincare",
    image: skincareProducts,
    description: "Advanced peptide serum with vitamin C and hyaluronic acid. Reduces fine lines and brightens skin for a youthful glow.",
    sizes: ["30ml", "50ml"],
    colors: ["Clear"],
    isOnSale: false,
    stock: 18
  },
  {
    id: "c3",
    name: "Signature Fragrance Collection",
    price: 199.99,
    originalPrice: 249.99,
    category: "Fragrance",
    image: cosmeticsCollection,
    description: "Exclusive perfume duo featuring our bestselling day and evening fragrances. Elegant floral and woody notes.",
    sizes: ["50ml", "100ml"],
    colors: ["Day Scent", "Evening Scent"],
    isOnSale: true,
    stock: 12
  },
  {
    id: "c4",
    name: "Professional Makeup Brush Set",
    price: 79.99,
    category: "Makeup",
    image: makeupCollection,
    description: "12-piece professional makeup brush set with vegan bristles and ergonomic handles. Perfect for all makeup applications.",
    sizes: ["Full Set"],
    colors: ["Rose Gold", "Silver", "Black"],
    isOnSale: false,
    stock: 30
  },
  {
    id: "c5",
    name: "Hydrating Face Mask Collection",
    price: 59.99,
    originalPrice: 79.99,
    category: "Skincare",
    image: skincareProducts,
    description: "Set of 6 premium sheet masks with different formulas: hydrating, brightening, purifying, and anti-aging.",
    sizes: ["6-Pack", "12-Pack"],
    colors: ["Multi"],
    isOnSale: true,
    stock: 40
  },
  {
    id: "c6",
    name: "Matte Liquid Lipstick Trio",
    price: 45.99,
    category: "Makeup",
    image: makeupCollection,
    description: "Long-lasting matte liquid lipsticks in three versatile shades. Comfortable formula that doesn't dry out lips.",
    sizes: ["3ml each"],
    colors: ["Nude", "Red", "Pink", "Berry", "Brown"],
    isOnSale: false,
    stock: 35
  },
  {
    id: "c7",
    name: "Vitamin C Brightening Cream",
    price: 89.99,
    category: "Skincare",
    image: skincareProducts,
    description: "Daily moisturizer with vitamin C, niacinamide, and SPF 30. Brightens skin tone while providing all-day hydration.",
    sizes: ["50ml", "100ml"],
    colors: ["White"],
    isOnSale: false,
    stock: 22
  },
  {
    id: "c8",
    name: "Eyeshadow Palette - Sunset Collection",
    price: 69.99,
    originalPrice: 89.99,
    category: "Makeup",
    image: makeupCollection,
    description: "18-shade eyeshadow palette with warm sunset tones. Mix of matte and shimmer finishes for endless eye looks.",
    sizes: ["Standard"],
    colors: ["Warm Tones", "Cool Tones", "Neutral"],
    isOnSale: true,
    stock: 28
  }
];