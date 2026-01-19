'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/context/CartContext';
import { getProductBySlug } from '@/lib/api';
import { Product } from '@/types';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(price));
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="space-y-6">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold mb-2">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/">Back to Store</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/?category=${product.category.slug}`} className="hover:text-foreground transition-colors">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden">
            {product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage].url}
                alt={product.images[selectedImage].altText || product.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-20 h-20 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent hover:border-muted-foreground/30'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.altText || `${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-3">
              {product.category.name}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">
              {product.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
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
              <span className="text-sm text-muted-foreground">
                {product.averageRating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <p className="text-3xl font-semibold">{formatPrice(product.basePrice)}</p>

          <Separator />

          <div className="prose prose-sm text-muted-foreground">
            <p>{product.description}</p>
          </div>

          <Separator />

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.stock > 10 ? (
              <>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm text-green-600">In Stock</span>
              </>
            ) : product.stock > 0 ? (
              <>
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span className="text-sm text-orange-600">Only {product.stock} left</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="text-sm text-red-600">Out of Stock</span>
              </>
            )}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                disabled={quantity <= 1}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                disabled={quantity >= product.stock}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <Button
              className="flex-1 h-12 text-base"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>

          {/* Product Details */}
          <div className="space-y-3 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">SKU</span>
              <span>{product.sku}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Vendor</span>
              <span>{product.vendor.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Category</span>
              <Link href={`/?category=${product.category.slug}`} className="text-primary hover:underline">
                {product.category.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
