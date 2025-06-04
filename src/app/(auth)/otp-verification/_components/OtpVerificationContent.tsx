import React from 'react';
import { Grid2 } from '@mui/material';
import OtpVerificationForm from './OtpVerificationForm';
import OtpVerificationHeader from './OtpVerificationHeader';

export default function OtpVerificationContent({ email }: { email: string }) {
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={12}>
        <OtpVerificationHeader />
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
        <OtpVerificationForm email={email} />
      </Grid2>
    </Grid2>
  );
}
