import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/connectToDatabase";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "@/models/UserModel";
import ApiAdapter from "@/utils/ApiAdapter";
import { User } from "@/account/types";

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const tokenCookie = req.cookies.get("token");
  if (!tokenCookie) {
    return NextResponse.json(null, { status: 401 });
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

  const onlyIds = req.nextUrl.searchParams.get("onlyIds") === "true";
  console.log(onlyIds);
  if (onlyIds) {
    return NextResponse.json(user.savedCocktailIds);
  }

  const api = new ApiAdapter();
  const cocktails = await api.getCocktailsByIds(user.savedCocktailIds);
  return NextResponse.json(cocktails.length > 0 ? cocktails : null);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const tokenCookie = req.cookies.get("token");
  if (!tokenCookie) {
    return NextResponse.json(null, { status: 401 });
  }

  const key = process.env.JWT_KEY as string;
  try {
    var payload = jsonwebtoken.verify(tokenCookie.value, key);
  } catch (err) {
    return NextResponse.json(null, { status: 401 });
  }

  const userId = payload.sub;
  if (!userId) {
    return NextResponse.json(null, { status: 400 });
  }

  const cocktailId = await req.json();

  const user = await UserModel.findById(userId);
  if (!user) {
    return NextResponse.json(null, { status: 401 });
  }

  const cocktailIndex = user.savedCocktailIds.indexOf(cocktailId);
  if (cocktailIndex === -1) {
    user.savedCocktailIds.push(cocktailId);
  } else {
    user.savedCocktailIds.splice(cocktailIndex, 1);
  }

  await user.save();

  const jwt = jsonwebtoken.sign(
    {
      sub: userId,
      savedCocktailIds: user.savedCocktailIds,
    },
    key
  );

  const res = NextResponse.json({ success: true });
  res.cookies.set("token", jwt);
  return res;
}
