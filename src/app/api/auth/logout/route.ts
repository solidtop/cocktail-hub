import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function POST(req: NextRequest) {
  const jwt = cookies().get("token")?.value;
  if (!jwt) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    const res = new NextResponse(null);
    res.cookies.delete("token");
    return res;
  } catch (err) {
    console.log(err);
  }
}
