'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Search, X, Menu } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { getShowcaseData, type ShowcaseProduct } from '../api';
import { rm } from '../data';

const NAVY = '#1B2A6B';
const RED = '#E0231C';
const CREAM = '#F4F1E8';
const INK = '#101A3A';
const label = { fontFamily: 'var(--font-bebas)', letterSpacing: '0.06em' } as const;
const base = '/styles/varsity';

const navItems: [string, string][] = [
  ['NEW DROP', `${base}/new`],
  ['SHOP', `${base}/products`],
  ['COLLECTIONS', `${base}/collections`],
  ['LOOKBOOK', `${base}/lookbook`],
  ['ABOUT', `${base}/about`],
  ['TRACK ORDER', `${base}/track`],
];

function VarsitySearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');
  const [all, setAll] = useState<ShowcaseProduct[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setShow(true));
      });
      return () => { cancelAnimationFrame(outer); cancelAnimationFrame(inner); };
    }
    if (mounted) {
      setShow(false);
      const t = setTimeout(() => {
        setMounted(false);
        setQuery('');
      }, 500);
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

  useEffect(() => {
    if (mounted && all === null) {
      getShowcaseData({ limit: 100 }).then((d) => setAll(d.products)).catch(() => setAll([]));
    }
  }, [mounted, all]);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  const q = query.trim().toLowerCase();
  const results = q
    ? (all ?? []).filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 8)
    : [];

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
      <div
        onClick={onClose}
        className={`absolute inset-0 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'rgba(16,26,58,0.55)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
      />
      <div
        className={`absolute top-0 left-0 right-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
        style={{ background: CREAM, borderBottom: `3px solid ${NAVY}` }}
      >
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 border-b-2 pb-4" style={{ borderColor: NAVY }}>
            <Search className="w-7 h-7 shrink-0" style={{ color: NAVY }} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH GUANERDOTT."
              className="flex-1 min-w-0 bg-transparent outline-none text-2xl sm:text-4xl placeholder:opacity-30"
              style={{ ...label, color: NAVY }}
            />
            <button onClick={onClose} aria-label="Close search" className="shrink-0 p-2 transition-transform duration-300 hover:rotate-90" style={{ color: NAVY }}>
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="mt-6 min-h-[120px]">
            {!q && (
              <p style={{ ...label, color: 'rgba(27,42,107,0.5)' }} className="text-lg">START TYPING TO SEARCH THE CATALOG&hellip;</p>
            )}
            {q && all !== null && results.length === 0 && (
              <p style={{ ...label, color: 'rgba(27,42,107,0.6)' }} className="text-xl">NO RESULTS FOR &ldquo;{query}&rdquo;</p>
            )}
            {results.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto scrollbar-hide pb-2">
                {results.map((p, i) => (
                  <Link
                    key={p.code}
                    href={`${base}/products/${p.slug}`}
                    onClick={onClose}
                    className="group block animate-g-fade-up"
                    style={{ animationDelay: `${i * 45}ms` }}
                  >
                    <div className="overflow-hidden mb-2" style={{ border: `2px solid ${NAVY}`, background: '#fff' }}>
                      <div className="aspect-[4/5] flex items-center justify-center">
                        {p.imageUrl ? (
                          <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        ) : (
                          <span className="text-xl" style={{ ...label, color: 'rgba(27,42,107,0.4)' }}>{p.code}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] uppercase tracking-wider" style={{ color: 'rgba(27,42,107,0.55)' }}>{p.category}</p>
                    <h4 className="text-sm font-semibold leading-snug" style={{ color: NAVY }}>{p.name}</h4>
                    <p className="text-base font-bold" style={{ ...label, color: RED }}>{rm(p.price)}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function VarsityMobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setShow(true));
      });
      return () => { cancelAnimationFrame(outer); cancelAnimationFrame(inner); };
    }
    if (mounted) {
      setShow(false);
      const t = setTimeout(() => setMounted(false), 400);
      return () => clearTimeout(t);
    }
  }, [open, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true">
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'rgba(16,26,58,0.55)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />
      <div
        className={`absolute top-0 right-0 bottom-0 w-[88%] max-w-sm transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${show ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
        style={{ background: CREAM }}
      >
        <div className="flex items-center justify-between px-6 h-20" style={{ borderBottom: `3px solid ${NAVY}` }}>
          <Link href={base} onClick={onClose} className="flex items-center">
            <img src="/images/logo.png" alt="GuanerDott." className="h-12 w-auto" />
          </Link>
          <button onClick={onClose} aria-label="Close menu" className="p-2" style={{ color: INK }}>
            <X className="w-7 h-7" />
          </button>
        </div>

        <nav className="flex-1 px-6 py-6 overflow-y-auto">
          {navItems.map(([l, href]) => (
            <Link
              key={l}
              href={href}
              onClick={onClose}
              className="block py-4 text-3xl uppercase border-b transition-colors hover:text-[#E0231C] active:text-[#E0231C]"
              style={{ fontFamily: 'var(--font-anton)', color: INK, borderColor: 'rgba(27,42,107,0.15)' }}
            >
              {l}
            </Link>
          ))}
        </nav>

        <div className="px-6 py-5 text-center" style={{ background: NAVY }}>
          <p className="text-white text-xs tracking-[0.3em]" style={label}>
            EST. 2026 &middot; MADE FOR MALAYSIA
          </p>
        </div>
      </div>
    </div>
  );
}

export function VarsityHeader({ overlay = false }: { overlay?: boolean }) {
  const { itemCount } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const fg = overlay ? '#FFFFFF' : INK;
  return (
    <>
      {!overlay && (
        <div style={{ background: NAVY }} className="text-center text-white py-2">
          <span style={label} className="text-sm">FREE SHIPPING OVER RM150 &nbsp;&#9642;&nbsp; EST. 2026 &nbsp;&#9642;&nbsp; MADE FOR MALAYSIA</span>
        </div>
      )}
      <header
        className={overlay ? 'fixed top-0 left-0 right-0 z-40' : 'sticky top-0 z-40'}
        style={
          overlay
            ? { background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))' }
            : { background: CREAM, borderBottom: `3px solid ${NAVY}` }
        }
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-1.5 -ml-1.5 transition-colors hover:text-[#E0231C]"
              style={{ color: fg }}
            >
              <Menu className="w-7 h-7" />
            </button>
            <Link href={base} className="flex items-center">
              {overlay ? (
                <span className="text-2xl text-white" style={{ fontFamily: 'var(--font-anton)', letterSpacing: '0.04em' }}>GuanerDott.</span>
              ) : (
                <img src="/images/logo.png" alt="GuanerDott." className="h-12 sm:h-16 w-auto transition-transform duration-300 hover:scale-105" />
              )}
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-base" style={{ ...label, color: fg }}>
            {navItems.map(([l, href]) => (
              <Link key={l} href={href} className="relative transition-colors hover:text-[#E0231C] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#E0231C] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">{l}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-4" style={{ ...label, color: fg }}>
            <button onClick={() => setSearchOpen(true)} className="inline-flex items-center gap-1.5 text-lg cursor-pointer hover:text-[#E0231C] transition-colors" style={{ ...label, color: fg }}>
              <Search className="w-5 h-5" /> SEARCH
            </button>
            <Link href={`${base}/cart`} className="text-lg px-3 py-1 text-white transition-transform active:scale-95 hover:brightness-110" style={{ background: RED }}>CART&nbsp;{itemCount}</Link>
          </div>
        </div>
      </header>
      <VarsitySearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <VarsityMobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
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
          <img src="/images/logo.png" alt="GuanerDott." className="h-14 w-auto mb-3 transition-transform duration-300 hover:scale-105" />
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
      <div className="text-center text-xs text-white/30 pb-8">&copy; 2026 GuanerDott. All rights reserved.</div>
    </footer>
  );
}
