import app from '@/constants/app';
import validateSession from '@/utils/server/validateSession';
import { NextRequest, NextResponse } from 'next/server';
// import validateSession from '@/utils/server/validateSession';

export default async function middlewareAuth(
  request: NextRequest
): Promise<NextResponse | void> {
  if (request.headers.has('next-action')) {
    return;
  }

  // it will validate the session and if the session is not valid, it will delete the access token cookie and redirect to login page
  // otherwise, it will return true
  const session = await validateSession(request);
  if (typeof session !== 'boolean') {
    return session;
  }

  // Middleware for redirecting to dashboard if already authenticated and trying to access signin
  if (/^\/(signin)/.test(request.nextUrl.pathname) && session) {
    if (request.nextUrl.searchParams.has('redirect')) {
      const redirectUrl = request.nextUrl.searchParams.get('redirect');
      request.nextUrl.pathname = redirectUrl || '/dashboard';
      request.nextUrl.searchParams.delete('redirect');
    } else {
      request.nextUrl.pathname = '/dashboard';
    }

    return NextResponse.redirect(request.nextUrl);
  }

  if (
    !session &&
    app.PROTECTED_ROUTES.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    )
  ) {
    /**
     * since we are using proxy and every thing is handled by express server, we may remove the following if block
     */
    // if the header is missing, return a 401 Unauthorized response
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          message:
            'You are not authorized to access this resource. Please login.',
        },
        { status: 401 }
      );
    }

    // add current url to serchparams to redirect back after login

    const redirectUrl = request.nextUrl.pathname + request.nextUrl.search;

    request.nextUrl.searchParams.set('redirect', redirectUrl);
    request.nextUrl.pathname = '/signin';
    return NextResponse.redirect(request.nextUrl);
  }
}
