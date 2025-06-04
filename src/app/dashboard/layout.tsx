import { Grid2 } from '@mui/material';
import React, { ReactNode } from 'react';
import { StepperProvider } from './stepper/StepperContext';

interface LayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  header: ReactNode;
}

export default function layout({ children, sidebar, header }: LayoutProps) {
  return (
    <StepperProvider>
      <Grid2
        container
        minHeight={'100vh'}
        display={'flex'}
        flexDirection={'column'}
      >
        <Grid2 size={12}>{header}</Grid2>
        <Grid2 size={'grow'} container>
          <Grid2
            sx={{
              width: 'fit-content',
              display: { xs: 'none', md: 'block' },
              p: 1,
            }}
          >
            {sidebar}
          </Grid2>
          <Grid2
            size={'grow'}
            sx={{
              borderTopLeftRadius: { xs: 0, md: 20 },
              borderBottomLeftRadius: { xs: 0, md: 20 },
              p: { xs: 1, md: 2 },
            }}
            bgcolor={'grey.50'}
          >
            {children}
          </Grid2>
        </Grid2>
      </Grid2>
    </StepperProvider>
  );
}
