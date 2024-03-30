import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("password", password);
    const user = await User.findOne({ email });
    if (_.isEmpty(user)) {
      return NextResponse.json(
        { error: "User doest not exist!!!" },
        { status: 400 }
      );
    }
    if (!user.verified)
      return NextResponse.json(
        { error: "User not verified yet!!!" },
        { status: 400 }
      );
    const validPassword = await bcryptjs.compare(password, user.password);
    console.log("valid password", validPassword);
    if (validPassword) {
      const tokenData = {
        id: user._id,
        username: user.name,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });
      const response = NextResponse.json({
        success: true,
        message: "Login Successful",
        user: {
          username: user.name,
          email: user.email,
          categories: user.selectedCategories,
        },
      });
      response.cookies.set("token", token, { httpOnly: true });
      return response;
    }
    return NextResponse.json({ error: "Invalid Password" }, { status: 500 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
