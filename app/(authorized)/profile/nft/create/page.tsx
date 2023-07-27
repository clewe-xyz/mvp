import { authorizedRequest } from "@/app/api/authorizedRequest";
import { SkillReward } from "../../../skill";
import { UserProfile } from "../../types";
import CreationStages from "./creation-stages/CreationStages";

async function getProfile(): Promise<UserProfile> {
  const profile = await authorizedRequest("users/me");
  return profile.json();
}

async function getSkills(): Promise<SkillReward[]> {
  const skills = await authorizedRequest("users/me/skills");
  return skills.json();
}

export default async function CreateNFTPage() {
  const [userProfile, userSkills] = await Promise.all([
    getProfile(),
    getSkills(),
  ]);
  return <CreationStages user={userProfile} skills={userSkills} />;
}
