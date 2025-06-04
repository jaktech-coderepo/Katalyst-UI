import { Grid2, Typography } from '@mui/material';
import React from 'react';

export default function CreateBatchHeader() {
  return (
    <Grid2
      container
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      marginBlockEnd={2}
    >
      <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
        <Typography variant="h3">Create Batch</Typography>
      </Grid2>
    </Grid2>
  );
}
