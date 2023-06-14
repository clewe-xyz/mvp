import { NextResponse } from "next/server";

export async function POST() {
  // Unset access and refresh tokens = log out a user
  const response = NextResponse.json(null, { status: 200 });
  response.headers.append("Set-Cookie", `access_token=; Max-Age=0; Path=/api`);
  response.headers.append("Set-Cookie", `refresh_token=; Max-Age=0; Path=/api`);
  return response;
}
