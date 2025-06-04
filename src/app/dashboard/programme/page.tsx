import React from 'react';
import { TabProvider } from '@/context/TabProvider';
import ShowError from '@/components/ShowError';
import getAllProgrammeDetails from '@/action/programme.action';
import TemplateContent from './_components';
import { GetAllProgrammeProvider } from './_components/ProgrammeGetAllContext';

export default async function page() {
  const response = await getAllProgrammeDetails();

  if ('error' in response) {
    return <ShowError {...response} />;
  }
  return (
    <GetAllProgrammeProvider data={response}>
      <TabProvider>
        <TemplateContent />
      </TabProvider>
    </GetAllProgrammeProvider>
  );
}
