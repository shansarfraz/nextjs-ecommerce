'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setOrderComplete(true);
    clearCart();
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some products before checking out.</p>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-lg">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-2">Thank you for your purchase.</p>
        <p className="text-sm text-muted-foreground mb-8">
          You&apos;ll receive an email confirmation shortly with your order details.
        </p>
        <Button asChild size="lg">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input type="email" placeholder="Email address" required />
                <Input type="tel" placeholder="Phone number" />
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input placeholder="First name" required />
                  <Input placeholder="Last name" required />
                </div>
                <Input placeholder="Address" required />
                <Input placeholder="Apartment, suite, etc. (optional)" />
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input placeholder="City" required />
                  <Input placeholder="State" required />
                  <Input placeholder="ZIP code" required />
                </div>
                <Input placeholder="Country" defaultValue="United States" required />
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Card number" required />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input placeholder="MM / YY" required />
                  <Input placeholder="CVC" required />
                </div>
                <Input placeholder="Name on card" required />
              </CardContent>
            </Card>

            <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                `Pay ${formatPrice(grandTotal)}`
              )}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.images[0] ? (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.product.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(parseFloat(item.product.basePrice) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>

              {totalPrice < 100 && (
                <p className="text-xs text-muted-foreground text-center">
                  Add {formatPrice(100 - totalPrice)} more for free shipping!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
