import type { Metadata } from 'next';
import NewsEventsPage from '@/components/NewsEventsPage';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'News & Events | African Centre for Law and Public Interest Technology',
  description: 'News, events and newsletters from the African Centre for Law and Public Interest Technology.',
};

export default function Page() {
  return <NewsEventsPage />;
}
