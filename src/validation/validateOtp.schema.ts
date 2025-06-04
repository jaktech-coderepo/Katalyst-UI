import { z } from 'zod';

const validateOtpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be exactly 6 characters')
    .regex(/^\d{6}$/, 'OTP must be a 6-digit number'),
  email: z.string().email(),
  captchaToken: z.string().optional(),
});

export type ValidateOtpType = z.infer<typeof validateOtpSchema>;

export default validateOtpSchema;
