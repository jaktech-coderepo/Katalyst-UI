import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { CSVLink } from 'react-csv';
import { format } from 'date-fns';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import generateFileName from '@/utils/generateFileName';
import { getBatchDetailsByUserId } from '@/action/batch.action';
import DownloadingIcon from '@mui/icons-material/Downloading';

interface Props {
  limit: number;
  id: number;
}

export default function UserSpecificBatchDownloadCsv({ limit, id }: Props) {
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
        const response = await getBatchDetailsByUserId({ limit, id });
        if ('error' in response) {
          return setState({
            data: [],
            message: response.error,
            status: 'error',
          });
        }

        if (!response.success) {
          return setState({
            data: [],
            message: 'No data found',
            status: 'error',
          });
        }

        setState({
          data: [
            Object.keys(response.results[0]).filter(
              (key) =>
                key !== 'batch_id' &&
                key !== 'branch_id' &&
                key !== 'programme_id' &&
                key !== 'created_by'
            ),
            ...response.results.map((obj) =>
              Object.keys(response.results[0])
                .filter(
                  (key) =>
                    key !== 'batch_id' &&
                    key !== 'branch_id' &&
                    key !== 'programme_id' &&
                    key !== 'created_by'
                )
                .map((key) =>
                  // eslint-disable-next-line no-nested-ternary
                  key === 'created_date' || key === 'updated_at'
                    ? format(
                        new Date(obj[key as keyof typeof obj] as string),
                        'dd-MMM-yy : pp'
                      ) || '-'
                    : key === 'batch_start_date' || key === 'batch_end_date'
                      ? format(
                          new Date(obj[key as keyof typeof obj] as string),
                          'dd-MMM-yy : pp'
                        ) || '-'
                      : obj[key as keyof typeof obj]
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
    <CSVLink data={state.data} filename={generateFileName('Batch-Data', 'csv')}>
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
