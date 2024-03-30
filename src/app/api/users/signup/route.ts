import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import _ from "lodash";
import { generateMailToken } from "@/helpers/token";
import { sendMail } from "@/helpers/mail";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    //encrypt pass
    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);

    const user = await User.findOne({ email });
    if (!_.isEmpty(user)) {
      return NextResponse.json(
        { error: "User already exist!!!" },
        { status: 500 }
      );
    }

    const verificationCode = generateMailToken();

    const newUser = new User({
      name: username,
      email: email,
      password: hashedPass,
      verified: false,
      verifyToken: verificationCode,
      varifyTokenExpiry: Date.now() + 3600000,
      selectedCategories: [],
    });
    await sendMail(email, verificationCode);
    const createdUser = await newUser.save();
    const tokenData = {
      id: createdUser._id,
      username: createdUser.name,
      email: createdUser.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User created successfully !!!",
      status: true,
    });
    response.cookies.set("vtoken", token, { httpOnly: true });
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
