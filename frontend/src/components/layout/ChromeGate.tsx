'use client';

import { usePathname } from 'next/navigation';

// Hides the global store chrome (navbar/footer/etc.) on standalone routes
// like the /styles design showcase, so those pages render full-bleed.
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/styles')) return null;
  return <>{children}</>;
}
