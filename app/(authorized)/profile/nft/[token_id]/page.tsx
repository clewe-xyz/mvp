import { authorizedRequest } from "@/app/api/authorizedRequest";
import { SkillReward } from "../../../skill";
import { UserProfile } from "../../types";
import UpdateStages from "./stages/Stages";

async function getProfile(): Promise<UserProfile> {
  const profile = await authorizedRequest("users/me");
  return profile.json();
}

async function getSkills(): Promise<SkillReward[]> {
  const skills = await authorizedRequest("users/me/skills");
  return skills.json();
}

type Params = {
  token_id: string;
};

export default async function UpdateNFTPage({ params }: { params: Params }) {
  const [userProfile, userSkills] = await Promise.all([
    getProfile(),
    getSkills(),
  ]);

  return (
    <UpdateStages
      user={userProfile}
      skills={userSkills}
      tokenId={params.token_id}
    />
  );
}
