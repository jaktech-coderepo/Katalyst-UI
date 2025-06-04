import Container from '@mui/material/Container';
import React from 'react';
import { Box } from '@mui/material';
import BatchHeader from './BatchHeader';
import MasterOfBatch from './MasterOfBatch';

export default function BatchContent() {
  return (
    <Container>
      <Box padding={{ xs: 0, md: 4 }}>
        <BatchHeader />
        <MasterOfBatch />
      </Box>
    </Container>
  );
}
