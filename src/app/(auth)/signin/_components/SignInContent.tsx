import React from 'react';
import { Grid2 } from '@mui/material';
import SignInForm from './SignInForm';
import SignInHeader from './SignInHeader';

export default function SignInContent() {
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={12}>
        <SignInHeader />
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
        <SignInForm />
      </Grid2>
    </Grid2>
  );
}
