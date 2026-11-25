import type { Metadata } from 'next';
import { connection } from 'next/server';
import { EventsMembers } from '@/features/landing/components/events-members';
import { HeroSlider } from '@/features/landing/components/hero-slider';
import { LookupAndAbout } from '@/features/landing/components/lookup-and-about';
import { LookupLegal } from '@/features/landing/components/lookup-legal';
import { NewsBoard } from '@/features/landing/components/news-board';
import { NewsletterBand } from '@/features/landing/components/newsletter-band';
import { ScienceLibrary } from '@/features/landing/components/science-library';
import { StatsStrip } from '@/features/landing/components/stats-strip';
import { LOCALE_TAGS } from '@/i18n/config';
import { getDictionary, getLocale } from '@/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const { title, description } = t.home.meta;

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      siteName: 'VSTA',
      type: 'website',
      locale: LOCALE_TAGS[locale].replace('-', '_')
    },
    twitter: { card: 'summary', title, description }
  };
}

export default async function HomePage() {
  // The member list is reshuffled on every request, so this page cannot be prerendered.
  await connection();
  const t = await getDictionary();

  return (
    <>
      <h1 className='sr-only'>{t.home.meta.title}</h1>
      <HeroSlider />
      <StatsStrip />
      <NewsBoard />
      <LookupAndAbout />
      <LookupLegal />
      <EventsMembers />
      <ScienceLibrary />
      <NewsletterBand />
    </>
  );
}
