export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  price: number;
  comparePrice: number | null;
  costPrice: number | null;
  sku: string;
  categoryId: string;
  images: string[];
  tags: string[];
  isFeatured: boolean;
  isTrending: boolean;
  isNew: boolean;
  inStock: boolean;
  stockCount: number;
  weightGrams: number | null;
  metadata: Record<string, unknown>;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  value: string;
  priceDiff: number;
  stock: number;
  sku: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  sortOrder: number;
  productCount: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  createdAt: string;
}
