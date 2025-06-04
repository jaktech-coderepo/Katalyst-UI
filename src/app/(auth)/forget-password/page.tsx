import React from 'react';
import { Box, Container } from '@mui/material';
import BaseLayout from '@/components/BaseLayout';
import ForgetPasswordContent from './_components/ForgetPasswordContent';

export default function ForgetPassword() {
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
          <ForgetPasswordContent />
        </BaseLayout>
      </Container>
    </Box>
  );
}
