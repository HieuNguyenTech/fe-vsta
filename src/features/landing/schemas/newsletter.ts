import * as z from 'zod';

export function createNewsletterSchema(invalidEmailMessage: string) {
  return z.object({
    email: z.email(invalidEmailMessage)
  });
}

export type NewsletterValues = z.infer<ReturnType<typeof createNewsletterSchema>>;
