import { z } from 'zod';

export const LoginValidator = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address.'),
  password: z.string().min(1, 'Password is required.'),
  keepLoggedIn: z.boolean(),
});

export type LoginFormInputs = z.infer<typeof LoginValidator>;
