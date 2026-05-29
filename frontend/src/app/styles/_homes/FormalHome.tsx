import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Full-bleed editorial hero. Header + chat bubble come from ThemedShell (overlay).
const HERO = '/catalog/guaner-shirt-black-model-06.jpeg';

export default function FormalHome() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ background: '#F2F1EF' }}>
      <img
        src={HERO}
        alt="GUANER — Summer '26"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 28%' }}
      />
      {/* faint bottom gradient so the corner buttons stay legible */}
      <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.28), transparent)' }} />

      {/* corner CTAs — bottom left */}
      <div className="absolute bottom-6 left-6 flex items-stretch gap-2">
        <Link
          href="/styles/formal/about"
          aria-label="Explore the lookbook"
          className="flex items-center justify-center w-12 h-12 transition-transform active:scale-95 hover:brightness-125"
          style={{ background: '#111111', color: '#fff' }}
        >
          <ArrowRight className="w-5 h-5" />
        </Link>
        <Link
          href="/styles/formal/products"
          className="flex items-center justify-center px-10 h-12 text-xs tracking-[0.22em] font-semibold transition-transform active:scale-95 hover:brightness-125"
          style={{ background: '#3A3A3A', color: '#fff', fontFamily: 'var(--font-outfit)' }}
        >
          SHOP NOW
        </Link>
      </div>
    </section>
  );
}
