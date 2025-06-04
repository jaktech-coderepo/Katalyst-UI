import { Box, Grid2, Typography } from '@mui/material';
import React from 'react';

export default function SignInHeader() {
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
          Welcome To
          <Typography
            variant="h4"
            sx={{
              color: '#E30613',
              fontWeight: 'bold',
            }}
            component={'span'}
          >
            {' '}
            Katalyst
          </Typography>
        </Typography>
      </Box>
    </Grid2>
  );
}
