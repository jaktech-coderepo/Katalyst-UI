import React from 'react';
import TabsOfUser from './TabsOfUser';
import UserTableHeader from './TableHeader';

export default function MasterOfUser() {
  return (
    <TabsOfUser
      elements={[<UserTableHeader key={0} />, <UserTableHeader key={1} />]}
    />
  );
}
