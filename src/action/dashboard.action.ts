'use server';

import {
  CommonError,
  GetAllDashboardAggregateDataResponse,
  GetAllDashboardMasterDataResponse,
  GetAllProgrammeFlagResponse,
  GetBatchDashboardChartResponse,
  GetBatchDashboardTableResponse,
  GetBatchShowCaseResponse,
  GetDownloadProgrammeDataResponse,
  GetProgrammeDashboardChartResponse,
  GetProgrammeDashboardTableResponse,
  GetProgrammeShowCaseResponse,
  IDashboardFilterOptions,
} from '@/types';
import getOptionString from '@/utils/misc';
import { getAccessToken } from '@/utils/server/token';

export default async function getProgrammeShowCase(): Promise<
  GetProgrammeShowCaseResponse | CommonError
> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboard/q1/aggregateData`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getProgrammeShowCase'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function getBatchShowCase(): Promise<
  GetBatchShowCaseResponse | CommonError
> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboard/q2/aggregateData`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getBatchShowCase'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function getProgrammeDashboardTable(): Promise<
  GetProgrammeDashboardTableResponse | CommonError
> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboard/q5/aggregateData`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getProgrammeDashboardTable'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function getBatchDashboardTable(): Promise<
  GetBatchDashboardTableResponse | CommonError
> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboard/q6/aggregateData`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getBatchDashboardTable'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function getProgrammeDashboardChart(): Promise<
  GetProgrammeDashboardChartResponse | CommonError
> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboard/q3/aggregateData`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getProgrammeDashboardChart'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}
export async function getBatchDashboardChart(): Promise<
  GetBatchDashboardChartResponse | CommonError
> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboard/q4/aggregateData`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getBatchDashboardChart'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function getDashboardDownloadProgrammeData({
  id,
}: {
  id: number;
}): Promise<GetDownloadProgrammeDataResponse | CommonError> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboard/q7/downloadProgrammeData/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getDashboardDownloadProgrammeData'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function getAllDashboardProgrammeList(): Promise<
  GetAllProgrammeFlagResponse | CommonError
> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboard/q7/getProgrammeList`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getAllDashboardProgrammeList'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function getAllDashboardAggregateData(
  options: IDashboardFilterOptions = {}
): Promise<GetAllDashboardAggregateDataResponse | CommonError> {
  const token = await getAccessToken();
  const queryString = getOptionString({
    ...options,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboard/aggregateData?${queryString}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getAllDashboardAggregateData'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function getAllDashboardMasterData(): Promise<
  GetAllDashboardMasterDataResponse | CommonError
> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboard/getFilterLists`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getAllDashboardMasterData'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}
