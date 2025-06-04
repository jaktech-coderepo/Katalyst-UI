import { Box, Grid2, Paper, Skeleton, Typography } from '@mui/material';
import CommentsDisabledOutlinedIcon from '@mui/icons-material/CommentsDisabledOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import React, { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import getProgrammeShowCase from '@/action/dashboard.action';
import ShowError from '@/components/ShowError';

export default function ProgrammeShowcase() {
  const { data: programeData, isLoading } = useQuery({
    queryKey: ['getProgrammeShowCase'],
    queryFn: async () => {
      const res = await getProgrammeShowCase();
      return res;
    },
  });

  if (!!programeData && 'error' in programeData) {
    return <ShowError {...programeData} />;
  }

  const data = [
    {
      lable: 'Total Programmes',
      value: programeData?.data[0].total_programmes || '-',
      icon: <LibraryBooksOutlinedIcon sx={{ color: 'primary.dark' }} />,
    },
    {
      lable: 'Active Programmes',
      value: programeData?.data[0].active_programmes || '-',
      icon: <ArticleOutlinedIcon sx={{ color: 'primary.dark' }} />,
    },
    {
      lable: 'InActive Programmes',
      value: programeData?.data[0].inactive_programmes || '-',
      icon: <CommentsDisabledOutlinedIcon sx={{ color: 'primary.dark' }} />,
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
