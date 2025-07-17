import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Typography,
  Paper,
  TableContainer,
  Box,
} from '@mui/material';
import { CoFacilitator } from '@/types';

interface CoFacilitatorTooltipTableProps {
  data: CoFacilitator[];
  label?: string;
}

const CoFacilitatorTooltipTable: React.FC<CoFacilitatorTooltipTableProps> = ({
  data,
  label = 'View Co-Facilitators',
}) => {
  if (!data || data.length === 0) return <Box>-</Box>;

  return (
    <Tooltip
      title={
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>Name</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  Assigned Date
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>Start Time</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>End Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((cf) => (
                <TableRow key={cf.id}>
                  <TableCell>{cf.cofacilitator_name}</TableCell>
                  <TableCell>{cf.assigned_date}</TableCell>
                  <TableCell>{cf.start_time}</TableCell>
                  <TableCell>{cf.end_time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
      arrow
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: 'common.white',
            boxShadow: 2,
            minWidth: 'fit-content',
            p: 0,
          },
        },
      }}
    >
      <Typography
        variant="body2"
        color="primary"
        sx={{ cursor: 'pointer', mt: 1 }}
      >
        {label}
      </Typography>
    </Tooltip>
  );
};

export default CoFacilitatorTooltipTable;
