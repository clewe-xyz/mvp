import { authorizedRequest } from "@/app/api/authorizedRequest";

export async function GET() {
  // CAUTION: cookies are not sent from Server component to the Route Handler
  // It has been found out when tried to acess `cookies()` from 'next/headers', or request.cookies
  return await authorizedRequest("users/me");
}
