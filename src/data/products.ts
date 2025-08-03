import { Product } from "@/types/store";
import womensCollection from "@/assets/womens-collection.jpg";
import mensCollection from "@/assets/mens-collection.jpg";
import accessoriesCollection from "@/assets/accessories-collection.jpg";

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