import { z } from 'zod';

const uploadDocumentSchema = z.object({
  file: z
    .array(
      z.any().refine((file) => file instanceof File, 'File must not be empty')
    )
    .min(1, { message: 'At least one file is required' }),
});

export type UploadDocumentType = z.infer<typeof uploadDocumentSchema>;

export default uploadDocumentSchema;
