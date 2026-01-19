import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Store | Premium Products",
  description: "Discover our curated collection of high-quality products designed for the modern lifestyle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
