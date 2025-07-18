import { z } from 'zod';

const batchEditSchema = z.object({
  branch_id: z
    .number()
    .optional()
    .refine((val) => val !== undefined && val >= 1, {
      message: 'Branch Name is required',
    }),
  programme_id: z
    .number()
    .optional()
    .refine((val) => val !== undefined && val >= 1, {
      message: 'Programme field is required',
    }),
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
  batch_start_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
  batch_end_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
  has_cofacilitator: z.boolean().optional(),
  cofacilitators: z
    .array(
      z.object({
        cofacilitator_id: z
          .number()
          .optional()
          .refine((val) => val !== undefined && val >= 1, {
            message: 'Trainer is required',
          }),
        assigned_date: z.string().min(1, 'Date is required'),
        start_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
        end_time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
      })
    )
    .optional(),
  is_virtual: z.boolean().optional(),
});

export type BatchEditType = z.infer<typeof batchEditSchema>;

export default batchEditSchema;
