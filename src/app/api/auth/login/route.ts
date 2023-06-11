import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UserModel from "@/models/UserModel";
import jsonwebtoken from "jsonwebtoken";
import { getLoginSchema } from "@/utils/validation";
import connectToDatabase from "@/utils/connectToDatabase";

export async function POST(request: NextRequest) {
  await connectToDatabase();

  const body = await request.json();
  const loginSchema = getLoginSchema();
  const result = loginSchema.safeParse(body);

  if (!result.success) {
    const formattedErrors = result.error.format();
    return NextResponse.json(formattedErrors, { status: 401 });
  }

  const { email, password } = result.data;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "Cannot find user" }, { status: 401 });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrectPassword) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const key = process.env.JWT_KEY as string;
  const jwt = jsonwebtoken.sign(
    {
      sub: user.toJSON()._id,
    },
    key
  );

  const res = NextResponse.json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
  res.cookies.set("token", jwt);

  return res;
}
