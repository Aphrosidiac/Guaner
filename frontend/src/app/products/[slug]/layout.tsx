import type { Metadata } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const apiBase = API_URL || '';
    const res = await fetch(`${apiBase}/api/v1/products/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return {};
    const product = await res.json();

    const title = `${product.name} ${product.size || ''} — GUANER`.trim();
    const description = product.description || `${product.name} ${product.size || ''} — Quality clothing from GUANER. RM${(product.price / 100).toFixed(2)}. Fast nationwide shipping.`;

    return {
      title,
      description,
      openGraph: {
        title: `${product.name} ${product.size || ''} | GUANER`,
        description,
        images: product.imageUrl ? [{ url: product.imageUrl, alt: product.name }] : undefined,
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title: `${product.name} ${product.size || ''} | GUANER`,
        description,
      },
    };
  } catch {
    return {};
  }
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
