'use client';

import getAllProgrammeDetails from '@/action/programme.action';
import usePaginatedQuery, {
  PaginatedQueryResponse,
} from '@/app/hooks/usePaginatedQuery';
import {
  GetAllProgrammeResponse,
  IFilterOptionsWithActiveInActive,
} from '@/types';
import { createContext, ReactNode } from 'react';

interface IGetAllProgrammeProps {
  paginatedQuery: PaginatedQueryResponse<
    IFilterOptionsWithActiveInActive,
    GetAllProgrammeResponse
  >;
}

interface IProgrammeProviderProps {
  children: ReactNode;
  data: GetAllProgrammeResponse;
}

export const GetAllProgrammeContext = createContext<IGetAllProgrammeProps>(
  {} as IGetAllProgrammeProps
);

export function GetAllProgrammeProvider({
  children,
  data,
}: IProgrammeProviderProps) {
  const paginatedQuery = usePaginatedQuery({
    initialData: data,
    queryKey: 'getAllProgrammeDetails',
    queryFn: getAllProgrammeDetails,
  });
  return (
    <GetAllProgrammeContext.Provider value={{ paginatedQuery }}>
      {children}
    </GetAllProgrammeContext.Provider>
  );
}
