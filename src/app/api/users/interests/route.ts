import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import { getDataFromToken } from "@/helpers/tokenData";
import { Mongoose } from "mongoose";

connectDB();

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const tokenId = getDataFromToken(request);
    if (_.isEmpty(tokenId)) {
      throw new Error("Unable to fetch user interests");
    }
    const user: any = await User.findOne({ _id: tokenId });
    if (_.isEmpty(user)) {
      throw new Error("Unable to fetch user");
    }
    return NextResponse.json({
      success: true,
      interests: user.selectedCategories,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const tokenId = getDataFromToken(request);
    const reqBody = await request.json();
    const { selectedCategories } = reqBody;
    if (_.isEmpty(tokenId)) {
      throw new Error("Unable to fetch user interests");
    }
    const user: any = await User.findOne({ _id: tokenId });
    if (_.isEmpty(user)) {
      throw new Error("Unable to fetch user");
    }
    user.selectedCategories = selectedCategories;
    await user.save();
    return NextResponse.json({
      success: true,
      message: "user interests updated successfully!!",
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
