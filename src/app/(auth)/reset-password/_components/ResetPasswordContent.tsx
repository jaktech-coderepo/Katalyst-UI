import React from 'react';
import { Grid2 } from '@mui/material';
import ResetPasswordForm from './ResetPasswordForm';
import ResetPasswordHeader from './ResetPasswordHeader';

interface Props {
  email: string;
  otp: string;
}

export default function ResetPasswordContent({ email, otp }: Props) {
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={12}>
        <ResetPasswordHeader />
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
        <ResetPasswordForm email={email} otp={otp} />
      </Grid2>
    </Grid2>
  );
}
