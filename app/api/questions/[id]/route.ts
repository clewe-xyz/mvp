import { unauthorizedRequest } from "@/app/api/unauthorizedRequest";
import { NextRequest } from "next/server";

type Params = {
  id: string;
};

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const answers: string | string[] = await request.json();
  return await unauthorizedRequest(`questions/${params.id}`, {
    method: "POST",
    body: JSON.stringify({
      answers,
    }),
    headers: { "Content-Type": "application/json" },
  });
}
