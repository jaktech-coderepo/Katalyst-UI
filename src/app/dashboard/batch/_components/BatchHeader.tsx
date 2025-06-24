'use client';

import {
  Button,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { use } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { redirect } from 'next/navigation';
import useDebounce from '@/app/hooks/useDebounce';
import { GetCurrentUserContext } from '@/context/User/GetCurrentUserContext';
import USER_TYPE from '@/constants/enum';
import { GetAllBatchContext } from './context/BatchGetAllContext';
import BatchDownloadCsv from './feature/BatchDownloadCsv';
import { GetBatchByUserIdContext } from './context/BatchGetByUserIdContext';
import UserSpecificBatchDownloadCsv from './feature/UserSpecificBatchDownloadCsv';

export default function BatchHeader() {
  const { data: currData } = use(GetCurrentUserContext);
  const {
    paginatedQuery: { data, setQueryParam },
  } =
    currData.data.roleid === USER_TYPE.Admin
      ? use(GetAllBatchContext)
      : use(GetBatchByUserIdContext);
  const [searchValue, setSearchValue] = React.useState('');

  const SearchDebounced = useDebounce(searchValue, 500);
  React.useEffect(() => {
    setQueryParam('page', 1);
    setQueryParam('search', SearchDebounced);
  }, [SearchDebounced]);

  function handleClick() {
    redirect('/dashboard/create-batch');
  }
  return (
    <Grid2
      container
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      spacing={2}
    >
      <Grid2 size={{ xs: 11.8, md: 5.8, lg: 3.8 }}>
        <Typography variant="h3">Batches</Typography>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
        <TextField
          variant="outlined"
          placeholder="Search here..."
          fullWidth
          value={searchValue}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              boxShadow: '0px 2px 10px 0px #00000030',
              background: 'common.white',
            },
          }}
          size="small"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(event.target.value);
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment
                  sx={{
                    marginBlock: 0.8,
                  }}
                  position="end"
                >
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 6, lg: 4 }}
        display={'flex'}
        justifyContent={'end'}
      >
        {currData.data.roleid === USER_TYPE.Admin ? (
          <BatchDownloadCsv limit={data.totalCount} />
        ) : (
          <UserSpecificBatchDownloadCsv
            limit={data.totalCount}
            id={currData.data.userid}
          />
        )}

        <Button
          variant="contained"
          startIcon={<ControlPointOutlinedIcon />}
          sx={{ paddingInline: 4, bgcolor: 'primary.dark' }}
          onClick={handleClick}
        >
          Create
        </Button>
      </Grid2>
    </Grid2>
  );
}
