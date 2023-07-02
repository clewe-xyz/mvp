import { authorizedRequest } from "@/app/api/authorizedRequest";
import { NextRequest } from "next/server";

export async function GET() {
  // CAUTION: cookies are not sent from a Server component to the Route Handler, only from Client Component
  // It has been found out when tried to acess `cookies()` from 'next/headers', or request.cookies
  return await authorizedRequest("users/me");
}

export async function PATCH(request: NextRequest) {
  const walletAddress = await request.json();
  return authorizedRequest("users/me", {
    method: "PATCH",
    body: JSON.stringify({ wallet_address: walletAddress }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
