export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GUANER',
    url: 'https://guaner.com',
    description: 'Quality clothing for the modern individual.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MY',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Malay'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface ProductJsonLdProps {
  name: string;
  description: string;
  price: number;
  code: string;
  slug: string;
  imageUrl?: string | null;
  inStock: boolean;
  category: string;
}

export function ProductJsonLd({ name, description, price, code, slug, imageUrl, inStock, category }: ProductJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    sku: code,
    url: `https://guaner.com/products/${slug}`,
    image: imageUrl || undefined,
    category,
    brand: {
      '@type': 'Brand',
      name: 'GUANER',
    },
    offers: {
      '@type': 'Offer',
      price: (price / 100).toFixed(2),
      priceCurrency: 'MYR',
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://guaner.com/products/${slug}`,
      seller: {
        '@type': 'Organization',
        name: 'GUANER',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
