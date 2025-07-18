'use client';

import DateField from '@/components/SimpleDateField';
import SubmitButton from '@/components/SubmitButton';
import { Box, FormLabel, Grid2, TextField } from '@mui/material';
import React, { use } from 'react';
import { GetCurrentUserContext } from '@/context/User/GetCurrentUserContext';
import CreateBranchField from '@/components/BranchField/CreateBranchField';
import CreateProgrammeField from '@/components/ProgrammeField/CreateProgrammeField';
import CaptchaVerifier from '@/components/CaptchaVerifier';
import TimeField from '@/components/SimpleTimeField';
import timeStringToDate from '@/utils/timeStringToDate';
import useCreateBatchForm from './useCreateBatchForm';
import CofacilitatorSection from './CofacilitatorSection';

export default function CreateBatchForm() {
  const { data } = use(GetCurrentUserContext);

  const { form, cofacilitators, showCaptcha, onSubmit } = useCreateBatchForm(
    data.data.userid
  );

  const startDate = form.watch('batch_start_date');
  const endDate = form.watch('batch_end_date');
  const isDateRangeSelected = startDate && endDate;

  return (
    <Grid2
      container
      component={'form'}
      onSubmit={onSubmit}
      spacing={2}
      justifyContent={'center'}
      padding={2}
      boxShadow={'0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}
      bgcolor={'common.white'}
      borderRadius={3}
    >
      <Grid2 size={12}>
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
        <CreateBranchField
          name="branch_id"
          setValue={form.setValue}
          trigger={form.trigger}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <CreateProgrammeField
          name="programme_id"
          setValue={form.setValue}
          trigger={form.trigger}
        />
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
          control={form.control}
          label="Batch Start Date"
          name="batch_start_date"
          fullWidth
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <DateField
          control={form.control}
          label="Batch End Date"
          name="batch_end_date"
          disabled={!form.watch('batch_start_date')}
          fullWidth
          minDate={
            form.watch('batch_start_date')
              ? new Date(form.watch('batch_start_date'))
              : undefined
          }
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TimeField
          control={form.control}
          name="batch_start_time"
          label="Batch Start Time"
          disabled={!isDateRangeSelected}
          format="hh:mm a"
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TimeField
          control={form.control}
          name="batch_end_time"
          label="Batch End Time"
          disabled={!isDateRangeSelected || !form.watch('batch_start_time')}
          format="hh:mm a"
          minTime={
            form.watch('batch_start_time')
              ? timeStringToDate(form.watch('batch_start_time'))
              : undefined
          }
        />
      </Grid2>
      <CofacilitatorSection form={form} cofacilitators={cofacilitators} />
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
              setValue={form.setValue}
              trigger={form.trigger}
              name="captchaToken"
              error={form.formState.errors.captchaToken?.message}
            />
          </Box>
        )}
      </Grid2>
      <Grid2 size={12}>
        <SubmitButton
          isSubmitted={form.formState.isSubmitted}
          isSubmitting={form.formState.isSubmitting}
          isValid={form.formState.isValid}
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
