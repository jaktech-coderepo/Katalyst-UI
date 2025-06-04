import React, { Fragment } from 'react';
import { Box, Grid2, Paper, Skeleton, Typography } from '@mui/material';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import BlindsClosedIcon from '@mui/icons-material/BlindsClosed';
import AnimationIcon from '@mui/icons-material/Animation';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import { IDashboardAggregateData } from '@/types';

export default function SecondRow({
  data,
  AggregateDataLoading,
}: {
  data: IDashboardAggregateData;
  AggregateDataLoading: boolean;
}) {
  const changedData = [
    {
      lable: 'Total Batches',
      value: data?.totalBatches || 0,
      icon: <AnimationIcon sx={{ color: 'primary.dark' }} />,
    },
    {
      lable: 'Open Batches',
      value: data?.openBatches || 0,
      icon: <OpenInNewIcon sx={{ color: 'primary.dark' }} />,
    },
    {
      lable: 'Closed Batches',
      value: data?.closedBatches || 0,
      icon: <BlindsClosedIcon sx={{ color: 'primary.dark' }} />,
    },
    {
      lable: 'Total Records',
      value: data?.totalRecords || 0,
      icon: <AlignVerticalBottomIcon sx={{ color: 'primary.dark' }} />,
    },
    {
      lable: 'Team Size',
      value: data?.teamSize || 0,
      icon: <AvTimerIcon sx={{ color: 'primary.dark' }} />,
    },
    {
      lable: 'MTD Inactive Trainers',
      value: data?.mtdInActiveTrainers || 0,
      icon: <AvTimerIcon sx={{ color: 'primary.dark' }} />,
    },
  ];

  return (
    <Fragment>
      <Grid2 container rowGap={1} justifyContent={'space-between'} size={12}>
        {changedData.map((row, i) => (
          <Grid2
            key={i}
            size={{ xs: 5.9, sm: 3.9, md: 1.8 }}
            p={1}
            container
            alignItems="center"
            rowGap={1}
            component={Paper}
            borderRadius={1.5}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              width={1}
              gap={1}
            >
              <Box>
                <Typography variant="body2">{row.lable}</Typography>
                <Typography variant="h5" fontWeight={500}>
                  {AggregateDataLoading ? <Skeleton width={45} /> : row.value}
                </Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: 'primary.light',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 1,
                  borderRadius: 2,
                }}
              >
                {row.icon}
              </Box>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Fragment>
  );
}
