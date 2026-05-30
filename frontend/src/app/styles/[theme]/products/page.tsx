import Link from 'next/link';
import { themes } from '../../themes';
import { Animate, Stagger } from '@/components/ui/Animate';
import { getShowcaseData } from '../../api';
import { rm } from '../../data';

export default async function ThemedProducts({
  params,
  searchParams,
}: {
  params: Promise<{ theme: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { theme } = await params;
  const { category } = await searchParams;
  const t = themes[theme] ?? themes.varsity;
  const base = `/styles/${t.slug}`;
  const { products, categories } = await getShowcaseData({ category });
  const heading: React.CSSProperties = { fontFamily: t.displayFont, textTransform: t.upper ? 'uppercase' : 'none' };
  const active = category ?? '';

  const chip = (label: string, slug: string) => {
    const on = active === slug;
    return (
      <Link
        key={slug || 'all'}
        href={slug ? `${base}/products?category=${slug}` : `${base}/products`}
        className="px-4 py-2 text-[11px] tracking-[0.14em] uppercase transition-colors"
        style={
          on
            ? { background: t.primary, color: t.primaryText, borderRadius: t.cardRadius ?? t.radius}
            : { border: t.slug !== 'varsity' ? `1px solid ${t.border}` : undefined, color: t.text, borderRadius: t.cardRadius ?? t.radius}
        }
      >
        {label}
      </Link>
    );
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <Animate variant="fadeUp"><h1 className="text-4xl sm:text-5xl mb-6" style={heading}>Shop All</h1></Animate>

      <Animate variant="fadeUp" delay={0.05}>
        <div className="flex flex-wrap gap-2 mb-5">
          {chip('All', '')}
          {categories.map((c) => chip(c.name, c.slug))}
        </div>
        <p className="text-xs mb-8" style={{ color: t.textMuted }}>{products.length} {products.length === 1 ? 'piece' : 'pieces'}</p>
      </Animate>

      {products.length === 0 ? (
        <p style={{ color: t.textMuted }}>Nothing here yet.</p>
      ) : (
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.06}>
          {products.map((p) => (
            <Link key={p.code} href={`${base}/products/${p.slug}`} className="group block transition-transform duration-300 hover:-translate-y-1.5">
              <div className="overflow-hidden mb-3" style={{ background: t.surfaceAlt, borderRadius: t.cardRadius ?? t.radius, border: t.slug !== 'varsity' ? `1px solid ${t.border}` : undefined }}>
                <div className="aspect-[4/5] flex items-center justify-center">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <span className="text-2xl" style={{ fontFamily: t.displayFont, color: t.textMuted }}>{p.code}</span>
                  )}
                </div>
              </div>
              <p className="text-xs uppercase tracking-wider" style={{ color: t.textMuted }}>{p.category}</p>
              <h3 className="font-semibold leading-snug" style={{ color: t.text }}>{p.name}</h3>
              <p className="mt-1 font-bold text-lg" style={{ fontFamily: t.displayFont, color: t.accent }}>{rm(p.price)}</p>
            </Link>
          ))}
        </Stagger>
      )}
    </section>
  );
}
