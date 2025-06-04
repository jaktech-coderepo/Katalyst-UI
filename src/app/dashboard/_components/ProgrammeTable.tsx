import { getProgrammeDashboardTable } from '@/action/dashboard.action';
import ShowError from '@/components/ShowError';
import ShowMessage from '@/components/ShowMessage';
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function ProgrammeTable() {
  const { data, isLoading } = useQuery({
    queryKey: ['getProgrammeDashboardTable'],
    queryFn: async () => {
      const res = await getProgrammeDashboardTable();
      return res;
    },
  });

  if (!!data && 'error' in data) {
    return <ShowError {...data} />;
  }

  return (
    <TableContainer sx={{ minHeight: '320px' }}>
      {isLoading ? (
        <>
          <Skeleton height={320} />
        </>
      ) : (
        <Table sx={{ minWidth: 650 }}>
          {!!data && data.data.length > 0 && (
            <>
              <TableHead
                sx={{
                  bgcolor: 'grey.50',
                }}
              >
                <TableRow>
                  {Object.keys(data?.data[0]).map((key) => (
                    <TableCell
                      key={key}
                      sx={{
                        whiteSpace: 'nowrap',
                        color: 'common.black',
                        fontWeight: 500,
                        fontSize: 18,
                      }}
                    >
                      {key}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((obj, index) => (
                  <TableRow
                    sx={{
                      border: 0,
                      borderBottom: 'unset',
                      borderColor: 'grey.300',
                      bgcolor: index % 2 === 1 ? 'success.100' : 'none',
                      color: 'typography',
                      fontSize: 14,
                    }}
                    key={index}
                  >
                    {Object.keys(data.data[0]).map((key) => (
                      <TableCell
                        key={key}
                        sx={{
                          border: 0,
                          color: 'inherit',
                          fontSize: 'inherit',
                          position: 'relative',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {obj[key as keyof typeof obj] || '-'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </>
          )}
        </Table>
      )}
      {data?.data.length === 0 && (
        <ShowMessage message="No data available for this programme" />
      )}
    </TableContainer>
  );
}
