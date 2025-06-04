import React from 'react';
import { BarChart } from '@mui/x-charts';
import { Box, Skeleton } from '@mui/material';
import { getProgrammeDashboardChart } from '@/action/dashboard.action';
import { useQuery } from '@tanstack/react-query';
import ShowError from '@/components/ShowError';

const BranchProgramChart = () => {
  const { data: programmeData, isLoading } = useQuery({
    queryKey: ['getProgrammeDashboardChart'],
    queryFn: async () => {
      const res = await getProgrammeDashboardChart();
      return res;
    },
  });

  const chartData = React.useMemo(() => {
    if (!!programmeData && 'data' in programmeData) {
      const labels = programmeData.data.map((item) => item.branch);
      const activeData = programmeData.data.map((item) =>
        item.activebatches !== null && item.activebatches !== undefined
          ? Number(item.activebatches)
          : 0
      );
      const inactiveData = programmeData.data.map((item) =>
        item.inactivebatches !== null && item.inactivebatches !== undefined
          ? Number(item.inactivebatches)
          : 0
      );

      return { labels, activeData, inactiveData };
    }
    return { labels: [], activeData: [], inactiveData: [] };
  }, [programmeData]);

  if (!!programmeData && 'error' in programmeData) {
    return <ShowError {...programmeData} />;
  }

  return (
    <Box padding={2}>
      {isLoading ? (
        <Skeleton height={400} width={570} />
      ) : (
        <BarChart
          xAxis={[
            {
              data: chartData.labels,
              scaleType: 'band',
              tickPlacement: 'middle',
              tickLabelPlacement: 'middle',
              // tickLabelStyle:{
              //   rotate: '45Deg',
              // }
              // valueFormatter: (value, _context) => value.split('').join('\n'),
            },
          ]}
          series={[
            {
              data: chartData.activeData,
              label: 'Active Programme',
              color: '#be3831',
            },
            {
              data: chartData.inactiveData,
              label: 'Inactive Programme',
              color: '#132839',
            },
          ]}
          width={600}
          height={400}
        />
      )}
    </Box>
  );
};

export default BranchProgramChart;
