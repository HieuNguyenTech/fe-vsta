'use client';

import { useMutation } from '@tanstack/react-query';
import { FieldError, FieldGroup } from '@/components/ui/field';
import { LoadingButton } from '@/components/ui/loading-button';
import { apiClient } from '@/lib/api-client';
import { useAppForm } from '@/lib/form';
import { loginSchema, type LoginValues } from '../schemas/login';

export function LoginForm() {
  const login = useMutation({
    mutationFn: (values: LoginValues) =>
      apiClient<{ data: { accessToken: string; refreshToken: string; expiresIn: number } }>(
        '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify(values)
        }
      ),
    // A full load starts the dashboard with an empty query cache.
    onSuccess: ({ data: tokens }) => {
      const maxAge = tokens.expiresIn || 900;
      document.cookie = `cms_access=${encodeURIComponent(tokens.accessToken)}; path=/; max-age=${maxAge}; samesite=lax`;
      document.cookie = `cms_refresh=${encodeURIComponent(tokens.refreshToken)}; path=/; max-age=2592000; samesite=lax`;
      window.location.assign('/dashboard/overview');
    }
  });

  const form = useAppForm({
    defaultValues: { email: '', password: '' } as LoginValues,
    validators: { onSubmit: loginSchema },
    onSubmit: ({ value }) => login.mutate(value)
  });

  return (
    // method='post' keeps the password out of the URL if submitted before the page is interactive
    <form
      method='post'
      className='flex flex-col gap-4'
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.AppField
          name='email'
          children={(field) => (
            <field.TextField label='Email' type='email' autoComplete='username' required />
          )}
        />
        <form.AppField
          name='password'
          children={(field) => (
            <field.TextField
              label='Password'
              type='password'
              autoComplete='current-password'
              required
            />
          )}
        />
      </FieldGroup>
      {login.error && <FieldError>{login.error.message}</FieldError>}
      <LoadingButton type='submit' loading={login.isPending || login.isSuccess}>
        Sign in
      </LoadingButton>
    </form>
  );
}
