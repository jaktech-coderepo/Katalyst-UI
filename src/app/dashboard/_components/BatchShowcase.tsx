import { Box, Grid2, Paper, Skeleton, Typography } from '@mui/material';
import LayersClearOutlinedIcon from '@mui/icons-material/LayersClearOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import React, { Fragment } from 'react';
import { getBatchShowCase } from '@/action/dashboard.action';
import { useQuery } from '@tanstack/react-query';
import ShowError from '@/components/ShowError';

export default function BatchShowcase() {
  const { data: batchData, isLoading } = useQuery({
    queryKey: ['getBatchShowCase'],
    queryFn: async () => {
      const res = await getBatchShowCase();
      return res;
    },
  });

  if (!!batchData && 'error' in batchData) {
    return <ShowError {...batchData} />;
  }

  const data = [
    {
      lable: 'Total Batches',
      value: batchData?.data[0].total_batches || '-',
      icon: <DynamicFeedOutlinedIcon sx={{ color: 'primary.dark' }} />,
    },
    {
      lable: 'Active Batches',
      value: batchData?.data[0].active_batches || '-',
      icon: <LayersOutlinedIcon sx={{ color: 'primary.dark' }} />,
    },
    {
      lable: 'InActive Batches',
      value: batchData?.data[0].inactive_batches || '-',
      icon: <LayersClearOutlinedIcon sx={{ color: 'primary.dark' }} />,
    },
  ];

  return (
    <Fragment>
      {data.map((row, i) => (
        <Grid2
          key={i}
          size={4}
          gap={1}
          component={Paper}
          paddingBlock={{ xs: 1, lg: 2 }}
          borderRadius={3}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={1}
          >
            {row.icon}
            <Typography variant="body1" fontWeight={600}>
              {row.lable}
            </Typography>
          </Box>
          {isLoading ? (
            <Box display={'flex'} justifyContent={'center'}>
              <Skeleton width={50} height={30} />
            </Box>
          ) : (
            <Typography
              variant="h5"
              sx={{ color: 'primary.dark' }}
              fontWeight={500}
              textAlign={'center'}
            >
              {row.value}
            </Typography>
          )}
        </Grid2>
      ))}
    </Fragment>
  );
}
