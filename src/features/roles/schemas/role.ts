import * as z from 'zod';

// Same limits as the backend's role DTO.
export const roleSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name is too long'),
  slug: z
    .string()
    .regex(
      /^[a-z][a-z0-9_-]{1,49}$/,
      '2-50 characters: lowercase letters, digits, - or _, starting with a letter'
    ),
  permissions: z.array(z.string())
});

export type RoleFormValues = z.infer<typeof roleSchema>;
