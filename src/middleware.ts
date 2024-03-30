import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import _ from "lodash";
import { getDataFromToken } from "./helpers/tokenData";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")
    ? request.cookies.get("token")?.value
    : "";
  const vtoken = request.cookies.get("vtoken");
  console.log("check this out****** vtoken", vtoken);
  if (path === "/verify") {
    if (_.isEmpty(vtoken))
      return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  if (path === "/") {
    return _.isEmpty(token)
      ? NextResponse.redirect(new URL("/login", request.nextUrl))
      : NextResponse.redirect(new URL("/categories", request.nextUrl));
  }
  if (!_.isEmpty(token) && isPublic) {
    return NextResponse.redirect(new URL("/categories", request.nextUrl));
  }
  if (_.isEmpty(token) && !isPublic && path !== "/verify") {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/categories", "/login", "/signup", "/verify"],
};
