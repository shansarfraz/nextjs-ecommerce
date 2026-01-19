'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';

export function CartSidebar() {
  const { items, totalPrice, removeItem, updateQuantity, closeCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h3 className="font-medium mb-2">Your cart is empty</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Button onClick={closeCart} asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Your Cart ({items.length})</h2>

      <div className="flex-1 overflow-y-auto -mx-6 px-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4">
              <div className="relative w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                {item.product.images[0] ? (
                  <Image
                    src={item.product.images[0].url}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2">{item.product.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatPrice(parseFloat(item.product.basePrice))}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors ml-auto"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4">
        <Separator className="mb-4" />

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-muted-foreground">Calculated at checkout</span>
          </div>
        </div>

        <Separator className="mb-4" />

        <div className="flex justify-between font-semibold mb-4">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        <Button className="w-full h-12" asChild onClick={closeCart}>
          <Link href="/checkout">Checkout</Link>
        </Button>

        <Button variant="ghost" className="w-full mt-2" onClick={closeCart} asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
