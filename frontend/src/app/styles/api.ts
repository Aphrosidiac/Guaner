import { products as fallbackProducts, categories as fallbackCategories } from './data';

// Server-side fetch for the design showcase pages. Pulls the real catalog from
// the backend so the mockups render live products + images, with a static
// fallback so a page never renders empty if the API is unreachable.

const API = process.env.NEXT_PUBLIC_API_URL || '';

export interface ShowcaseProduct {
  code: string;
  slug: string;
  name: string;
  category: string;
  price: number; // RM
  imageUrl: string | null;
  tag?: string;
}
export interface ShowcaseCategory {
  name: string;
  count: number;
  blurb: string;
}

interface ApiProduct {
  code: string;
  slug: string;
  name: string;
  price: number; // sen
  imageUrl: string | null;
  featured: boolean;
  category: { name: string } | null;
}
interface ApiCategory {
  name: string;
  productCount: number;
  description: string | null;
}

export async function getShowcaseData(): Promise<{ products: ShowcaseProduct[]; categories: ShowcaseCategory[] }> {
  try {
    const [pRes, cRes] = await Promise.all([
      fetch(`${API}/api/v1/products?limit=12`, { cache: 'no-store' }),
      fetch(`${API}/api/v1/categories`, { cache: 'no-store' }),
    ]);
    if (!pRes.ok || !cRes.ok) throw new Error('bad response');

    const pJson = (await pRes.json()) as { data: ApiProduct[] };
    const cJson = (await cRes.json()) as ApiCategory[];

    const products: ShowcaseProduct[] = (pJson.data ?? []).map((p) => ({
      code: p.code,
      slug: p.slug,
      name: p.name,
      category: p.category?.name ?? '',
      price: Math.round(p.price / 100),
      imageUrl: p.imageUrl ?? null,
      tag: p.featured ? 'Featured' : undefined,
    }));
    const categories: ShowcaseCategory[] = (cJson ?? []).map((c) => ({
      name: c.name,
      count: c.productCount ?? 0,
      blurb: c.description ?? '',
    }));

    if (products.length === 0) throw new Error('empty catalog');
    return { products, categories };
  } catch {
    // API down — fall back to static demo data so the page still renders.
    return {
      products: fallbackProducts.map((p) => ({
        ...p,
        slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        imageUrl: null,
      })),
      categories: fallbackCategories,
    };
  }
}

export interface ShowcaseProductFull {
  id: string;
  code: string;
  slug: string;
  name: string;
  category: string;
  priceSen: number; // sen — for cart
  imageUrl: string | null;
  size: string | null;
  description: string | null;
  stock: number;
}

export async function getShowcaseProduct(slug: string): Promise<ShowcaseProductFull | null> {
  try {
    const res = await fetch(`${API}/api/v1/products/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const p = (await res.json()) as ApiProduct & {
      id: string;
      size: string | null;
      description: string | null;
      stock: number;
    };
    return {
      id: p.id,
      code: p.code,
      slug: p.slug,
      name: p.name,
      category: p.category?.name ?? '',
      priceSen: p.price,
      imageUrl: p.imageUrl ?? null,
      size: p.size ?? null,
      description: p.description ?? null,
      stock: p.stock ?? 0,
    };
  } catch {
    return null;
  }
}
