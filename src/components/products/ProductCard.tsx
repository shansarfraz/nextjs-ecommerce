'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(price));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-all duration-300 bg-card">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square bg-muted overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0].url}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-muted-foreground/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Quick add button */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={handleAddToCart}
              className="w-full backdrop-blur-sm"
              size="sm"
            >
              Add to Cart
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isFeatured && (
              <Badge className="bg-primary/90 hover:bg-primary">Featured</Badge>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="secondary" className="bg-orange-500/90 text-white hover:bg-orange-500">
                Low Stock
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="secondary" className="bg-destructive/90 text-white hover:bg-destructive">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {product.category.name}
            </p>
            <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= Math.round(parseFloat(product.averageRating))
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-muted-foreground/30 fill-muted-foreground/30'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            <p className="text-lg font-semibold">{formatPrice(product.basePrice)}</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
