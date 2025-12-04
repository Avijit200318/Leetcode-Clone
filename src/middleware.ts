import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const url = request.nextUrl;

  if (token && (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up") || url.pathname.startsWith("/verify-code") || url.pathname.startsWith("/forget-password") || url.pathname === "/")) {
    return NextResponse.redirect(new URL(`/dashboard/${token._id}`, request.url))
  }

  // admin condition
  if (token && token.userType === "user" && url.pathname.startsWith("/add-problem")) {
    return NextResponse.redirect(new URL(`/dashboard/${token._id}`, request.url));
  }

  // protected route
  if (!token && (url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/add-problem") || url.pathname.startsWith("/add-solution") || url.pathname.startsWith("/profile") || url.pathname.startsWith("/all-submissions") || url.pathname.startsWith("/submission"))) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*',
    '/problems/:path*',
    '/forget-password/:path*',
    '/add-problem/:path*',
    '/add-solution/:path*',
    '/profile/:path*',
    '/all-submissions/:path*',
    '/submission/:path*'
  ]
}