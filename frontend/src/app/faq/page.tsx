import type { Metadata } from 'next';
import { Animate } from '@/components/ui/Animate';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about ordering from GUANER. Sizing, shipping, returns, and more.',
};

const faqs = [
  {
    category: 'Products & Sizing',
    items: [
      {
        q: 'How do I find my size?',
        a: 'Each product page includes a size guide with measurements. If you are between sizes, we recommend going with the larger size for a more comfortable fit.',
      },
      {
        q: 'What materials do you use?',
        a: 'We use a variety of premium fabrics including cotton, linen, and blended materials. Specific material details are listed on each product page.',
      },
      {
        q: 'Are the product photos accurate?',
        a: 'We do our best to ensure product photos accurately represent the items. Slight colour variations may occur due to monitor settings.',
      },
    ],
  },
  {
    category: 'Ordering & Payment',
    items: [
      {
        q: 'How do I place an order?',
        a: 'Browse our products, add items to your cart, and proceed to checkout. You can choose to pay via WhatsApp (bank transfer) or online payment. No account registration is needed.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept bank transfer (via WhatsApp checkout) and online payment through FPX and credit/debit cards.',
      },
      {
        q: 'Can I cancel or modify my order?',
        a: 'Orders can be cancelled or modified before they are processed. Contact us via WhatsApp as soon as possible. Once an order has been shipped, cancellation is not possible.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'Peninsular Malaysia: 1-4 business days. Sabah & Sarawak: 3-7 business days. Orders are processed within 1-2 business days after payment confirmation.',
      },
      {
        q: 'Can I track my order?',
        a: 'Yes. Once shipped, you will receive tracking information via WhatsApp. You can also track your order on our Track Order page using your phone number.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently, we only ship within Malaysia. International shipping may be available in the future.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 7 days of receiving your order, provided the item is unworn, unwashed, and in its original packaging. Contact us via WhatsApp to initiate a return.',
      },
      {
        q: 'Can I exchange for a different size?',
        a: 'Yes, size exchanges are available subject to stock. Contact us via WhatsApp with your order number and the size you need.',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Animate variant="fadeUp">
        <h1 className="font-display text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-text-secondary mb-10">Everything you need to know about ordering from GUANER.</p>
      </Animate>

      <div className="space-y-10">
        {faqs.map((section, si) => (
          <Animate key={section.category} variant="fadeUp" delay={si * 0.08}>
            <div>
              <h2 className="font-display font-semibold text-xl mb-4 text-text-primary">{section.category}</h2>
              <div className="space-y-4">
                {section.items.map((faq) => (
                  <details key={faq.q} className="group bg-surface rounded-xl border border-border">
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-sm hover:bg-surface-elevated/50 transition-colors rounded-xl list-none">
                      {faq.q}
                      <span className="text-text-muted ml-4 shrink-0 group-open:rotate-45 transition-transform text-lg">+</span>
                    </summary>
                    <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </Animate>
        ))}
      </div>

      <Animate variant="fadeUp" delay={0.3}>
        <div className="mt-12 bg-surface rounded-xl border border-border p-6 text-center">
          <h3 className="font-display font-semibold mb-2">Still have questions?</h3>
          <p className="text-sm text-text-secondary mb-4">Our team is happy to help with any questions about our products or ordering process.</p>
          <a
            href="https://wa.me/60123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
      </Animate>
    </div>
  );
}
