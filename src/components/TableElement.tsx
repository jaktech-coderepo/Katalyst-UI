import { Box } from '@mui/material';
import React from 'react';

export default function TableElement({
  bgColor = `linear-gradient(to Bottom, #000000 0%, #7D7C7C 100%)`,
}: {
  bgColor?: string;
}) {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        top: 1,
        bottom: 1,
        width: '8px',
        background: bgColor,
        bgcolor: bgColor,
        borderTopRightRadius: '8px',
        borderBottomRightRadius: '8px',
        content: '""',
        '::before': {
          position: 'absolute',
          content: '""',
          left: 0,
          top: 0,
          bottom: 0,
          width: '100%',
          background: 'inherit',
          borderRadius: 'inherit',
        },
      }}
    />
  );
}
