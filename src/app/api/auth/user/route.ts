import connectToDatabase from "@/utils/connectToDatabase";
import { NextRequest, NextResponse } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "@/models/UserModel";

export async function GET(request: NextRequest) {
  await connectToDatabase();

  const tokenCookie = request.cookies.get("token");
  if (!tokenCookie) {
    return NextResponse.json(null);
  }

  try {
    const key = process.env.JWT_KEY as string;
    var payload = jsonwebtoken.verify(tokenCookie.value, key);
  } catch (err) {
    return NextResponse.json(null, { status: 401 });
  }

  const userId = payload.sub;
  if (!userId) {
    return NextResponse.json(null, { status: 400 });
  }

  const user = await UserModel.findById(userId);
  if (!user) {
    return NextResponse.json(null, { status: 401 });
  }

  return NextResponse.json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
}
