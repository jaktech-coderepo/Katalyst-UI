import { z } from 'zod';

const userEditSchema = z.object({
  username: z.string().min(1, 'user Name is required'),
  roleid: z.number().min(1, 'Role Id is required and must be a valid number'),
  reportingTo: z
    .number({ message: 'Supervisor Id is required and must be a valid number' })
    .optional(),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address, e.g., example@example.com'),
  isactive: z.boolean().optional(),
});

export type UserEditType = z.infer<typeof userEditSchema>;

export default userEditSchema;
