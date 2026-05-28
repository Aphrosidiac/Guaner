import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Your Order',
  description: 'Track your GUANER order status using your phone number. Real-time order tracking for all deliveries.',
  robots: { index: false },
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
