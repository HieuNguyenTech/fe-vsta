import type { Dictionary } from '@/i18n/config';

/** Placeholder for destinations that have no page yet (articles, documents, social profiles). */
export const NO_PAGE = '#';

export type MenuPage = {
  label: string;
  href: string;
};

export type MenuGroup = MenuPage & {
  /** The mobile menu spells some groups out in full. */
  mobileLabel?: string;
  items?: MenuPage[];
};

type MenuText = Dictionary['common']['menu'];
type SectionSlug = Exclude<keyof MenuText, 'home'>;
type PageSlug<S extends SectionSlug> = MenuText[S] extends { pages: infer P }
  ? keyof P & string
  : never;

/** A section and the pages under its own path: `/<section>/<page>`. */
function section<S extends SectionSlug>(slug: S, pages: PageSlug<S>[] = []) {
  return { slug, pages: pages as string[] };
}

/** Single source of the menu and of the routes under `app/(site)`. Labels live in `i18n/locales`. */
export const SECTIONS = [
  section('gioi-thieu', [
    've-vsta',
    'lich-su-hinh-thanh',
    'bon-tru-cot-hoat-dong',
    'co-cau-to-chuc-lanh-dao',
    'dieu-le-va-quy-che'
  ]),
  section('hoi-vien', [
    'danh-ba-hoi-vien',
    'mang-luoi-chi-hoi',
    'quyen-loi-hoi-vien',
    'dang-ky-gia-nhap',
    'ho-so-hoi-vien-tieu-bieu'
  ]),
  section('tin-tuc', [
    'tin-hiep-hoi',
    'tin-hoi-vien',
    'tin-nganh-giong',
    'tin-quoc-te',
    'lich-su-kien'
  ]),
  section('khoa-hoc-cong-nghe', [
    'linh-vuc-trong-tam',
    'danh-muc-de-tai',
    'bai-viet',
    'hoi-dong-khoa-hoc-chuyen-gia'
  ]),
  section('tra-cuu-giong', [
    'theo-ten-giong',
    'cong-nhan-luu-hanh',
    'tu-cong-bo-luu-hanh',
    'duoc-bao-ho',
    'het-hieu-luc'
  ]),
  section('phap-luat', [
    'kho-van-ban',
    'van-ban-moi-ban-hanh',
    'thu-tuc-tu-cong-bo-luu-hanh',
    'thu-tuc-bao-ho-giong'
  ]),
  section('tu-lieu', ['thu-vien-anh', 'video-phong-su', 'ky-yeu-bao-cao-an-pham', 'sach-75-nam']),
  section('lien-he')
];

type SectionText = { label: string; mobileLabel?: string; pages?: Record<string, string> };

function toGroup({ slug, pages }: (typeof SECTIONS)[number], text: MenuText): MenuGroup {
  const { label, mobileLabel, pages: pageLabels = {} }: SectionText = text[slug];
  const href = `/${slug}`;

  return {
    label,
    mobileLabel,
    href,
    items: pages.length
      ? pages.map((page) => ({ label: pageLabels[page], href: `${href}/${page}` }))
      : undefined
  };
}

/** The whole menu, home included, in the language of `text`. */
export function getMenu(text: MenuText): MenuGroup[] {
  return [{ label: text.home.label, href: '/' }, ...SECTIONS.map((entry) => toGroup(entry, text))];
}

export function findSection(text: MenuText, slug: string) {
  const entry = SECTIONS.find((item) => item.slug === slug);
  return entry && toGroup(entry, text);
}

export function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
