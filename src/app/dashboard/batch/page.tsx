import React from 'react';
import { TabProvider } from '@/context/TabProvider';
import ShowError from '@/components/ShowError';
import getAllBatchDetails, {
  getBatchDetailsByUserId,
} from '@/action/batch.action';
import { GetCurrentUserProvider } from '@/context/User/GetCurrentUserContext';
import { getUser } from '@/action/user.action';
import BatchContent from './_components';
import { GetAllBatchProvider } from './_components/context/BatchGetAllContext';
import { GetBatchByUserIdProvider } from './_components/context/BatchGetByUserIdContext';

export default async function page() {
  const currUser = await getUser();
  if ('error' in currUser) {
    return <ShowError {...currUser} />;
  }

  const responseByUserId = await getBatchDetailsByUserId({
    id: currUser.data.userid,
  });
  if ('error' in responseByUserId) {
    return <ShowError {...responseByUserId} />;
  }

  const response = await getAllBatchDetails();
  if ('error' in response) {
    return <ShowError {...response} />;
  }

  return (
    <GetAllBatchProvider data={response}>
      <GetBatchByUserIdProvider
        data={responseByUserId}
        id={currUser.data.userid}
      >
        <GetCurrentUserProvider data={currUser}>
          <TabProvider>
            <BatchContent />
          </TabProvider>
        </GetCurrentUserProvider>
      </GetBatchByUserIdProvider>
    </GetAllBatchProvider>
  );
}
