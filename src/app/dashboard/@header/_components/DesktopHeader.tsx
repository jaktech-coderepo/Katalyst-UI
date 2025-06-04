'use client';

import { Box, Grid2, IconButton, Typography } from '@mui/material';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

export default function DesktopHeader() {
  return (
    <>
      <Grid2 display={{ xs: 'none', md: 'block' }}>
        <Box
          display={{ xs: 'none', md: 'flex' }}
          flexWrap={'nowrap'}
          alignItems="center"
          justifyContent={{ sm: 'flex-end', md: 'space-between' }}
          padding={1}
        >
          <Box display={{ sm: 'none', md: 'flex' }} flexDirection="column">
            <Typography
              variant="h4"
              component={'h1'}
              fontWeight={600}
              color="primary.dark"
            >
              Katalyst
            </Typography>
          </Box>
          <Grid2 color={'primary.main'} container spacing={2}>
            <Grid2
              size={12}
              alignItems={'start'}
              display={'flex'}
              justifyContent={'center'}
            >
              <IconButton LinkComponent={'a'} href="/logout">
                <LogoutIcon
                  sx={{
                    color: 'common.black',
                  }}
                  fontSize="large"
                />
              </IconButton>
            </Grid2>
          </Grid2>
        </Box>
      </Grid2>
    </>
  );
}
