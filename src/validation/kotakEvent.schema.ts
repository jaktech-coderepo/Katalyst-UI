import { z } from 'zod';

const kotakEventSchema = z.object({
  name: z.string().min(1, 'Please enter your name'),
  mobileNo: z.string().min(1, 'Please enter your phone number'),
  referrerName: z.string().min(1, 'Please enter the invited name'),
  referrerCode: z.string().min(1, 'Please enter the invited phone number'),
  branch: z.string().min(1, 'Please enter the branch name'),
  captchaToken: z.string().optional(),
});

export type kotakEventType = z.infer<typeof kotakEventSchema>;

export default kotakEventSchema;
