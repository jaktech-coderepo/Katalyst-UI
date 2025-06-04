import React from 'react';
import { Box, Container } from '@mui/material';
import BaseLayout from '@/components/BaseLayout';
import OtpVerificationContent from './_components/OtpVerificationContent';

interface Props {
  searchParams: Promise<{ email: string }>;
}

export default async function OtpVerification({ searchParams }: Props) {
  const { email } = await searchParams;
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
          <OtpVerificationContent email={email} />
        </BaseLayout>
      </Container>
    </Box>
  );
}
