'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Shirt, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/products/ProductCard';
import { Animate, Stagger } from '@/components/ui/Animate';
import { getProducts, getCategories } from '@/lib/api';
import type { Product, Category } from '@/types';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getProducts({ limit: 8, featured: 'true' } as Parameters<typeof getProducts>[0]).then((r) => {
      if (r.data.length > 0) {
        setProducts(r.data);
      } else {
        getProducts({ limit: 8 }).then((r2) => setProducts(r2.data)).catch(() => {});
      }
    }).catch(() => {});
    getCategories().then(setCategories).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-center gap-8 lg:gap-16">
            <div className="flex-1 min-w-0">
              <Animate variant="fade" duration={0.8}>
                <span className="font-display text-2xl font-bold tracking-tight">GUANER</span>
              </Animate>
              <Animate variant="fadeUp" delay={0.15} duration={0.7}>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 mt-4">
                  Quality Clothing for the Modern Individual
                </h1>
              </Animate>
              <Animate variant="fadeUp" delay={0.3} duration={0.7}>
                <p className="text-lg text-neutral-300 mb-8 max-w-lg">
                  Discover our curated collection of quality apparel. Fast shipping across Malaysia.
                </p>
              </Animate>
              <Animate variant="fadeUp" delay={0.45} duration={0.7}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/products">
                    <Button variant="secondary" size="lg">
                      Browse Products <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Animate>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.12}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-surface-elevated rounded-lg">
                <Shirt className="w-6 h-6 text-text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">Premium Quality</h3>
                <p className="text-sm text-text-secondary">Carefully selected fabrics and craftsmanship you can feel.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-surface-elevated rounded-lg">
                <Truck className="w-6 h-6 text-text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">Fast Shipping</h3>
                <p className="text-sm text-text-secondary">Nationwide delivery across Malaysia with tracking.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-surface-elevated rounded-lg">
                <Shield className="w-6 h-6 text-text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">Secure Checkout</h3>
                <p className="text-sm text-text-secondary">Safe and easy payment options for every order.</p>
              </div>
            </div>
          </Stagger>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Animate variant="fadeUp">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">Shop by Category</h2>
          </Animate>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.08}>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group bg-surface rounded-xl border border-border hover:border-border-hover hover:shadow-md transition-all duration-300 p-6"
              >
                <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary-light transition-colors">{cat.name}</h3>
                <p className="text-sm text-text-secondary mb-3">{cat.description}</p>
                <span className="text-sm font-medium text-text-muted">{cat.productCount} products</span>
              </Link>
            ))}
          </Stagger>
        </section>
      )}

      {/* Featured Products */}
      {products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Animate variant="fadeUp">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold">Featured Products</h2>
              <Link href="/products" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                View All <ArrowRight className="w-4 h-4 inline" />
              </Link>
            </div>
          </Animate>
          <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" stagger={0.06}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Stagger>
        </section>
      )}
    </div>
  );
}
