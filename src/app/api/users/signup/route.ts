import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import _ from "lodash";

connectDB();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log("req body****", reqBody);
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
    const newUser = new User({
      name: username,
      email: email,
      password: hashedPass,
      verified: false,
      selectedCategories: [],
    });
    await newUser.save();
    return NextResponse.json({
      message: "User created successfully !!!",
      status: true,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
