'use server';

import {
  CommonError,
  CreateProgrammeDetailsResponse,
  GetAllProgrammeResponse,
  IFilterOptionsWithActiveInActive,
  PutProgrammeResponse,
} from '@/types';
import getOptionString from '@/utils/misc';
import { getAccessToken } from '@/utils/server/token';
import { revalidateTag } from 'next/cache';
import { ProgrammeEditType } from '@/validation/programmeEdit.schema';
import { programmeCreateType } from '@/validation/programmeCreate.schema';

export default async function getAllProgrammeDetails(
  options: IFilterOptionsWithActiveInActive = {}
): Promise<GetAllProgrammeResponse | CommonError> {
  const token = await getAccessToken();
  const queryString = getOptionString({
    page: 1,
    limit: 10,
    flag: 1,
    ...options,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/programmes?${queryString}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getAllProgrammeDetails'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function createProgrammeDetails(
  formdata: programmeCreateType
): Promise<CreateProgrammeDetailsResponse | CommonError> {
  let data;
  const { captchaToken, ...rest } = formdata;
  if (captchaToken) {
    data = formdata;
  } else {
    data = rest;
  }
  const token = await getAccessToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/programmes/createProgramme`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  const resData = await res.json();
  revalidateTag('getAllProgrammeDetails');
  return resData;
}

export async function updateProgrammeDetails({
  formdata,
  id,
}: {
  formdata: ProgrammeEditType;
  id: number;
}): Promise<PutProgrammeResponse | CommonError> {
  const token = await getAccessToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/programmes/updateProgramme/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formdata),
    }
  );
  const resData = await res.json();
  revalidateTag('getAllProgrammeDetails');
  return resData;
}

export async function deleteProgrammeDetails({
  id,
}: {
  id: number;
}): Promise<CommonError> {
  const accessToken = await getAccessToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/programmes/deleteProgramme/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();
  revalidateTag('getAllProgrammeDetails');
  return data;
}
