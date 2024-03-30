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
    return response;
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqBody = await request.json();
    const { email, token } = reqBody;
    if (_.isEmpty(email) || _.isEmpty(token))
      throw new Error("email not found!!!");
    const user = await User.findOne({ email, verifyToken: token });
    if (_.isEmpty(user)) throw new Error("user not found!!!");
    user.verified = true;
    await user.save();
    const response = NextResponse.json({
      success: true,
      message: "User Verified",
    });
    await response.cookies.set("vtoken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
