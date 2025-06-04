import React from 'react';
import { LineChart } from '@mui/x-charts';
import { useQuery } from '@tanstack/react-query';
import { getBatchDashboardChart } from '@/action/dashboard.action';
import ShowError from '@/components/ShowError';
import { Box, Skeleton } from '@mui/material';

const ChartComponent = () => {
  const { data: BatchData, isLoading } = useQuery({
    queryKey: ['getBatchDashboardChart'],
    queryFn: async () => {
      const res = await getBatchDashboardChart();
      return res;
    },
  });

  const chartData = React.useMemo(() => {
    if (!!BatchData && 'data' in BatchData) {
      const xAxisLabels = BatchData.data.map((item) => item.upload_date);
      const normalizedUploadTime = BatchData.data.map((item) =>
        item.normalized_upload_time !== null &&
        item.normalized_upload_time !== undefined
          ? Number(item.normalized_upload_time)
          : 0
      );
      const normalizedDataUploaded = BatchData.data.map((item) =>
        item.normalized_data_uploaded !== null &&
        item.normalized_data_uploaded !== undefined
          ? Number(item.normalized_data_uploaded)
          : 0
      );

      return { xAxisLabels, normalizedUploadTime, normalizedDataUploaded };
    }
    return {
      xAxisLabels: [],
      normalizedUploadTime: [],
      normalizedDataUploaded: [],
    };
  }, [BatchData]);

  if (!!BatchData && 'error' in BatchData) {
    return <ShowError {...BatchData} />;
  }

  return (
    <Box padding={2}>
      {isLoading ? (
        <Skeleton height={400} width={570} />
      ) : (
        <LineChart
          // slotProps={{
          //   legend: {
          //     labelStyle: {
          //       fontSize: 12,
          //     },
          //   },
          // }}
          xAxis={[
            {
              scaleType: 'point',
              data: chartData.xAxisLabels,
              tickPlacement: 'middle',
              tickLabelPlacement: 'middle',
            },
          ]}
          series={[
            {
              data: chartData.normalizedUploadTime,
              label: 'Normalized Upload Time',
              color: '#be3831',
            },
            {
              data: chartData.normalizedDataUploaded,
              label: 'Normalized Data Uploaded',
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

export default React.memo(ChartComponent);
