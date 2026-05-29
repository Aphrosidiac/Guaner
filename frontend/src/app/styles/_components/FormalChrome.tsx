'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, ChevronDown, MessageCircle, Check } from 'lucide-react';
import { useCart } from '@/lib/cart';

const base = '/styles/formal';
const regions: { label: string; cur: string; active: boolean }[] = [
  { label: 'Malaysia', cur: 'MYR RM', active: true },
  { label: 'Singapore', cur: 'SGD', active: false },
  { label: 'Worldwide', cur: 'USD', active: false },
];

function RegionSelect() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative hidden md:block" style={{ fontFamily: 'var(--font-outfit)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-[11px] tracking-[0.14em] inline-flex items-center gap-1 hover:opacity-70 transition-opacity cursor-pointer"
      >
        MALAYSIA | MYR RM <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="liquid-glass-dark absolute right-0 top-full mt-3 z-50 w-60 p-2" style={{ borderRadius: 16, position: 'absolute' }}>
            {regions.map((r) => (
              <button
                key={r.label}
                disabled={!r.active}
                onClick={() => setOpen(false)}
                className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left ${r.active ? 'hover:bg-white/10' : 'opacity-45 cursor-not-allowed'} transition-colors`}
              >
                <span className="text-[12px] tracking-[0.12em]">{r.label}</span>
                <span className="flex items-center gap-2 text-[11px] tracking-[0.1em] text-white/70">
                  {r.cur}
                  {r.active ? <Check className="w-3.5 h-3.5 text-white" /> : <span className="text-[9px] uppercase">Soon</span>}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
const navLeft: [string, string][] = [
  ['NEW DROP SS’26', `${base}/products`],
  ['SHOP', `${base}/products`],
  ['COLLECTIONS', `${base}/products`],
  ['LOOKBOOK', `${base}/about`],
  ['NEWS', `${base}/about`],
];

// overlay = transparent header floated over the full-bleed hero (homepage).
// solid  = white sticky bar for inner pages.
export function FormalHeader({ overlay = false }: { overlay?: boolean }) {
  const { itemCount } = useCart();
  const fg = overlay ? '#FFFFFF' : '#111111';
  const wrapStyle: React.CSSProperties = overlay
    ? { position: 'fixed', insetInline: 0, top: 0, zIndex: 50, color: fg, backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.40), rgba(0,0,0,0))' }
    : { position: 'sticky', top: 0, zIndex: 50, color: fg, background: '#FFFFFF', borderBottom: '1px solid #E2E1DE' };
  const link = 'text-[11px] tracking-[0.18em] hover:opacity-60 transition-opacity';
  const iconBtn = 'p-1 hover:opacity-60 transition-opacity';

  return (
    <header style={wrapStyle}>
      <div className="relative max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* left nav */}
        <nav className="hidden lg:flex items-center gap-6" style={{ fontFamily: 'var(--font-outfit)' }}>
          {navLeft.map(([l, href]) => (
            <Link key={l} href={href} className={link}>{l}</Link>
          ))}
        </nav>

        {/* center logo */}
        <Link
          href={base}
          className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold tracking-[0.4em]"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          GUANER
        </Link>

        {/* right utility */}
        <div className="flex items-center gap-4 ml-auto" style={{ color: fg }}>
          <RegionSelect />
          <Link href={`${base}/products`} aria-label="Search" className={iconBtn}><Search className="w-5 h-5" /></Link>
          <Link href="/track" aria-label="Track order" className={iconBtn}><User className="w-5 h-5" /></Link>
          <Link href={`${base}/cart`} aria-label="Cart" className={`${iconBtn} relative`}>
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-semibold flex items-center justify-center" style={{ background: fg, color: overlay ? '#111' : '#fff' }}>{itemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function FormalFooter() {
  const cols: [string, [string, string][]][] = [
    ['SHOP', [['All products', `${base}/products`], ['Cart', `${base}/cart`]]],
    ['BRAND', [['About', `${base}/about`], ['Home', base]]],
    ['SUPPORT', [['Track order', '/track'], ['Terms', '/terms']]],
  ];
  return (
    <footer style={{ background: '#111111', color: '#FFFFFF' }}>
      <div className="max-w-[1600px] mx-auto px-6 py-14 grid sm:grid-cols-4 gap-10">
        <div>
          <p className="text-lg font-semibold tracking-[0.4em]" style={{ fontFamily: 'var(--font-outfit)' }}>GUANER</p>
          <p className="text-sm text-white/50 mt-3 max-w-xs">Quality clothing for the modern individual. Made for Malaysia.</p>
          <Link href="/styles" className="inline-block mt-4 text-xs tracking-[0.18em] text-white/60 underline hover:text-white">&larr; ALL THEMES</Link>
        </div>
        {cols.map(([h, items]) => (
          <div key={h}>
            <p className="text-[11px] tracking-[0.2em] text-white/50 mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>{h}</p>
            {items.map(([t, href]) => (
              <Link key={t} href={href} className="block text-sm text-white/70 hover:text-white py-1">{t}</Link>
            ))}
          </div>
        ))}
      </div>
      <div className="text-center text-[11px] tracking-[0.18em] text-white/30 pb-8">&copy; 2026 GUANER. ALL RIGHTS RESERVED.</div>
    </footer>
  );
}

export function FormalChatBubble() {
  return (
    <a
      href="https://wa.me/60123456789"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us"
      className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      style={{ background: '#111111', color: '#FFFFFF' }}
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
