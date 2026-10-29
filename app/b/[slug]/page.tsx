import PublicBookingDemo from './public-booking-demo';

export default async function PublicBookingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const displayName = slug.replace(/-[a-f0-9]{4,8}$/i, '').split('-').filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ') || 'Espaço de beleza';
  return <PublicBookingDemo displayName={displayName} />;
}
