import { authorizedRequest } from "@/app/api/authorizedRequest";
import { NextRequest } from "next/server";

type Params = {
  id: string;
};

type CompletionResults = {
  experience: number;
  skills: { id: number }[];
};

export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const completionResults: CompletionResults = await request.json();
  return await authorizedRequest(`quests/complete/${params.id}`, {
    method: "POST",
    body: JSON.stringify({
      experience_reward: completionResults.experience,
      skills: completionResults.skills.map(({ id }) => ({ skill_id: id })),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
