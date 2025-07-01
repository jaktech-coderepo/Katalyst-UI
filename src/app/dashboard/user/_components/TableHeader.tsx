'use client';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { use } from 'react';
import ShowMessage from '@/components/ShowMessage';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import UserTableBody from './TableBody';
import { GetAllUserContext } from './UserGetAllContext';

export default function UserTableHeader() {
  const {
    paginatedQuery: { data, setQueryParam },
  } = use(GetAllUserContext);
  const [limit, setLimit] = React.useState('10');

  return (
    <>
      <TableContainer component={Paper} sx={{ marginBlock: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  whiteSpace: 'nowrap',
                  color: 'common.black',
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                User ID
                <UnfoldMoreOutlinedIcon fontSize="inherit" />
              </TableCell>

              <TableCell
                sx={{
                  whiteSpace: 'nowrap',
                  color: 'common.black',
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                User Name
                <UnfoldMoreOutlinedIcon fontSize="inherit" />
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: 'nowrap',
                  color: 'common.black',
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                Email
                <UnfoldMoreOutlinedIcon fontSize="inherit" />
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: 'nowrap',
                  color: 'common.black',
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                Employee Id
                <UnfoldMoreOutlinedIcon fontSize="inherit" />
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: 'nowrap',
                  color: 'common.black',
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                Channel Name
                <UnfoldMoreOutlinedIcon fontSize="inherit" />
              </TableCell>
              <TableCell
                sx={{
                  whiteSpace: 'nowrap',
                  color: 'common.black',
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                User Role
                <UnfoldMoreOutlinedIcon fontSize="inherit" />
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  whiteSpace: 'nowrap',
                  color: 'common.black',
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                Action
                <UnfoldMoreOutlinedIcon fontSize="inherit" />
              </TableCell>
            </TableRow>
          </TableHead>
          {data.count > 0 && <UserTableBody />}
        </Table>
        {data.count === 0 && <ShowMessage message="No data available" />}
      </TableContainer>

      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        rowGap={2}
      >
        <Typography>{data.totalCount} Users</Typography>
        {data.count >= 1 ? (
          <Box display={'flex'} alignItems={'center'}>
            <Pagination
              color="standard"
              shape="rounded"
              count={data.totalPages}
              page={data.page}
              onChange={(_event: React.ChangeEvent<unknown>, value: number) => {
                setQueryParam('page', value);
              }}
            />

            <FormControl>
              <InputLabel>Limit</InputLabel>
              <Select
                value={limit}
                label="Limit"
                size="small"
                onChange={(event: SelectChangeEvent) => {
                  setQueryParam('limit', Number(event.target.value));
                  setLimit(event.target.value);
                }}
              >
                <MenuItem value={'10'}>Ten</MenuItem>
                <MenuItem value={'20'}>Twenty</MenuItem>
                <MenuItem value={'50'}>Fifty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
