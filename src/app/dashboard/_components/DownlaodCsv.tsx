import React, { useEffect, useState } from 'react';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { CSVLink } from 'react-csv';
import generateFileName from '@/utils/generateFileName';
import { getDownloadProgramme } from '@/action/batch.action';

export default function DownloadCsv({
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
      <Tooltip title={'creating csv'} arrow>
        <IconButton
          sx={{
            color: 'error.main',
            bgcolor: 'grey.50',
            borderRadius: 1.5,
          }}
        >
          <CircularProgress />
        </IconButton>
      </Tooltip>
    );
  }

  if (state.status === 'error') {
    return (
      <Tooltip title={state.message} arrow>
        <IconButton
          sx={{
            color: 'error.main',
            bgcolor: 'grey.50',
            borderRadius: 1.5,
          }}
        >
          <ErrorOutlineOutlinedIcon color="inherit" />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <CSVLink
      data={state.data}
      filename={generateFileName(programmeName, 'csv')}
    >
      <Tooltip title={'download programme'} arrow>
        <IconButton
          sx={{
            color: 'error.main',
            bgcolor: 'grey.50',
            borderRadius: 1.5,
          }}
        >
          <FileDownloadOutlinedIcon color="inherit" />
        </IconButton>
      </Tooltip>
    </CSVLink>
  );
}
