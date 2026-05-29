import Link from 'next/link';
import { showcaseFontVars } from '../fonts';
import { rm } from '../data';
import { getShowcaseData } from '../api';

const NAVY = '#1B2A6B';
const RED = '#E0231C';
const CREAM = '#F4F1E8';
const INK = '#101A3A';

const display = { fontFamily: 'var(--font-anton)' } as const;
const label = { fontFamily: 'var(--font-bebas)', letterSpacing: '0.06em' } as const;

function StripeRule() {
  return (
    <div className="flex h-2 w-full">
      <div className="flex-1" style={{ background: NAVY }} />
      <div className="flex-1" style={{ background: RED }} />
      <div className="flex-1" style={{ background: CREAM }} />
      <div className="flex-1" style={{ background: RED }} />
      <div className="flex-1" style={{ background: NAVY }} />
    </div>
  );
}

export default async function VarsityMockup() {
  const { products, categories } = await getShowcaseData();
  return (
    <div className={showcaseFontVars} style={{ background: CREAM, color: INK, fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
      {/* Announcement */}
      <div style={{ background: NAVY }} className="text-center text-white text-xs py-2" >
        <span style={label} className="text-sm">FREE SHIPPING OVER RM150 &nbsp;&#9642;&nbsp; EST. 2026 &nbsp;&#9642;&nbsp; MADE FOR MALAYSIA</span>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40" style={{ background: CREAM, borderBottom: `3px solid ${NAVY}` }}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/styles" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="GUANER" className="h-12 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-lg" style={label}>
            {['SHOP', 'COLLECTIONS', 'ABOUT', 'TRACK ORDER'].map((l) => (
              <a key={l} href="/styles/varsity/products" className="hover:text-[color:var(--red)] transition-colors" style={{ ['--red' as string]: RED }}>{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4" style={label}>
            <span className="text-lg">SEARCH</span>
            <Link href="/styles/varsity/cart" className="text-lg px-3 py-1 rounded-full text-white" style={{ background: RED }}>CART&nbsp;0</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: CREAM }}>
        {/* faint stripe motif */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `repeating-linear-gradient(45deg, ${NAVY} 0 2px, transparent 2px 26px)` }} />
        <div className="relative max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-white text-sm" style={{ ...label, background: NAVY }}>
              <span style={{ color: '#fff' }}>&#9733;</span> EST. 2026 &#9642; MALAYSIA
            </div>
            <h1 style={display} className="text-6xl sm:text-7xl lg:text-8xl leading-[0.92] uppercase">
              <span style={{ color: NAVY }}>Quality</span><br />
              <span style={{ color: RED }}>Clothing</span><br />
              <span style={{ color: INK }}>Built to last</span>
            </h1>
            <p className="mt-6 text-lg max-w-md" style={{ color: '#3a4256' }}>
              Heavyweight tees, fleece hoodies and everyday staples — made for the long haul, dropped in limited runs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#shop" className="px-8 py-4 rounded-full text-white text-xl transition-transform hover:scale-[1.03]" style={{ ...label, background: RED }}>SHOP THE DROP &rarr;</a>
              <a href="/styles/varsity/products" className="px-8 py-4 rounded-full text-xl transition-colors hover:bg-black/5" style={{ ...label, border: `2px solid ${NAVY}`, color: NAVY }}>LOOKBOOK</a>
            </div>
          </div>
          {/* Crest card */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl rotate-3" style={{ background: NAVY }} />
              <div className="relative rounded-3xl p-10 flex items-center justify-center" style={{ background: '#fff', border: `4px solid ${RED}` }}>
                <img src="/images/logo.png" alt="GUANER crest" className="h-56 w-auto" />
              </div>
              <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-full text-white text-lg rotate-[-6deg]" style={{ ...label, background: RED }}>NEW SEASON</div>
            </div>
          </div>
        </div>
      </section>

      <StripeRule />

      {/* Trust strip */}
      <section style={{ background: NAVY }} className="text-white">
        <div className="max-w-6xl mx-auto px-6 py-7 grid sm:grid-cols-3 gap-6 text-center">
          {[
            ['PREMIUM FABRICS', '250–380gsm heavyweight cotton & fleece'],
            ['FAST NATIONWIDE', '1–4 day delivery across Malaysia'],
            ['SECURE CHECKOUT', 'FPX, cards & WhatsApp order'],
          ].map(([t, s]) => (
            <div key={t}>
              <p style={label} className="text-xl">{t}</p>
              <p className="text-sm text-white/60 mt-1">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 style={{ ...display, color: NAVY }} className="text-4xl sm:text-5xl uppercase">Shop by category</h2>
          <a href="/styles/varsity/products" style={label} className="text-lg" >VIEW ALL &rarr;</a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((c, i) => {
            const bg = [NAVY, RED, INK, NAVY][i % 4];
            return (
              <a key={c.name} href="/styles/varsity/products" className="group relative rounded-2xl p-6 h-44 flex flex-col justify-between text-white overflow-hidden transition-transform hover:-translate-y-1" style={{ background: bg }}>
                <span className="absolute -right-3 -top-4 text-8xl opacity-10" style={display}>{String(i + 1).padStart(2, '0')}</span>
                <span style={label} className="text-2xl">{c.name}</span>
                <span className="text-sm text-white/70">{c.blurb} &#9642; {c.count} items</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section id="shop" className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-end justify-between mb-8">
          <h2 style={{ ...display, color: RED }} className="text-4xl sm:text-5xl uppercase">The lineup</h2>
          <span style={label} className="text-lg" >8 PIECES</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <Link key={p.code} href={`/styles/varsity/products/${p.slug}`} className="group block">
              <div className="relative rounded-2xl overflow-hidden mb-3" style={{ border: `2px solid ${NAVY}` }}>
                <div className="aspect-[4/5] flex items-center justify-center relative" style={{ background: i % 2 ? '#fff' : CREAM }}>
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `repeating-linear-gradient(45deg, ${NAVY} 0 2px, transparent 2px 22px)` }} />
                      <span style={{ ...display, color: NAVY }} className="text-3xl opacity-80">{p.code}</span>
                    </>
                  )}
                </div>
                {p.tag && <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-sm z-10" style={{ ...label, background: RED }}>{p.tag.toUpperCase()}</span>}
              </div>
              <p className="text-xs uppercase tracking-wider" style={{ color: '#7a8095' }}>{p.category}</p>
              <h3 className="font-semibold leading-snug" style={{ color: INK }}>{p.name}</h3>
              <p style={{ ...label, color: RED }} className="text-xl mt-1">{rm(p.price)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Marquee band */}
      <div style={{ background: RED }} className="text-white py-4 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap animate-[marquee_18s_linear_infinite]" style={label}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-2xl">GUANER &#9642; EST 2026 &#9642; QUALITY CLOTHING &#9642; BUILT TO LAST &#9642;</span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: INK }} className="text-white">
        <div className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-4 gap-8">
          <div className="sm:col-span-1">
            <img src="/images/logo.png" alt="GUANER" className="h-14 w-auto mb-3" />
            <p className="text-sm text-white/50">Quality clothing for the modern individual.</p>
          </div>
          {[['SHOP', ['Products', 'Track Order', 'Shipping']], ['SUPPORT', ['FAQ', 'About']], ['LEGAL', ['Terms', 'Privacy']]].map(([h, items]) => (
            <div key={h as string}>
              <p style={label} className="text-lg mb-3 text-white/80">{h as string}</p>
              {(items as string[]).map((it) => <a key={it} href="/styles/varsity/products" className="block text-sm text-white/50 hover:text-white py-1">{it}</a>)}
            </div>
          ))}
        </div>
        <div className="text-center text-xs text-white/30 pb-8">&copy; 2026 GUANER. All rights reserved.</div>
      </footer>

      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}
