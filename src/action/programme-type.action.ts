'use server';

import { CommonError, GetAllProgrammeTypeListResponse } from '@/types';
import { getAccessToken } from '@/utils/server/token';

export default async function getAllProgrammeTypeList(): Promise<
  GetAllProgrammeTypeListResponse | CommonError
> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/programmeTypes/getProgrammeTypes`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getAllProgrammeTypeList'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}
