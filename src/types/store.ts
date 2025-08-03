export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  isOnSale: boolean;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}