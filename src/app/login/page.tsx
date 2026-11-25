import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/features/auth/components/login-form';
import { getCurrentUser } from '@/features/auth/server/current-user';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false }
};

export default async function LoginPage() {
  // Still show the form when the backend is down; submitting it reports the problem.
  const user = await getCurrentUser().catch(() => null);
  if (user) redirect('/dashboard/overview');

  return (
    <main className='relative flex min-h-dvh items-center justify-center overflow-hidden bg-vsta-bg-100 p-4 sm:p-8'>
      <div className='pointer-events-none absolute -top-32 -right-28 size-96 rounded-full bg-vsta-accent-300/40 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-vsta-primary-300/30 blur-3xl' />

      <div className='relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-vsta-bg-300 bg-white shadow-2xl shadow-vsta-primary-900/10 lg:grid-cols-[0.95fr_1.05fr]'>
        <section className='relative hidden overflow-hidden bg-vsta-primary-800 p-10 text-white lg:flex lg:flex-col lg:justify-between'>
          <div className='absolute -right-24 -bottom-24 size-72 rounded-full border-[28px] border-vsta-primary-700/70' />
          <div className='absolute top-1/3 -left-20 size-40 rounded-full bg-vsta-accent-500/20 blur-2xl' />
          <div className='relative'>
            <Image
              src='/vietnamseed-logo.jpg'
              alt='Vietnam Seed Trade Association'
              width={263}
              height={193}
              className='h-auto w-28 rounded-2xl shadow-lg'
            />
            <p className='mt-8 max-w-sm text-3xl leading-tight font-semibold tracking-tight'>
              Kết nối và phát triển ngành giống Việt Nam.
            </p>
            <p className='mt-4 max-w-sm text-sm leading-6 text-vsta-primary-100'>
              Đăng nhập để quản lý thông tin, hoạt động và dữ liệu của hệ thống Vietnam Seed.
            </p>
          </div>
          <p className='relative text-xs tracking-[0.18em] text-vsta-primary-200 uppercase'>
            Vietnam Seed Trade Association
          </p>
        </section>

        <section className='p-6 sm:p-10'>
          <Link
            href='/'
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'mb-8 -ml-2 gap-1.5 text-muted-foreground'
            )}
          >
            <Icons.chevronLeft />
            Về trang chủ
          </Link>
          <div className='mb-8 flex items-center gap-3 lg:hidden'>
            <Image
              src='/vietnamseed-logo.jpg'
              alt='Vietnam Seed Trade Association'
              width={263}
              height={193}
              className='size-14 rounded-xl object-cover'
            />
            <div>
              <p className='font-semibold text-vsta-primary-800'>Vietnam Seed</p>
              <p className='text-xs text-muted-foreground'>Trade Association</p>
            </div>
          </div>
          <Card className='border-0 bg-transparent p-2 shadow-none ring-0 sm:p-3'>
            <CardHeader className='px-0'>
              <CardTitle className='text-3xl tracking-tight'>Chào mừng trở lại</CardTitle>
              <CardDescription className='mt-2'>
                Đăng nhập để tiếp tục vào hệ thống quản trị.
              </CardDescription>
            </CardHeader>
            <CardContent className='px-0'>
              <LoginForm />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
