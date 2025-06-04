'use server';

import { CommonError, CommonResponseWithoutData } from '@/types';
import { ResetPasswordType } from '@/validation/resetPassword.schema';

export default async function resetPassword(
  data: ResetPasswordType
): Promise<CommonResponseWithoutData | CommonError> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/reset-password`,
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
