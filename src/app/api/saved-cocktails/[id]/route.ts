import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/utils/connectToDatabase";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "@/models/UserModel";

type RouteProps = {
  params: {
    id: string;
  };
};

export async function DELETE(req: NextRequest, { params }: RouteProps) {
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

  await connectToDatabase();
  const user = await UserModel.findById(userId);
  if (!user) {
    return NextResponse.json(null, { status: 401 });
  }

  const cocktailId = params.id;
  const cocktailIndex = user.savedCocktailIds.indexOf(cocktailId);
  user.savedCocktailIds.splice(cocktailIndex, 1);
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
