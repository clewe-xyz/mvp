import { authorizedRequest } from "@/app/api/authorizedRequest";
import mintNFT from "@/images/mint-nft.png";
import { ProgressLine } from "@/ui-kit/progress-line";
import classNames from "classnames";
import Image from "next/image";
import { Skill, SkillReward } from "../skill";
import { AchievementsSlider } from "./achievements";
import styles from "./page.module.css";
import Link from "next/link";

type UserProfile = {
  nickname: string;
  wallet_address?: string;
  level_id: number;
  level_accumulated_exp: number;
  exp_to_next_level: number;
};

async function getProfile(): Promise<UserProfile> {
  const profile = await authorizedRequest("users/me");
  return profile.json();
}

async function getSkills(): Promise<SkillReward[]> {
  const skills = await authorizedRequest("users/me/skills");
  return skills.json();
}

export default async function UserProfile() {
  const [userProfile, userSkills] = await Promise.all([
    getProfile(),
    getSkills(),
  ]);
  const levelMaximumExp =
    userProfile.exp_to_next_level + userProfile.level_accumulated_exp;
  return (
    <main>
      <section className={classNames(styles.section, styles.nft)}>
        <div className={styles.picture}>
          <Image src={mintNFT} alt="Mint NFT invitation" width={72} />
        </div>
        <div>
          <h4 className={classNames(styles.mintNFTTitle)}>
            Capture your progress with NFT
          </h4>
          <div className={styles.mintNFTDescription}>
            Create an NFT which will publically represents you current progress.
            You can update the NFT later as your progress evolves.
          </div>
          <div className={styles.mintNFTActions}>
            <button className={classNames("button", "button-outline")}>
              Create NFT
            </button>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <h4 className={styles.nickName}>{userProfile.nickname}</h4>
        <div>
          <div className={styles.levelContainer}>
            <h5 className={styles.level}>Level: {userProfile.level_id}</h5>
            <span className={styles.addedExperience}>
              XP to next level: {userProfile.exp_to_next_level}
            </span>
          </div>
          <div className={styles.levelProgress}>
            <ProgressLine
              currentProgress={userProfile.level_accumulated_exp}
              totalProgress={levelMaximumExp}
            />
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <h4>Skills</h4>
        <div className={styles.skillsSummaryContainer}>
          {userSkills.length > 0 ? (
            userSkills.map((skill) => (
              <Skill
                key={skill.id}
                name={skill.topic}
                tag={skill.tag}
                points={`${skill.point}`}
              />
            ))
          ) : (
            <div>
              Complete{" "}
              <Link href="/quests" className="link">
                quests
              </Link>{" "}
              to get new skills!
            </div>
          )}
        </div>
      </section>
      <section className={styles.section}>
        <h4>Achievements</h4>
        <AchievementsSlider />
      </section>
    </main>
  );
}
