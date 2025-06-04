'use client';

import { Box, Grid2, IconButton, Typography } from '@mui/material';
import React, { use } from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { GetCurrentUserContext } from '@/context/User/GetCurrentUserContext';

export default function ProfileComponent() {
  const { data } = use(GetCurrentUserContext);
  return (
    <>
      <Grid2
        display={'flex'}
        alignItems={'center'}
        color={'common.black'}
        overflow={'hidden'}
        textOverflow={'ellipsis'}
        whiteSpace={'nowrap'}
      >
        <IconButton>
          <AccountCircleRoundedIcon
            sx={{
              fontSize: { xs: '30px', lg: '34px' },
            }}
          />
        </IconButton>
        <Box textAlign={'start'}>
          <Typography
            fontWeight={600}
            display={{ xs: 'block' }}
            fontSize={{ xs: '11px', lg: '13px' }}
          >
            {data.data.username}
          </Typography>

          <Typography
            fontWeight={400}
            display={{ xs: 'block' }}
            fontSize={{ xs: '10px', lg: '12px' }}
          >
            {data.data.email}
          </Typography>
        </Box>
      </Grid2>
    </>
  );
}
