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
  input_type: z.string().min(1, 'Field Type is required'), // textbox, dropdown, checkbox, number
  field_type: z.string().min(1, 'Field Type is required'), // text, int4, etc.
  field_values: z.array(z.string()).optional(), // For dropdowns, checkboxes, etc.
  has_options: z.boolean().optional(), // UI hint if options exist
  include_in_qr: z.boolean().optional(), // Whether to include in QR
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
  channel_id: z
    .number({ message: 'Channel Id is required and must be a valid number' })
    .min(1, 'Channel Id is required and must be a valid number'),
  programe_type_id: z
    .number({
      message: 'Programme Type Id is required and must be a valid number',
    })
    .min(1, 'Programme Type Id is required and must be a valid number'),
  attendance: z.boolean(),
  enable_qr: z.boolean(),
  fields: z.array(fieldSchema).nonempty('At least one field is required'),
});

export type ProgrammeEditType = z.infer<typeof programmeEditSchema>;

export default programmeEditSchema;
