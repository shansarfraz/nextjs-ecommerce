'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { getProducts, getCategories } from '@/lib/api';
import { Product, Category } from '@/types';

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || '';

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts({
            page: currentPage,
            limit: 12,
            search: searchQuery || undefined,
            category: selectedCategory || undefined,
            sortBy: sortBy?.split('-')[0] as 'price' | 'createdAt' | 'title' | undefined,
            sortOrder: sortBy?.split('-')[1] as 'asc' | 'desc' | undefined,
          }),
          getCategories().catch(() => []),
        ]);

        setProducts(productsRes.data);
        setTotalProducts(productsRes.total);
        setTotalPages(productsRes.totalPages);
        setCategories(categoriesRes);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [currentPage, searchQuery, selectedCategory, sortBy]);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page'); // Reset to page 1 when filters change
    setCurrentPage(1);
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setCurrentPage(1);
    router.push('/');
  };

  const hasFilters = searchQuery || selectedCategory || sortBy;

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={(value) => updateParams('category', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(value) => updateParams('sort', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="createdAt-desc">Newest First</SelectItem>
              <SelectItem value="title-asc">Name: A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{totalProducts} products</span>
        </div>
      </div>

      {/* Active Filters */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchQuery}
              <button onClick={() => updateParams('search', '')} className="ml-1 hover:text-destructive">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="secondary" className="gap-1">
              Category: {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
              <button onClick={() => updateParams('category', '')} className="ml-1 hover:text-destructive">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
            Clear all
          </Button>
        </div>
      )}

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
