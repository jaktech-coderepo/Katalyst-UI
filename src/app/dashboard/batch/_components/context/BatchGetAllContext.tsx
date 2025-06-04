'use client';

import getAllBatchDetails from '@/action/batch.action';
import usePaginatedQuery, {
  PaginatedQueryResponse,
} from '@/app/hooks/usePaginatedQuery';
import { GetAllBatchResponse, IFilterOptionsWithActiveInActive } from '@/types';
import { createContext, ReactNode } from 'react';

interface IGetAllBatchProps {
  paginatedQuery: PaginatedQueryResponse<
    IFilterOptionsWithActiveInActive & { id?: number },
    GetAllBatchResponse
  >;
}

interface IBatchProviderProps {
  children: ReactNode;
  data: GetAllBatchResponse;
}

export const GetAllBatchContext = createContext<IGetAllBatchProps>(
  {} as IGetAllBatchProps
);

export function GetAllBatchProvider({ children, data }: IBatchProviderProps) {
  const paginatedQuery = usePaginatedQuery({
    initialData: data,
    queryKey: 'getAllBatchDetails',
    queryFn: getAllBatchDetails,
  });

  return (
    <GetAllBatchContext.Provider value={{ paginatedQuery }}>
      {children}
    </GetAllBatchContext.Provider>
  );
}
