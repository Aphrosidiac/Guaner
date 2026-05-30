import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { themes } from '../../../themes';
import { Animate } from '@/components/ui/Animate';
import { getShowcaseProduct } from '../../../api';
import { formatPrice } from '@/lib/utils';
import { AddToCart } from '../../../_components/AddToCart';

export default async function ThemedDetail({ params }: { params: Promise<{ theme: string; slug: string }> }) {
  const { theme, slug } = await params;
  const t = themes[theme] ?? themes.varsity;
  const base = `/styles/${t.slug}`;
  const product = await getShowcaseProduct(slug);
  const heading: React.CSSProperties = { fontFamily: t.displayFont, textTransform: t.upper ? 'uppercase' : 'none' };

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <Link href={`${base}/products`} className="inline-flex items-center gap-1 text-sm mb-8" style={{ color: t.textMuted }}>
        <ArrowLeft className="w-4 h-4" /> Back to shop
      </Link>
      {!product ? (
        <p>Product not found. <Link href={`${base}/products`} className="underline">Back to shop</Link></p>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          <Animate variant="fade" duration={0.6} className="group overflow-hidden">
            <div className="overflow-hidden h-full" style={{ background: t.surfaceAlt, borderRadius: t.cardRadius ?? t.radius, border: t.slug !== 'varsity' ? `1px solid ${t.border}` : undefined }}>
              <div className="aspect-[4/5] flex items-center justify-center">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <span className="text-4xl" style={{ fontFamily: t.displayFont, color: t.textMuted }}>{product.code}</span>
                )}
              </div>
            </div>
          </Animate>
          <Animate variant="fadeUp" delay={0.12} duration={0.6}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: t.textMuted }}>{product.category}</p>
            <h1 className="text-4xl sm:text-5xl leading-tight" style={heading}>{product.name}</h1>
            {product.size && <p className="mt-2" style={{ color: t.textMuted }}>{product.size}</p>}
            <p className="mt-4 text-3xl font-bold" style={{ fontFamily: t.displayFont, color: t.accent }}>{formatPrice(product.priceSen)}</p>
            {product.description && <p className="mt-5 leading-relaxed" style={{ color: t.text }}>{product.description}</p>}
            <AddToCart
              product={{ id: product.id, code: product.code, name: product.name, size: product.size, priceSen: product.priceSen, imageUrl: product.imageUrl, stock: product.stock }}
              t={t}
            />
            <p className="mt-6 text-xs" style={{ color: t.textMuted }}>Code: {product.code}</p>
          </Animate>
        </div>
      )}
    </section>
  );
}
