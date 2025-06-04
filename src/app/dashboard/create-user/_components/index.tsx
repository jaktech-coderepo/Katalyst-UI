import { Box, Container } from '@mui/material';
import React from 'react';
import CreateUserHeader from './CreateUserHeader';
import CreateUserForm from './CreateUserForm';

export default function CreateUserContent() {
  return (
    <Container>
      <Box padding={{ xs: 0, md: 4 }}>
        <CreateUserHeader />
        <CreateUserForm />
      </Box>
    </Container>
  );
}
