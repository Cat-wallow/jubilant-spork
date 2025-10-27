import { z } from 'zod';

export const LoginValidator = z.object({
  email: z.email().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required.'),
  keepLoggedIn: z.boolean(),
});

export type LoginFormInputs = z.infer<typeof LoginValidator>;
