'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../../_components/ThemedShell';
import { Animate, Stagger } from '@/components/ui/Animate';
import { getProducts } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

export default function ThemedProducts() {
  const t = useTheme();
  const base = `/styles/${t.slug}`;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ limit: 12 })
      .then((r) => setProducts(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const heading: React.CSSProperties = { fontFamily: t.displayFont, textTransform: t.upper ? 'uppercase' : 'none' };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
        <Animate variant="fadeUp"><h1 className="text-4xl sm:text-5xl mb-8" style={heading}>Shop All</h1></Animate>
        {loading ? (
          <p style={{ color: t.textMuted }}>Loading&hellip;</p>
        ) : products.length === 0 ? (
          <p style={{ color: t.textMuted }}>No products available.</p>
        ) : (
          <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.06}>
            {products.map((p) => (
              <Link key={p.id} href={`${base}/products/${p.slug}`} className="group block transition-transform duration-300 hover:-translate-y-1.5">
                <div className="overflow-hidden mb-3" style={{ background: t.surfaceAlt, borderRadius: t.radius, border: `1px solid ${t.border}` }}>
                  <div className="aspect-[4/5] flex items-center justify-center">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <span className="text-2xl" style={{ fontFamily: t.displayFont, color: t.textMuted }}>{p.code}</span>
                    )}
                  </div>
                </div>
                <p className="text-xs uppercase tracking-wider" style={{ color: t.textMuted }}>{p.category.name}</p>
                <h3 className="font-semibold leading-snug" style={{ color: t.text }}>{p.name}</h3>
                <p className="mt-1 font-bold text-lg" style={{ fontFamily: t.displayFont, color: t.accent }}>{formatPrice(p.price)}</p>
              </Link>
            ))}
          </Stagger>
        )}
    </section>
  );
}
