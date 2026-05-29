import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { themes } from '../../themes';
import { Animate, Stagger } from '@/components/ui/Animate';
import { getShowcaseData } from '../../api';
import { rm } from '../../data';

export default async function ThemedNewDrop({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  const t = themes[theme] ?? themes.varsity;
  const base = `/styles/${t.slug}`;
  const { products } = await getShowcaseData({ featured: true });
  const heading: React.CSSProperties = { fontFamily: t.displayFont, textTransform: t.upper ? 'uppercase' : 'none' };
  const [feature, ...rest] = products;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <Animate variant="fadeUp">
        <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: t.accent }}>SS&rsquo;26 &middot; Just Landed</p>
        <h1 className="text-4xl sm:text-6xl" style={heading}>The Drop</h1>
        <p className="mt-4 max-w-md" style={{ color: t.textMuted }}>The latest from the archive &mdash; fresh pieces in limited runs.</p>
      </Animate>

      {products.length === 0 ? (
        <p className="mt-10" style={{ color: t.textMuted }}>No drop live right now. Check back soon.</p>
      ) : (
        <>
          {feature && (
            <Animate variant="fade" duration={0.6}>
              <Link href={`${base}/products/${feature.slug}`} className="group grid md:grid-cols-2 gap-8 items-center mt-12">
                <div className="overflow-hidden" style={{ background: t.surfaceAlt, borderRadius: t.radius, border: `1px solid ${t.border}` }}>
                  <div className="aspect-[4/5] flex items-center justify-center">
                    {feature.imageUrl ? (
                      <img src={feature.imageUrl} alt={feature.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <span className="text-4xl" style={{ fontFamily: t.displayFont, color: t.textMuted }}>{feature.code}</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="inline-block text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 mb-4" style={{ background: t.accent, color: t.accentText, borderRadius: t.radius }}>New</span>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: t.textMuted }}>{feature.category}</p>
                  <h2 className="text-3xl sm:text-4xl leading-tight" style={heading}>{feature.name}</h2>
                  <p className="mt-4 text-2xl font-bold" style={{ fontFamily: t.displayFont, color: t.accent }}>{rm(feature.price)}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm border-b pb-1" style={{ borderColor: t.text, color: t.text }}>
                    Shop this piece <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </Animate>
          )}

          {rest.length > 0 && (
            <>
              <Animate variant="fadeUp"><p className="text-xs uppercase tracking-[0.2em] mt-16 mb-6" style={{ color: t.textMuted }}>More from the drop</p></Animate>
              <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.06}>
                {rest.map((p) => (
                  <Link key={p.code} href={`${base}/products/${p.slug}`} className="group block transition-transform duration-300 hover:-translate-y-1.5">
                    <div className="relative overflow-hidden mb-3" style={{ background: t.surfaceAlt, borderRadius: t.radius, border: `1px solid ${t.border}` }}>
                      <div className="aspect-[4/5] flex items-center justify-center">
                        {p.imageUrl ? (
                          <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <span className="text-2xl" style={{ fontFamily: t.displayFont, color: t.textMuted }}>{p.code}</span>
                        )}
                      </div>
                      <span className="absolute top-3 left-3 text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 z-10" style={{ background: t.accent, color: t.accentText, borderRadius: t.radius }}>New</span>
                    </div>
                    <p className="text-xs uppercase tracking-wider" style={{ color: t.textMuted }}>{p.category}</p>
                    <h3 className="font-semibold leading-snug" style={{ color: t.text }}>{p.name}</h3>
                    <p className="mt-1 font-bold text-lg" style={{ fontFamily: t.displayFont, color: t.accent }}>{rm(p.price)}</p>
                  </Link>
                ))}
              </Stagger>
            </>
          )}
        </>
      )}
    </section>
  );
}
