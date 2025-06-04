// 'use client';

// import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { axisClasses } from '@mui/x-charts/ChartsAxis';

// function valueFormatter(value: number | null) {
//   return `${value} mm`;
// }

// export const dataset = [
//   { id: 1, london: 59, paris: 57, newYork: 86, seoul: 21 },
//   { id: 2, london: 50, paris: 52, newYork: 78, seoul: 28 },
//   { id: 3, london: 47, paris: 53, newYork: 106, seoul: 41 },
//   { id: 4, london: 54, paris: 56, newYork: 92, seoul: 73 },
//   { id: 5, london: 57, paris: 69, newYork: 92, seoul: 99 },
//   { id: 6, london: 60, paris: 63, newYork: 103, seoul: 144 },
//   { id: 7, london: 59, paris: 60, newYork: 105, seoul: 319 },
//   { id: 8, london: 65, paris: 60, newYork: 106, seoul: 249 },
//   { id: 9, london: 53, paris: 50, newYork: 96, seoul: 135 },
//   { id: 10, london: 62, paris: 66, newYork: 98, seoul: 58 },
//   { id: 11, london: 68, paris: 62, newYork: 78, seoul: 50 },
//   { id: 12, london: 64, paris: 72, newYork: 105, seoul: 30 },
//   { id: 13, london: 55, paris: 59, newYork: 110, seoul: 25 },
//   { id: 14, london: 52, paris: 54, newYork: 87, seoul: 45 },
//   { id: 15, london: 48, paris: 55, newYork: 120, seoul: 60 },
//   { id: 16, london: 63, paris: 58, newYork: 95, seoul: 90 },
//   { id: 17, london: 66, paris: 67, newYork: 108, seoul: 200 },
//   { id: 18, london: 70, paris: 69, newYork: 100, seoul: 180 },
//   { id: 19, london: 58, paris: 61, newYork: 112, seoul: 150 },
//   { id: 20, london: 62, paris: 64, newYork: 99, seoul: 100 },
//   { id: 21, london: 52, paris: 54, newYork: 87, seoul: 45 },
//   { id: 22, london: 48, paris: 55, newYork: 120, seoul: 60 },
//   { id: 23, london: 63, paris: 58, newYork: 95, seoul: 90 },
//   { id: 24, london: 66, paris: 67, newYork: 108, seoul: 200 },
//   { id: 25, london: 70, paris: 69, newYork: 100, seoul: 180 },
//   { id: 26, london: 58, paris: 61, newYork: 112, seoul: 150 },
//   { id: 27, london: 62, paris: 64, newYork: 99, seoul: 100 },
// ];

// const chartSetting = {
//   yAxis: [
//     {
//       label: 'Program Wise Data',
//     },
//   ],
//   series: [{ dataKey: 'london', label: 'London', valueFormatter }],
//   height: 300,
//   sx: {
//     [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
//       transform: 'translateX(-10px)',
//     },
//   },
// };

// export default function FullBars() {
//   return (
//     <BarChart
//       dataset={dataset}
//       xAxis={[
//         {
//           scaleType: 'band',
//           dataKey: 'id',
//           tickPlacement: 'middle',
//           tickLabelPlacement: 'middle',
//         },
//       ]}
//       {...chartSetting}
//       borderRadius={4}
//     />
//   );
// }
