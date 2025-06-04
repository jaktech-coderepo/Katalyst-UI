'use server';

import { CommonError } from '@/types';
import { ForgetPasswordType } from '@/validation/forgetPassword.schema';
import { redirect } from 'next/navigation';

export default async function forgetPassword(
  data: ForgetPasswordType
): Promise<void | CommonError> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/forgot-password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
  const resData = await res.json();
  if (res.ok) {
    redirect(`/otp-verification?email=${data.email}`);
  }
  return resData;
}
