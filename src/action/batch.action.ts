'use server';

import {
  CommonError,
  CreateBatchDetailsResponse,
  GetAllBatchResponse,
  GetAllBranchResponse,
  GetAllCoFacilitatorResponse,
  GetAllProgrammeFlagResponse,
  GetDownloadProgrammeDataResponse,
  GetDownloadProgrammeResponse,
  IFilterOptionsWithActiveInActive,
  PutBatchResponse,
} from '@/types';
import getOptionString from '@/utils/misc';
import { getAccessToken } from '@/utils/server/token';
import { BatchCreateType } from '@/validation/batchCreate.schema';
import { BatchEditType } from '@/validation/batchEdit.schema';
import { revalidateTag } from 'next/cache';

export default async function getAllBatchDetails(
  options: IFilterOptionsWithActiveInActive = {}
): Promise<GetAllBatchResponse | CommonError> {
  const token = await getAccessToken();
  const queryString = getOptionString({
    page: 1,
    limit: 10,
    flag: 1,
    ...options,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/batches?${queryString}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getAllBatchDetails'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function createBatchDetails(
  formdata: BatchCreateType
): Promise<CreateBatchDetailsResponse | CommonError> {
  const token = await getAccessToken();
  let data;
  const { captchaToken, ...rest } = formdata;
  if (captchaToken) {
    data = formdata;
  } else {
    data = rest;
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/batches/createBatch`,
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
  revalidateTag('getAllBatchDetails');
  return resData;
}

export async function getBatchDetailsByUserId(
  options: IFilterOptionsWithActiveInActive & { id: number }
): Promise<GetAllBatchResponse | CommonError> {
  const token = await getAccessToken();
  const queryString = getOptionString({
    page: 1,
    limit: 10,
    flag: 1,
    ...options,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/batches/getBatchsByUserId/${options.id}?${queryString}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getBatchDetailsByUserId'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function updateBatchDetails({
  formdata,
  id,
}: {
  formdata: BatchEditType;
  id: number;
}): Promise<PutBatchResponse | CommonError> {
  const token = await getAccessToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/batches/updateBatch/${id}`,
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
  revalidateTag('getAllBatchDetails');
  return resData;
}

export async function deleteBatchDetails({
  id,
  batchNumber,
}: {
  id: number;
  batchNumber: string;
}): Promise<CommonError> {
  const accessToken = await getAccessToken();
  const queryString = getOptionString({ batch_number: batchNumber });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/batches/deleteBatch/${id}?${queryString}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();
  revalidateTag('getAllBatchDetails');
  return data;
}

export async function getAllBranchList(): Promise<
  GetAllBranchResponse | CommonError
> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/batches/getBranchList`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getAllBranchList'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function getAllProgrammeList(): Promise<
  GetAllProgrammeFlagResponse | CommonError
> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/batches/getProgrammeList`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getAllProgrammeList'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function getAllCoFacilitatorsByUserId(
  userId: number
): Promise<GetAllCoFacilitatorResponse | CommonError> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/batches/getCofacilatorByUserId/${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getAllCoFacilitatorsByUserId'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function getDownloadProgramme({
  id,
}: {
  id: number;
}): Promise<GetDownloadProgrammeResponse | CommonError> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/batches/downloadProgrammeTemplate/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getDownloadProgramme'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function uploadProgrammeData({
  formdata,
  id,
}: {
  formdata: FormData;
  id: number;
}): Promise<CreateBatchDetailsResponse | CommonError> {
  const token = await getAccessToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/batches/uploadProgrammeData/${id}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    }
  );
  const resData = await res.json();
  revalidateTag('getAllBatchDetails');
  return resData;
}

export async function getDownloadProgrammeData({
  id,
  formdata,
}: {
  id: number;
  formdata: {
    batch_number: string;
    created_by: number;
  };
}): Promise<GetDownloadProgrammeDataResponse | CommonError> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/batches/downloadProgrammeData/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formdata),
      next: {
        tags: ['getDownloadProgrammeData'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}
