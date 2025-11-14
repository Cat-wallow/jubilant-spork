import { z } from 'zod';

// Login form validator - Zod v4 compatible
export const LoginValidator = z.object({
  emailOrUsername: z
    .string({ error: 'Email atau Username harus diisi' })
    .min(1, { error: 'Email atau Username harus diisi' }),
  password: z
    .string({ error: 'Kata sandi harus diisi' })
    .min(1, { error: 'Kata sandi harus diisi' }),
  keepLoggedIn: z.boolean().default(true),
});

export type LoginFormInputs = z.infer<typeof LoginValidator>;
