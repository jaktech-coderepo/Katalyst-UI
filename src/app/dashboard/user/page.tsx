import React from 'react';
import { TabProvider } from '@/context/TabProvider';
import getAllUserDetails, { getAllUserRoles } from '@/action/user.action';
import ShowError from '@/components/ShowError';
import { GetAllUserRoleProvider } from '@/context/User/UserRoleContext';
import UserContent from './_components';
import { GetAllUserProvider } from './_components/UserGetAllContext';

export default async function page() {
  const response = await getAllUserDetails();

  if ('error' in response) {
    return <ShowError {...response} />;
  }

  const roleResponse = await getAllUserRoles();

  if ('error' in roleResponse) {
    return <ShowError {...roleResponse} />;
  }

  return (
    <GetAllUserProvider data={response}>
      <GetAllUserRoleProvider data={roleResponse}>
        <TabProvider>
          <UserContent />
        </TabProvider>
      </GetAllUserRoleProvider>
    </GetAllUserProvider>
  );
}
