import { notFound } from 'next/navigation';
import VarsityHome from '../_homes/VarsityHome';
import StreetwearHome from '../_homes/StreetwearHome';
import MinimalHome from '../_homes/MinimalHome';
import VintageHome from '../_homes/VintageHome';
import FormalHome from '../_homes/FormalHome';

export default async function ThemeHome({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  switch (theme) {
    case 'varsity':
      return <VarsityHome />;
    case 'streetwear':
      return <StreetwearHome />;
    case 'minimal':
      return <MinimalHome />;
    case 'vintage':
      return <VintageHome />;
    case 'formal':
      return <FormalHome />;
    default:
      notFound();
  }
}
