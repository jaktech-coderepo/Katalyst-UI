'use client';

import React from 'react';
import { Box, Typography, Paper, Grid2 } from '@mui/material';
import Image from 'next/image';

interface TrainerQRCodeDisplayProps {
  qrCodeUrl: string;
  BatchNumber?: string;
}

function TrainerQRCodeDisplay({
  qrCodeUrl,
  BatchNumber = 'Training Session',
}: TrainerQRCodeDisplayProps) {
  return (
    <Grid2 container spacing={4} justifyContent="center" alignItems="center">
      <Grid2 size={{ xs: 11, sm: 8, md: 6 }} paddingBlock={5}>
        <Paper
          elevation={3}
          sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}
        >
          <Typography variant="h5" gutterBottom>
            {BatchNumber}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Scan the QR code below to register your attendance
          </Typography>

          <Box
            sx={{
              maxWidth: '100%',
              position: 'relative',
              height: 200,
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <Image
              src={qrCodeUrl}
              alt="Training QR Code"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 12,
                objectFit: 'contain',
              }}
              fill
            />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            Please keep this screen visible for participants to scan.
          </Typography>
        </Paper>
      </Grid2>
    </Grid2>
  );
}

export default TrainerQRCodeDisplay;
