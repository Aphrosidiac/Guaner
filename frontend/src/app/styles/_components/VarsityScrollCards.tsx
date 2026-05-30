'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const NAVY = '#1B2A6B';
const display = { fontFamily: 'var(--font-anton)' } as const;
const label = { fontFamily: 'var(--font-bebas)', letterSpacing: '0.08em' } as const;

const PHOTOS = [
  {
    src: '/catalog/guaner-model-collective.png',
    tag: 'THE COLLECTIVE',
    title: 'Made for the long haul.',
    pos: 'center 40%',
  },
  {
    src: '/catalog/guaner-model-statement.png',
    tag: 'WORN OUT LOUD',
    title: 'Wear what you stand for.',
    pos: 'center 35%',
  },
  {
    src: '/catalog/guaner-model-mark.png',
    tag: 'THE MARK',
    title: 'Worn loud. Worn proud.',
    pos: 'center 30%',
  },
];

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function VarsityScrollCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useIsoLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!window.matchMedia('(min-width: 768px)').matches) return;

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length < 3 || !sectionRef.current) return;

    gsap.set([cards[1], cards[2]], { yPercent: 100, opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=250%',
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    tl.to(cards[1], { yPercent: 0, ease: 'none', duration: 1 });
    tl.to(cards[2], { yPercent: 0, ease: 'none', duration: 1 });

    const imgs = Array.from(sectionRef.current.querySelectorAll('img'));
    const onLoad = () => ScrollTrigger.refresh();
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', onLoad);
    });

    return () => {
      imgs.forEach((img) => img.removeEventListener('load', onLoad));
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full md:h-screen md:overflow-hidden"
      style={{ background: NAVY }}
    >
      {PHOTOS.map((p, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) cardsRef.current[i] = el;
          }}
          className={`relative h-screen w-full md:absolute md:inset-0 md:h-full ${i > 0 ? 'vp-card-hidden' : ''}`}
          style={{ zIndex: i + 1 }}
        >
          <img
            src={p.src}
            alt={p.tag}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: p.pos }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0) 28%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.7))',
            }}
          />
          <div className="absolute top-8 left-8 right-8 flex items-start justify-between text-white">
            <span style={label} className="text-sm">
              0{i + 1} / 03
            </span>
            <span style={label} className="text-sm">
              {p.tag}
            </span>
          </div>
          <div className="absolute bottom-10 left-8 right-8 max-w-3xl text-white">
            <h3 style={display} className="text-4xl sm:text-6xl uppercase leading-[0.95]">
              {p.title}
            </h3>
          </div>
        </div>
      ))}
    </section>
  );
}
