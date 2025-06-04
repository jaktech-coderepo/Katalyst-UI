import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { logout, verifyToken } from '@/action/auth.action';

function isTokenExpired(decodedToken: any): boolean {
  return decodedToken?.exp && decodedToken.exp < Math.floor(Date.now() / 1000);
}

function handleInvalidSession(request: NextRequest): NextResponse {
  const response = NextResponse.redirect(request.nextUrl);
  response.cookies.delete('ACCESS_TOKEN');
  return response;
}

async function handleLogout(request: NextRequest): Promise<NextResponse> {
  await logout();
  return handleInvalidSession(request);
}

export default async function validateSession(
  request: NextRequest
): Promise<boolean | NextResponse> {
  const accessToken = request.cookies.get('ACCESS_TOKEN')?.value;
  if (!accessToken) return false;

  const checkSession = await verifyToken(accessToken);
  if (!checkSession.success) return handleInvalidSession(request);

  const decodedToken = jwt.decode(accessToken);
  if (isTokenExpired(decodedToken)) return handleInvalidSession(request);

  if (request.nextUrl.pathname === '/logout') return handleLogout(request);

  return true;
}
