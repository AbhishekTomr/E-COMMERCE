import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import { getDataFromToken } from "@/helpers/tokenData";
import { Jwt } from "jsonwebtoken";

connectDB();

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const userId = getDataFromToken(request, "vtoken");
    console.log("sending vtoken!!!");
    if (_.isEmpty(userId)) throw new Error("email not found!!!");
    const user = await User.findById(userId);
    if (_.isEmpty(user)) throw new Error("user not found!!!");
    const response = await NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
    response.cookies.set("vtoken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
