'use client';

import getAllUserDetails from '@/action/user.action';
import usePaginatedQuery, {
  PaginatedQueryResponse,
} from '@/app/hooks/usePaginatedQuery';
import { GetAllUserResponse, IFilterOptionsWithActiveInActive } from '@/types';
import { createContext, ReactNode } from 'react';

interface IGetAllUserProps {
  paginatedQuery: PaginatedQueryResponse<
    IFilterOptionsWithActiveInActive,
    GetAllUserResponse
  >;
}

interface IUserProviderProps {
  children: ReactNode;
  data: GetAllUserResponse;
}

export const GetAllUserContext = createContext<IGetAllUserProps>(
  {} as IGetAllUserProps
);

export function GetAllUserProvider({ children, data }: IUserProviderProps) {
  const paginatedQuery = usePaginatedQuery({
    initialData: data,
    queryKey: 'getAllUserDetails',
    queryFn: getAllUserDetails,
  });

  return (
    <GetAllUserContext.Provider value={{ paginatedQuery }}>
      {children}
    </GetAllUserContext.Provider>
  );
}
