import * as z from 'zod';

// Same limits as the backend's user DTO. The password limit is in bytes (bcrypt).
const isValidPassword = (value: string) => {
  const bytes = new TextEncoder().encode(value).length;
  return bytes >= 12 && bytes <= 72;
};

export function getUserSchema(isEdit: boolean) {
  return z.object({
    email: z.email('Please enter a valid email'),
    name: z.string().trim().min(1, 'Name is required').max(100, 'Name is too long'),
    // When editing, an empty password keeps the current one.
    password: z
      .string()
      .refine(
        (value) => (isEdit && value === '') || isValidPassword(value),
        'Password must be 12 to 72 characters'
      ),
    roleIds: z.array(z.string()),
    disabled: z.boolean()
  });
}

export type UserFormValues = z.infer<ReturnType<typeof getUserSchema>>;
