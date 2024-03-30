import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isEmpty = (token:any) => !(token&&true);

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")
    ? request.cookies.get("token")?.value
    : "";
  const vtoken = request.cookies.get("vtoken");
  if (path === "/verify") {
    if (isEmpty(vtoken))
      return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  if (path === "/") {
    return isEmpty(token)
      ? NextResponse.redirect(new URL("/login", request.nextUrl))
      : NextResponse.redirect(new URL("/categories", request.nextUrl));
  }
  if (!isEmpty(token) && isPublic) {
    return NextResponse.redirect(new URL("/categories", request.nextUrl));
  }
  if (isEmpty(token) && !isPublic && path !== "/verify") {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/categories", "/login", "/signup", "/verify"],
};
