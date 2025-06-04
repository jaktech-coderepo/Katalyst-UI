import { Box, Grid2, Typography } from '@mui/material';
import React from 'react';

export default function ResetPasswordHeader() {
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
          Choose a new password
        </Typography>
        <Typography
          component="p"
          variant="subtitle1"
          sx={{
            color: 'text.secondary',
          }}
        >
          To secure your account, choose a strong password you haven’t used
          before and is at least 8 characters long
        </Typography>
      </Box>
    </Grid2>
  );
}
