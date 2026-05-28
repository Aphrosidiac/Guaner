import type { Metadata } from 'next';
import Link from 'next/link';
import { Shirt, Shield, Truck, ArrowRight } from 'lucide-react';
import { Animate, Stagger } from '@/components/ui/Animate';

export const metadata: Metadata = {
  title: 'About GUANER',
  description: 'GUANER is a clothing brand dedicated to quality, comfort, and style for the modern individual.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Animate variant="fadeUp" duration={0.6}>
            <p className="text-sm font-medium uppercase tracking-widest text-neutral-400 mb-4">About Us</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Quality Clothing for the Modern Individual
            </h1>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              At GUANER, we believe great style starts with quality materials and thoughtful design. Every piece in our collection is crafted to look good and feel even better.
            </p>
          </Animate>
        </div>
      </section>

      {/* Why GUANER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Animate variant="fadeUp">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">Why GUANER</h2>
        </Animate>

        <Stagger className="grid md:grid-cols-3 gap-6" stagger={0.08}>
          <div className="bg-surface rounded-xl border border-border p-7 hover:border-border-hover hover:shadow-sm transition-all duration-300">
            <Shirt className="w-7 h-7 mb-4 text-text-primary" />
            <h3 className="font-display font-semibold text-lg mb-2">Premium Fabrics</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              We source only the finest materials so every piece feels comfortable and lasts.
            </p>
          </div>
          <div className="bg-surface rounded-xl border border-border p-7 hover:border-border-hover hover:shadow-sm transition-all duration-300">
            <Shield className="w-7 h-7 mb-4 text-text-primary" />
            <h3 className="font-display font-semibold text-lg mb-2">Secure Shopping</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Safe checkout with multiple payment options. Your privacy and security always come first.
            </p>
          </div>
          <div className="bg-surface rounded-xl border border-border p-7 hover:border-border-hover hover:shadow-sm transition-all duration-300">
            <Truck className="w-7 h-7 mb-4 text-text-primary" />
            <h3 className="font-display font-semibold text-lg mb-2">Fast Delivery</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Nationwide shipping across Malaysia. Track your order in real-time using your phone number.
            </p>
          </div>
        </Stagger>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Animate variant="scale" duration={0.6}>
          <div className="bg-primary text-white rounded-2xl p-10 text-center">
            <h2 className="font-display text-2xl font-bold mb-3">Ready to explore?</h2>
            <p className="text-neutral-300 mb-8 max-w-md mx-auto">Browse our collection and find your next favourite piece.</p>
            <Link href="/products" className="inline-flex items-center justify-center gap-2 bg-white text-primary font-medium px-6 py-3 rounded-lg hover:bg-neutral-100 transition-colors">
              Browse Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Animate>
      </section>
    </div>
  );
}
