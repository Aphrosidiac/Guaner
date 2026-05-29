import Link from 'next/link';
import { showcaseFontVars } from '../fonts';
import { products, categories, rm } from '../data';

const CREAM = '#EFE7D6';
const NAVY = '#34425A';
const RUST = '#B0432F';
const BROWN = '#6B5844';

const serif = { fontFamily: 'var(--font-dm-serif)' } as const;
const script = { fontFamily: 'var(--font-caveat)' } as const;

// subtle paper grain as an inline SVG data URI
const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

export default function VintageMockup() {
  return (
    <div className={showcaseFontVars} style={{ background: CREAM, color: BROWN, fontFamily: 'var(--font-inter), system-ui, sans-serif', position: 'relative' }}>
      {/* grain overlay */}
      <div className="pointer-events-none fixed inset-0 z-[60] mix-blend-multiply opacity-[0.10]" style={{ backgroundImage: GRAIN }} />

      {/* Navbar */}
      <header className="sticky top-0 z-40" style={{ background: CREAM, borderBottom: `2px solid ${BROWN}` }}>
        <div className="max-w-5xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/styles" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="GUANER" className="h-12 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">
            {['Shop', 'Story', 'Stockists', 'Contact'].map((l) => <a key={l} href="#" className="hover:text-[#B0432F] transition-colors">{l}</a>)}
          </nav>
          <a href="#" className="text-sm uppercase tracking-widest hover:text-[#B0432F]">Bag (0)</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="max-w-5xl mx-auto px-8 py-20 text-center">
          <p style={{ ...script, color: RUST }} className="text-3xl mb-1">since twenty twenty-six</p>
          <h1 style={{ ...serif, color: NAVY }} className="text-7xl sm:text-8xl leading-none">Guaner &amp; Co.</h1>
          <div className="flex items-center justify-center gap-3 my-6">
            <span className="h-px w-16" style={{ background: BROWN }} />
            <span className="text-xs uppercase tracking-[0.35em]" style={{ color: BROWN }}>Quality Clothing Goods</span>
            <span className="h-px w-16" style={{ background: BROWN }} />
          </div>
          <p className="max-w-md mx-auto text-[15px] leading-relaxed" style={{ color: BROWN }}>
            Honest, hard-wearing clothing in the old tradition — heavyweight cloth, considered cuts, made to soften and age with you.
          </p>
          <a href="#shop" className="inline-block mt-8 px-9 py-3.5 text-white text-sm uppercase tracking-widest rounded-sm transition-transform hover:scale-[1.03]" style={{ background: RUST }}>Browse the racks</a>
        </div>
        {/* worn divider */}
        <div className="h-1.5 w-full" style={{ background: `repeating-linear-gradient(90deg, ${NAVY} 0 18px, ${RUST} 18px 36px)`, opacity: 0.85 }} />
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-8 py-16">
        <h2 style={{ ...serif, color: NAVY }} className="text-4xl text-center mb-10">The Departments</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c) => (
            <a key={c.name} href="#" className="group text-center p-6 rounded-sm transition-colors hover:bg-black/[0.03]" style={{ border: `1.5px solid ${BROWN}` }}>
              <div className="mx-auto mb-4 h-16 w-16 rounded-full flex items-center justify-center text-white" style={{ background: NAVY }}>
                <span style={serif} className="text-2xl">{c.name[0]}</span>
              </div>
              <p style={{ ...serif, color: NAVY }} className="text-xl">{c.name}</p>
              <p className="text-xs mt-1" style={{ color: BROWN }}>{c.blurb}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="shop" className="max-w-5xl mx-auto px-8 pb-16">
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="h-px w-12" style={{ background: BROWN }} />
          <h2 style={{ ...serif, color: RUST }} className="text-4xl">This Season&apos;s Picks</h2>
          <span className="h-px w-12" style={{ background: BROWN }} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <a key={p.code} href="#" className="group">
              <div className="relative p-2 rounded-sm mb-3" style={{ background: '#fff', border: `1.5px solid ${BROWN}`, boxShadow: '3px 3px 0 rgba(107,88,68,0.25)' }}>
                <div className="aspect-[4/5] flex items-center justify-center rounded-sm" style={{ background: '#E7DCC6', border: `1px solid ${BROWN}33` }}>
                  <span style={{ ...serif, color: NAVY }} className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity">{p.code}</span>
                </div>
                {p.tag && <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white rounded-sm rotate-3" style={{ background: RUST }}>{p.tag}</span>}
              </div>
              <h3 style={{ ...serif, color: NAVY }} className="text-lg leading-tight">{p.name}</h3>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs uppercase tracking-wider" style={{ color: BROWN }}>{p.category}</span>
                <span style={{ color: RUST }} className="font-semibold">{rm(p.price)}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Story band */}
      <section className="relative py-20 px-8 text-center" style={{ background: NAVY, color: CREAM }}>
        <p style={{ ...script, color: '#E7C9A3' }} className="text-3xl mb-2">our promise</p>
        <h2 style={serif} className="text-4xl sm:text-5xl max-w-2xl mx-auto leading-tight">Made well, once. Worn for a lifetime.</h2>
        <a href="#" className="inline-block mt-8 px-8 py-3 text-sm uppercase tracking-widest rounded-sm" style={{ background: RUST, color: '#fff' }}>Read our story</a>
      </section>

      {/* Footer */}
      <footer style={{ background: '#2A3547', color: CREAM }}>
        <div className="max-w-5xl mx-auto px-8 py-12 grid sm:grid-cols-4 gap-8">
          <div>
            <img src="/images/logo.png" alt="GUANER" className="h-14 w-auto mb-3" />
            <p className="text-sm" style={{ color: '#B9BFC9' }}>Quality clothing goods, est. 2026.</p>
          </div>
          {[['Shop', ['Products', 'Track Order', 'Shipping']], ['House', ['About', 'FAQ']], ['Legal', ['Terms', 'Privacy']]].map(([h, items]) => (
            <div key={h as string}>
              <p style={serif} className="text-lg mb-3">{h as string}</p>
              {(items as string[]).map((it) => <a key={it} href="#" className="block text-sm py-1 hover:text-white" style={{ color: '#B9BFC9' }}>{it}</a>)}
            </div>
          ))}
        </div>
        <div className="text-center text-xs pb-8" style={{ color: '#8A93A1' }}>&copy; 2026 GUANER &amp; CO. All rights reserved.</div>
      </footer>
    </div>
  );
}
