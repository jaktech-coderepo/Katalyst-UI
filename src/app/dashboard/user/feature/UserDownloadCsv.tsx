import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { CSVLink } from 'react-csv';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import generateFileName from '@/utils/generateFileName';
import DownloadingIcon from '@mui/icons-material/Downloading';
import getAllUserDetails from '@/action/user.action';

interface Props {
  limit: number;
}

export default function UserDownloadCsv({ limit }: Props) {
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
        const response = await getAllUserDetails({ limit });
        if ('error' in response) {
          return setState({
            data: [],
            message: response.error,
            status: 'error',
          });
        }

        setState({
          data: [
            Object.keys(response.results[0]),
            ...response.results.map((obj) =>
              Object.keys(response.results[0]).map(
                (key) => obj[key as keyof typeof obj]
              )
            ),
          ],
          status: 'success',
          message: 'Data fetched successfully',
        });
      } catch {
        setState({
          data: [],
          status: 'error',
          message: 'error while fetching data',
        });
      }
    }
    fetchData();
  }, [limit]);

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
    <CSVLink data={state.data} filename={generateFileName('User-Data', 'csv')}>
      <Button
        variant="outlined"
        startIcon={<DownloadingIcon />}
        sx={{ marginInlineEnd: 1 }}
      >
        Download
      </Button>
    </CSVLink>
  );
}
