import Link from 'next/link';

const directions: { slug: string; href?: string; name: string; blurb: string; swatches: string[] }[] = [
  {
    slug: 'varsity',
    name: 'Varsity Americana',
    blurb: 'Navy + red + cream, chunky collegiate type, badges & stripes. Most cohesive with the logo.',
    swatches: ['#1B2A6B', '#E0231C', '#F4F1E8'],
  },
  {
    slug: 'streetwear',
    name: 'Bold Streetwear',
    blurb: 'Oversized cut-off type, marquee ticker, asymmetric grid. Loud hype-drop energy.',
    swatches: ['#0A0A0A', '#E0231C', '#FFFFFF'],
  },
  {
    slug: 'minimal',
    name: 'Clean Premium Minimal',
    blurb: 'Editorial whitespace, serif headings, hairline rules. Calm, high-end boutique.',
    swatches: ['#FBFAF8', '#1A1A1A', '#1B2A6B'],
  },
  {
    slug: 'vintage',
    name: 'Vintage Heritage',
    blurb: 'Faded palette, paper grain, retro serif + script. Nostalgic thrift-shop warmth.',
    swatches: ['#EFE7D6', '#34425A', '#B0432F'],
  },
  {
    slug: 'formal',
    name: 'Formal Editorial',
    blurb: 'Full-bleed hero, transparent overlaid header, monochrome luxury. Inspired by SVG / Malaysian streetwear-luxe brands.',
    swatches: ['#FFFFFF', '#111111', '#6B6B6B'],
  },
  {
    slug: 'store',
    href: '/store',
    name: 'Current Store',
    blurb: 'The existing build — generic monochrome theme. The starting point before restyling.',
    swatches: ['#0A0A0A', '#525252', '#FFFFFF'],
  },
];

export default function StylesIndex() {
  return (
    <div style={{ minHeight: '100vh', background: '#0E0E10', color: '#fff' }} className="font-body">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="GUANER" className="h-12 w-auto rounded" />
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">Design Directions</span>
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/30 transition-all px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white"
          >
            Admin <span aria-hidden>&rarr;</span>
          </Link>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Pick a direction</h1>
        <p className="text-white/50 max-w-xl mb-12">
          Four fully-built homepage mockups using your real logo and products. Open each, compare, and tell me which one to roll out across the whole store.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {directions.map((d) => (
            <Link
              key={d.slug}
              href={d.href ?? `/styles/${d.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/25 transition-all p-6 flex flex-col"
            >
              <div className="flex gap-1.5 mb-5">
                {d.swatches.map((c) => (
                  <span key={c} className="h-6 w-6 rounded-full border border-white/15" style={{ background: c }} />
                ))}
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:translate-x-0.5 transition-transform">{d.name}</h2>
              <p className="text-sm text-white/50 leading-relaxed flex-1">{d.blurb}</p>
              <span className="mt-5 text-sm font-semibold text-white/80 group-hover:text-white inline-flex items-center gap-1">
                View mockup <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>

        <p className="text-xs text-white/30 mt-12">
          These are throwaway comparison pages under <code className="text-white/50">/styles</code> — they don&apos;t touch the live store. Once you choose, I&apos;ll apply that system everywhere and delete the rest.
        </p>
      </div>
    </div>
  );
}
