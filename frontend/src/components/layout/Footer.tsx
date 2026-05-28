import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto w-full">
      {/* Main Footer */}
      <div className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-display font-bold text-lg mb-3">GUANER</h3>
              <p className="text-sm text-neutral-400 max-w-xs">
                Quality clothing for the modern individual.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-neutral-400">Shop</h4>
              <div className="space-y-2">
                <Link href="/products" className="block text-sm text-neutral-300 hover:text-white transition-colors">Products</Link>
                <Link href="/track" className="block text-sm text-neutral-300 hover:text-white transition-colors">Track Order</Link>
                <Link href="/shipping" className="block text-sm text-neutral-300 hover:text-white transition-colors">Shipping</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-neutral-400">Support</h4>
              <div className="space-y-2">
                <Link href="/faq" className="block text-sm text-neutral-300 hover:text-white transition-colors">FAQ</Link>
                <Link href="/about" className="block text-sm text-neutral-300 hover:text-white transition-colors">About</Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-neutral-400">Legal</h4>
              <div className="space-y-2">
                <Link href="/terms" className="block text-sm text-neutral-300 hover:text-white transition-colors">Terms & Conditions</Link>
                <Link href="/privacy" className="block text-sm text-neutral-300 hover:text-white transition-colors">Privacy Policy</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} GUANER. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
