'use client';

import { GetUserResponse } from '@/types';
import { createContext, ReactNode } from 'react';

interface IGetCurrentUserProps {
  data: GetUserResponse;
}
interface ICurrentUserProviderProps {
  children: ReactNode;
  data: GetUserResponse;
}

export const GetCurrentUserContext = createContext<IGetCurrentUserProps>(
  {} as IGetCurrentUserProps
);

export function GetCurrentUserProvider({
  children,
  data,
}: ICurrentUserProviderProps) {
  return (
    <GetCurrentUserContext.Provider value={{ data }}>
      {children}
    </GetCurrentUserContext.Provider>
  );
}
