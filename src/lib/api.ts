import { Product, ProductsResponse, Category, ProductQueryParams } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ecommerce.shansarfraz.com';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getProducts(params?: ProductQueryParams): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.category) searchParams.set('category', params.category);
  if (params?.search) searchParams.set('search', params.search);
  if (params?.minPrice) searchParams.set('minPrice', params.minPrice.toString());
  if (params?.maxPrice) searchParams.set('maxPrice', params.maxPrice.toString());
  if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

  const query = searchParams.toString();
  return fetchApi<ProductsResponse>(`/products${query ? `?${query}` : ''}`);
}

export async function getProductBySlug(slug: string): Promise<Product> {
  // First get all products and filter by slug (API doesn't have direct slug endpoint)
  const response = await getProducts({ limit: 100 });
  const product = response.data.find(p => p.slug === slug);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
}

export async function getProductById(id: string): Promise<Product> {
  return fetchApi<Product>(`/products/${id}`);
}

export async function getCategories(): Promise<Category[]> {
  return fetchApi<Category[]>('/categories');
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const response = await getProducts({ limit: 50 });
  return response.data.filter(p => p.isFeatured);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const response = await getProducts({ search: query, limit: 50 });
  return response.data;
}
