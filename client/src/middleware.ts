import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accommodation_jwt")?.value;
  const userCookie = request.cookies.get("accommodation_user")?.value;

  let roles: string[] = [];
  if (userCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(userCookie));
      roles = (parsed.roles || []).map((r: string) => r.toLowerCase());
    } catch {
      // invalid cookie
    }
  }

  // Protect /owner routes
  if (pathname.startsWith("/owner")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    const isOwnerOrAdmin = roles.includes("owner") || roles.includes("admin");
    if (!isOwnerOrAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    const isAdmin = roles.includes("admin");
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protect /my-bookings route
  if (pathname.startsWith("/my-bookings")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/owner/:path*", "/admin/:path*", "/my-bookings"],
};
