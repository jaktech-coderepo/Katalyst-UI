import { z } from 'zod';

const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address, e.g., example@example.com'),
  captchaToken: z.string().optional(),
});

export type ForgetPasswordType = z.infer<typeof forgetPasswordSchema>;

export default forgetPasswordSchema;
