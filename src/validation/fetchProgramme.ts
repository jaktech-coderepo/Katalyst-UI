import { z } from 'zod';

const fetchProgrammeSchema = z.object({
  programme_id: z
    .number()
    .optional()
    .refine((val) => val !== undefined && val >= 1, {
      message: 'Programme field is required',
    }),
});

export type FetchProgrammeType = z.infer<typeof fetchProgrammeSchema>;

export default fetchProgrammeSchema;
