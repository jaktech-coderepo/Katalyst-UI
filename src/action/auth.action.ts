'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import {
  CommonError,
  CommonResponseWithoutData,
} from '@/types/serverActionResponse';
import { redirect } from 'next/navigation';
import { SignInType } from '@/validation/signin.schema';
import { getAccessToken } from '@/utils/server/token';
import USER_TYPE from '@/constants/enum';

export default async function loginUser({
  formData,
}: {
  formData: SignInType;
}): Promise<void | CommonError> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await res.json();
  if ('token' in data) {
    const cki = await cookies();

    const accessToken = jwt.decode(data.token, {
      json: true,
    });

    if (!accessToken || !accessToken.exp || !accessToken.iat) {
      throw new Error('Invalid token');
    }

    cki.set('ACCESS_TOKEN', data.token, {
      path: '/',
      maxAge: accessToken.exp - accessToken.iat,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    });

    const user = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/getUser`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    const userData = await user.json();

    if (userData.data.roleid === USER_TYPE.Admin) {
      redirect(`/dashboard/programme`);
    } else {
      redirect(`/dashboard/batch`);
    }
    return;
  }
  return data;
}

export async function logout() {
  const token = await getAccessToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/logout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
}

export async function verifyToken(
  token: string
): Promise<{ message: string; success: boolean } | CommonResponseWithoutData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/verify_token`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
}
