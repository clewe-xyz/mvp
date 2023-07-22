import { authorizedRequest } from "@/app/api/authorizedRequest";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
  const nfts = await request.json();
  return authorizedRequest("users/me/nft", {
    method: "PATCH",
    body: JSON.stringify(nfts),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
