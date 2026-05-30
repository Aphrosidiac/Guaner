import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { themes } from '../../themes';
import { getShowcaseData } from '../../api';
import { rm } from '../../data';
import { LookbookRail } from '../../_components/LookbookRail';
import { Animate } from '@/components/ui/Animate';

const LOOKS = [
  { n: '01', title: 'The Foundation', img: '/catalog/guaner-shirt-black-back-model-19.jpeg', slug: 'essential-oversized-tee', pos: 'center 45%' },
  { n: '02', title: 'Off Duty', img: '/catalog/guaner-shirt-black-front-10.jpeg', slug: 'washed-vintage-tee', pos: 'center 58%' },
  { n: '03', title: 'The Crew', img: '/catalog/guaner-shirt-black-front-back-model-22.jpeg', slug: 'logo-print-tee', pos: 'center 40%' },
  { n: '04', title: 'Heavyweight', img: '/catalog/guaner-design-basic-sweatshirt-01.jpeg', slug: 'heavyweight-hoodie', pos: 'center center' },
  { n: '05', title: 'In Motion', img: '/catalog/guaner-shirt-black-back-09.jpeg', slug: 'essential-joggers', pos: 'center 45%' },
];
const labels = ['Intro', '01', '02', '03', '04', '05', 'Detail', 'Shop'];

export default async function ThemedLookbook({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  const t = themes[theme] ?? themes.varsity;
  const base = `/styles/${t.slug}`;
  const disp = { fontFamily: t.displayFont } as const;
  const glass = t.slug === 'formal';
  const { products } = await getShowcaseData();
  const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));

  return (
    <div
      id="lookbook-scroll"
      className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
      style={{ background: t.primary, color: t.primaryText, fontFamily: t.bodyFont }}
    >
      <LookbookRail labels={labels} />

      {/* 0 — Title */}
      <section data-look-panel="0" className="snap-start h-screen relative flex flex-col items-center justify-center text-center px-6" style={{ background: t.primary }}>
        <Animate variant="scale" duration={0.9}>
          <img src="/images/logo.png" alt="GuanerDott." className="h-16 sm:h-24 w-auto mx-auto mb-8" />
        </Animate>
        <Animate variant="fadeUp" delay={0.2} duration={0.7}>
          <p className="text-[11px] tracking-[0.4em] text-white/50 mb-6" style={disp}>TUN HUSSEIN ONN</p>
        </Animate>
        <Animate variant="fadeUp" delay={0.32} duration={0.8}>
          <h1 className="text-6xl sm:text-8xl font-semibold tracking-[0.04em]" style={disp}>THE ARCHIVE</h1>
        </Animate>
        <Animate variant="fadeUp" delay={0.5} duration={0.7}>
          <p className="text-sm tracking-[0.35em] text-white/60 mt-6" style={disp}>SUMMER &rsquo;26</p>
        </Animate>
        <Animate variant="fade" delay={0.68} duration={0.8}>
          <p className="max-w-md mx-auto text-white/45 mt-8 text-sm leading-relaxed">Five looks, one uniform. Heavyweight cloth made to soften and age &mdash; shot across the field at golden hour.</p>
        </Animate>
        <Animate variant="fade" delay={1} duration={0.8} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[10px] tracking-[0.3em]" style={disp}>SCROLL</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </Animate>
      </section>

      {/* Looks */}
      {LOOKS.map((look, idx) => {
        const p = bySlug[look.slug];
        return (
          <section key={look.n} data-look-panel={String(idx + 1)} className="snap-start h-screen relative overflow-hidden">
            <img src={look.img} alt={`Look ${look.n} — ${look.title}`} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: look.pos }} />
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0) 28%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.6))' }} />
            <span className="absolute top-24 left-6 text-[11px] tracking-[0.3em] text-white/85" style={disp}>LOOK {look.n} / 05</span>
            <h2 className="absolute left-6 bottom-28 text-4xl sm:text-6xl font-semibold tracking-[0.02em] uppercase" style={disp}>{look.title}</h2>
            {p && (glass ? (
              <Link
                href={`${base}/products/${p.slug}`}
                className="liquid-glass-dark absolute left-6 bottom-10 inline-flex items-center gap-4 pl-5 pr-2.5 py-2.5 hover:scale-[1.02] transition-transform"
                style={{ borderRadius: 999 }}
              >
                <span className="text-[12px] tracking-[0.06em]">{p.name}</span>
                <span className="text-white/60 text-[12px]">{rm(p.price)}</span>
                <span className="flex items-center justify-center w-7 h-7 rounded-full" style={{ background: '#fff', color: '#111' }}><ArrowRight className="w-3.5 h-3.5" /></span>
              </Link>
            ) : (
              <Link
                href={`${base}/products/${p.slug}`}
                className="absolute left-6 bottom-10 inline-flex items-center gap-4 pl-4 pr-1.5 py-1.5 hover:-translate-y-0.5 transition-transform"
                style={{ background: t.bg, border: `2px solid ${t.primary}`, borderRadius: t.cardRadius ?? '0' }}
              >
                <span className="text-[13px] font-semibold tracking-[0.02em]" style={{ color: t.primary }}>{p.name}</span>
                <span className="text-[13px] font-bold" style={{ color: t.accent }}>{rm(p.price)}</span>
                <span className="flex items-center justify-center w-8 h-8" style={{ background: t.accent, color: t.accentText }}><ArrowRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </section>
        );
      })}

      {/* 6 — Detail interlude */}
      <section data-look-panel="6" className="snap-start h-screen relative overflow-hidden flex items-center">
        <img src="/catalog/guaner-shirt-black-back-print-21.jpeg" alt="The winged rose print" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
        <div className="relative max-w-2xl mx-auto text-center px-6">
          <p className="text-3xl sm:text-5xl font-light leading-snug" style={disp}>&ldquo;Made well, once. Worn for a lifetime.&rdquo;</p>
          <p className="text-[11px] tracking-[0.3em] text-white/55 mt-7" style={disp}>THE WINGED ROSE &mdash; HAND-DRAWN, EMBROIDERED</p>
        </div>
      </section>

      {/* 7 — Closing */}
      <section data-look-panel="7" className="snap-start h-screen relative flex flex-col items-center justify-center text-center px-6" style={{ background: t.primary }}>
        <p className="text-[11px] tracking-[0.4em] text-white/50 mb-6" style={disp}>SS&rsquo;26 ARCHIVE</p>
        <h2 className="text-5xl sm:text-7xl font-semibold tracking-[0.03em] leading-[0.95] mb-10" style={disp}>SHOP THE<br />COLLECTION</h2>
        <Link href={`${base}/products`} className="inline-flex items-center gap-3 px-10 h-12 text-xs tracking-[0.22em] font-semibold transition-transform active:scale-95" style={{ background: t.primaryText, color: t.primary, ...disp }}>
          VIEW ALL PRODUCTS <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href={base} className="mt-8 text-[11px] tracking-[0.25em] text-white/50 underline hover:text-white" style={disp}>BACK TO HOME</Link>
      </section>
    </div>
  );
}
