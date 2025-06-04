// 'use client';

// import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { axisClasses } from '@mui/x-charts/ChartsAxis';
// import { dataset, valueFormatter } from './dataset';

// const chartSetting = {
//   yAxis: [
//     {
//       label: 'Records Updated',
//     },
//   ],
//   series: [{ dataKey: 'seoul', label: 'Records Updated', valueFormatter }],
//   height: 300,
//   sx: {
//     [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
//       transform: 'translateX(-10px)',
//     },
//   },
// };

// export default function Bars() {
//   return (
//     <BarChart
//       dataset={dataset}
//       xAxis={[
//         {
//           scaleType: 'band',
//           dataKey: 'month',
//           tickPlacement: 'middle',
//           tickLabelPlacement: 'middle',
//         },
//       ]}
//       {...chartSetting}
//       borderRadius={8}
//     />
//   );
// }
