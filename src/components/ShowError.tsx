import React from 'react';
import { Alert, Typography } from '@mui/material';
import { CommonError } from '@/types/serverActionResponse';

export default function ShowError(data: CommonError) {
  return (
    <Alert severity="error" sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ textWrap: 'wrap' }}>
        {JSON.stringify(data.error)}
      </Typography>
    </Alert>
  );
}
