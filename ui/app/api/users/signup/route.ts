import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const credentials = await request.json();
  console.log("Create account with credentials", credentials);
  const [accessTokenMock, refreshTokenMock] = [
    "892hke98weiu443",
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
