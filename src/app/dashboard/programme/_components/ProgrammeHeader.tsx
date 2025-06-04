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
import { GetAllProgrammeContext } from './ProgrammeGetAllContext';
import ProgrammeDownloadCsv from '../feature/ProgrammeDownloadCsv';

export default function ProgrammeHeader() {
  const {
    paginatedQuery: { data, setQueryParam },
  } = use(GetAllProgrammeContext);

  const [searchValue, setSearchValue] = React.useState('');

  const SearchDebounced = useDebounce(searchValue, 500);
  React.useEffect(() => {
    setQueryParam('page', 1);
    setQueryParam('search', SearchDebounced);
  }, [SearchDebounced]);

  function handleClick() {
    redirect('/dashboard/create-programme');
  }
  return (
    <Grid2
      container
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
        <Typography variant="h3">Programme </Typography>
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
              background: 'white',
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
        <ProgrammeDownloadCsv limit={data.totalCount} />
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
