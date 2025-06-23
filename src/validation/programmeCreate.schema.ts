import { z } from 'zod';

const fieldSchema = z
  .object({
    field_id: z.string().optional(),
    field_name: z
      .string()
      .min(1, 'Field Name is required')
      .regex(
        /^[A-Za-z0-9_]+$/,
        'Only alphabets, numbers, and underscores are allowed.'
      ),
    field_type: z.string().min(1, 'Field Type is required'),
    dropdown_options: z.array(z.string()).optional(),
    dropdown_multi: z.boolean().optional(),
    checkbox_value: z.array(z.string()).optional(),
    qrCode: z.boolean().optional(),
    is_active: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.field_type === 'dropdown') {
        return (
          Array.isArray(data.dropdown_options) &&
          data.dropdown_options.length >= 2
        );
      }
      return true;
    },
    {
      message: 'Dropdown must have at least 2 options',
      path: ['dropdown_options'],
    }
  );

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
  channelId: z
    .number({ message: 'Channel Id is required and must be a valid number' })
    .min(1, 'Channel Id is required and must be a valid number'),
  programmeType: z
    .number({
      message: 'Programme Type Id is required and must be a valid number',
    })
    .min(1, 'Programme Type Id is required and must be a valid number'),
  attendance: z.boolean(),
  qrCode: z.boolean(),
  fields: z.array(fieldSchema).nonempty('At least one field is required'),
  captchaToken: z.string().optional(),
});

export type ProgrammeCreateType = z.infer<typeof programmeCreateSchema>;
export default programmeCreateSchema;
