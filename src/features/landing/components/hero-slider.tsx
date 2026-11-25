'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Icons } from '@/components/icons';
import { interpolate } from '@/i18n/format';
import { useI18n } from '@/i18n/provider';
import { cn } from '@/lib/utils';
import { buttonStyles, focusRing, Responsive } from './primitives';

const AUTOPLAY_MS = 5000;
const SWIPE_PX = 40;

const SLIDES = [
  {
    id: 'database',
    image: '/landing/hero-1.svg',
    primaryHref: '/tra-cuu-giong',
    secondaryHref: '/gioi-thieu/ve-vsta'
  },
  {
    id: 'legal',
    image: '/landing/hero-2.svg',
    primaryHref: '/phap-luat/kho-van-ban',
    secondaryHref: '/phap-luat/thu-tuc-tu-cong-bo-luu-hanh'
  },
  {
    id: 'community',
    image: '/landing/hero-3.svg',
    primaryHref: '/hoi-vien/danh-ba-hoi-vien',
    secondaryHref: '/hoi-vien/dang-ky-gia-nhap'
  }
] as const;

const arrowClass = cn(
  'absolute top-1/2 flex size-[52px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/10 text-vsta-bg-50 transition-colors hover:bg-white/20 max-lg:hidden',
  focusRing
);

const pad = (value: number) => String(value).padStart(2, '0');

export function HeroSlider() {
  const {
    t: {
      home: { hero: t }
    }
  } = useI18n();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const go = (step: number) =>
    setActive((current) => (current + step + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(() => setActive((active + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [active, paused]);

  return (
    <section
      aria-roledescription='carousel'
      aria-label={t.label}
      className='relative h-[580px] touch-pan-y overflow-hidden bg-vsta-primary-900 lg:h-[calc(100vh-132px)]'
    >
      <div
        className='absolute inset-0'
        // Mouse only: a tap must not leave autoplay paused on touch screens.
        onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={(e) => e.target.matches(':focus-visible') && setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStart.current === null) return;
          const distance = e.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(distance) > SWIPE_PX) go(distance < 0 ? 1 : -1);
          touchStart.current = null;
        }}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            role='group'
            aria-roledescription='slide'
            aria-label={`${index + 1} / ${SLIDES.length}`}
            inert={index !== active}
            className={cn(
              'absolute inset-0 transition-opacity duration-300 ease-out',
              index === active ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Image
              src={slide.image}
              alt=''
              fill
              sizes='100vw'
              loading={index === 0 ? 'eager' : 'lazy'}
              className='object-cover'
            />
            <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(0,22,6,0.949)_0%,rgba(0,22,6,0.251)_100%)] max-lg:hidden' />
            <div className='absolute inset-0 bg-[linear-gradient(180deg,rgba(0,22,6,0.251)_0%,rgba(0,22,6,0.702)_45%,rgba(0,22,6,0.949)_100%)] lg:bg-[linear-gradient(180deg,rgba(0,22,6,0.302)_0%,rgba(0,22,6,0.749)_100%)]' />
            <div className='relative mx-auto flex h-full w-full max-w-[1392px] flex-col justify-end gap-4 px-4 pb-[120px] lg:justify-center lg:gap-6 lg:px-24 lg:pb-0'>
              <p className='flex w-fit items-center gap-2 rounded-full border border-white/25 bg-[rgba(0,22,6,0.3)] px-3 py-1.5 lg:px-3.5'>
                <span className='size-2 rounded-full bg-vsta-accent-500' />
                <span className='text-xs/[1.4] font-semibold tracking-[2px] text-vsta-accent-400 uppercase'>
                  {t.slides[slide.id].label}
                </span>
              </p>
              <h2 className='max-w-[760px] text-[30px]/[1.2] font-bold text-vsta-bg-50 lg:text-[46px]/[1.15] lg:whitespace-pre-line'>
                {t.slides[slide.id].title}
              </h2>
              <p className='max-w-[640px] text-[15px]/[1.6] text-vsta-bg-200 lg:text-base/[1.6]'>
                <Responsive
                  full={t.slides[slide.id].description}
                  short={t.slides[slide.id].shortDescription}
                />
              </p>
              <div className='flex gap-3'>
                <Link
                  href={slide.primaryHref}
                  className={cn(buttonStyles({ variant: 'accent', size: 'lg' }), 'max-lg:w-full')}
                >
                  {t.slides[slide.id].primary}
                  <Icons.arrowRight className='size-4' />
                </Link>
                <Link
                  href={slide.secondaryHref}
                  className={cn(
                    buttonStyles({ variant: 'outlineLight', size: 'lg' }),
                    'max-lg:hidden'
                  )}
                >
                  {t.slides[slide.id].secondary}
                  <Icons.arrowRight className='size-4' />
                </Link>
              </div>
            </div>
          </div>
        ))}

        <div className='pointer-events-none absolute inset-x-0 bottom-[60px] mx-auto flex w-full max-w-[1392px] px-4 lg:bottom-9 lg:px-24'>
          <div className='pointer-events-auto flex items-center gap-1.5 lg:gap-2'>
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type='button'
                aria-label={interpolate(t.goToSlide, { index: index + 1 })}
                aria-current={index === active}
                onClick={() => setActive(index)}
                className={cn('cursor-pointer py-2', focusRing)}
              >
                <span
                  className={cn(
                    'block h-1 rounded-full transition-all',
                    index === active ? 'w-7 bg-vsta-accent-500 lg:w-10' : 'w-3.5 bg-white/40 lg:w-5'
                  )}
                />
              </button>
            ))}
            <span className='text-[13px]/[1.5] font-medium text-vsta-bg-100 lg:text-sm/[1.4] lg:font-semibold'>
              {pad(active + 1)} / {pad(SLIDES.length)}
            </span>
          </div>
        </div>

        <button
          type='button'
          aria-label={t.previous}
          onClick={() => go(-1)}
          className={cn(arrowClass, 'left-8')}
        >
          <Icons.chevronLeft className='size-5' />
        </button>
        <button
          type='button'
          aria-label={t.next}
          onClick={() => go(1)}
          className={cn(arrowClass, 'right-8')}
        >
          <Icons.chevronRight className='size-5' />
        </button>
        <a
          href='#thong-ke'
          className={cn(
            'absolute bottom-[18px] left-1/2 flex w-[120px] -translate-x-1/2 flex-col items-center gap-1.5 rounded-[6px] text-[13px]/[1.5] font-medium text-vsta-bg-100 max-lg:hidden',
            focusRing
          )}
        >
          <span className='flex size-9 items-center justify-center rounded-full border border-white/40'>
            <Icons.arrowDown className='size-4' />
          </span>
          {t.scrollDown}
        </a>
      </div>
    </section>
  );
}
