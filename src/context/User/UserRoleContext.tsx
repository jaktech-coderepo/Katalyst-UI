'use client';

import { GetAllUserRoleResponse } from '@/types';
import { createContext, ReactNode } from 'react';

interface IGetAllUserRoleProps {
  data: GetAllUserRoleResponse;
}
interface IUserRoleProviderProps {
  children: ReactNode;
  data: GetAllUserRoleResponse;
}

export const GetAllUserRoleContext = createContext<IGetAllUserRoleProps>(
  {} as IGetAllUserRoleProps
);

export function GetAllUserRoleProvider({
  children,
  data,
}: IUserRoleProviderProps) {
  return (
    <GetAllUserRoleContext.Provider value={{ data }}>
      {children}
    </GetAllUserRoleContext.Provider>
  );
}
