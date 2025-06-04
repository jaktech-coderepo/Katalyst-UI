import Container from '@mui/material/Container';
import React from 'react';
import { Box } from '@mui/material';
import MasterOfUser from './MasterOfUser';
import UserHeader from './UserHeader';

export default function UserContent() {
  return (
    <Container>
      <Box padding={{ xs: 0, md: 4 }}>
        <UserHeader />
        <MasterOfUser />
      </Box>
    </Container>
  );
}
