import React from 'react';
import { Grid2 } from '@mui/material';

import DateField from '@/components/SimpleDateField';
import SubmitButton from '@/components/SubmitButton';
import EditProgrammeField from '@/components/ProgrammeField/EditProgrammeField';
import EditBranchField from '@/components/BranchField/EditBranchField';
import { IBatchDetails } from '@/types';
import TimeField from '@/components/SimpleTimeField';
import timeStringToDate from '@/utils/timeStringToDate';
import useEditBatchForm from './useEditBatchForm';
import CofacilitatorSection from './CofacilitatorSection';

interface BatchEditFormProps {
  data: IBatchDetails;
}

export default function BatchEditForm({ data }: BatchEditFormProps) {
  const { form, trainerFields, appendTrainer, removeTrainer, onSubmit } =
    useEditBatchForm(data);

  const {
    control,
    setValue,
    watch,
    formState: { isValid, isSubmitted, isSubmitting },
  } = form;

  const startDate = watch('batch_start_date');
  const endDate = watch('batch_end_date');
  const isDateRangeSelected = startDate && endDate;

  return (
    <Grid2
      container
      component="form"
      onSubmit={onSubmit}
      spacing={2}
      justifyContent="center"
      padding={2}
    >
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <EditBranchField name="branch_id" setValue={setValue} watch={watch} />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <EditProgrammeField
          name="programme_id"
          setValue={setValue}
          watch={watch}
        />
      </Grid2>

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
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TimeField
          control={control}
          name="batch_start_time"
          label="Batch Start Time"
          disabled={!isDateRangeSelected}
          format="hh:mm a"
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <TimeField
          control={control}
          name="batch_end_time"
          label="Batch End Time"
          disabled={!isDateRangeSelected || !watch('batch_start_time')}
          format="hh:mm a"
          minTime={
            watch('batch_start_time')
              ? timeStringToDate(watch('batch_start_time'))
              : undefined
          }
        />
      </Grid2>

      <CofacilitatorSection
        form={form}
        cofacilitators={{
          trainerFields,
          appendTrainer,
          removeTrainer,
        }}
      />

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
