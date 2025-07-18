import { z } from 'zod';

const batchCreateSchema = z
  .object({
    branch_id: z
      .number({ message: 'Branch Name is required' })
      .min(1, 'Branch Name is required'),
    programme_id: z
      .number({ message: 'Programme field is required' })
      .min(1, 'Programme field is required'),
    // batch_description: z.string().min(1, 'Batch Description is required'),
    batch_description: z.string().optional(),
    batch_start_date: z.string().min(1, 'Batch Start Date is required'),
    batch_end_date: z.string().min(1, 'Batch End Date is required'),
    created_by: z
      .number()
      .optional()
      .refine((val) => val !== undefined && val >= 1, {
        message: 'Created By is required',
      }),
    batch_status: z.boolean().optional(),
    captchaToken: z.string().optional(),
    batch_start_time: z.string().regex(/^\d{2}:\d{2}$/),
    batch_end_time: z.string().regex(/^\d{2}:\d{2}$/),
    has_cofacilitator: z.boolean().optional(),
    cofacilitators: z
      .array(
        z.object({
          cofacilitator_id: z
            .number({ message: 'Trainer is required' })
            .min(1, 'Trainer is required'),

          assigned_date: z.string().min(1, 'Date is required'),
          start_time: z.string().regex(/^\d{2}:\d{2}$/),
          end_time: z.string().regex(/^\d{2}:\d{2}$/),
        })
      )
      .optional(),
    is_virtual: z.boolean().optional(),
    // batchstartdate: z
    //   .string()
    //   .min(1, 'Batch start date is required')
    //   .refine((value) => !Number.isNaN(Date.parse(value)), {
    //     message: 'Invalid Start Date',
    //   }),
    // batchenddate: z
    //   .string()
    //   .min(1, 'Batch End date is required')
    //   .refine((value) => !Number.isNaN(Date.parse(value)), {
    //     message: 'Invalid End Date',
    //   }),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.batch_start_date);
      const endDate = new Date(data.batch_end_date);
      return startDate <= endDate;
    },
    {
      message: 'Batch End Date cannot be before Batch Start Date',
      path: ['batch_end_date'],
    }
  );
// .superRefine((ele, ctx) => {
//   if (ele.batchstartdate && ele.batchenddate) {
//     const start = new Date(ele.batchstartdate);
//     const end = new Date(ele.batchenddate);
//     if (start > end) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ['batchenddate'],
//         message: 'Batch End Date should be greater than Batch Start Date',
//       });
//     }
//   }
// });

export type BatchCreateType = z.infer<typeof batchCreateSchema>;
export default batchCreateSchema;
