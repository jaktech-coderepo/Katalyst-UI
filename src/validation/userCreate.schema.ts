import { z } from 'zod';

const userCreateSchema = z.object({
  username: z.string().min(1, 'user Name is required'),
  roleid: z
    .number({ message: 'Role Id is required and must be a valid number' })
    .min(1, 'Role Id is required and must be a valid number'),
  reportingTo: z
    .number({ message: 'Supervisor Id is required and must be a valid number' })
    .optional(),
  empId: z.string().min(1, 'Employee Id is required'),
  channelId: z
    .number({ message: 'Channel Id is required and must be a valid number' })
    .min(1, 'Channel Id is required and must be a valid number'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address, e.g., example@example.com'),
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
  isactive: z.boolean().optional(),
  captchaToken: z.string().optional(),
});

export type UserCreateType = z.infer<typeof userCreateSchema>;

export default userCreateSchema;
