import { z } from 'zod';

export const SignInValidator = z.object({
  emailOrUsername: z
    .string()
    .min(1, 'Email atau username harus diisi')
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) || value.length >= 3;
      },
      'Format email atau username tidak valid'
    ),
  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .max(100, 'Password terlalu panjang'),
  keepLoggedIn: z.boolean().default(true),
});

export type SignInFormInputs = z.infer<typeof SignInValidator>;

export const ForgotPasswordValidator = z.object({
  email: z.string().email('Email tidak valid'),
});

export type ForgotPasswordFormInputs = z.infer<typeof ForgotPasswordValidator>;

export const NewPasswordValidator = z
  .object({
    newPassword: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string().min(8, 'Password minimal 8 karakter'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Password tidak sama',
    path: ['confirmPassword'],
  });

export type NewPasswordFormInputs = z.infer<typeof NewPasswordValidator>;
