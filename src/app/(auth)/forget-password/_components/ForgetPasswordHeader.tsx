import { Box, Grid2, Typography } from '@mui/material';
import React from 'react';

export default function ForgetPasswordHeader() {
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
          Forget Password
        </Typography>
        <Typography
          component="p"
          variant="subtitle1"
          sx={{
            color: 'text.secondary',
          }}
        >
          We’ll send a verification code to this email.
        </Typography>
      </Box>
    </Grid2>
  );
}
