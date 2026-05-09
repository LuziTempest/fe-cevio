import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || 
                     request.nextUrl.pathname.startsWith("/signup");
  
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/generate") || 
                           request.nextUrl.pathname.startsWith("/profile");

  // 1. If trying to access protected route without token -> redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    // Optional: add a callback URL to redirect back after login
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. If trying to access auth pages (login/signup) with token -> redirect to profile
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/generate/:path*", 
    "/profile/:path*",
    "/login",
    "/signup"
  ],
};
