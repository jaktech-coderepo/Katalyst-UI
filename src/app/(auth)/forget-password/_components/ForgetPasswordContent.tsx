import React from 'react';
import { Grid2 } from '@mui/material';
import ForgetPasswordForm from './ForgetPasswordForm';
import ForgetPasswordHeader from './ForgetPasswordHeader';

export default function ForgetPasswordContent() {
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={12}>
        <ForgetPasswordHeader />
      </Grid2>
      <Grid2
        size={12}
        sx={{
          boxShadow: 'rgba(0, 0, 0, .1) 0px 1px 4px',
          borderColor: 'primary.contrastText',
          borderRadius: '20px',
          p: 2,
        }}
      >
        <ForgetPasswordForm />
      </Grid2>
    </Grid2>
  );
}
