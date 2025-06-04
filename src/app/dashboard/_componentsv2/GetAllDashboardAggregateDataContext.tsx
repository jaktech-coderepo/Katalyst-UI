'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { IDashboardFilterOptions } from '@/types';
import {
  GetAllDashboardAggregateDataResponse,
  CommonError,
} from '@/types/serverActionResponse';
import { useContext, createContext, ReactNode, useState, useMemo } from 'react';
import { getAllDashboardAggregateData } from '@/action/dashboard.action';

interface GetAllDashboardAggregateDataInterface {
  queryResult: UseQueryResult<
    GetAllDashboardAggregateDataResponse | CommonError,
    Error
  >;
  filters: IDashboardFilterOptions;
  setFilters: (filters: IDashboardFilterOptions) => void;
}

interface DashboardProviderProps {
  children: ReactNode;
  data: GetAllDashboardAggregateDataResponse | CommonError;
}

export const GetAllDashboardAggregateDataContext =
  createContext<GetAllDashboardAggregateDataInterface>(
    {} as GetAllDashboardAggregateDataInterface
  );

export function GetAllDashboardAggregateDataProvider({
  children,
  data,
}: DashboardProviderProps) {
  const [filters, setFilters] = useState<IDashboardFilterOptions>({});

  const queryKey = useMemo(
    () => [
      'getAllDashboardAggregateData',
      Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== undefined && v !== '')
      ),
    ],
    [filters]
  );

  const queryResult = useQuery<
    GetAllDashboardAggregateDataResponse | CommonError,
    Error,
    GetAllDashboardAggregateDataResponse | CommonError,
    typeof queryKey
  >({
    queryKey,
    queryFn: ({ queryKey: _queryKey }) => {
      const [, currentFilters] = _queryKey as [string, IDashboardFilterOptions];
      return getAllDashboardAggregateData(currentFilters);
    },
    initialData: data,
    staleTime: 0,
  });

  return (
    <GetAllDashboardAggregateDataContext.Provider
      value={{ queryResult, filters, setFilters }}
    >
      {children}
    </GetAllDashboardAggregateDataContext.Provider>
  );
}

const useGetAllDashboardAggregateDataContext = () =>
  useContext(GetAllDashboardAggregateDataContext);

export default useGetAllDashboardAggregateDataContext;
