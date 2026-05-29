'use client';

import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart';
import type { Theme } from '../themes';

interface Props {
  product: {
    id: string;
    code: string;
    name: string;
    size: string | null;
    priceSen: number;
    imageUrl: string | null;
    stock: number;
  };
  t: Theme;
}

export function AddToCart({ product, t }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const btn: React.CSSProperties = {
    background: t.accent,
    color: t.accentText,
    borderRadius: t.radius,
    fontFamily: t.displayFont,
    textTransform: t.upper ? 'uppercase' : 'none',
  };

  const add = () => {
    addItem({
      productId: product.id,
      code: product.code,
      name: product.name,
      size: product.size,
      price: product.priceSen,
      quantity: qty,
      imageUrl: product.imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <div className="mt-8 flex items-center gap-4">
        <div className="flex items-center" style={{ border: `1px solid ${t.border}`, borderRadius: t.radius }}>
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 cursor-pointer">-</button>
          <span className="px-4 min-w-[2.5rem] text-center">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="px-3 py-2 cursor-pointer">+</button>
        </div>
        <button
          onClick={add}
          disabled={product.stock === 0}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold cursor-pointer disabled:opacity-50 transition-transform active:scale-[0.97] hover:brightness-110"
          style={btn}
        >
          {added ? (<><Check className="w-4 h-4" /> Added</>) : (<><ShoppingCart className="w-4 h-4" /> Add to cart</>)}
        </button>
      </div>
      {product.stock === 0 && <p className="mt-3 text-sm" style={{ color: t.accent }}>Out of stock</p>}
    </>
  );
}
