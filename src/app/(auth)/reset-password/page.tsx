import React from 'react';
import { Box, Container } from '@mui/material';
import BaseLayout from '@/components/BaseLayout';
import ResetPasswordContent from './_components/ResetPasswordContent';

interface Props {
  searchParams: Promise<{ email: string; otp: string }>;
}

export default async function ResetPassword({ searchParams }: Props) {
  const { email, otp } = await searchParams;
  const searchPrms = new URLSearchParams();
  searchPrms.delete(email);
  searchPrms.delete(otp);
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
          <ResetPasswordContent email={email} otp={otp} />
        </BaseLayout>
      </Container>
    </Box>
  );
}
