import { Alert, SxProps, Theme } from '@mui/material';
import React from 'react';

export default function ShowMessage({
  message,
  sx,
}: {
  message: string;
  sx?: SxProps<Theme>;
}) {
  return (
    <Alert severity="error" sx={sx}>
      {message}
    </Alert>
  );
}
