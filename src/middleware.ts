import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  verifySessionTokenEdge,
} from "@/lib/admin/session-edge";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPath =
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/api/admin" ||
    pathname.startsWith("/api/admin/");

  if (!isAdminPath) {
    return NextResponse.next();
  }

  const isLoginPage =
    pathname === "/admin/login" || pathname === "/admin/login/";
  const isLoginApi =
    pathname === "/api/admin/login" || pathname === "/api/admin/login/";

  if (isLoginPage || isLoginApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const valid = await verifySessionTokenEdge(
    token,
    process.env.ADMIN_SESSION_SECRET,
  );

  if (!valid) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login/";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
