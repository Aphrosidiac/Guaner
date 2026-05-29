import Link from 'next/link';
import { showcaseFontVars } from '../fonts';
import { rm } from '../data';
import { getShowcaseData } from '../api';

const BLACK = '#0A0A0A';
const RED = '#E0231C';

const heavy = { fontFamily: 'var(--font-archivo-black)' } as const;
const label = { fontFamily: 'var(--font-bebas)', letterSpacing: '0.08em' } as const;

function Ticker({ bg, color }: { bg: string; color: string }) {
  return (
    <div style={{ background: bg, color }} className="py-2.5 overflow-hidden border-y border-white/10">
      <div className="flex gap-6 whitespace-nowrap animate-[scrollx_15s_linear_infinite]" style={label}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="text-lg">NEW DROP &#9889; GUANER &#9889; LIMITED RUN &#9889; SHIP NATIONWIDE &#9889;</span>
        ))}
      </div>
    </div>
  );
}

export default async function StreetwearMockup() {
  const { products } = await getShowcaseData();
  return (
    <div className={showcaseFontVars} style={{ background: BLACK, color: '#fff', fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
      {/* Navbar */}
      <header className="sticky top-0 z-40" style={{ background: BLACK, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/styles" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="GUANER" className="h-10 w-auto bg-white rounded p-0.5" />
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-lg" style={label}>
            {['SHOP', 'DROPS', 'ABOUT'].map((l) => <a key={l} href="/styles/streetwear/products" className="hover:text-[#E0231C] transition-colors">{l}</a>)}
          </nav>
          <div className="flex items-center gap-3 text-lg" style={label}>
            <span>SEARCH</span>
            <Link href="/styles/streetwear/cart" style={{ color: RED }}>CART(0)</Link>
          </div>
        </div>
      </header>

      <Ticker bg={RED} color="#fff" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 pt-14 pb-8">
          <div className="flex items-center gap-3 mb-4" style={label}>
            <span className="px-2.5 py-1 text-sm" style={{ background: RED }}>FW26</span>
            <span className="text-white/50 text-base">VOLUME 01 &mdash; THE FOUNDATION</span>
          </div>
        </div>
        {/* Giant cut-off wordmark */}
        <div className="relative leading-[0.8] select-none" style={heavy}>
          <h1 className="px-5 text-[22vw] tracking-tighter" style={{ color: '#fff' }}>GUA</h1>
          <h1 className="px-5 text-[22vw] tracking-tighter -mt-[4vw]" style={{ WebkitTextStroke: `2px #fff`, color: 'transparent' }}>
            NER<span style={{ color: RED, WebkitTextStroke: '0' }}>.</span>
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-5 py-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <p className="text-white/60 max-w-sm text-lg">Heavyweight essentials, dropped in limited runs. No restocks, no filler.</p>
          <a href="#grid" className="self-start sm:self-auto px-10 py-4 text-xl text-white transition-transform hover:scale-105" style={{ ...label, background: RED }}>SHOP THE DROP &rarr;</a>
        </div>
      </section>

      <Ticker bg={BLACK} color="#fff" />

      {/* Asymmetric product grid */}
      <section id="grid" className="max-w-7xl mx-auto px-5 py-14">
        <h2 style={heavy} className="text-4xl sm:text-6xl mb-8 uppercase">The Drop</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[170px]">
          {products.map((p, i) => {
            // varied spans for asymmetry
            const spans = [
              'row-span-2', '', 'row-span-2 lg:col-span-2', '',
              '', 'row-span-2', '', 'lg:col-span-2',
            ];
            const span = spans[i % spans.length];
            const dark = i % 3 === 0;
            return (
              <a key={p.code} href="/styles/streetwear/products" className={`group relative overflow-hidden rounded-lg ${span}`} style={{ background: dark ? '#161616' : '#101010', border: '1px solid rgba(255,255,255,0.08)' }}>
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={heavy} className="text-5xl text-white/10 group-hover:text-white/20 transition-colors">{p.code.split('-')[1]}</span>
                  </div>
                )}
                {p.tag && <span className="absolute top-3 left-3 z-10 px-2 py-0.5 text-xs" style={{ ...label, background: RED }}>{p.tag.toUpperCase()}</span>}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-[11px] uppercase tracking-widest text-white/40">{p.category}</p>
                  <h3 className="font-semibold leading-tight">{p.name}</h3>
                  <p style={label} className="text-xl mt-0.5" >{rm(p.price)}</p>
                </div>
                <span className="absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: RED }}>+</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* Big statement */}
      <section className="relative py-20 px-5 text-center overflow-hidden" style={{ background: RED }}>
        <p style={label} className="text-white/70 text-lg mb-3">DESIGNED IN MALAYSIA &mdash; EST. 2026</p>
        <h2 style={heavy} className="text-5xl sm:text-7xl uppercase leading-none">Wear it<br />into the ground.</h2>
        <a href="/styles/streetwear/products" className="inline-block mt-8 px-10 py-4 text-xl bg-black text-white transition-transform hover:scale-105" style={label}>BROWSE ALL &rarr;</a>
      </section>

      {/* Footer */}
      <footer style={{ background: BLACK }} className="text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 py-12 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h3 style={heavy} className="text-3xl">GUANER<span style={{ color: RED }}>.</span></h3>
            <p className="text-sm text-white/40 mt-2 max-w-xs">Limited runs. Heavyweight builds. Shipped across Malaysia.</p>
          </div>
          <div className="flex gap-12" style={label}>
            {[['SHOP', ['Products', 'Drops', 'Track']], ['INFO', ['About', 'FAQ', 'Shipping']], ['LEGAL', ['Terms', 'Privacy']]].map(([h, items]) => (
              <div key={h as string}>
                <p className="text-lg text-white/80 mb-2">{h as string}</p>
                {(items as string[]).map((it) => <a key={it} href="/styles/streetwear/products" className="block text-sm text-white/40 hover:text-white py-0.5" style={{ fontFamily: 'var(--font-inter)' }}>{it}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-xs text-white/25 pb-8">&copy; 2026 GUANER. ALL RIGHTS RESERVED.</div>
      </footer>

      <style>{`@keyframes scrollx { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}
