import DateField from '@/components/SimpleDateField';
import SubmitButton from '@/components/SubmitButton';
import { useModal } from '@/context/ModalContext';
import { AppActionType, IBatchDetails } from '@/types';
import batchEditSchema, { BatchEditType } from '@/validation/batchEdit.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid2 } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import { useQueryClient } from '@tanstack/react-query';
import { updateBatchDetails } from '@/action/batch.action';
import EditProgrammeField from '@/components/ProgrammeField/EditProgrammeField';
import EditBranchField from '@/components/BranchField/EditBranchField';

export default function BatchEditForm({ data }: { data: IBatchDetails }) {
  const { dispatch } = useSnakberContext();
  const queryClient = useQueryClient();
  const { handleClose } = useModal();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isValid, isSubmitted, isSubmitting },
  } = useForm<BatchEditType>({
    defaultValues: {
      branch_id: data.branch_id || undefined,
      programme_id: data.programme_id || undefined,
      batch_description: data.batch_description || '',
      batch_start_date: data.batch_start_date || '',
      batch_end_date: data.batch_end_date || '',
      batch_status: data.batch_status || true,
      created_by: data.created_by,
    },
    resolver: zodResolver(batchEditSchema),
  });

  async function onSubmit(formdata: BatchEditType) {
    const resdata = await updateBatchDetails({
      formdata,
      id: data.batch_id,
    });
    if ('error' in resdata) {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: resdata.message ? resdata.message : resdata.error,
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
      queryClient.invalidateQueries({
        queryKey: ['getAllBatchDetails'],
      });
      queryClient.invalidateQueries({
        queryKey: ['getBatchDetailsByUserId'],
      });

      reset();
      handleClose();
    }
  }

  return (
    <Grid2
      container
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      justifyContent={'center'}
      padding={2}
    >
      <Grid2 size={{ xs: 12, sm: 5.8 }}>
        <EditBranchField name="branch_id" setValue={setValue} watch={watch} />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 5.8 }}>
        <EditProgrammeField
          name="programme_id"
          setValue={setValue}
          watch={watch}
        />
      </Grid2>
      {/* <Grid2 size={{ xs: 12, sm: 5.8 }}>
        <SimpleTextField
          control={control}
          label="Batch Description"
          name="batch_description"
          placeholder="BatchDescription..."
        />
      </Grid2> */}
      <Grid2 size={{ xs: 12, sm: 5.8 }}>
        <DateField
          control={control}
          label="Batch Start Date"
          name="batch_start_date"
          fullWidth
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 5.8 }}>
        <DateField
          control={control}
          label="Batch End Date"
          name="batch_end_date"
          fullWidth
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 5.8 }}></Grid2>
      <Grid2 size={12}>
        <SubmitButton
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: 'secondary.dark',
            color: 'common.white',
          }}
          title="Save"
        />
      </Grid2>
    </Grid2>
  );
}
