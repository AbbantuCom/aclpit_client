import type { Metadata } from 'next';
import ResourcesPage from '@/components/ResourcesPage';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Publications | African Centre for Law and Public Interest Technology',
  description: 'Research, news, events and newsletters from the African Centre for Law and Public Interest Technology.',
};

export default function Page() {
  return <ResourcesPage />;
}
