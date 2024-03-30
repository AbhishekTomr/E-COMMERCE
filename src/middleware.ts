import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import _ from "lodash";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")
    ? request.cookies.get("token")?.value
    : "";
  if (path === "/") {
    return _.isEmpty(token)
      ? NextResponse.redirect(new URL("/login", request.nextUrl))
      : NextResponse.redirect(new URL("/categories", request.nextUrl));
  }
  if (!_.isEmpty(token) && isPublic) {
    return NextResponse.redirect(new URL("/categories", request.nextUrl));
  }
  if (_.isEmpty(token) && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/categories", "/login", "/signup"],
};
