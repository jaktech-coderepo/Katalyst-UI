import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { CSVLink } from 'react-csv';
import generateFileName from '@/utils/generateFileName';

export default function ProgrammeDataDownlaodCsv({
  state,
  programmeName,
}: {
  state: {
    data: any[];
    status: 'error' | 'success' | 'loading';
    message: string;
  };
  programmeName: string;
}) {
  if (state.status === 'loading') {
    return (
      <Button variant="outlined" sx={{ marginInlineEnd: 1 }}>
        <CircularProgress
          color="inherit"
          size={20}
          sx={{ marginInlineEnd: 1 }}
        />
        Loading...
      </Button>
    );
  }

  if (state.status === 'error') {
    return (
      <Button
        variant="outlined"
        startIcon={<ErrorOutlineOutlinedIcon />}
        sx={{ marginInlineEnd: 1 }}
      >
        {state.message}
      </Button>
    );
  }

  return (
    <CSVLink
      data={state.data}
      filename={generateFileName(programmeName, 'csv')}
    >
      <Button
        variant="outlined"
        startIcon={<FileDownloadOutlinedIcon />}
        sx={{ marginInlineEnd: 1 }}
      >
        Download
      </Button>
    </CSVLink>
  );
}
