import mintNFT from "@/images/mint-nft.png";
import { ProgressLine } from "@/ui-kit/progress-line";
import classNames from "classnames";
import Image from "next/image";
import { Skill, SkillReward } from "../skill";
import { AchievementsSlider } from "./achievements";
import styles from "./page.module.css";

type UserProfile = {
  nickname: string;
  level: number;
  expToNextLevel: number;
  currentLevelExperience: number;
  skills: SkillReward[];
};

async function getProfileData() {
  const userProfile: UserProfile = {
    nickname: "Clewer Player",
    level: 1,
    expToNextLevel: 68,
    currentLevelExperience: 32,
    skills: [
      {
        id: "ewjnio2908",
        topic: "Blockchain",
        tag: "blockchain",
        points: 5,
      },
      {
        id: "fdmkl32oi",
        topic: "Finance fundamentals",
        tag: "finance",
        points: 8,
      },
      {
        id: "4903lkds",
        topic: "DAOs",
        tag: "dao",
        points: 3,
      },
    ],
  };
  return Promise.resolve(userProfile);
}

export default async function UserProfile() {
  const userProfile = await getProfileData();
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
            <h5 className={styles.level}>Level: {userProfile.level}</h5>
            <span className={styles.addedExperience}>
              XP to next level: {userProfile.expToNextLevel}
            </span>
          </div>
          <div className={styles.levelProgress}>
            <ProgressLine
              currentProgress={userProfile.currentLevelExperience}
              totalProgress={
                userProfile.currentLevelExperience + userProfile.expToNextLevel
              }
            />
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <h4>Skills</h4>
        <div className={styles.skillsSummaryContainer}>
          {userProfile.skills.map((skill) => (
            <Skill
              key={skill.id}
              name={skill.topic}
              tag={skill.tag}
              points={`${skill.points}`}
            />
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <h4>Achievements</h4>
        <AchievementsSlider />
      </section>
    </main>
  );
}
