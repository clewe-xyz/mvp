import { authorizedRequest } from "@/app/api/authorizedRequest";

export async function GET() {
  return await authorizedRequest(`users/me`);
}
