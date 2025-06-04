import React from 'react';
import { getUser } from '@/action/user.action';
import ShowError from '@/components/ShowError';
import { GetCurrentUserProvider } from '@/context/User/GetCurrentUserContext';
import CreateProgrammeContent from './_components';
import CreateProgrammeFormProvider from './_components/FormContext';

export default async function page() {
  const response = await getUser();

  if ('error' in response) {
    return <ShowError {...response} />;
  }
  return (
    <GetCurrentUserProvider data={response}>
      <CreateProgrammeFormProvider>
        <CreateProgrammeContent />
      </CreateProgrammeFormProvider>
    </GetCurrentUserProvider>
  );
}
