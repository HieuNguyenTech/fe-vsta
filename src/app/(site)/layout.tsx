import { SiteFooter } from '@/features/landing/components/site-footer';
import { SiteHeader } from '@/features/landing/components/site-header';
import { beVietnamPro } from '@/features/landing/font';
import { I18nProvider } from '@/i18n/provider';
import { getDictionary, getLocale } from '@/i18n/server';
import { cn } from '@/lib/utils';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [locale, dictionary] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <I18nProvider locale={locale} dictionary={dictionary}>
      <div
        lang={locale}
        className={cn('vsta-scope bg-vsta-bg-50 text-vsta-fg-950', beVietnamPro.variable)}
      >
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </div>
    </I18nProvider>
  );
}
