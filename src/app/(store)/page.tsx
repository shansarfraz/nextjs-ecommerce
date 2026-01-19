import { Suspense } from 'react';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Skeleton } from '@/components/ui/skeleton';

export const dynamic = 'force-dynamic';

function ProductGridSkeleton() {
  return (
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
  );
}

export default function StorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          Premium Products
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our curated collection of high-quality products designed for the modern lifestyle.
        </p>
      </section>

      {/* Products */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
