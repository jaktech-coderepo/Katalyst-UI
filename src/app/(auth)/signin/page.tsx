import React from 'react';
import { Box, Container } from '@mui/material';
import BaseLayout from '@/components/BaseLayout';
import SignInContent from './_components/SignInContent';

export default function Signin() {
  return (
    <Box>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100dvh',
        }}
      >
        <BaseLayout>
          <SignInContent />
        </BaseLayout>
      </Container>
    </Box>
  );
}
