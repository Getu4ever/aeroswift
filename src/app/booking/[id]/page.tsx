// src/app/booking/[id]/page.tsx
import BookingContent from '@/components/BookingContent';

// This function tells Next.js how to pre-render the dynamic route at build time.
export async function generateStaticParams() {
  return [{ id: '1' }];
}

export default function Page() {
  return <BookingContent />;
}