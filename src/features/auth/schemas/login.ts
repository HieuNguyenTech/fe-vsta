import * as z from 'zod';

export const loginSchema = z.object({
  email: z.email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required').max(200, 'Password is too long')
});

export type LoginValues = z.infer<typeof loginSchema>;
