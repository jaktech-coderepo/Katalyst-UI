'use client';

import DateField from '@/components/SimpleDateField';
import SubmitButton from '@/components/SubmitButton';
import batchCreateSchema, {
  BatchCreateType,
} from '@/validation/batchCreate.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormLabel, Grid2, TextField } from '@mui/material';
import { redirect } from 'next/navigation';
import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GetCurrentUserContext } from '@/context/User/GetCurrentUserContext';
import { createBatchDetails } from '@/action/batch.action';
import { AppActionType } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import useSnakberContext from '@/context/AppProvider/useSnakberContext';
import CreateBranchField from '@/components/BranchField/CreateBranchField';
import CreateProgrammeField from '@/components/ProgrammeField/CreateProgrammeField';
import CaptchaVerifier from '@/components/CaptchaVerifier';

export default function CreateBatchForm() {
  const { data } = use(GetCurrentUserContext);
  const queryClient = useQueryClient();
  const { dispatch } = useSnakberContext();
  const [showCaptcha, setShowCaptcha] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    watch,
    reset,
    formState: { isValid, isSubmitted, isSubmitting, errors },
  } = useForm<BatchCreateType>({
    defaultValues: {
      branch_id: undefined,
      programme_id: undefined,
      batch_description: '',
      batch_start_date: '',
      batch_end_date: '',
      batch_status: true,
      created_by: data.data.userid,
    },
    resolver: zodResolver(batchCreateSchema),
  });

  async function onSubmit(formdata: BatchCreateType) {
    const response = await createBatchDetails(formdata);
    if ('error' in response) {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: response.message ? response.message : response.error,
          type: 'error',
        },
      });
      setShowCaptcha(false);
      if (response?.captchaRequired) {
        setShowCaptcha(true);
      }
    } else {
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: 'Form Submitted Successfully',
          type: 'success',
        },
      });
      reset();
      setShowCaptcha(false);
      queryClient.invalidateQueries({
        queryKey: ['getAllBatchDetails'],
      });
      queryClient.invalidateQueries({
        queryKey: ['getBatchDetailsByUserId'],
      });
      redirect('/dashboard/batch');
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
      boxShadow={'0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}
      bgcolor={'common.white'}
      borderRadius={3}
    >
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <FormLabel
          sx={{
            color: 'common.black',
            fontWeight: 600,
            width: '100%',
            display: 'inline-block',
            paddingBlock: 1,
          }}
          htmlFor={'batchnumber'}
        >
          Batch Number
        </FormLabel>
        <TextField
          fullWidth
          id={'batchnumber'}
          variant="standard"
          type="text"
          size="small"
          placeholder="Auto generated"
          disabled
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <CreateBranchField name="branch_id" setValue={setValue} />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <CreateProgrammeField name="programme_id" setValue={setValue} />
      </Grid2>

      {/* <Grid2 size={{ xs: 12, sm: 6 }}>
        <SimpleTextField
          control={control}
          label="Batch Description"
          name="batch_description"
          placeholder="BatchDescription..."
          multiline
        />
      </Grid2> */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <DateField
          control={control}
          label="Batch Start Date"
          name="batch_start_date"
          fullWidth
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <DateField
          control={control}
          label="Batch End Date"
          name="batch_end_date"
          fullWidth
          minDate={
            watch('batch_start_date')
              ? new Date(watch('batch_start_date'))
              : undefined
          }
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        {showCaptcha && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'end',
              flexDirection: 'column',
            }}
          >
            <CaptchaVerifier
              setValue={setValue}
              trigger={trigger}
              name="captchaToken"
              error={errors.captchaToken?.message}
            />
          </Box>
        )}
      </Grid2>
      <Grid2 size={12}>
        <SubmitButton
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
          variant="contained"
          sx={{
            backgroundColor: 'secondary.dark',
            color: 'common.white',
            display: 'flex',
            justifySelf: 'end',
            paddingInline: 5,
            paddingBlock: 1,
          }}
          title="Save"
        />
      </Grid2>
    </Grid2>
  );
}
