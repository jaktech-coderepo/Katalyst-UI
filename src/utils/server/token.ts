'use server';

import { cookies, headers } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

export interface Data {
  payload: {
    sessionId: string;
    user: {
      _id: string;
    };
  };
  token: string;
}

export interface SessionResponse {
  token: string;
}

export async function setTokens(data: SessionResponse) {
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
}

export async function getTokens() {
  const cki = await cookies();

  const accessToken = cki.get('ACCESS_TOKEN');
  const refreshToken = cki.get('REFRESH_TOKEN');

  if (!accessToken && !refreshToken) {
    return null;
  }

  return {
    accessToken: accessToken ? accessToken.value : '',
    refreshToken: refreshToken ? refreshToken.value : '',
  };
}

export async function getAccessToken(redirectOnError: boolean = true) {
  const cki = await cookies();
  const accessToken = cki.get('ACCESS_TOKEN');
  const url = (await headers()).get('referer') || '/signin';

  if (accessToken) {
    return accessToken.value;
  }

  if (redirectOnError) {
    redirect(url);
  }

  return '';
}

export async function handleUnauthorizedResponse(
  response: Record<'error', unknown>
) {
  const cki = await cookies();
  if (response.error === 'Unauthorized. Invalid token.') {
    const accessToken = cki.get('ACCESS_TOKEN');
    if (accessToken) {
      cki.delete('ACCESS_TOKEN');
      redirect('/signin');
    }
    redirect('/signin');
  }
}
