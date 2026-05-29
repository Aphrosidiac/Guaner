'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { themes, type Theme } from '../themes';
import { useCart } from '@/lib/cart';
import { VarsityHeader, VarsityFooter } from './VarsityChrome';
import { FormalHeader, FormalFooter, FormalChatBubble } from './FormalChrome';

export function useTheme(): Theme {
  const params = useParams();
  const slug = String(params.theme ?? 'varsity');
  return themes[slug] ?? themes.varsity;
}

// Shared nav + footer for the themed inner pages. The [theme] layout already
// applies the base background / font; this adds the chrome on top.
export function ThemedShell({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  const pathname = usePathname();
  const { itemCount } = useCart();
  const base = `/styles/${t.slug}`;
  const navStyle: React.CSSProperties = {
    fontFamily: t.displayFont,
    textTransform: t.upper ? 'uppercase' : 'none',
    letterSpacing: t.upper ? '0.05em' : '0',
  };

  // Per-theme bespoke chrome so inner pages match the homepage header/footer.
  if (t.slug === 'varsity') {
    return (
      <>
        <VarsityHeader />
        <main className="flex-1 w-full">{children}</main>
        <VarsityFooter />
      </>
    );
  }

  if (t.slug === 'formal') {
    const isHome = pathname === '/styles/formal';
    return (
      <>
        <FormalHeader overlay={isHome} />
        <main className={isHome ? 'w-full' : 'flex-1 w-full pt-16'}>{children}</main>
        <FormalFooter />
        <FormalChatBubble />
      </>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-40" style={{ background: t.surface, borderBottom: `1px solid ${t.border}` }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={base} aria-label="Home" className="flex items-center">
            <img src="/images/logo.png" alt="GUANER" className="h-9 w-auto" />
          </Link>
          <nav className="hidden sm:flex items-center gap-7 text-sm" style={navStyle}>
            <Link href={base} className="hover:opacity-70 transition-opacity">Home</Link>
            <Link href={`${base}/products`} className="hover:opacity-70 transition-opacity">Shop</Link>
            <Link href={`${base}/about`} className="hover:opacity-70 transition-opacity">About</Link>
          </nav>
          <Link
            href={`${base}/cart`}
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium"
            style={{ background: t.accent, color: t.accentText, borderRadius: t.radius }}
          >
            <ShoppingCart className="w-4 h-4" /> {itemCount}
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full">{children}</main>

      <footer style={{ background: t.primary, color: t.primaryText }} className="mt-20">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src="/images/logo.png" alt="GUANER" className="h-12 w-auto" />
          <p className="text-sm opacity-70">&copy; 2026 GUANER &mdash; {t.label} demo</p>
          <Link href="/styles" className="text-sm underline opacity-80 hover:opacity-100">&larr; Switch theme</Link>
        </div>
      </footer>
    </>
  );
}
