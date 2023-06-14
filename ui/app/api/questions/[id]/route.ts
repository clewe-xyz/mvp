import { authorizedRequest } from "@/app/api/authorizedRequest";
import { NextRequest } from "next/server";

type Params = {
  id: string;
};

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const answers: string[] = await request.json();
  return await authorizedRequest(`questions/${params.id}`, {
    method: "POST",
    body: JSON.stringify({
      answers,
    }),
    headers: { "Content-Type": "application/json" },
  });
}
