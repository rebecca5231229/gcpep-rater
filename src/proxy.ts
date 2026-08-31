import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "gcpep_auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow the login page and its API routes, plus Next.js internals.
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/api/logout") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get(AUTH_COOKIE);
  if (authCookie?.value === "granted") {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files, so the gate covers every page and route.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
