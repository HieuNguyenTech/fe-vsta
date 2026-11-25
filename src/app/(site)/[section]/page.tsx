import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContactPage } from '@/features/landing/components/contact-page';
import { ContentPage } from '@/features/landing/components/content-page';
import { findSection, SECTIONS } from '@/features/landing/constants/navigation';
import { getDictionary } from '@/i18n/server';

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.map((section) => ({ section: section.slug }));
}

export async function generateMetadata({ params }: PageProps<'/[section]'>): Promise<Metadata> {
  const { menu } = (await getDictionary()).common;
  const section = findSection(menu, (await params).section);
  if (!section) return {};
  return { title: { absolute: `${section.mobileLabel ?? section.label} | VSTA` } };
}

export default async function SectionPage({ params }: PageProps<'/[section]'>) {
  const { menu } = (await getDictionary()).common;
  const section = findSection(menu, (await params).section);
  if (!section) notFound();

  if (section.href === '/lien-he') return <ContactPage />;

  return <ContentPage section={section} />;
}
