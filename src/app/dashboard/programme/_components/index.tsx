import Container from '@mui/material/Container';
import React from 'react';
import { Box } from '@mui/material';
import TemplateHeader from './ProgrammeHeader';
import MasterOfTemplate from './MasterOfProgramme';

export default function TemplateContent() {
  return (
    <Container>
      <Box padding={{ xs: 0, md: 4 }}>
        <TemplateHeader />
        <MasterOfTemplate />
      </Box>
    </Container>
  );
}
