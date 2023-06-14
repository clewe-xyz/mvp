import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const nickname = await request.json();
  const response = await fetch(
    `${process.env.API_HOST_URL}/users/create/not-active`,
    {
      method: "POST",
      body: JSON.stringify(nickname),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const errorDetails = await response.json();
    return NextResponse.json(errorDetails, { status: response.status });
  }
  return response;
}
