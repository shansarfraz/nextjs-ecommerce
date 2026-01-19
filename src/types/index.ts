export interface Product {
  id: string;
  vendorId: string;
  title: string;
  slug: string;
  description: string;
  basePrice: string;
  currency: string;
  sku: string;
  status: 'draft' | 'active' | 'archived';
  categoryId: string;
  stock: number;
  averageRating: string;
  reviewCount: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  vendor: Vendor;
  category: Category;
  images: ProductImage[];
  variants?: ProductVariant[];
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText: string;
  position: number;
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: string;
  stock: number;
  attributes: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  position: number;
  description: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  description: string;
  commissionRate: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  businessEmail: string;
  businessPhone: string | null;
  businessAddress: Record<string, string> | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'createdAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}
