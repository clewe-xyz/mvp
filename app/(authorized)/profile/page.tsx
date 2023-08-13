import { authorizedRequest } from "@/app/api/authorizedRequest";
import mintNFT from "@/images/mint-nft.png";
import { ProgressLine } from "@/ui-kit/progress-line";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import skillsHeroBG from "@/images/skills/skills-hero-bg.png";
import { SkillReward } from "../skill";
import { AchievementsSlider } from "./achievements";
import { NFTSlider } from "./nft";
import styles from "./page.module.css";
import { UserProfile } from "./types";

export const dynamic = "force-dynamic";

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
      {!userProfile.nfts ? (
        <section className={classNames(styles.section, styles.nft)}>
          <div className={styles.picture}>
            <Image src={mintNFT} alt="Mint NFT invitation" width={72} />
          </div>
          <div>
            <h4 className={classNames(styles.mintNFTTitle)}>
              Capture your progress with NFT
            </h4>
            <div className={styles.mintNFTDescription}>
              Create an NFT which will publically represents you current
              progress. You can update the NFT later as the progress evolves.
            </div>
            <div className={styles.mintNFTActions}>
              <Link href="/profile/nft/create" className="link">
                Create NFT
              </Link>
            </div>
          </div>
        </section>
      ) : null}

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
      <section className={classNames(styles.section, styles.skills)}>
        <Image
          alt="Skills"
          src={skillsHeroBG}
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            filter: `opacity(20%)`,
          }}
        />
        <h4>Skills</h4>
        <div className={styles.skillsSummaryContainer}>
          {userSkills.length > 0 ? (
            userSkills.map((skill) => (
              <div key={skill.id} className={styles.skillRow}>
                <span className={styles.skillDatapoint}>{skill.topic}</span>
                <span className={styles.skillDatapoint}>
                  {skill.point}
                  <span className={styles.skillMeasure}>pts</span>
                </span>
              </div>
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
      {userProfile.nfts && userProfile.nfts.length > 0 ? (
        <section className={styles.section}>
          <h4>NFTs</h4>
          <NFTSlider nfts={userProfile.nfts} />
        </section>
      ) : null}

      <section className={styles.section}>
        <h4>Achievements</h4>
        <AchievementsSlider />
      </section>
    </main>
  );
}
