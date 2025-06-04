import React from 'react';
import { getUser } from '@/action/user.action';
import ShowError from '@/components/ShowError';
import { GetCurrentUserProvider } from '@/context/User/GetCurrentUserContext';
// import DashboardContent from './_components/DashboardContent';
import { getAllDashboardAggregateData } from '@/action/dashboard.action';
import Main from './_componentsv2/Main';
import { GetAllDashboardAggregateDataProvider } from './_componentsv2/GetAllDashboardAggregateDataContext';

export default async function page() {
  const response = await getUser();

  if ('error' in response) {
    return <ShowError {...response} />;
  }
  const aggregateData = await getAllDashboardAggregateData();

  if ('error' in aggregateData) {
    return <ShowError {...aggregateData} />;
  }

  return (
    <GetCurrentUserProvider data={response}>
      <GetAllDashboardAggregateDataProvider data={aggregateData}>
        <Main />
      </GetAllDashboardAggregateDataProvider>
    </GetCurrentUserProvider>
  );
}

// import Main from './_componentsv2/Main';

// export default async function page() {
//   return <Main />;
// }
