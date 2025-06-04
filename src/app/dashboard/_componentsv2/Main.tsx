'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import {
  // getAllDashboardAggregateData,
  getAllDashboardMasterData,
} from '@/action/dashboard.action';
import ShowError from '@/components/ShowError';
import { IDashboardAggregateData } from '@/types';
import FirstRow from './FirstRow';
import SecondRow from './SecondRow';
import DynamicBarChart from './DynamicBarChart';
import useGetAllDashboardAggregateDataContext from './GetAllDashboardAggregateDataContext';
import DownloadProgrammeForm from '../_components/DownloadProgrammeForm';

export default function Main() {
  const {
    queryResult: {
      data: aggregateData,
      isLoading: aggregateDataLoading,
      error,
    },
  } = useGetAllDashboardAggregateDataContext();

  const { data: MasterData, isLoading: MasterDataLoading } = useQuery({
    queryKey: ['getAllDashboardMasterData'],
    queryFn: async () => {
      const res = await getAllDashboardMasterData();
      return res;
    },
  });

  if (error) {
    return <ShowError error={error.message} message={error.message} />;
  }

  if (!!aggregateData && 'error' in aggregateData) {
    return <ShowError {...aggregateData} />;
  }

  if (!!MasterData && 'error' in MasterData) {
    return <ShowError {...MasterData} />;
  }

  return (
    <Box display={'flex'} flexDirection={'column'} rowGap={2}>
      <FirstRow
        trainersOptions={
          MasterData?.data.trainers.map((trainer) => {
            return {
              label: trainer.trainer_name,
              value: trainer.trainer_id,
            };
          }) || ([] as { label: string; value: number }[])
        }
        programeeOptions={
          MasterData?.data.programs.map((program) => ({
            label: program.programme_name,
            value: program.programme_id,
          })) || ([] as { label: string; value: number }[])
        }
        MasterDataLoading={MasterDataLoading}
      />
      <SecondRow
        data={aggregateData?.data || ({} as IDashboardAggregateData)}
        AggregateDataLoading={aggregateDataLoading}
      />
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        justifyContent={'space-between'}
        rowGap={2}
      >
        <Paper sx={{ width: { xs: 1, sm: '49%', md: '32%' } }}>
          <DynamicBarChart
            data={aggregateData?.data.recordsUpdatedByTrainers || []}
            xAxisKey="trainer_name"
            yAxisKey="records_uploaded"
            label="Records Uploaded"
            loading={aggregateDataLoading}
          />
          {/* <Bars /> */}
        </Paper>
        <Paper sx={{ width: { xs: 1, sm: '49%', md: '32%' } }}>
          <DynamicBarChart
            data={aggregateData?.data.trainersBatchRatio || []}
            xAxisKey="trainer_name"
            yAxisKey="batch_to_programme_ratio"
            label="Participant-Batch Ratio"
            formatter={(val) => (val !== null ? val.toFixed(2) : 'N/A')}
            loading={aggregateDataLoading}
          />
          {/* <Bars /> */}
        </Paper>
        <Paper sx={{ width: { xs: 1, sm: '49%', md: '32%' } }}>
          {/* <Bars /> */}
          <DynamicBarChart
            data={aggregateData?.data.noOfDaysUsersLoggedin || []}
            xAxisKey="username"
            yAxisKey="login_days"
            label="Login Days"
            loading={aggregateDataLoading}
          />
        </Paper>
      </Box>
      <Paper sx={{ width: '100%' }}>
        {/* <FullBars /> */}
        <DynamicBarChart
          data={aggregateData?.data.programWiseData || []}
          xAxisKey="programme_name"
          yAxisKey="records_updated"
          label="Programme Wise Data"
          loading={aggregateDataLoading}
        />
      </Paper>
      <Paper sx={{ width: '100%', marginBlockEnd: 2 }}>
        <DownloadProgrammeForm />
      </Paper>
    </Box>
  );
}
