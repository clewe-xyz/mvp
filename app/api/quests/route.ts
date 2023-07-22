import { authorizedRequest } from "../authorizedRequest";

export async function GET() {
  return await authorizedRequest(`quests/my/list/quests`);
}
