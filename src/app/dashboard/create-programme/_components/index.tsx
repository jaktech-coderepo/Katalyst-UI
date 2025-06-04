import { Box, Container } from '@mui/material';
import React from 'react';
import CreateProgrammeForm from './CreateProgrammeForm';
import CreateProgrammeHeader from './CreateProgrammeHeader';

export default function CreateProgrammeContent() {
  return (
    <Container>
      <Box padding={{ xs: 0, md: 4 }}>
        <CreateProgrammeHeader />
        <CreateProgrammeForm />
      </Box>
    </Container>
  );
}
