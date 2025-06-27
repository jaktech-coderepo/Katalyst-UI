'use server';

import {
  AuthenticationResponse,
  CommonError,
  CommonResponseWithoutData,
  GetAllChannelListResponse,
  GetAllSupervisorListResponse,
  GetAllUserResponse,
  GetAllUserRoleResponse,
  GetUserResponse,
  IFilterOptionsWithActiveInActive,
  PutUserDetailsResponse,
} from '@/types';
import getOptionString from '@/utils/misc';
import {
  getAccessToken,
  handleUnauthorizedResponse,
} from '@/utils/server/token';
import { UserEditType } from '@/validation/userEdit.schema';
import { revalidateTag } from 'next/cache';
import { UserCreateType } from '@/validation/userCreate.schema';
import { userEditPasswordEditType } from '@/validation/userEditPassword.schema';

export default async function getAllUserDetails(
  options: IFilterOptionsWithActiveInActive = {}
): Promise<GetAllUserResponse | CommonError> {
  const token = await getAccessToken();
  const queryString = getOptionString({
    page: 1,
    limit: 10,
    flag: 1,
    ...options,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users?${queryString}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getAllUserDetails'],
      },
    }
  );
  if ('error' in res) {
    handleUnauthorizedResponse(res);
  }
  const resData = await res.json();
  return resData;
}

export async function createUserDetails(
  formdata: UserCreateType
): Promise<AuthenticationResponse | CommonError> {
  const token = await getAccessToken();
  let data;
  if (formdata.captchaToken) {
    data = {
      username: formdata.username,
      email: formdata.email,
      userRole: formdata.roleid,
      reportingTo: formdata.reportingTo,
      password: formdata.password,
      empId: formdata.empId,
      channelId: formdata.channelId,
      isactive: formdata.isactive,
      captchaToken: formdata.captchaToken,
    };
  } else {
    data = {
      username: formdata.username,
      email: formdata.email,
      userRole: formdata.roleid,
      reportingTo: formdata.reportingTo,
      password: formdata.password,
      empId: formdata.empId,
      channelId: formdata.channelId,
      isactive: formdata.isactive,
    };
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/register`,
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
  revalidateTag('getAllUserDetails');
  return resData;
}

export async function getUser(): Promise<GetUserResponse | CommonError> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/getUser`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function getAllUserRoles(): Promise<
  GetAllUserRoleResponse | CommonError
> {
  const aceessToken = await getAccessToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/getUserRoles`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${aceessToken}`,
      },
      next: {
        tags: ['getAllUserRoles'],
      },
    }
  );

  const data = await res.json();
  return data;
}

export async function updateUserDetails({
  formdata,
  id,
}: {
  formdata: UserEditType;
  id: number;
}): Promise<PutUserDetailsResponse | CommonError> {
  const token = await getAccessToken();
  const data = {
    username: formdata.username,
    email: formdata.email,
    userRole: formdata.roleid,
    reportingTo: formdata.reportingTo,
    isactive: formdata.isactive,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/updateUser/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  const resData = await res.json();
  revalidateTag('getAllUserDetails');
  return resData;
}

export async function updateUserPassword({
  formdata,
}: {
  formdata: userEditPasswordEditType;
}): Promise<CommonResponseWithoutData | CommonError> {
  const token = await getAccessToken();
  const data = {
    new_password: formdata.password,
    user_id: formdata.user_id,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/updateUserPassword`,
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
  revalidateTag('getAllUserDetails');
  return resData;
}

export async function deleteUserDetails({
  id,
}: {
  id: number;
}): Promise<CommonError> {
  const accessToken = await getAccessToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/deleteUser/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();
  revalidateTag('getAllUserDetails');
  return data;
}

export async function getAllSupervisorList(): Promise<
  GetAllSupervisorListResponse | CommonError
> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/getSupervisorsList`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getAllSupervisorList'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function getAllChannelList(): Promise<
  GetAllChannelListResponse | CommonError
> {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/channels/getChannels`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ['getAllChannelList'],
      },
    }
  );
  const resData = await res.json();
  return resData;
}
