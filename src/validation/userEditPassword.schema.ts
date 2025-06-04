import { z } from 'zod';

const userEditPasswordSchema = z
  .object({
    user_id: z
      .number()
      .min(1, 'User Id is required and must be a valid number'),
    password: z
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type userEditPasswordEditType = z.infer<typeof userEditPasswordSchema>;

export default userEditPasswordSchema;
