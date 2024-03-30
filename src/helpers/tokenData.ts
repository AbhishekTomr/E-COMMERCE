import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest, tokenName?: string) {
  try {
    const encodedToken =
      request.cookies.get(tokenName ? tokenName : "token")?.value || "";
    const token: any = jwt.verify(
      encodedToken,
      process.env.TOKEN_SECRET! as string
    );
    return token.id;
  } catch (err: any) {
    console.error(err);
  }
}
