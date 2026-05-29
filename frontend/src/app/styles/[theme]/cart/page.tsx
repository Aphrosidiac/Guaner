'use client';

import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { ThemedShell, useTheme } from '../../_components/ThemedShell';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/utils';

export default function ThemedCart() {
  const t = useTheme();
  const base = `/styles/${t.slug}`;
  const { items, updateQuantity, removeItem, total } = useCart();
  const heading: React.CSSProperties = { fontFamily: t.displayFont, textTransform: t.upper ? 'uppercase' : 'none' };
  const cta: React.CSSProperties = {
    background: t.primary,
    color: t.primaryText,
    borderRadius: t.radius,
    fontFamily: t.displayFont,
    textTransform: t.upper ? 'uppercase' : 'none',
  };

  return (
    <ThemedShell>
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl mb-8" style={heading}>Your Cart</h1>
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="mb-6" style={{ color: t.textMuted }}>Your cart is empty.</p>
            <Link href={`${base}/products`} className="inline-block px-6 py-3 font-semibold" style={{ background: t.accent, color: t.accentText, borderRadius: t.radius }}>Browse products</Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((it) => (
                <div key={it.productId} className="flex items-center gap-4 p-3" style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: t.radius }}>
                  <div className="w-16 h-20 shrink-0 overflow-hidden flex items-center justify-center" style={{ background: t.surfaceAlt, borderRadius: t.radius }}>
                    {it.imageUrl ? (
                      <img src={it.imageUrl} alt={it.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs" style={{ color: t.textMuted }}>{it.code}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{it.name}</h3>
                    <p className="text-sm" style={{ color: t.textMuted }}>{formatPrice(it.price)}</p>
                  </div>
                  <div className="flex items-center" style={{ border: `1px solid ${t.border}`, borderRadius: t.radius }}>
                    <button onClick={() => updateQuantity(it.productId, Math.max(1, it.quantity - 1))} className="px-2.5 py-1.5 cursor-pointer">-</button>
                    <span className="px-3 text-sm">{it.quantity}</span>
                    <button onClick={() => updateQuantity(it.productId, it.quantity + 1)} className="px-2.5 py-1.5 cursor-pointer">+</button>
                  </div>
                  <button onClick={() => removeItem(it.productId)} className="p-2 cursor-pointer" style={{ color: t.textMuted }} aria-label="Remove"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-lg" style={{ color: t.textMuted }}>Total</span>
              <span className="text-2xl font-bold" style={{ fontFamily: t.displayFont, color: t.accent }}>{formatPrice(total)}</span>
            </div>
            <Link href="/checkout" className="mt-6 block text-center px-6 py-4 font-semibold" style={cta}>Proceed to checkout</Link>
            <p className="mt-3 text-center text-xs" style={{ color: t.textMuted }}>Checkout uses the shared store flow.</p>
          </>
        )}
      </section>
    </ThemedShell>
  );
}
