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

const programmeEditSchema = z.object({
  programe_name: z
    .string()
    .min(1, 'Programme Name is required')
    .regex(
      /^[A-Za-z0-9_]+$/,
      'Only alphabets, numbers, and underscores are allowed.'
    ),
  is_active: z.boolean().optional(),
  created_date: z.string().min(1, 'Created date is required'),
  created_by: z
    .number({
      required_error: 'Created By is required',
      invalid_type_error: 'Created By be a number',
    })
    .min(1, 'Created By is required'),
  fields: z.array(fieldSchema).nonempty('At least one field is required'),
});

export type ProgrammeEditType = z.infer<typeof programmeEditSchema>;

export default programmeEditSchema;
