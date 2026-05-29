import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { CartProvider } from '@/lib/cart';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { ChromeGate } from '@/components/layout/ChromeGate';
import { OrganizationJsonLd } from '@/components/JsonLd';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: { default: 'GUANER', template: '%s | GUANER' },
  description: 'Quality clothing for the modern individual.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased overflow-x-hidden`}>
      <body className="min-h-full flex flex-col bg-background text-text-primary font-body overflow-x-hidden">
        <OrganizationJsonLd />
        <CartProvider>
          <ChromeGate>
            <AnnouncementBar />
            <Navbar />
          </ChromeGate>
          <main className="flex-1">{children}</main>
          <ChromeGate>
            <Footer />
            <WhatsAppButton />
          </ChromeGate>
        </CartProvider>
      </body>
    </html>
  );
}
