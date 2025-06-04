'use client';

import SimpleAutoCompleteField from '@/components/SimpleAutoCompleteField';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IDashboardFilterOptions } from '@/types';
import useDebounce from '@/app/hooks/useDebounce';
import DateRangeField from './DateRangeField';
import useGetAllDashboardAggregateDataContext from './GetAllDashboardAggregateDataContext';

export default function FirstRow({
  programeeOptions,
  trainersOptions,
  MasterDataLoading,
}: {
  programeeOptions: { label: string; value: number }[];
  trainersOptions: { label: string; value: number }[];
  MasterDataLoading: boolean;
}) {
  const { setFilters } = useGetAllDashboardAggregateDataContext();
  const { control, watch, setValue } = useForm<IDashboardFilterOptions>({
    defaultValues: {
      trainerId: undefined,
      programmeId: undefined,
      startDate: '',
      endDate: '',
    },
  });

  // Watch individual fields with debounce
  const trainerId = useDebounce(watch('trainerId'), 300);
  const programmeId = useDebounce(watch('programmeId'), 300);
  const startDate = useDebounce(watch('startDate'), 300);
  const endDate = useDebounce(watch('endDate'), 300);

  // Update filters only when debounced values change
  React.useEffect(() => {
    const filters: IDashboardFilterOptions = {
      trainerId,
      programmeId,
      startDate,
      endDate,
    };
    setFilters(filters);
  }, [trainerId, programmeId, startDate, endDate, setFilters]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' },
        rowGap: 1,
      }}
    >
      <Typography variant="h4" fontWeight={500} color="primary.dark">
        Dashboard
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <SimpleAutoCompleteField
          name="trainerId"
          options={trainersOptions}
          setValue={setValue}
          TextFieldProps={{
            variant: 'outlined',
            placeholder: 'Trainer',
            sx: { minWidth: { xs: '100%', md: '200px' } },
          }}
          isLoading={MasterDataLoading}
        />

        <SimpleAutoCompleteField
          name="programmeId"
          options={programeeOptions}
          setValue={setValue}
          TextFieldProps={{
            variant: 'outlined',
            placeholder: 'Program',
            sx: { minWidth: { xs: '100%', md: '200px' } },
          }}
          isLoading={MasterDataLoading}
        />

        <DateRangeField
          control={control}
          setValue={setValue}
          startName="startDate"
          endName="endDate"
          fullWidth
        />
      </Box>
    </Box>
  );
}
