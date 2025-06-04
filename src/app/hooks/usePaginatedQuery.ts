import { useEffect, useMemo, useState } from 'react';
import usePagination from '@/app/hooks/usePagination';
import { useQuery } from '@tanstack/react-query';
import { CommonError, PaginatedResponse } from '@/types/serverActionResponse';

export interface PaginatedQueryOptions<TQueryResponse, TQueryParams> {
  initialData: TQueryResponse;
  queryKey: string;
  queryFn: (params: TQueryParams) => Promise<TQueryResponse | CommonError>;
  queryParams?: TQueryParams;
  waitTime?: number;
}

export interface PaginatedQueryResponse<TQueryParams, TQueryResponse> {
  data: TQueryResponse;
  isFetching: boolean;
  isLoading: boolean;
  isPaused: boolean;
  page: number;
  limit: number;
  setLimit: (limit: number) => void;
  setPage: (page: number) => void;
  setTotalItems: (totalItems: number) => void;
  emptyRows: number;
  queryParams: TQueryParams;
  setQueryParam: <TParamKey extends keyof TQueryParams>(
    key: TParamKey,
    value: TQueryParams[TParamKey]
  ) => void;
}

export default function usePaginatedQuery<
  TDataResult,
  TQueryResponse extends PaginatedResponse<TDataResult>,
  TQueryParams extends Record<string, any>,
>({
  initialData,
  queryKey,
  queryFn,
  queryParams: initialQueryParams = {} as TQueryParams,
  waitTime = 1000,
}: PaginatedQueryOptions<TQueryResponse, TQueryParams>) {
  // initialize the table data with the initial data, this will be updated based on the query response and will replace the data
  const [tableData, setTableData] = useState(initialData);

  // initialize the pagination state
  const { page, limit, setLimit, setPage, setTotalItems } = usePagination({
    page: initialData.page,
    limit: initialData.limit,
    totalItems: initialData.totalCount,
  });

  // initialize the query params
  const [queryParams, setQueryParams] =
    useState<TQueryParams>(initialQueryParams);
  const [enabled, setEnabled] = useState(true);

  // fetch the data based on the query params, page and limit
  const {
    data: resData,
    isFetching,
    isPaused,
  } = useQuery({
    queryKey: [queryKey, page, limit, queryParams],
    queryFn: async () => {
      return queryFn({
        page,
        limit,
        ...queryParams,
      });
    },
    enabled,
  });

  // calculate the empty rows based on the page and limit, to be used in the table, to fill the empty rows
  const emptyRows = useMemo(() => {
    return page > 1 ? Math.max(0, limit - tableData.results.length) : 0;
  }, [tableData]);

  // set the query params based on the key and value
  const setQueryParam = <TParamKey extends keyof TQueryParams>(
    key: TParamKey,
    value: TQueryParams[TParamKey]
  ) => {
    // disable the query to prevent multiple requests while user is interacting.
    setEnabled(false);
    switch (key) {
      // handle page and limit separately, as we need to update the pagination state
      case 'page':
        setPage(value);
        break;
      case 'limit':
        setLimit(value);
        break;
      default:
        setQueryParams((prev) => ({
          ...prev,
          [key]: value,
        }));
        break;
    }
  };

  useEffect(() => {
    // enable the query after 1 second
    const timeOut = setTimeout(() => {
      setEnabled(true);
    }, waitTime);
    return () => {
      clearTimeout(timeOut);
    };
  }, [enabled]);

  useEffect(() => {
    // update the table data if the request is successful and not fetching
    if (resData && 'results' in resData && !isFetching && !isPaused) {
      setTotalItems(resData.totalCount);

      // replace the results in the table data
      setTableData(() => resData);
    }
  }, [resData, isFetching, isPaused]);

  return {
    data: tableData,
    isFetching,
    isLoading: isFetching || !enabled,
    isPaused,
    page,
    limit,
    setLimit,
    setPage,
    setTotalItems,
    emptyRows,
    queryParams,
    setQueryParam,
  };
}
