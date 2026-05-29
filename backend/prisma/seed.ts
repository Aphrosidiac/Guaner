import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 't-shirts' },
      update: {},
      create: { name: 'T-Shirts', slug: 't-shirts', description: 'Essential tees for everyday wear', sortOrder: 1 },
    }),
    prisma.category.upsert({
      where: { slug: 'hoodies' },
      update: {},
      create: { name: 'Hoodies', slug: 'hoodies', description: 'Hoodies & sweatshirts', sortOrder: 2 },
    }),
    prisma.category.upsert({
      where: { slug: 'pants' },
      update: {},
      create: { name: 'Pants', slug: 'pants', description: 'Pants & joggers', sortOrder: 3 },
    }),
    prisma.category.upsert({
      where: { slug: 'caps' },
      update: {},
      create: { name: 'Caps', slug: 'caps', description: 'Caps & headwear', sortOrder: 4 },
    }),
    prisma.category.upsert({
      where: { slug: 'accessories' },
      update: {},
      create: { name: 'Accessories', slug: 'accessories', description: 'Bags, socks & more', sortOrder: 5 },
    }),
  ]);

  const [teesCat, hoodiesCat, pantsCat, capsCat] = categories;

  const products = [
    { code: 'GN-TS001', name: 'Essential Oversized Tee', slug: 'essential-oversized-tee', categoryId: teesCat.id, size: 'S-XL', price: 8900, stock: 200, description: 'Premium heavyweight cotton oversized tee. Relaxed drop-shoulder fit. 250gsm.', featured: true, imageUrl: '/catalog/guaner-shirt-black-front-10.jpeg' },
    { code: 'GN-TS002', name: 'Logo Print Tee', slug: 'logo-print-tee', categoryId: teesCat.id, size: 'S-XL', price: 7900, stock: 150, description: 'Classic fit tee with Guaner logo print. 200gsm cotton.', featured: true, imageUrl: '/catalog/guaner-shirt-black-model-04.jpeg' },
    { code: 'GN-TS003', name: 'Washed Vintage Tee', slug: 'washed-vintage-tee', categoryId: teesCat.id, size: 'S-XL', price: 9500, stock: 100, description: 'Acid-washed vintage finish tee. Relaxed fit with raw hem.', featured: false, imageUrl: '/catalog/guaner-tee-black-flatlay-07.jpeg' },
    { code: 'GN-HD001', name: 'Heavyweight Hoodie', slug: 'heavyweight-hoodie', categoryId: hoodiesCat.id, size: 'S-XL', price: 15900, stock: 120, description: 'Premium heavyweight fleece hoodie. Kangaroo pocket, ribbed cuffs. 380gsm.', featured: true, imageUrl: '/catalog/guaner-design-basic-sweatshirt-01.jpeg' },
    { code: 'GN-HD002', name: 'Zip-Up Hoodie', slug: 'zip-up-hoodie', categoryId: hoodiesCat.id, size: 'S-XL', price: 16900, stock: 80, description: 'Full zip hoodie with metal hardware. Split kangaroo pocket.', featured: false, imageUrl: '/catalog/guaner-design-fwgmt-sweatshirt-02.jpeg' },
    { code: 'GN-PT001', name: 'Relaxed Cargo Pants', slug: 'relaxed-cargo-pants', categoryId: pantsCat.id, size: 'S-XL', price: 12900, stock: 100, description: 'Wide-leg cargo pants with utility pockets. Adjustable waist. Cotton twill.', featured: false, imageUrl: '/catalog/guaner-shirt-black-back-model-19.jpeg' },
    { code: 'GN-PT002', name: 'Essential Joggers', slug: 'essential-joggers', categoryId: pantsCat.id, size: 'S-XL', price: 10900, stock: 120, description: 'Tapered joggers with elastic cuff. French terry 320gsm.', featured: true, imageUrl: '/catalog/guaner-shirt-black-model-12.jpeg' },
    { code: 'GN-CP001', name: 'Embroidered Cap', slug: 'embroidered-cap', categoryId: capsCat.id, size: 'One Size', price: 4900, stock: 200, description: 'Structured 6-panel cap with Guaner embroidered logo. Adjustable strap.', featured: false, imageUrl: '/catalog/guaner-shirt-black-model-08.jpeg' },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { code: product.code },
      update: { imageUrl: product.imageUrl },
      create: product,
    });
  }

  const passwordHash = await bcrypt.hash('admin123', 12);
  await prisma.adminUser.upsert({
    where: { email: 'admin@guaner.com' },
    update: {},
    create: { email: 'admin@guaner.com', passwordHash, name: 'Admin' },
  });

  const settings = [
    { key: 'whatsapp_number', value: '60123456789' },
    { key: 'business_name', value: 'GUANER' },
    { key: 'business_tagline', value: 'Quality Clothing' },
    { key: 'shipping_fee', value: '8' },
    { key: 'online_payment_enabled', value: 'true' },
    { key: 'payment_gateway', value: 'billplz' },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log('Seed completed: 5 categories, 8 products, 1 admin user, settings');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
