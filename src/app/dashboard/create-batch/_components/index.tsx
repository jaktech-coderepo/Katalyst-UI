import { Box, Container } from '@mui/material';
import React from 'react';
import CreateBatchForm from './CreateBatchForm';
import CreateBatchHeader from './CreateBatchHeader';

export default function CreateBatchContent() {
  return (
    <Container>
      <Box padding={{ xs: 0, md: 4 }}>
        <CreateBatchHeader />
        <CreateBatchForm />
      </Box>
    </Container>
  );
}
