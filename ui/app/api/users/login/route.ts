import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();
  console.log("Log in with credentials", res);
  const [accessTokenMock, refreshTokenMock] = [
    "0000hke98weiu443",
    "3fdus0oiewjof43094or",
  ];
  const response = NextResponse.json("", { status: 200 });
  response.headers.append(
    "Set-Cookie",
    `access_token=${accessTokenMock}; Max-Age=2592000`
  );
  response.headers.append(
    "Set-Cookie",
    `refresh_token=${refreshTokenMock}; Max-Age=5592000`
  );
  return response;
}
