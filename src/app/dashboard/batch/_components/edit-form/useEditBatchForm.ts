import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { updateBatchDetails } from '@/action/batch.action';
import batchEditSchema, { BatchEditType } from '@/validation/batchEdit.schema';
import { AppActionType, IBatchDetails } from '@/types';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { useModal } from '@/context/ModalContext';

export default function useEditBatchForm(data: IBatchDetails) {
  const queryClient = useQueryClient();
  const { dispatch } = useSnakberContext();
  const { handleClose } = useModal();

  const form = useForm<BatchEditType>({
    defaultValues: {
      branch_id: data.branch_id || undefined,
      programme_id: data.programme_id || undefined,
      batch_description: data.batch_description || '',
      batch_start_date: data.batch_start_date || '',
      batch_start_time: data.batch_start_time || '',
      batch_end_date: data.batch_end_date || '',
      batch_end_time: data.batch_end_time || '',
      batch_status: data.batch_status || true,
      created_by: data.created_by,
      is_virtual: data.is_virtual || false,
      has_cofacilitator: data.has_cofacilitator || false,
      cofacilitators: data.cofacilitators || [],
    },
    resolver: zodResolver(batchEditSchema),
  });

  const { control, watch, setValue, reset, handleSubmit } = form;

  const cofacilitator = watch('has_cofacilitator');

  useEffect(() => {
    if (!cofacilitator) {
      setValue('cofacilitators', []);
    }
  }, [cofacilitator]);

  const {
    fields: trainerFields,
    append: appendTrainer,
    remove: removeTrainer,
  } = useFieldArray({
    control,
    name: 'cofacilitators',
  });

  const onSubmit = handleSubmit(async (formdata: BatchEditType) => {
    const resdata = await updateBatchDetails({ formdata, id: data.batch_id });

    if ('error' in resdata) {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: resdata.message || resdata.error,
          type: 'error',
        },
      });
    } else {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: 'Batch edited Successfully',
          type: 'success',
        },
      });
      queryClient.invalidateQueries({ queryKey: ['getAllBatchDetails'] });
      queryClient.invalidateQueries({ queryKey: ['getBatchDetailsByUserId'] });
      reset();
      handleClose();
    }
  });

  return {
    form,
    trainerFields,
    appendTrainer,
    removeTrainer,
    onSubmit,
  };
}
