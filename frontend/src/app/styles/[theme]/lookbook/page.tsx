import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { getShowcaseData } from '../../api';
import { rm } from '../../data';
import { LookbookRail } from '../../_components/LookbookRail';

const INK = '#0A0A0A';
const out = { fontFamily: 'var(--font-outfit)' } as const;

const LOOKS = [
  { n: '01', title: 'The Foundation', img: '/catalog/guaner-shirt-black-back-model-19.jpeg', slug: 'essential-oversized-tee', pos: 'center 45%' },
  { n: '02', title: 'Off Duty', img: '/catalog/guaner-shirt-black-front-10.jpeg', slug: 'washed-vintage-tee', pos: 'center 58%' },
  { n: '03', title: 'The Crew', img: '/catalog/guaner-shirt-black-front-back-model-22.jpeg', slug: 'logo-print-tee', pos: 'center 40%' },
  { n: '04', title: 'Heavyweight', img: '/catalog/guaner-design-basic-sweatshirt-01.jpeg', slug: 'heavyweight-hoodie', pos: 'center center' },
  { n: '05', title: 'In Motion', img: '/catalog/guaner-shirt-black-back-09.jpeg', slug: 'essential-joggers', pos: 'center 45%' },
];
const labels = ['Intro', '01', '02', '03', '04', '05', 'Detail', 'Shop'];

export default async function FormalLookbook() {
  const { products } = await getShowcaseData();
  const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));

  return (
    <div
      id="lookbook-scroll"
      className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
      style={{ background: INK, color: '#fff', fontFamily: 'var(--font-inter)' }}
    >
      <LookbookRail labels={labels} />

      {/* 0 — Title */}
      <section data-look-panel="0" className="snap-start h-screen relative flex flex-col items-center justify-center text-center px-6" style={{ background: INK }}>
        <p className="text-[11px] tracking-[0.4em] text-white/50 mb-6" style={out}>GUANER &mdash; TUN HUSSEIN ONN</p>
        <h1 className="text-6xl sm:text-8xl font-semibold tracking-[0.04em]" style={out}>THE ARCHIVE</h1>
        <p className="text-sm tracking-[0.35em] text-white/60 mt-6" style={out}>SUMMER &rsquo;26</p>
        <p className="max-w-md text-white/45 mt-8 text-sm leading-relaxed">Five looks, one uniform. Heavyweight cloth made to soften and age &mdash; shot across the field at golden hour.</p>
        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[10px] tracking-[0.3em]" style={out}>SCROLL</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* Looks */}
      {LOOKS.map((look, idx) => {
        const p = bySlug[look.slug];
        return (
          <section key={look.n} data-look-panel={String(idx + 1)} className="snap-start h-screen relative overflow-hidden">
            <img src={look.img} alt={`Look ${look.n} — ${look.title}`} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: look.pos }} />
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0) 28%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.6))' }} />
            <span className="absolute top-24 left-6 text-[11px] tracking-[0.3em] text-white/85" style={out}>LOOK {look.n} / 05</span>
            <h2 className="absolute left-6 bottom-28 text-4xl sm:text-6xl font-semibold tracking-[0.02em] uppercase" style={out}>{look.title}</h2>
            {p && (
              <Link
                href={`/styles/formal/products/${p.slug}`}
                className="liquid-glass-dark absolute left-6 bottom-10 inline-flex items-center gap-4 pl-5 pr-2.5 py-2.5 hover:scale-[1.02] transition-transform"
                style={{ borderRadius: 999 }}
              >
                <span className="text-[12px] tracking-[0.06em]">{p.name}</span>
                <span className="text-white/60 text-[12px]">{rm(p.price)}</span>
                <span className="flex items-center justify-center w-7 h-7 rounded-full" style={{ background: '#fff', color: '#111' }}><ArrowRight className="w-3.5 h-3.5" /></span>
              </Link>
            )}
          </section>
        );
      })}

      {/* 6 — Detail interlude */}
      <section data-look-panel="6" className="snap-start h-screen relative overflow-hidden flex items-center">
        <img src="/catalog/guaner-shirt-black-back-print-21.jpeg" alt="The winged rose print" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
        <div className="relative max-w-2xl mx-auto text-center px-6">
          <p className="text-3xl sm:text-5xl font-light leading-snug" style={out}>&ldquo;Made well, once. Worn for a lifetime.&rdquo;</p>
          <p className="text-[11px] tracking-[0.3em] text-white/55 mt-7" style={out}>THE WINGED ROSE &mdash; HAND-DRAWN, EMBROIDERED</p>
        </div>
      </section>

      {/* 7 — Closing */}
      <section data-look-panel="7" className="snap-start h-screen relative flex flex-col items-center justify-center text-center px-6" style={{ background: INK }}>
        <p className="text-[11px] tracking-[0.4em] text-white/50 mb-6" style={out}>SS&rsquo;26 ARCHIVE</p>
        <h2 className="text-5xl sm:text-7xl font-semibold tracking-[0.03em] leading-[0.95] mb-10" style={out}>SHOP THE<br />COLLECTION</h2>
        <Link href="/styles/formal/products" className="inline-flex items-center gap-3 px-10 h-12 text-xs tracking-[0.22em] font-semibold transition-transform active:scale-95" style={{ background: '#fff', color: '#111', ...out }}>
          VIEW ALL PRODUCTS <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href="/styles/formal" className="mt-8 text-[11px] tracking-[0.25em] text-white/50 underline hover:text-white" style={out}>BACK TO HOME</Link>
      </section>
    </div>
  );
}
