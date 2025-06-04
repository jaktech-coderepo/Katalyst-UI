import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { CSVLink } from 'react-csv';
import generateFileName from '@/utils/generateFileName';
import { getDownloadProgramme } from '@/action/batch.action';

export default function ProgrammeStructureDownlaodCsv({
  id,
  programmeName,
}: {
  id: number;
  programmeName: string;
}) {
  const [state, setState] = useState<{
    data: any[];
    status: 'error' | 'success' | 'loading';
    message: string;
  }>({
    data: [],
    status: 'loading',
    message: '',
  });

  useEffect(() => {
    async function fetchData() {
      setState((prev) => ({ ...prev, status: 'loading' }));
      try {
        const response = await getDownloadProgramme({ id });
        if ('error' in response) {
          return setState({
            data: [],
            message: response.error,
            status: 'error',
          });
        }

        setState({
          data: [response.data.map((ele) => ele.column_name)],
          status: 'success',
          message: 'Data fetched successfully',
        });
      } catch {
        setState({
          data: [],
          status: 'error',
          message: 'Error fetching data',
        });
      }
    }
    fetchData();
  }, []);

  if (state.status === 'loading') {
    return (
      <Button variant="outlined" sx={{ marginInlineEnd: 1 }} fullWidth>
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
        fullWidth
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
        fullWidth
      >
        Download
      </Button>
    </CSVLink>
  );
}
