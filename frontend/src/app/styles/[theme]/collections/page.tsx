import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { themes } from '../../themes';
import { Animate, Stagger } from '@/components/ui/Animate';
import { getShowcaseData } from '../../api';

export default async function ThemedCollections({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  const t = themes[theme] ?? themes.varsity;
  const base = `/styles/${t.slug}`;
  const { products, categories } = await getShowcaseData();
  const heading: React.CSSProperties = { fontFamily: t.displayFont, textTransform: t.upper ? 'uppercase' : 'none' };
  const imgFor = (name: string) => products.find((p) => p.category === name && p.imageUrl)?.imageUrl ?? null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <Animate variant="fadeUp">
        <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: t.accent }}>Collections</p>
        <h1 className="text-4xl sm:text-6xl" style={heading}>Browse the collections</h1>
        <p className="mt-4 max-w-md" style={{ color: t.textMuted }}>Curated by category &mdash; pick a line to explore the full range.</p>
      </Animate>

      <Stagger className="grid sm:grid-cols-2 gap-5 mt-10" stagger={0.08}>
        {categories.map((c) => {
          const img = imgFor(c.name);
          return (
            <Link
              key={c.slug}
              href={`${base}/products?category=${c.slug}`}
              className="group relative block aspect-[16/10] overflow-hidden"
              style={{ borderRadius: t.radius, background: t.surfaceAlt, border: `1px solid ${t.border}` }}
            >
              {img ? (
                <img src={img} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-3xl" style={{ fontFamily: t.displayFont, color: t.textMuted }}>{c.name}</span>
              )}
              <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 55%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between text-white">
                <div>
                  <h2 className="text-2xl sm:text-3xl" style={heading}>{c.name}</h2>
                  <p className="text-xs tracking-[0.15em] uppercase text-white/70 mt-1">{c.count} {c.count === 1 ? 'piece' : 'pieces'}</p>
                </div>
                <span className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-transform group-hover:translate-x-1" style={{ background: '#fff', color: '#111' }}>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </Stagger>
    </section>
  );
}
