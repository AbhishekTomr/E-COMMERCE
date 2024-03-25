import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const response = await NextResponse.json({
      message: "Log out successfull",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
