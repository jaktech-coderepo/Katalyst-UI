import { z } from 'zod';

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(32, { message: 'Password must be no more than 32 characters long' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
      .regex(/[@$!%*?&#]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string(),
    otp: z.string(),
    email: z.string(),
    captchaToken: z.string().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

export default resetPasswordSchema;
