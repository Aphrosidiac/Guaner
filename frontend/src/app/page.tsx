import { redirect } from 'next/navigation';

// This is a working demo location, not the final site. The root leads to the
// design-direction chooser; the current store lives at /store.
export default function RootPage() {
  redirect('/styles');
}
