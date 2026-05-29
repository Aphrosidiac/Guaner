import Link from 'next/link';
import { showcaseFontVars } from '../fonts';
import { rm } from '../data';
import { getShowcaseData } from '../api';

const PAPER = '#FBFAF8';
const INK = '#1A1A1A';
const LINE = '#E4E1DA';
const NAVY = '#1B2A6B';
const MUTED = '#8A857C';

const serif = { fontFamily: 'var(--font-fraunces)' } as const;
const caps = { letterSpacing: '0.22em' } as const;

export default async function MinimalMockup() {
  const { products, categories } = await getShowcaseData();
  return (
    <div className={showcaseFontVars} style={{ background: PAPER, color: INK, fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
      {/* Navbar */}
      <header className="sticky top-0 z-40" style={{ background: 'rgba(251,250,248,0.85)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${LINE}` }}>
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/styles"><img src="/images/logo.png" alt="GUANER" className="h-9 w-auto" /></Link>
          <nav className="hidden md:flex items-center gap-10 text-xs uppercase" style={caps}>
            {['Products', 'Collections', 'About'].map((l) => <a key={l} href="/styles/minimal/products" className="hover:opacity-60 transition-opacity">{l}</a>)}
          </nav>
          <div className="flex items-center gap-6 text-xs uppercase" style={caps}>
            <a href="/styles/minimal/products" className="hover:opacity-60">Search</a>
            <a href="/styles/minimal/cart" className="hover:opacity-60">Cart (0)</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-24 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs uppercase mb-8" style={{ ...caps, color: MUTED }}>Quality clothing &mdash; Est. 2026</p>
          <h1 style={serif} className="text-5xl sm:text-6xl leading-[1.05] font-light">
            Considered<br />essentials for<br />the everyday.
          </h1>
          <div className="mt-10 flex items-center gap-8">
            <a href="#collection" className="text-sm border-b pb-1 transition-colors" style={{ borderColor: INK }}>View the collection</a>
            <a href="/styles/minimal/products" className="text-sm pb-1 transition-colors hover:opacity-60" style={{ color: MUTED }}>Our story &rarr;</a>
          </div>
        </div>
        {/* Large editorial image area */}
        <div className="relative">
          <div className="aspect-[4/5] rounded-sm overflow-hidden flex items-center justify-center" style={{ background: '#F1EEE7', border: `1px solid ${LINE}` }}>
            {products[0]?.imageUrl ? (
              <img src={products[0].imageUrl} alt="GUANER" className="w-full h-full object-cover" />
            ) : (
              <span style={{ ...serif, color: '#D8D3C8' }} className="text-7xl">GUANER</span>
            )}
          </div>
          <p className="absolute -bottom-6 left-0 text-xs uppercase" style={{ ...caps, color: MUTED }}>Spring / Summer 26</p>
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${LINE}` }} />

      {/* Categories as refined list */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <p className="text-xs uppercase mb-8" style={{ ...caps, color: MUTED }}>Categories</p>
        <div>
          {categories.map((c, i) => (
            <a key={c.name} href="/styles/minimal/products" className="group flex items-center justify-between py-6 transition-colors" style={{ borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
              <div className="flex items-baseline gap-6">
                <span className="text-xs tabular-nums" style={{ color: MUTED }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={serif} className="text-3xl sm:text-4xl font-light group-hover:opacity-60 transition-opacity">{c.name}</span>
              </div>
              <div className="flex items-center gap-8">
                <span className="hidden sm:block text-sm" style={{ color: MUTED }}>{c.blurb}</span>
                <span className="text-sm transition-transform group-hover:translate-x-1">&rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div style={{ borderTop: `1px solid ${LINE}` }} />

      {/* Product grid */}
      <section id="collection" className="max-w-6xl mx-auto px-8 py-16">
        <div className="flex items-baseline justify-between mb-12">
          <h2 style={serif} className="text-3xl sm:text-4xl font-light">Featured pieces</h2>
          <a href="/styles/minimal/products" className="text-xs uppercase" style={{ ...caps, color: MUTED }}>All products &rarr;</a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((p) => (
            <a key={p.code} href="/styles/minimal/products" className="group">
              <div className="aspect-[4/5] rounded-sm mb-4 flex items-center justify-center overflow-hidden transition-colors" style={{ background: '#F1EEE7' }}>
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                  <span style={{ ...serif, color: '#D8D3C8' }} className="text-2xl group-hover:scale-105 transition-transform">{p.code}</span>
                )}
              </div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-medium leading-snug">{p.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: MUTED }}>{p.category}</p>
                </div>
                <p className="text-sm tabular-nums" style={{ color: INK }}>{rm(p.price)}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Quiet CTA */}
      <section className="px-8 py-24 text-center">
        <p className="text-xs uppercase mb-5" style={{ ...caps, color: NAVY }}>Free shipping over RM150</p>
        <h2 style={serif} className="text-4xl sm:text-5xl font-light max-w-2xl mx-auto leading-tight">Fewer, better things — made to be worn for years.</h2>
        <a href="/styles/minimal/products" className="inline-block mt-10 text-sm border-b pb-1" style={{ borderColor: INK }}>Browse the collection</a>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${LINE}` }}>
        <div className="max-w-6xl mx-auto px-8 py-14 grid sm:grid-cols-4 gap-10">
          <div className="sm:col-span-1">
            <img src="/images/logo.png" alt="GUANER" className="h-10 w-auto mb-4" />
            <p className="text-sm" style={{ color: MUTED }}>Quality clothing for the modern individual.</p>
          </div>
          {[['Shop', ['Products', 'Track Order', 'Shipping']], ['Support', ['FAQ', 'About']], ['Legal', ['Terms', 'Privacy']]].map(([h, items]) => (
            <div key={h as string}>
              <p className="text-xs uppercase mb-4" style={{ ...caps, color: MUTED }}>{h as string}</p>
              {(items as string[]).map((it) => <a key={it} href="/styles/minimal/products" className="block text-sm py-1 hover:opacity-60">{it}</a>)}
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-8 pb-10 text-xs" style={{ color: MUTED }}>&copy; 2026 GUANER. All rights reserved.</div>
      </footer>
    </div>
  );
}
