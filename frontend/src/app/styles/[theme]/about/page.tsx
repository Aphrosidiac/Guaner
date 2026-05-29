'use client';

import Link from 'next/link';
import { ThemedShell, useTheme } from '../../_components/ThemedShell';
import { Animate } from '@/components/ui/Animate';

export default function ThemedAbout() {
  const t = useTheme();
  const base = `/styles/${t.slug}`;
  const heading: React.CSSProperties = { fontFamily: t.displayFont, textTransform: t.upper ? 'uppercase' : 'none' };

  return (
    <ThemedShell>
      <section className="max-w-3xl mx-auto px-6 py-16">
        <Animate variant="fadeUp"><p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: t.accent }}>About</p></Animate>
        <Animate variant="fadeUp" delay={0.1}><h1 className="text-4xl sm:text-5xl mb-6 leading-tight" style={heading}>Quality clothing, built to last.</h1></Animate>
        <Animate variant="fadeUp" delay={0.2}>
          <p className="text-lg leading-relaxed mb-4" style={{ color: t.text }}>
            GUANER makes heavyweight everyday staples &mdash; tees, hoodies and more &mdash; designed to look good, feel better, and age well. Dropped in limited runs and shipped nationwide across Malaysia.
          </p>
        </Animate>
        <Animate variant="fadeUp" delay={0.3}>
          <p className="leading-relaxed mb-8" style={{ color: t.textMuted }}>
            You&apos;re viewing the <strong>{t.label}</strong> design direction. Browse the shop to see the full catalog rendered in this theme.
          </p>
        </Animate>
        <Animate variant="fadeUp" delay={0.4}>
          <Link href={`${base}/products`} className="inline-block px-6 py-3 font-semibold transition-transform active:scale-[0.97] hover:brightness-110" style={{ background: t.accent, color: t.accentText, borderRadius: t.radius, fontFamily: t.displayFont, textTransform: t.upper ? 'uppercase' : 'none' }}>
            Browse the shop
          </Link>
        </Animate>
      </section>
    </ThemedShell>
  );
}
