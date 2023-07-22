import { NextRequest, NextResponse } from "next/server";

type Credentials = {
  userId?: string; // presented if came from demo quest
  nickname: string;
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  const credentials: Credentials = await request.json();
  const result = await fetch(`${process.env.API_HOST_URL}/users/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!result.ok) {
    const errorDetails = await result.json();
    return NextResponse.json(errorDetails, { status: result.status });
  }
  const { access_token, refresh_token } = await result.json();
  const response = NextResponse.json(null, { status: 200 });
  response.headers.append(
    "Set-Cookie",
    `access_token=${access_token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=172800`
  );
  response.headers.append(
    "Set-Cookie",
    `refresh_token=${refresh_token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=604800`
  );
  return response;
}
