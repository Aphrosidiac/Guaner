import Link from 'next/link';
import { rm } from '../data';
import { getShowcaseData } from '../api';
import { Animate, Stagger } from '@/components/ui/Animate';
import { VarsityScrollCards } from '../_components/VarsityScrollCards';

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
  const { products } = await getShowcaseData();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: CREAM }}>
        {/* faint stripe motif */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `repeating-linear-gradient(45deg, ${NAVY} 0 2px, transparent 2px 26px)` }} />
        <div className="relative max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <Animate variant="fadeUp" duration={0.6}>
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 text-white text-sm" style={{ ...label, background: NAVY }}>
                <span style={{ color: '#fff' }}>&#9733;</span> EST. 2026 &#9642; MALAYSIA
              </div>
            </Animate>
            <Animate variant="fadeUp" delay={0.12} duration={0.7}>
              <h1 style={display} className="text-6xl sm:text-7xl lg:text-8xl leading-[0.92] uppercase">
                <span style={{ color: NAVY }}>Quality</span><br />
                <span style={{ color: RED }}>Clothing</span><br />
                <span style={{ color: INK }}>Built to last</span>
              </h1>
            </Animate>
            <Animate variant="fadeUp" delay={0.28} duration={0.7}>
              <p className="mt-6 text-lg max-w-md" style={{ color: '#3a4256' }}>
                Heavyweight tees, fleece hoodies and everyday staples — made for the long haul, dropped in limited runs.
              </p>
            </Animate>
            <Animate variant="fadeUp" delay={0.42} duration={0.7}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#shop" className="px-8 py-4 text-white text-xl transition-transform hover:scale-[1.03] active:scale-95" style={{ ...label, background: RED }}>SHOP THE DROP &rarr;</a>
                <a href="/styles/varsity/lookbook" className="px-8 py-4 text-xl transition-colors hover:bg-black/5" style={{ ...label, border: `2px solid ${NAVY}`, color: NAVY }}>LOOKBOOK</a>
              </div>
            </Animate>
          </div>
          {/* Crest card */}
          <div className="hidden lg:flex justify-center">
            <Animate variant="scale" delay={0.2} duration={0.8} className="relative">
              <div className="absolute inset-0 translate-x-4 translate-y-4" style={{ background: RED }} />
              <div className="relative bg-white transition-transform duration-300 hover:translate-x-2 hover:translate-y-2">
                <div className="px-5 py-2 text-center text-lg text-white" style={{ ...label, background: RED }}>NEW SEASON</div>
                <div className="p-10 flex items-center justify-center">
                  <img src="/images/logo.png" alt="GuanerDott. crest" className="h-56 w-auto" />
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      <StripeRule />

      {/* Trust strip */}
      <section style={{ background: NAVY }} className="text-white">
        <Stagger className="max-w-6xl mx-auto px-6 py-7 grid sm:grid-cols-3 gap-6 text-center" stagger={0.12} variant="fade">
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
        </Stagger>
      </section>

      {/* Scroll-pinned photo cards */}
      <VarsityScrollCards />

      {/* Featured products */}
      <section id="shop" className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <Animate variant="fadeUp">
          <div className="flex items-end justify-between mb-8">
            <h2 style={{ ...display, color: RED }} className="text-4xl sm:text-5xl uppercase">The lineup</h2>
            <span style={label} className="text-lg" >8 PIECES</span>
          </div>
        </Animate>
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.07}>
          {products.map((p, i) => (
            <Link key={p.code} href={`/styles/varsity/products/${p.slug}`} className="group block transition-transform duration-300 hover:-translate-y-1.5">
              <div className="relative overflow-hidden mb-3">
                <div className="aspect-[4/5] flex items-center justify-center relative" style={{ background: i % 2 ? '#fff' : CREAM }}>
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
        </Stagger>
      </section>

      {/* Marquee band */}
      <div style={{ background: RED }} className="text-white py-4 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap animate-[marquee_18s_linear_infinite]" style={label}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-2xl">GUANERDOTT. &#9642; EST 2026 &#9642; QUALITY CLOTHING &#9642; BUILT TO LAST &#9642;</span>
          ))}
        </div>
      </div>

      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </>
  );
}
