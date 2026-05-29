import { notFound } from 'next/navigation';
import { showcaseFontVars } from '../fonts';
import { themes } from '../themes';
import { ThemedShell } from '../_components/ThemedShell';

export default async function ThemeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ theme: string }>;
}) {
  const { theme } = await params;
  const t = themes[theme];
  if (!t) notFound();
  return (
    <div
      className={showcaseFontVars}
      style={{
        background: t.bg,
        color: t.text,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: `${t.bodyFont}, system-ui, sans-serif`,
      }}
    >
      <ThemedShell>{children}</ThemedShell>
    </div>
  );
}
