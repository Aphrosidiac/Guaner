'use client';

import { useEffect, useState } from 'react';

// Fixed side index for the cinematic lookbook: tracks the active panel within
// the #lookbook-scroll snap container and lets you jump to any panel.
export function LookbookRail({ labels }: { labels: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = document.getElementById('lookbook-scroll');
    const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-look-panel]'));
    if (!root || panels.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.lookPanel));
        });
      },
      { root, threshold: 0.55 }
    );
    panels.forEach((p) => obs.observe(p));
    return () => obs.disconnect();
  }, []);

  const jump = (i: number) => {
    document.querySelector<HTMLElement>(`[data-look-panel="${i}"]`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-3.5">
      {labels.map((l, i) => (
        <button
          key={i}
          onClick={() => jump(i)}
          aria-label={`Go to ${l || `panel ${i + 1}`}`}
          className="group flex items-center gap-2 justify-end cursor-pointer"
        >
          <span
            className="text-[10px] tracking-[0.2em] transition-opacity duration-300"
            style={{ color: '#fff', opacity: active === i ? 0.9 : 0 }}
          >
            {l}
          </span>
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width: active === i ? 9 : 6,
              height: active === i ? 9 : 6,
              background: active === i ? '#fff' : 'rgba(255,255,255,0.4)',
            }}
          />
        </button>
      ))}
    </div>
  );
}
