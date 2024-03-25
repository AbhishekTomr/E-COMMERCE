import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";
    const token: any = jwt.verify(
      encodedToken,
      process.env.TOKEN_SECRET! as string
    );
    return token.id;
  } catch (err: any) {
    console.error(err);
  }
}
