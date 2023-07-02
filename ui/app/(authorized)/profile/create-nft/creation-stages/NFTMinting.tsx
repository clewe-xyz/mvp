import { Skill, SkillReward } from "@/app/(authorized)/skill";
import newTabIcon from "@/images/newtab.svg";
import { AsyncButton } from "@/ui-kit/buttons";
import { ProgressLine } from "@/ui-kit/progress-line";
import classNames from "classnames";
import { toPng } from "html-to-image";
import Image from "next/image";
import { NFTStorage } from "nft.storage";
import { useEffect, useRef, useState } from "react";
import { UserProfile } from "../../types";
import styles from "./profileToImage.module.css";

type Props = {
  user: UserProfile;
  skills: SkillReward[];
  onMint: () => void;
};

export default function NFTMinting({ user, skills, onMint }: Props) {
  const [isInitialized, initialize] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const levelMaximumExp = user.exp_to_next_level + user.level_accumulated_exp;
  const profileRoot = useRef<HTMLDivElement>(null);
  const NFTActionsContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initialize(true);
    }
  }, []);

  useEffect(() => {
    convertProfileToImage();
  }, []);

  const convertProfileToImage = () => {
    if (profileRoot.current === null || NFTActionsContainer.current === null) {
      return Promise.resolve(undefined);
    }
    return toPng(profileRoot.current, {
      pixelRatio: 1,
      width: 400,
      canvasWidth: 400,
    })
      .then(setPreview)
      .catch((error) =>
        console.error("Error while creating image from node", error)
      );
  };

  const previewNFTImage = () => {
    const newTab = window.open();
    newTab?.document.write(
      '<html><body style="margin: 0;"><img src="' +
        preview +
        '" alt="Your NFT image"></body></html>'
    );
  };

  return (
    <>
      {preview ? (
        <>
          <p>Preview how you NFT will look like after minting.</p>
          <p>
            When the mint finishes, we will provide you a link to a blockchain
            transaction and NFT preview on the OpenSea;
          </p>
          <p>Also, an NFT reference will be available in your profile</p>
        </>
      ) : (
        <p>Preview how you NFT will look like by generating an image</p>
      )}
      <div className={styles.NFTActionsContainer} ref={NFTActionsContainer}>
        {preview ? (
          isInitialized ? (
            <>
              <button
                className={styles.previewNFTBtn}
                type="button"
                onClick={previewNFTImage}
              >
                Preview NFT image&nbsp;
                <Image src={newTabIcon} alt="New tab" width={24} />
              </button>
              <AsyncButton
                className={classNames("button-accent", styles.mintNFTBtn)}
                asyncAction={() =>
                  mintNFT(preview, {
                    name: "The captured progress made on the CleWe platform",
                    description:
                      "This is an NFT that shows and makes your educational progress visible to others",
                  }).then((metadata) => {
                    console.log("NFT metadata was uploaded", metadata);
                    onMint();
                  })
                }
              >
                Mint NFT
              </AsyncButton>
            </>
          ) : (
            <>
              <AsyncButton
                className={classNames("button-accent", styles.mintNFTBtn)}
                asyncAction={() =>
                  mintNFT(preview, {
                    name: "The captured progress made on the CleWe platform",
                    description:
                      "This is an NFT that shows and makes your educational progress visible to others",
                  }).then((metadata) => {
                    console.log("NFT metadata was uploaded", metadata);
                    onMint();
                  })
                }
              >
                Mint NFT
              </AsyncButton>
              <Image src={preview} alt="Your NFT image" />
            </>
          )
        ) : (
          <AsyncButton
            className="button-accent"
            asyncAction={convertProfileToImage}
          >
            Generate NFT image
          </AsyncButton>
        )}
      </div>
      {/* Profile stats layout, which serves as source for image generation */}
      <div className={styles.profileSourceContainer}>
        <div className={styles.profile} ref={profileRoot}>
          <section className={styles.levelStatsSection}>
            <h3 className={styles.nickName}>{user.nickname}</h3>
            <div>
              <div className={styles.levelContainer}>
                <h5 className={styles.level}>Level: {user.level_id}</h5>
                <span className={styles.addedExperience}>
                  XP to next level: {user.exp_to_next_level}
                </span>
              </div>
              <div className={styles.levelProgress}>
                <ProgressLine
                  currentProgress={user.level_accumulated_exp}
                  totalProgress={levelMaximumExp}
                />
              </div>
            </div>
          </section>
          <section className={styles.skillsSection}>
            <h4 className={styles.skillsTitle}>Skills</h4>
            <div className={styles.skillsSummaryContainer}>
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <Skill
                    key={skill.tag}
                    name={skill.topic}
                    tag={skill.tag}
                    points={`${skill.point}`}
                  />
                ))
              ) : (
                <div>No Skills for now</div>
              )}
            </div>
          </section>
          <footer className={styles.footer}>
            <span className={styles.logo}>CleWe</span>
            <span>Created on _human-Readable date_</span>
          </footer>
        </div>
      </div>
    </>
  );
}

type Config = {
  name: string;
  description: string;
};

const NFTStorageClient = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY as string,
});

export async function mintNFT(imageBase64Data: string, config: Config) {
  // const metadata = await uploadToIPFS(imageBase64Data, config);
  const metadata = Promise.resolve([]);
  // TODO: Call smart contract to mint NFT
  return metadata;
}

async function uploadToIPFS(imageBase64Data: string, config: Config) {
  const file = await convertBase64ToPNG(
    imageBase64Data,
    "CleWe-progress-nft.png"
  );
  return await NFTStorageClient.store({
    image: file,
    name: config.name,
    description: config.description,
  });
}

async function convertBase64ToPNG(
  imageBase64Data: string,
  name: string
): Promise<File> {
  const response = await fetch(imageBase64Data);
  const arrayBuffer = await response.blob();
  return new File([arrayBuffer], name, { type: "image/png" });
}
