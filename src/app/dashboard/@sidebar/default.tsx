import React from 'react';
import { GetCurrentUserProvider } from '@/context/User/GetCurrentUserContext';
import ShowError from '@/components/ShowError';
import { getUser } from '@/action/user.action';
import Index from './_components';

export default async function Sidebar() {
  const response = await getUser();

  if ('error' in response) {
    return <ShowError {...response} />;
  }
  return (
    <GetCurrentUserProvider data={response}>
      <Index />
    </GetCurrentUserProvider>
  );
}
