import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentPage } from '@/features/landing/components/content-page';
import { findSection, SECTIONS } from '@/features/landing/constants/navigation';
import { getDictionary } from '@/i18n/server';

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.flatMap((section) =>
    section.pages.map((page) => ({ section: section.slug, page }))
  );
}

async function findPage(params: PageProps<'/[section]/[page]'>['params']) {
  const { section: sectionSlug, page: pageSlug } = await params;
  const { menu } = (await getDictionary()).common;
  const section = findSection(menu, sectionSlug);
  const page = section?.items?.find((item) => item.href === `/${sectionSlug}/${pageSlug}`);
  return section && page ? { section, page } : null;
}

export async function generateMetadata({
  params
}: PageProps<'/[section]/[page]'>): Promise<Metadata> {
  const found = await findPage(params);
  if (!found) return {};
  return { title: { absolute: `${found.page.label} | VSTA` } };
}

export default async function MenuItemPage({ params }: PageProps<'/[section]/[page]'>) {
  const found = await findPage(params);
  if (!found) notFound();

  return <ContentPage section={found.section} page={found.page} />;
}
