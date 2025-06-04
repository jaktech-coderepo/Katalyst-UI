import { z } from 'zod';

const fieldSchema = z.object({
  field_id: z.string().optional(),
  field_name: z
    .string()
    .min(1, 'Field Name is required')
    .regex(
      /^[A-Za-z0-9_]+$/,
      'Only alphabets, numbers, and underscores are allowed.'
    ),
  field_type: z.string().min(1, 'Field Type is required'),
  is_active: z.boolean().optional(),
});

const programmeCreateSchema = z.object({
  programe_name: z
    .string()
    .min(1, 'programme Name is required')
    .regex(
      /^[A-Za-z0-9_]+$/,
      'Only alphabets, numbers, and underscores are allowed.'
    ),
  is_active: z.boolean().optional(),
  created_by: z
    .number({
      required_error: 'Created By is required',
      invalid_type_error: 'Created By be a number',
    })
    .min(1, 'Created By is required'),
  fields: z.array(fieldSchema).nonempty('At least one field is required'),
  captchaToken: z.string().optional(),
});

export type programmeCreateType = z.infer<typeof programmeCreateSchema>;
export default programmeCreateSchema;
