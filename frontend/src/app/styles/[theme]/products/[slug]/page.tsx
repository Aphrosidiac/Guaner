'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Check, ShoppingCart } from 'lucide-react';
import { ThemedShell, useTheme } from '../../../_components/ThemedShell';
import { getProduct } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart';
import type { Product } from '@/types';

export default function ThemedDetail() {
  const t = useTheme();
  const params = useParams();
  const slug = String(params.slug);
  const base = `/styles/${t.slug}`;
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    getProduct(slug)
      .then(setProduct)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const heading: React.CSSProperties = { fontFamily: t.displayFont, textTransform: t.upper ? 'uppercase' : 'none' };
  const btn: React.CSSProperties = {
    background: t.accent,
    color: t.accentText,
    borderRadius: t.radius,
    fontFamily: t.displayFont,
    textTransform: t.upper ? 'uppercase' : 'none',
  };

  const add = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      code: product.code,
      name: product.name,
      size: product.size,
      price: product.price,
      quantity: qty,
      imageUrl: product.imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <ThemedShell>
      <section className="max-w-5xl mx-auto px-6 py-10">
        <Link href={`${base}/products`} className="inline-flex items-center gap-1 text-sm mb-8" style={{ color: t.textMuted }}>
          <ArrowLeft className="w-4 h-4" /> Back to shop
        </Link>
        {loading ? (
          <p style={{ color: t.textMuted }}>Loading&hellip;</p>
        ) : !product ? (
          <p>Product not found. <Link href={`${base}/products`} className="underline">Back to shop</Link></p>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            <div className="overflow-hidden" style={{ background: t.surfaceAlt, borderRadius: t.radius, border: `1px solid ${t.border}` }}>
              <div className="aspect-[4/5] flex items-center justify-center">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl" style={{ fontFamily: t.displayFont, color: t.textMuted }}>{product.code}</span>
                )}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: t.textMuted }}>{product.category.name}</p>
              <h1 className="text-4xl sm:text-5xl leading-tight" style={heading}>{product.name}</h1>
              {product.size && <p className="mt-2" style={{ color: t.textMuted }}>{product.size}</p>}
              <p className="mt-4 text-3xl font-bold" style={{ fontFamily: t.displayFont, color: t.accent }}>{formatPrice(product.price)}</p>
              {product.description && <p className="mt-5 leading-relaxed" style={{ color: t.text }}>{product.description}</p>}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center" style={{ border: `1px solid ${t.border}`, borderRadius: t.radius }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 cursor-pointer">-</button>
                  <span className="px-4 min-w-[2.5rem] text-center">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-3 py-2 cursor-pointer">+</button>
                </div>
                <button onClick={add} disabled={product.stock === 0} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold cursor-pointer disabled:opacity-50" style={btn}>
                  {added ? (<><Check className="w-4 h-4" /> Added</>) : (<><ShoppingCart className="w-4 h-4" /> Add to cart</>)}
                </button>
              </div>
              {product.stock === 0 && <p className="mt-3 text-sm" style={{ color: t.accent }}>Out of stock</p>}
              <p className="mt-6 text-xs" style={{ color: t.textMuted }}>Code: {product.code}</p>
            </div>
          </div>
        )}
      </section>
    </ThemedShell>
  );
}
