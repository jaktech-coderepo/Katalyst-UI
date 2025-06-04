'use client';

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

interface DynamicBarChartProps {
  data: Record<string, any>[];
  xAxisKey: string;
  yAxisKey: string;
  label: string;
  height?: number;
  formatter?: (value: number | null) => string;
  loading?: boolean;
}

const defaultValueFormatter = (value: number | null) =>
  value !== null ? value.toString() : 'N/A';

export default function DynamicBarChart({
  data,
  xAxisKey,
  yAxisKey,
  label,
  height = 300,
  formatter = defaultValueFormatter,
  loading,
}: DynamicBarChartProps) {
  const chartSetting = {
    series: [
      {
        dataKey: yAxisKey,
        label,
        valueFormatter: formatter,
      },
    ],
    height,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
      },
    },
    loading,
  };

  return (
    <BarChart
      dataset={data}
      xAxis={[
        {
          scaleType: 'band',
          dataKey: xAxisKey,
          tickPlacement: 'middle',
          tickLabelPlacement: 'middle',
          valueFormatter: (value, context) => {
            if (context.location === 'tooltip') {
              return value;
            }
            return value
              .toString()
              .split(' ')
              .map((word: string) => word.charAt(0).toUpperCase())
              .join('');
          },
        },
      ]}
      borderRadius={8}
      {...chartSetting}
    />
  );
}
