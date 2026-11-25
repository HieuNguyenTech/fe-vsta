import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/features/auth/components/login-form';
import { getCurrentUser } from '@/features/auth/server/current-user';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false }
};

export default async function LoginPage() {
  // Still show the form when the backend is down; submitting it reports the problem.
  const user = await getCurrentUser().catch(() => null);
  if (user) redirect('/dashboard/overview');

  return (
    <main className='flex min-h-dvh items-center justify-center p-4'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Use your account to open the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
