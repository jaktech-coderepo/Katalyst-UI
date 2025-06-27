'use client';

import SimpleTextField from '@/components/SimpleTextField';
import { ProgrammeCreateType } from '@/validation/programmeCreate.schema';
import { Grid2, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function CreateProgrammeHeader() {
  const { control } = useFormContext<ProgrammeCreateType>();
  return (
    <Grid2
      container
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      marginBlockEnd={2}
    >
      <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
        <Typography variant="h3">Create Template</Typography>
      </Grid2>
      <Grid2 container size={12}>
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <SimpleTextField
            control={control}
            label="Programme Name"
            name="programe_name"
            placeholder="Enter Programme Name"
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
