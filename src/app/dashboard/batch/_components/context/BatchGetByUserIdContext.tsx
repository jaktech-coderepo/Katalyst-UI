'use client';

import { getBatchDetailsByUserId } from '@/action/batch.action';
import usePaginatedQuery, {
  PaginatedQueryResponse,
} from '@/app/hooks/usePaginatedQuery';
import { GetAllBatchResponse, IFilterOptionsWithActiveInActive } from '@/types';
import { createContext, ReactNode } from 'react';

interface IGetBatchByUserIdProps {
  paginatedQuery: PaginatedQueryResponse<
    IFilterOptionsWithActiveInActive & { id?: number },
    GetAllBatchResponse
  >;
}

interface IBatchProviderProps {
  children: ReactNode;
  data: GetAllBatchResponse;
  id: number;
}

export const GetBatchByUserIdContext = createContext<IGetBatchByUserIdProps>(
  {} as IGetBatchByUserIdProps
);

export function GetBatchByUserIdProvider({
  children,
  data,
  id,
}: IBatchProviderProps) {
  const paginatedQuery = usePaginatedQuery({
    initialData: data,
    queryKey: 'getBatchDetailsByUserId',
    queryFn: getBatchDetailsByUserId,
    queryParams: { id },
  }) as PaginatedQueryResponse<
    IFilterOptionsWithActiveInActive & { id?: number },
    GetAllBatchResponse
  >;

  return (
    <GetBatchByUserIdContext.Provider value={{ paginatedQuery }}>
      {children}
    </GetBatchByUserIdContext.Provider>
  );
}
