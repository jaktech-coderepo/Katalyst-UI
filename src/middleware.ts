import { NextRequest, NextResponse } from 'next/server';
import middlewareAuth from '@/middlewares/auth';

const allowedHosts = [
  'localhost:3000',
  'www.training-edge.cubosquare.com',
  'www.bigkatalyst.com',
  'training-edge.cubosquare.com',
  'bigkatalyst.com',
];

export default async function middleware(
  request: NextRequest
): Promise<NextResponse | void> {
  const host = request.headers.get('host');
  // 🔹 Block requests from unauthorized hosts
  if (!host || !allowedHosts.includes(host)) {
    return new NextResponse('Forbidden: Invalid Host', { status: 403 });
  }
  const auth = await middlewareAuth(request);
  if (auth) {
    return auth;
  }

  return NextResponse.next();
}

export const config = {
  runtime: 'experimental-edge',
  //   unstable_allowDynamic: ["/node_modules/@cloudinary/**"],
  matcher: [
    {
      source: '/((?!api/|_next/static|_next/image|favicon.ico).*)',
      missing: [],
    },
  ],
};
