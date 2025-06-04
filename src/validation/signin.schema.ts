import { z } from 'zod';

const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address, e.g., example@example.com'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  captchaToken: z.string().min(1, 'Captcha is required'),
});

export type SignInType = z.infer<typeof signInSchema>;

export default signInSchema;
