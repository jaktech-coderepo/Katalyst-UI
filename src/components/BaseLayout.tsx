'use client';

import React, { ReactNode } from 'react';
import { Box, Grid2 } from '@mui/material';
import Image from 'next/image';
import baseLayoutImage from '@/assets/signin-image.jpg';

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const objectFit = 'cover';

  return (
    <Grid2
      container
      bgcolor={'common.white'}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: 'rgba(0, 0, 0, .1) 0px 1px 4px',
        p: { xs: 1, md: 2 },
        width: 1,
      }}
    >
      <Grid2
        size={{ xs: 12, md: 6 }}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        <Box
          minHeight={'90dvh'}
          height={'100%'}
          width={'100%'}
          position={'relative'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Image
            src={baseLayoutImage}
            alt="base-layout-image"
            fill
            style={{
              display: 'inline-block',
              maxWidth: '100%',
              objectFit,
            }}
            sizes="100%"
          />
        </Box>
      </Grid2>
      <Grid2 container size={{ xs: 12, md: 5.6 }} rowGap={4}>
        <Grid2 size={{ xs: 12 }}>{children}</Grid2>
      </Grid2>
    </Grid2>
  );
};

export default BaseLayout;
