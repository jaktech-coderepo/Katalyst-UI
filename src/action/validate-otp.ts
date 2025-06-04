'use server';

import { CommonError } from '@/types';
import { ValidateOtpType } from '@/validation/validateOtp.schema';
import { redirect } from 'next/navigation';

export default async function validateOtp(
  data: ValidateOtpType
): Promise<void | CommonError> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/validate-otp`,
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
    redirect(`/reset-password?email=${data.email}&otp=${data.otp}`);
  }
  return resData;
}
