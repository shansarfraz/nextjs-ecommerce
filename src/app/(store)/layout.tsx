import { Header } from '@/components/layout/Header';
import { CartProvider } from '@/context/CartContext';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t py-8 mt-auto">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">S</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  &copy; {new Date().getFullYear()} Store. All rights reserved.
                </span>
              </div>
              <nav className="flex gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
