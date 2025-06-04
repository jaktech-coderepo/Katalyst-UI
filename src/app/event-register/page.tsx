import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import bgkotak from '@/assets/bg_img_kotak.png';
import kotak from '@/assets/kotak-life-insurance-logo.ico';
import Image from 'next/image';
import { getEventBranch } from '@/action/kotak-event.action';
import ShowError from '@/components/ShowError';
import KotakEventForm from './_components/KotakEventForm';

export default async function page() {
  const data = await getEventBranch();
  if ('error' in data) {
    return <ShowError {...data} />;
  }
  return (
    <Box>
      <Container
        sx={{
          minHeight: '96dvh',
          position: 'relative',
        }}
      >
        <Box sx={{ display: 'flex', marginBlockStart: 2 }}>
          <Image src={kotak.src} width={200} height={100} alt="Kotat Life" />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '60%',
            zIndex: -1,
          }}
        >
          <Image
            src={bgkotak.src}
            layout="fill"
            objectFit="cover"
            alt="Kotak Life"
          />
        </Box>
        <Paper
          elevation={4}
          sx={{
            width: { xs: 1, md: 0.9 },
            marginInline: 'auto',
            borderRadius: 4,
            p: { xs: 2, md: 4 },
            marginBlockStart: { xs: 0, md: 4 },
          }}
        >
          <Typography
            textAlign={'center'}
            variant="h4"
            fontWeight={600}
            sx={{ color: '#ec020b' }}
          >
            Kotak{' '}
            <Typography
              component={'span'}
              sx={{
                color: '#003874',
                fontSize: 'inherit',
                fontWeight: 'inherit',
              }}
            >
              Event
            </Typography>
          </Typography>
          <KotakEventForm data={data.data} />
        </Paper>
      </Container>
    </Box>
  );
}
