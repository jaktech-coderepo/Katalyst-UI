import React, { use } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  Grid2,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { GetCurrentUserContext } from '@/context/User/GetCurrentUserContext';
import USER_TYPE from '@/constants/enum';
import DownloadProgrammeForm from './DownloadProgrammeForm';
import ProgrammeShowcase from './ProgrammeShowcase';
import BatchShowcase from './BatchShowcase';
import ProgrammeChart from './ProgrammeChart';
import BatchChart from './BatchChart';
import ProgrammeTable from './ProgrammeTable';
import BatchTable from './BatchTable';

export default function MasterOfDashboard() {
  const { data: currUserData } = use(GetCurrentUserContext);
  const programmeOptions = [
    { label: 'Top 5', value: 'top5' },
    { label: 'Bottom 5', value: 'bottom5' },
  ];
  const batchOptions = [
    { label: 'Last Week', value: 'lastweek' },
    { label: 'Last Month', value: 'lastmonth' },
    { label: 'Last Year', value: 'lastyear' },
  ];
  const { control } = useForm({
    defaultValues: {
      programme: 'top5',
      batch: 'lastweek',
    },
  });
  return (
    <Grid2
      container
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      spacing={2}
      paddingBlock={{ xs: 1, md: 2 }}
    >
      <Grid2 container size={12}>
        <Grid2 container size={{ xs: 12, lg: 6 }}>
          <Grid2 container size={12}>
            <ProgrammeShowcase />
          </Grid2>
          <Grid2 container size={12} component={Paper} borderRadius={3}>
            <ProgrammeChart />
          </Grid2>
          <Grid2
            container
            size={12}
            component={Paper}
            justifyContent={'end'}
            alignItems={'start'}
            spacing={0}
            minHeight={386}
            maxHeight={386}
            overflow={'auto'}
          >
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={2}
            >
              <Typography variant="h6" fontWeight={600}>
                Order :
              </Typography>
              <Controller
                control={control}
                name={'programme'}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <FormControl error={!!error}>
                      <Select
                        {...field}
                        displayEmpty
                        variant="outlined"
                        labelId={'programme'}
                        value={field.value ?? ''}
                        size="small"
                        sx={{
                          marginBlockStart: 1,
                          marginInlineEnd: 1,
                        }}
                        renderValue={(ele) => {
                          const currValue = programmeOptions.find(
                            (e) => e.value === ele
                          )?.label;
                          return (
                            currValue || (
                              <Typography color="#a2a2a2">Select --</Typography>
                            )
                          );
                        }}
                      >
                        <MenuItem value="">
                          <>Select--</>
                        </MenuItem>
                        {programmeOptions.map((newValue, i) => (
                          <MenuItem key={i} value={newValue.value}>
                            {newValue.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{error?.message}</FormHelperText>
                    </FormControl>
                  </>
                )}
              />
            </Box>
            <ProgrammeTable />
          </Grid2>
        </Grid2>
        <Grid2 container size={{ xs: 12, lg: 6 }}>
          <Grid2 container size={12}>
            <BatchShowcase />
          </Grid2>
          <Grid2 container size={12} component={Paper} borderRadius={3}>
            <BatchChart />
          </Grid2>
          <Grid2
            container
            size={12}
            component={Paper}
            justifyContent={'end'}
            alignItems={'start'}
            spacing={0}
            flex={1}
            minHeight={386}
            maxHeight={386}
            overflow={'auto'}
          >
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={2}
            >
              <Typography variant="h6" fontWeight={600}>
                Order :
              </Typography>
              <Controller
                control={control}
                name={'batch'}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <FormControl error={!!error}>
                      <Select
                        {...field}
                        displayEmpty
                        variant="outlined"
                        labelId={'batch'}
                        value={field.value ?? ''}
                        size="small"
                        sx={{
                          marginBlockStart: 1,
                          marginInlineEnd: 1,
                        }}
                        renderValue={(ele) => {
                          const currValue = batchOptions.find(
                            (e) => e.value === ele
                          )?.label;
                          return (
                            currValue || (
                              <Typography color="#a2a2a2">Select --</Typography>
                            )
                          );
                        }}
                      >
                        <MenuItem value="">
                          <>Select--</>
                        </MenuItem>
                        {batchOptions.map((newValue, i) => (
                          <MenuItem key={i} value={newValue.value}>
                            {newValue.label}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{error?.message}</FormHelperText>
                    </FormControl>
                  </>
                )}
              />
            </Box>
            <BatchTable />
          </Grid2>
        </Grid2>
      </Grid2>
      {currUserData.data.roleid === USER_TYPE.Admin && (
        <Grid2 size={12} component={Paper}>
          <DownloadProgrammeForm />
        </Grid2>
      )}
    </Grid2>
  );
}
