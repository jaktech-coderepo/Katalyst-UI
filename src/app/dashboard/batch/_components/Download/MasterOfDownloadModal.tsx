import { getDownloadProgrammeData } from '@/action/batch.action';
import ShowMessage from '@/components/ShowMessage';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProgrammeDataDownlaodCsv from '../feature/ProgrammeDataDownlaodCsv';

export default function MasterOfDownloadModal({
  id,
  programmeName,
  batchNumber,
  createdBy,
}: {
  id: number;
  programmeName: string;
  batchNumber: string;
  createdBy: number;
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
        const response = await getDownloadProgrammeData({
          id,
          formdata: {
            batch_number: batchNumber,
            created_by: createdBy,
          },
        });
        if ('error' in response) {
          return setState({
            data: [],
            message: response.error,
            status: 'error',
          });
        }
        if (response.data.length === 0) {
          return setState({
            data: [['No data available for this programme']],
            message: 'No data available',
            status: 'success',
          });
        }

        setState({
          data: response.data,
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
      <Button variant="outlined" sx={{ marginInlineEnd: 1 }}>
        {state.message}
      </Button>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 650 }}>
        {state.status === 'success' &&
          state.message === 'Data fetched successfully' && (
            <>
              <TableHead>
                <TableRow>
                  {Object.keys(state.data[0]).map((item) => (
                    <TableCell
                      key={item}
                      align="left"
                      sx={{
                        whiteSpace: 'nowrap',
                        color: 'common.black',
                        fontWeight: 500,
                        fontSize: 18,
                      }}
                    >
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {...state.data.slice(0, 10).map((row, index) => (
                  <TableRow
                    sx={{
                      border: 0,
                      borderBottom: 'unset',
                      borderColor: 'grey.300',
                      bgcolor: 'none',
                      color: 'typography',
                      fontSize: 14,
                    }}
                    key={index}
                  >
                    {Object.keys(state.data[0]).map((item) => (
                      <TableCell
                        key={item}
                        sx={{
                          border: 0,
                          color: 'inherit',
                          fontSize: 'inherit',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {row[item] || '-'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </>
          )}
      </Table>
      {state.status === 'success' && state.message === 'No data available' && (
        <ShowMessage message="No data available for this programme" />
      )}
      <Box display={'flex'} justifyContent={'end'} paddingBlock={1}>
        <ProgrammeDataDownlaodCsv state={state} programmeName={programmeName} />
      </Box>
    </TableContainer>
  );
}
