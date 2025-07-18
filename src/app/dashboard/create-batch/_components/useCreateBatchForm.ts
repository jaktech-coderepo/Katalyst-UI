// hooks/useCreateBatchForm.ts
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import batchCreateSchema, {
  BatchCreateType,
} from '@/validation/batchCreate.schema';
import { useQueryClient } from '@tanstack/react-query';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { createBatchDetails } from '@/action/batch.action';
import { AppActionType } from '@/types';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useCreateBatchForm(userId: number) {
  const queryClient = useQueryClient();
  const { dispatch } = useSnakberContext();
  const [showCaptcha, setShowCaptcha] = useState(false);

  const form = useForm<BatchCreateType>({
    defaultValues: {
      branch_id: undefined,
      programme_id: undefined,
      batch_description: '',
      batch_start_date: '',
      batch_end_date: '',
      batch_status: true,
      created_by: userId,
      batch_start_time: '10:10',
      batch_end_time: '10:10',
      has_cofacilitator: false,
      cofacilitators: [],
      is_virtual: false,
    },
    resolver: zodResolver(batchCreateSchema),
  });

  const {
    fields: trainerFields,
    append: appendTrainer,
    remove: removeTrainer,
  } = useFieldArray({
    control: form.control,
    name: 'cofacilitators',
  });

  // automatically clear cofacilitators when unchecked
  useEffect(() => {
    if (!form.watch('has_cofacilitator')) {
      form.setValue('cofacilitators', []);
    }
  }, [form.watch('has_cofacilitator')]);

  const onSubmit = form.handleSubmit(async (data) => {
    const resp = await createBatchDetails(data);
    if ('error' in resp) {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: { message: resp.message || resp.error, type: 'error' },
      });
      setShowCaptcha(false);
      if (resp.captchaRequired) setShowCaptcha(true);
    } else {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: { message: 'Form Submitted Successfully', type: 'success' },
      });
      form.reset();
      setShowCaptcha(false);
      queryClient.invalidateQueries({
        queryKey: ['getAllBatchDetails'],
      });
      queryClient.invalidateQueries({
        queryKey: ['getBatchDetailsByUserId'],
      });
      redirect('/dashboard/batch');
    }
  });

  return {
    form,
    cofacilitators: { trainerFields, appendTrainer, removeTrainer },
    showCaptcha,
    setShowCaptcha,
    onSubmit,
  };
}
