import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Editorial scroll: full-bleed image sections stacked one after another.
// Header + chat bubble + footer come from ThemedShell.
const SECTIONS = [
  { img: '/catalog/guaner-shirt-black-model-06.jpeg', pos: 'center 28%', hero: true },
  { img: '/catalog/guaner-shirt-black-front-back-model-22.jpeg', pos: 'center 22%', hero: false },
  { img: '/catalog/guaner-shirt-black-model-20.jpeg', pos: 'center 30%', hero: false },
];

export default function FormalHome() {
  return (
    <>
      {SECTIONS.map((s, i) => (
        <section
          key={i}
          className="relative w-full overflow-hidden"
          style={{ minHeight: s.hero ? '100vh' : '88vh', background: '#F2F1EF' }}
        >
          <img
            src={s.img}
            alt="GUANER — Summer '26"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: s.pos }}
          />
          <div className="absolute inset-x-0 bottom-0 h-44 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.30), transparent)' }} />

          <div className="absolute bottom-6 left-6 flex items-stretch gap-2">
            {s.hero && (
              <Link
                href="/styles/formal/about"
                aria-label="Explore the lookbook"
                className="flex items-center justify-center w-12 h-12 transition-transform active:scale-95 hover:brightness-125"
                style={{ background: '#111111', color: '#fff' }}
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
            <Link
              href="/styles/formal/products"
              className="flex items-center justify-center px-10 h-12 text-xs tracking-[0.22em] font-semibold transition-transform active:scale-95 hover:brightness-125"
              style={{ background: '#3A3A3A', color: '#fff', fontFamily: 'var(--font-outfit)' }}
            >
              SHOP NOW
            </Link>
          </div>
        </section>
      ))}
    </>
  );
}
