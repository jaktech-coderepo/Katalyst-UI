'use client';

import { Box, Container } from '@mui/material';
import React from 'react';
import DashboardHeader from './DashboardHeader';
import MasterOfDashboard from './MasterOfDashboard';

export default function DashboardContent() {
  return (
    <Container>
      <Box padding={{ xs: 0, md: 4 }}>
        <DashboardHeader />
        <MasterOfDashboard />
      </Box>
    </Container>
  );
}
