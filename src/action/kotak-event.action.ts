'use server';

import { CommonError, GetEventBranchResponse } from '@/types';
import { kotakEventType } from '@/validation/kotakEvent.schema';

export default async function createKotakEvent(data: kotakEventType) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/event/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
  const resData = await res.json();
  return resData;
}

export async function getEventBranch(): Promise<
  CommonError | GetEventBranchResponse
> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/event/getBranchList`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const resData = await res.json();
  return resData;
}
