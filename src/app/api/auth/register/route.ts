import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import UserModel from "@/models/UserModel";
import jsonwebtoken from "jsonwebtoken";
import { getRegisterSchema } from "@/utils/validation";
import connectToDatabase from "@/utils/connectToDatabase";

export async function POST(request: NextRequest) {
  await connectToDatabase();

  const body = await request.json();
  const registerSchema = getRegisterSchema();
  const result = registerSchema.safeParse(body);

  if (!result.success) {
    const formattedErrors = result.error.format();
    return NextResponse.json(formattedErrors, { status: 400 });
  }

  const { name, email, password } = result.data;
  const passwordHash = await bcrypt.hash(password, 3);

  // Todo: add check for unique users

  const user = new UserModel({
    name,
    email,
    passwordHash,
    savedCocktailIds: [],
  });

  await user.save();

  const key = process.env.JWT_KEY as string;
  const jwt = jsonwebtoken.sign(
    {
      sub: user.toJSON()._id,
    },
    key
  );

  const res = NextResponse.json({
    id: user.id,
    name,
    email,
  });
  res.cookies.set("token", jwt);

  return res;
}
