'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';

const NAVY = '#1B2A6B';
const RED = '#E0231C';
const CREAM = '#F4F1E8';
const INK = '#101A3A';
const label = { fontFamily: 'var(--font-bebas)', letterSpacing: '0.06em' } as const;
const base = '/styles/varsity';

export function VarsityHeader() {
  const { itemCount } = useCart();
  return (
    <>
      <div style={{ background: NAVY }} className="text-center text-white py-2">
        <span style={label} className="text-sm">FREE SHIPPING OVER RM150 &nbsp;&#9642;&nbsp; EST. 2026 &nbsp;&#9642;&nbsp; MADE FOR MALAYSIA</span>
      </div>
      <header className="sticky top-0 z-40" style={{ background: CREAM, borderBottom: `3px solid ${NAVY}` }}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href={base} className="flex items-center gap-3">
            <img src="/images/logo.png" alt="GUANER" className="h-12 w-auto transition-transform duration-300 hover:scale-105" />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-lg" style={{ ...label, color: INK }}>
            {([['SHOP', `${base}/products`], ['COLLECTIONS', `${base}/products`], ['ABOUT', `${base}/about`], ['TRACK ORDER', `${base}/products`]] as [string, string][]).map(([l, href]) => (
              <Link key={l} href={href} className="relative transition-colors hover:text-[#E0231C] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#E0231C] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">{l}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-4" style={{ ...label, color: INK }}>
            <span className="text-lg cursor-pointer hover:text-[#E0231C] transition-colors">SEARCH</span>
            <Link href={`${base}/cart`} className="text-lg px-3 py-1 rounded-full text-white transition-transform active:scale-95 hover:brightness-110" style={{ background: RED }}>CART&nbsp;{itemCount}</Link>
          </div>
        </div>
      </header>
    </>
  );
}

export function VarsityFooter() {
  const cols: [string, [string, string][]][] = [
    ['SHOP', [['Products', `${base}/products`], ['Cart', `${base}/cart`]]],
    ['BRAND', [['About', `${base}/about`], ['Home', base]]],
    ['LEGAL', [['Terms', '/terms'], ['Privacy', '/privacy']]],
  ];
  return (
    <footer style={{ background: INK }} className="text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-4 gap-8">
        <div className="sm:col-span-1">
          <img src="/images/logo.png" alt="GUANER" className="h-14 w-auto mb-3 transition-transform duration-300 hover:scale-105" />
          <p className="text-sm text-white/50">Quality clothing for the modern individual.</p>
          <Link href="/styles" className="inline-block mt-4 text-sm text-white/60 underline hover:text-white">&larr; All themes</Link>
        </div>
        {cols.map(([h, items]) => (
          <div key={h}>
            <p style={label} className="text-lg mb-3 text-white/80">{h}</p>
            {items.map(([t, href]) => (
              <Link key={t} href={href} className="block text-sm text-white/50 hover:text-white py-1">{t}</Link>
            ))}
          </div>
        ))}
      </div>
      <div className="text-center text-xs text-white/30 pb-8">&copy; 2026 GUANER. All rights reserved.</div>
    </footer>
  );
}
