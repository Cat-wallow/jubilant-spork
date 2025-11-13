import { z } from 'zod';

// Login form validator - Zod v4 compatible
// In Zod v4, z.email() is a standalone schema, not a method on z.string()
export const LoginValidator = z.object({
  email: z.email({ error: 'Format email tidak valid' }),
  password: z
    .string({ error: 'Kata sandi harus diisi' })
    .min(1, { error: 'Kata sandi harus diisi' }),
  keepLoggedIn: z.boolean().default(true),
});

export type LoginFormInputs = z.infer<typeof LoginValidator>;
