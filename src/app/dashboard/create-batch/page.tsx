import React from 'react';
import { GetCurrentUserProvider } from '@/context/User/GetCurrentUserContext';
import { getUser } from '@/action/user.action';
import ShowError from '@/components/ShowError';
import CreateBatchContent from './_components';

export default async function page() {
  const response = await getUser();

  if ('error' in response) {
    return <ShowError {...response} />;
  }
  return (
    <GetCurrentUserProvider data={response}>
      <CreateBatchContent />
    </GetCurrentUserProvider>
  );
}
