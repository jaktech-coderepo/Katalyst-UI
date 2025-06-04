import React from 'react';
import { GetAllUserRoleProvider } from '@/context/User/UserRoleContext';
import { getAllUserRoles } from '@/action/user.action';
import ShowError from '@/components/ShowError';
import CreateUserContent from './_components';

export default async function page() {
  const roleResponse = await getAllUserRoles();

  if ('error' in roleResponse) {
    return <ShowError {...roleResponse} />;
  }
  return (
    <GetAllUserRoleProvider data={roleResponse}>
      <CreateUserContent />
    </GetAllUserRoleProvider>
  );
}
