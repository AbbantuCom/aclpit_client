import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ResourcesPage from '@/components/ResourcesPage';
import { NEWS_CATEGORIES, NEWS_CATEGORY_LABELS, type NewsCategory } from '@/types';

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return NEWS_CATEGORIES.map((category) => ({ category }));
}

function isCategory(value: string): value is NewsCategory {
  return (NEWS_CATEGORIES as readonly string[]).includes(value);
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const label = isCategory(category) ? NEWS_CATEGORY_LABELS[category] : 'Resources';
  return {
    title: `${label} | African Centre for Law and Public Interest Technology`,
    description: `${label} from the African Centre for Law and Public Interest Technology.`,
  };
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  return <ResourcesPage category={category} />;
}
