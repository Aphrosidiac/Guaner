// Static demo data for the style showcase pages (mirrors the seeded catalog).
export interface DemoProduct {
  code: string;
  name: string;
  category: string;
  price: number; // RM
  tag?: string;
}

export const products: DemoProduct[] = [
  { code: 'GN-TS001', name: 'Essential Oversized Tee', category: 'T-Shirts', price: 89, tag: 'Bestseller' },
  { code: 'GN-HD001', name: 'Heavyweight Hoodie', category: 'Hoodies', price: 159, tag: 'New' },
  { code: 'GN-PT001', name: 'Relaxed Cargo Pants', category: 'Pants', price: 129 },
  { code: 'GN-TS003', name: 'Washed Vintage Tee', category: 'T-Shirts', price: 95 },
  { code: 'GN-PT002', name: 'Essential Joggers', category: 'Pants', price: 109, tag: 'New' },
  { code: 'GN-HD002', name: 'Zip-Up Hoodie', category: 'Hoodies', price: 169 },
  { code: 'GN-TS002', name: 'Logo Print Tee', category: 'T-Shirts', price: 79, tag: 'Bestseller' },
  { code: 'GN-CP001', name: 'Embroidered Cap', category: 'Caps', price: 49 },
];

export const categories = [
  { name: 'T-Shirts', count: 3, blurb: 'Heavyweight everyday tees' },
  { name: 'Hoodies', count: 2, blurb: 'Fleece built to last' },
  { name: 'Pants', count: 2, blurb: 'Cargos & joggers' },
  { name: 'Caps', count: 1, blurb: 'Headwear & extras' },
];

export const rm = (n: number) => `RM${n}`;
