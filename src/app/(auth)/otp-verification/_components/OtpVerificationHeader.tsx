import { Box, Grid2, Typography } from '@mui/material';
import React from 'react';

export default function OtpVerificationHeader() {
  return (
    <Grid2 size={{ xs: 12 }}>
      <Box height={'fit-content'} width={'fit-content'} paddingInlineStart={2}>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            color: 'common.black',
            fontWeight: 'bold',
          }}
        >
          Enter the 6-digit code
        </Typography>
        <Typography
          component="p"
          variant="subtitle1"
          sx={{
            color: 'text.secondary',
          }}
        >
          check *****@kotak.com for a verification code
        </Typography>
      </Box>
    </Grid2>
  );
}
